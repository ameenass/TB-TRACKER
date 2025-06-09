import { Info, Plus, AlertCircle, PauseCircle, StickyNote, CalendarPlus, X, Trash2, RefreshCw } from "lucide-react"
import { format, isSameDay, startOfMonth, endOfMonth, eachDayOfInterval, parseISO, startOfDay } from "date-fns"
import { fr } from "date-fns/locale"
import { useRef, useState, useEffect } from "react"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer } from "react-toastify"
import { useParams } from "react-router-dom"
import ModalEffetsSecondaires from "./ModalEffetsSecondaires"

function Agenda({
  treatments,
  activeDaysCount,
  agendaMonths,
  getTreatmentInfo,
  setState,
  openModal,
  showInfoTooltip,
  setShowInfoTooltip,
  onSessionsFetched,
  onSessionClosed,
  suspensions,
  setSuspensions,
  ficheStatut,
  isAgendaEditable,
}) {
  const [selectedDay, setSelectedDay] = useState(null)
  const [contextMenuPosition, setContextMenuPosition] = useState(null)
  const [isSideEffectModalOpen, setIsSideEffectModalOpen] = useState(false)
  const [dayInfoModalOpen, setDayInfoModalOpen] = useState(false)
  const [selectedDayInfo, setSelectedDayInfo] = useState(null)

  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false)
  const [noteText, setNoteText] = useState("")
  const [selectedDayForNote, setSelectedDayForNote] = useState(null)

  const [notes, setNotes] = useState([])
  const [effects, setEffects] = useState([])

  const [expandedClosedSessions, setExpandedClosedSessions] = useState(new Set())// supp

  const [rendezVousDates, setRendezVousDates] = useState([])
  const [isSessionClosed, setIsSessionClosed] = useState(false)
  const [statut, setStatut] = useState(() => {
    const sessionData = localStorage.getItem("sessionTempData")
    const initialStatut = sessionData ? JSON.parse(sessionData).statut !== false : false
    console.log("Initial statut from localStorage:", initialStatut)
    return initialStatut
  })

  const [currentActiveSession, setCurrentActiveSession] = useState(null)
  const dayInfoModalRef = useRef(null)
  const contextMenuRef = useRef(null)
  const { id: idfich } = useParams()
  const [sessions, setSessions] = useState([])
  const dayNames = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"]
  const [displayMonths, setDisplayMonths] = useState([])

  const generateSixMonths = () => {  //now 2 years
    const months = []
    const currentDate = new Date()
    let lastColPosition = 0

    for (let i = 0; i < 24; i++) {
      const monthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + i, 1)
      const year = monthDate.getFullYear()
      const month = monthDate.getMonth()
      const daysInMonth = endOfMonth(monthDate).getDate()

      const start = startOfMonth(monthDate)
      const end = endOfMonth(monthDate)
      const days = eachDayOfInterval({ start, end })

      const rows = []
      let currentRow = []
      const maxWidth = 28

      let currentCol = i === 0 ? 0 : lastColPosition + 1
      if (currentCol >= maxWidth) currentCol = 0

      for (let j = 0; j < currentCol; j++) {
        currentRow.push(null)
      }

      for (let day = 1; day <= daysInMonth; day++) {
        currentRow.push(day)
        currentCol++

        if (currentCol >= maxWidth) {
          rows.push([...currentRow])
          currentRow = []
          currentCol = 0
        }
      }

      if (currentRow.length > 0) {
        rows.push([...currentRow])
      }

      lastColPosition = currentCol > 0 ? currentCol - 1 : maxWidth - 1

      months.push({
        monthKey: `${year}-${month}`,
        name: monthDate.toLocaleDateString("fr-FR", { month: "long" }),
        year: year,
        days: days,
        rows: rows,
        monthDate: monthDate,
      })
    }

    return months
  }

  // Fonction pour vérifier si un jour est dans le futur (ou aujourd'hui)
  const isDayFutureOrToday = (day) => {
    const today = startOfDay(new Date())
    const targetDay = startOfDay(day)
    return targetDay >= today
  }

  // Fonction pour vérifier si un jour est dans le passé
  const isDayInPast = (day) => {
    const today = startOfDay(new Date())
    const targetDay = startOfDay(day)
    return targetDay < today
  }

  // Fonction pour vérifier si un jour est dans une période de suspension
  const isDaySuspended = (day) => {
    if (!suspensions || !Array.isArray(suspensions) || suspensions.length === 0) return false

    const dateStr = format(day, "yyyy-MM-dd")

    return suspensions.some((suspension) => {
      // Convertir les dates de suspension en objets Date si ce sont des chaînes
      const startDate =
        typeof suspension.startDate === "string" ? parseISO(suspension.startDate) : new Date(suspension.startDate)

      const endDate =
        typeof suspension.endDate === "string" ? parseISO(suspension.endDate) : new Date(suspension.endDate)

      // Vérifier si le jour est dans la période de suspension
      const currentDate = parseISO(dateStr)
      return currentDate >= startDate && currentDate <= endDate
    })
  }

  // Fonction pour trouver la suspension qui contient un jour spécifique
  const findSuspensionForDay = (day) => {
    if (!suspensions || !Array.isArray(suspensions) || suspensions.length === 0) return null

    const dateStr = format(day, "yyyy-MM-dd")

    return suspensions.find((suspension) => {
      const startDate =
        typeof suspension.startDate === "string" ? parseISO(suspension.startDate) : new Date(suspension.startDate)

      const endDate =
        typeof suspension.endDate === "string" ? parseISO(suspension.endDate) : new Date(suspension.endDate)

      const currentDate = parseISO(dateStr)
      return currentDate >= startDate && currentDate <= endDate
    })
  }

  // Fonction pour vérifier si une suspension peut être annulée (seulement si elle contient des jours futurs)
  const canCancelSuspension = (suspension) => {
    const endDate = typeof suspension.endDate === "string" ? parseISO(suspension.endDate) : new Date(suspension.endDate)

    return isDayFutureOrToday(endDate)
  }

  const loadActiveSessionData = (activeSession) => {
    console.log("Loading active session data:", activeSession)

    if (activeSession.notes && Array.isArray(activeSession.notes)) {
      const loadedNotes = activeSession.notes.map((note) => ({
        text: typeof note === "string" ? note : note.text,
        date:
          typeof note === "string"
            ? new Date()
            : note.date && note.date.$date
              ? new Date(note.date.$date)
              : new Date(note.date || new Date()),
      }))
      setNotes(loadedNotes)
    }

    if (activeSession.effetsSignales && Array.isArray(activeSession.effetsSignales)) {
      const loadedEffects = activeSession.effetsSignales.map((effect) => ({
        ...effect,
        dateDebut:
          effect.dateDebut && effect.dateDebut.$date
            ? new Date(effect.dateDebut.$date).toISOString().split("T")[0]
            : effect.dateDebut,
        dateFin:
          effect.dateFin && effect.dateFin.$date
            ? new Date(effect.dateFin.$date).toISOString().split("T")[0]
            : effect.dateFin,
      }))
      setEffects(loadedEffects)
    }

    if (activeSession.rendezVous && Array.isArray(activeSession.rendezVous)) {
      const rdvDates = activeSession.rendezVous.map((rdv) => {
        if (typeof rdv === "string") {
          return rdv
        } else if (rdv.date) {
          return rdv.date.$date ? new Date(rdv.date.$date).toISOString().split("T")[0] : rdv.date
        }
        return rdv
      })
      setRendezVousDates(rdvDates)
    }

    // Chargement des suspensions
    if (activeSession.suspensions && Array.isArray(activeSession.suspensions)) {
      console.log("Suspensions loaded:", activeSession.suspensions)

      // Convertir les dates de suspension en format approprié
      const loadedSuspensions = activeSession.suspensions.map((susp) => {
        return {
          startDate:
            susp.startDate && susp.startDate.$date
              ? new Date(susp.startDate.$date)
              : typeof susp.startDate === "string"
                ? parseISO(susp.startDate)
                : new Date(susp.startDate),
          endDate:
            susp.endDate && susp.endDate.$date
              ? new Date(susp.endDate.$date)
              : typeof susp.endDate === "string"
                ? parseISO(susp.endDate)
                : new Date(susp.endDate),
          note: susp.note || "",
        }
      })

      setSuspensions(loadedSuspensions)
    }
  }

  useEffect(() => {
    console.log("useEffect triggered with idfich:", idfich)
    if (!idfich) {
      console.log("No idfich found, returning early")
      return
    }

    console.log("Fetching sessions for idfich:", idfich)
    fetch(`http://localhost:5000/sessions/fiche/${idfich}`)
      .then((res) => {
        console.log("Response status:", res.status)
        return res.json()
      })
      .then((data) => {
        console.log("Sessions récupérées :", data)
        console.log("Number of sessions found:", data.length)
        setSessions(data)

        if (onSessionsFetched && typeof onSessionsFetched === "function") {
          onSessionsFetched(data)
        }

        const hasActiveSession = data.some((session) => session.statut === true)
        console.log("Has active session from backend:", hasActiveSession)
        console.log("Current statut before update:", statut)
        setStatut(hasActiveSession)
        console.log("Setting statut to:", hasActiveSession)

        if (hasActiveSession) {
          const activeSession = data.find((session) => session.statut === true)
          if (activeSession && activeSession._id) {
            localStorage.setItem("currentSessionId", activeSession._id)
            console.log("📌 currentSessionId set to:", activeSession._id)

            setCurrentActiveSession(activeSession)
            loadActiveSessionData(activeSession)
          }
        } else {
          localStorage.removeItem("currentSessionId")
          console.log("📌 currentSessionId removed")
          setCurrentActiveSession(null)
        }
      })
      .catch((err) => console.error("Erreur lors de la récupération des sessions :", err))
  }, [idfich])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (contextMenuRef.current && !contextMenuRef.current.contains(event.target)) {
        setContextMenuPosition(null)
      }

      if (dayInfoModalRef.current && !dayInfoModalRef.current.contains(event.target)) {
        setDayInfoModalOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    setDisplayMonths(generateSixMonths())
  }, [])

  const handleCloseSession = async () => {
    if (!isAgendaEditable) {
      toast.warning(`La fiche est ${ficheStatut || "clôturée"}. Impossible de modifier l'agenda.`, {
        position: "top-right",
        autoClose: 5000,
      })
      return
    }

    console.log("Attempting to close session. Current statut:", statut)
    console.log("LocalStorage content:", localStorage)
    const sessionId = localStorage.getItem("currentSessionId")
    console.log("Retrieved sessionId:", sessionId)
    if (!sessionId) {
      console.error("ID de session introuvable.")
      return
    }

    try {
      const response = await fetch(`http://localhost:5000/sessions/${sessionId}/cloturer`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      })

      setStatut(false)
      setIsSessionClosed(true)
      setCurrentActiveSession(null)

      localStorage.removeItem("currentSessionId")
      localStorage.removeItem("sessionTempData")

      setNotes([])
      setEffects([])
      setRendezVousDates([])
      setSuspensions([])

      if (onSessionClosed && typeof onSessionClosed === "function") {
        onSessionClosed(sessionId)
      }

      console.log("Session closed successfully. New statut:", false)

      toast.success("Session clôturée avec succès !", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    } catch (error) {
      console.error("Erreur lors de la clôture :", error)
      toast.error("Erreur lors de la clôture de la session", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    }
  }

  const handleAddSession = () => {
    if (!isAgendaEditable) {
      toast.warning(`La fiche est ${ficheStatut || "clôturée"}. Impossible de modifier l'agenda.`, {
        position: "top-right",
        autoClose: 5000,
      })
      return
    }

    if (statut) {
      toast.warning("Une session est déjà en cours. Veuillez la clôturer avant d'en créer une nouvelle.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
      return
    }

    setNotes([])
    setRendezVousDates([])
    setSuspensions([])
    setEffects([])
    setStatut(true)
    setIsSessionClosed(false)
    setCurrentActiveSession(null)

    openModal("add")
  }

  const toggleClosedSession = (sessionNumber) => {
    setExpandedClosedSessions((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(sessionNumber)) {
        newSet.delete(sessionNumber)
      } else {
        newSet.add(sessionNumber)
      }
      return newSet
    })
  }

  const handleDayClick = (day, treatmentInfo, event) => {
    if (!isAgendaEditable) {
      toast.warning(`La fiche est ${ficheStatut || "clôturée"}. Impossible de modifier l'agenda.`, {
        position: "top-right",
        autoClose: 5000,
      })
      return
    }

    if (!statut || (treatmentInfo.hasTreatment && !treatmentInfo.isActive)) {
      return
    }

    if (event.button === 2 || event.type === "contextmenu") {
      event.preventDefault()

      if (treatmentInfo.hasTreatment && !treatmentInfo.isOverridden) {
        setSelectedDay({ day, treatmentInfo })

        const rect = event.currentTarget.getBoundingClientRect()
        const menuWidth = 150
        const menuHeight = 160

        let x = rect.left + rect.width / 2 - menuWidth / 2
        let y = rect.bottom + 5

        if (x + menuWidth > window.innerWidth - 10) {
          x = window.innerWidth - menuWidth - 10
        }

        if (x < 10) {
          x = 10
        }

        if (y + menuHeight > window.innerHeight - 10) {
          y = rect.top - menuHeight - 5

          if (y < 10) {
            y = 10
          }
        }

        console.log("Day button right-clicked:", day.toDateString())
        console.log("Button rect:", rect)
        console.log("Menu position:", { x, y })

        setContextMenuPosition({ x, y })
      }
    } else {
      const dateStr = format(day, "yyyy-MM-dd")

      const dayNotes = notes.filter((note) => {
        const noteDate =
          note.date instanceof Date ? format(note.date, "yyyy-MM-dd") : format(new Date(note.date), "yyyy-MM-dd")
        return noteDate === dateStr
      })

      const dayEffects = effects.filter((effect) => {
        const effectDate =
          typeof effect.dateDebut === "string" ? effect.dateDebut : format(new Date(effect.dateDebut), "yyyy-MM-dd")
        return effectDate === dateStr
      })

      const hasAppointment = rendezVousDates.includes(dateStr)

      
      const suspension = findSuspensionForDay(day)  // verifier si le jour est dans une periode de suspension
      const isSuspended = !!suspension

      const dayInfo = {
        date: day,
        dateStr,
        treatmentInfo,
        notes: dayNotes,
        effects: dayEffects,
        hasAppointment,
        isSuspended,
        suspension,
      }

      setSelectedDayInfo(dayInfo)

      const rect = event.currentTarget.getBoundingClientRect()
      const modalWidth = 300
      const modalHeight = 400

      let x = rect.left + rect.width / 2 - modalWidth / 2
      let y = rect.bottom + 10

      if (x + modalWidth > window.innerWidth - 10) {
        x = window.innerWidth - modalWidth - 10
      }

      if (x < 10) {
        x = 10
      }

      if (y + modalHeight > window.innerHeight - 10) {
        y = rect.top - modalHeight - 10

        if (y < 10) {
          y = 10
        }
      }

      setDayInfoModalOpen(true)

      setTimeout(() => {
        if (dayInfoModalRef.current) {
          dayInfoModalRef.current.style.top = `${y}px`
          dayInfoModalRef.current.style.left = `${x}px`
        }
      }, 0)
    }
  }

  const handleOptionClick = (action) => {
    if (!isAgendaEditable) {
      toast.warning(`La fiche est ${ficheStatut || "clôturée"}. Impossible de modifier l'agenda.`, {
        position: "top-right",
        autoClose: 5000,
      })
      return
    }

    if (!selectedDay) return

    if (action === "suspend") {
      
      if (isDayInPast(selectedDay.day)) {
        toast.error("Impossible de suspendre un traitement dans le passé. Veuillez sélectionner une date future.", {
          position: "top-right",
          autoClose: 5000,
        })
        setContextMenuPosition(null)
        setSelectedDay(null)
        return
      }

      setState([
        {
          startDate: selectedDay.day,
          endDate: selectedDay.day,
          key: "selection",
        },
      ])

      openModal("suspend", selectedDay.treatmentInfo)
      setContextMenuPosition(null)
      setSelectedDay(null)
      return
    }

    if (action === "note") {
      setSelectedDayForNote(selectedDay.day)
      setIsNoteModalOpen(true)
      setContextMenuPosition(null)
      return
    }

    switch (action) {
      case "side_effect":
        setIsSideEffectModalOpen(true)
        break

      case "rendez_vous":
        const dateStr = format(selectedDay.day, "yyyy-MM-dd")
        if (!rendezVousDates.includes(dateStr)) {
          setRendezVousDates((prev) => [...prev, dateStr])
          toast.success(`Rendez-vous ajouté pour le ${format(selectedDay.day, "dd/MM/yyyy")}`, {
            position: "top-right",
            autoClose: 2000,
          })
        }
        break
      default:
        openModal(action, selectedDay.treatmentInfo)
    }

    setContextMenuPosition(null)
    setSelectedDay(null)
  }

  const handleMenuAction = (action) => {
    handleOptionClick(action)
    setContextMenuPosition(null)
  }

  // annuler une suspension
  const handleCancelSuspension = (suspension) => {
    if (!isAgendaEditable) {
      toast.warning(`La fiche est ${ficheStatut || "clôturée"}. Impossible de modifier l'agenda.`, {
        position: "top-right",
        autoClose: 5000,
      })
      return
    }

    // Verifier si la suspension (contient des jours futurs)
    if (!canCancelSuspension(suspension)) {
      toast.error("Impossible d'annuler une suspension qui ne contient que des jours passés.", {
        position: "top-right",
        autoClose: 5000,
      })
      return
    }

    // Filtrer la suspension à supprimer--?
    const updatedSuspensions = suspensions.filter((susp) => {
      // Comparer les dates pour identifier la suspension à supprimer
      const suspStartDate =
        typeof susp.startDate === "string" ? susp.startDate : format(new Date(susp.startDate), "yyyy-MM-dd")

      const suspEndDate = typeof susp.endDate === "string" ? susp.endDate : format(new Date(susp.endDate), "yyyy-MM-dd")

      const targetStartDate =
        typeof suspension.startDate === "string"
          ? suspension.startDate
          : format(new Date(suspension.startDate), "yyyy-MM-dd")

      const targetEndDate =
        typeof suspension.endDate === "string" ? suspension.endDate : format(new Date(suspension.endDate), "yyyy-MM-dd")

      return !(suspStartDate === targetStartDate && suspEndDate === targetEndDate)
    })

    setSuspensions(updatedSuspensions)
    setDayInfoModalOpen(false)

    toast.success("Suspension annulée avec succès", {
      position: "top-right",
      autoClose: 2000,
    })

    // Mettre à jour la session immédiatement pour persister le changement--?
    const sessionId = localStorage.getItem("currentSessionId")
    if (sessionId) {
      updateExistingSession(sessionId, updatedSuspensions)
    }
  }

  //  gerer l'ajout de note depuis le modal
  const handleAddNote = () => {
    if (!noteText.trim() || !selectedDayForNote) return

    setNotes((prev) => [
      ...prev,
      {
        text: noteText,
        date: selectedDayForNote,
      },
    ])

    setNoteText("")
    setIsNoteModalOpen(false)
    setSelectedDayForNote(null)
    setSelectedDay(null)

    toast.success("Note ajoutée avec succès !", {
      position: "top-right",
      autoClose: 2000,
    })
  }

  const handleCloseNoteModal = () => {
    setIsNoteModalOpen(false)
    setNoteText("")
    setSelectedDayForNote(null)
    setSelectedDay(null)
  }

  const handleDeleteAppointment = (dateStr) => {
    if (!isAgendaEditable) {
      toast.warning(`La fiche est ${ficheStatut || "clôturée"}. Impossible de modifier l'agenda.`, {
        position: "top-right",
        autoClose: 5000,
      })
      return
    }

    setRendezVousDates((prev) => prev.filter((date) => date !== dateStr))
    toast.success(`Rendez-vous du ${format(new Date(dateStr), "dd/MM/yyyy")} supprimé`, {
      position: "top-right",
      autoClose: 2000,
    })

    if (selectedDayInfo && selectedDayInfo.dateStr === dateStr) {
      setSelectedDayInfo({
        ...selectedDayInfo,
        hasAppointment: false,
      })
    }
  }

  const handleDeleteNote = (noteToDelete) => {
    if (!isAgendaEditable) {
      toast.warning(`La fiche est ${ficheStatut || "clôturée"}. Impossible de modifier l'agenda.`, {
        position: "top-right",
        autoClose: 5000,
      })
      return
    }

    setNotes((prev) =>
      prev.filter((note) => {
        const noteDate =
          note.date instanceof Date ? format(note.date, "yyyy-MM-dd") : format(new Date(note.date), "yyyy-MM-dd")
        const deleteDate =
          noteToDelete.date instanceof Date
            ? format(noteToDelete.date, "yyyy-MM-dd")
            : format(new Date(noteToDelete.date), "yyyy-MM-dd")

        return !(noteDate === deleteDate && note.text === noteToDelete.text)
      }),
    )

    toast.success(`Note supprimée`, {
      position: "top-right",
      autoClose: 2000,
    })

    if (selectedDayInfo) {
      setSelectedDayInfo({
        ...selectedDayInfo,
        notes: selectedDayInfo.notes.filter((note) => note !== noteToDelete),
      })
    }
  }

  const handleDeleteEffect = (effectToDelete) => {
    if (!isAgendaEditable) {
      toast.warning(`La fiche est ${ficheStatut || "clôturée"}. Impossible de modifier l'agenda.`, {
        position: "top-right",
        autoClose: 5000,
      })
      return
    }

    setEffects((prev) =>
      prev.filter((effect) => {
        const effectDate =
          typeof effect.dateDebut === "string" ? effect.dateDebut : format(new Date(effect.dateDebut), "yyyy-MM-dd")
        const deleteDate =
          typeof effectToDelete.dateDebut === "string"
            ? effectToDelete.dateDebut
            : format(new Date(effectToDelete.dateDebut), "yyyy-MM-dd")

        return !(effectDate === deleteDate && effect.type === effectToDelete.type)
      }),
    )

    toast.success(`Effet secondaire supprimé`, {
      position: "top-right",
      autoClose: 2000,
    })

    if (selectedDayInfo) {
      setSelectedDayInfo({
        ...selectedDayInfo,
        effects: selectedDayInfo.effects.filter((effect) => effect !== effectToDelete),
      })
    }
  }

  const handleEffectsSubmit = (effectsData) => {
    if (!isAgendaEditable) {
      toast.warning(`La fiche est ${ficheStatut || "clôturée"}. Impossible de modifier l'agenda.`, {
        position: "top-right",
        autoClose: 5000,
      })
      return
    }

    console.log("Effects received from modal:", effectsData)
    setEffects((prev) => [...prev, ...effectsData.effetsSignales])
    setIsSideEffectModalOpen(false)
    toast.success("Effet secondaire ajouté avec succès !", {
      position: "top-right",
      autoClose: 2000,
    })
  }

  const saveOrUpdateSession = async () => {
    if (!isAgendaEditable) {
      toast.warning(`La fiche est ${ficheStatut || "clôturée"}. Impossible de modifier l'agenda.`, {
        position: "top-right",
        autoClose: 5000,
      })
      return
    }

    const sessionId = localStorage.getItem("currentSessionId")
    const isUpdatingExistingSession = sessionId && currentActiveSession

    if (isUpdatingExistingSession) {
      await updateExistingSession(sessionId)
    } else {
      await saveNewSession()
    }
  }

  const updateExistingSession = async (sessionId, customSuspensions = null) => {
    const updateData = {
      rendezVous: rendezVousDates,
      notes: notes.map((note) => ({
        text: note.text,
        date: format(note.date instanceof Date ? note.date : new Date(note.date), "yyyy-MM-dd"),
      })),
      effetsSignales: effects,
      suspensions: (customSuspensions || suspensions).map((susp) => ({
        startDate: format(new Date(susp.startDate), "yyyy-MM-dd"),
        endDate: format(new Date(susp.endDate), "yyyy-MM-dd"),
        note: susp.note || "",
      })),
    }

    console.log("Updating session with data:", updateData)

    try {
      const response = await fetch(`http://localhost:5000/sessions/${sessionId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      })

      const result = await response.json()

      if (!response.ok) throw new Error(result.error || "Erreur lors de la mise à jour")

      console.log("Session mise à jour avec succès")

      toast.success("Session mise à jour avec succès !", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })

      const updatedSession = { ...currentActiveSession, ...updateData }
      setCurrentActiveSession(updatedSession)
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error)
      toast.error("Erreur lors de la mise à jour de la session", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    }
  }

  const saveNewSession = async () => {
    const sessionTempData = localStorage.getItem("sessionTempData")
    if (!sessionTempData) {
      toast.error("Aucune donnée de session temporaire trouvée", {
        position: "top-right",
        autoClose: 3000,
      })
      return
    }

    const session = JSON.parse(sessionTempData)
    console.log("Saving new session with idfich from URL params:", idfich)
    const payload = {
      ...session,
      idfich,
      statut,
      rendezVous: rendezVousDates,
      notes: notes.map((note) => ({
        text: note.text,
        date: format(note.date instanceof Date ? note.date : new Date(note.date), "yyyy-MM-dd"),
      })),
      suspensions: suspensions.map((susp) => ({
        startDate: format(new Date(susp.startDate), "yyyy-MM-dd"),
        endDate: format(new Date(susp.endDate), "yyyy-MM-dd"),
        note: susp.note || "",
      })),
      effetsSignales: effects,
    }

    console.log("New session payload:", payload)

    try {
      const response = await fetch("http://localhost:5000/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const result = await response.json()

      if (!response.ok) throw new Error(result.error || "Erreur lors de l'enregistrement")

      localStorage.setItem("currentSessionId", result.session_id)
      console.log("Session sauvegardée avec succès avec ID :", result.session_id)

      toast.success("Session sauvegardée avec succès !", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })

      localStorage.removeItem("sessionTempData")

      setCurrentActiveSession({ ...payload, _id: result.session_id })
    } catch (error) {
      console.error("Erreur lors de l'enregistrement :", error)
      toast.error("Erreur lors de l'enregistrement de la session", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    }
  }

  useEffect(() => {
    if (!isAgendaEditable) {
      toast.info(`La fiche est ${ficheStatut || "clôturée"}. L'agenda n'est pas modifiable.`, {
        position: "top-right",
        autoClose: 5000,
        toastId: "fiche-cloturee",
      })
    }
  }, [isAgendaEditable, ficheStatut])

  return (
    <div className="p-4 relative">
      {/* Bannière d'information si la fiche est clôturée */}
      {!isAgendaEditable && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-sm font-medium text-red-800">
              La fiche est {ficheStatut || "clôturée"}. L'agenda n'est pas modifiable.
            </span>
          </div>
        </div>
      )}

      {/* En-tête avec boutons et info */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <h2 className="text-2xl font-bold text-gray-800 mr-2">Agenda</h2>
          <div className="relative">
            <button
              className="text-gray-400 hover:text-gray-600 transition-colors"
              onMouseEnter={() => setShowInfoTooltip(true)}
              onMouseLeave={() => setShowInfoTooltip(false)}
            >
              <Info size={16} />
            </button>
            {showInfoTooltip && (
              <div className="absolute left-0 top-full mt-2 w-64 p-2 bg-white shadow-lg rounded-md border border-gray-200 z-10 text-xs text-gray-600">
                <p className="mb-1">• Chaque session est affichée dans sa propre ligne</p>
                <p className="mb-1">• Les sessions actives sont marquées en vert</p>
                <p className="mb-1">• Les jours remplacés d'une session apparaissent en gris</p>
                <p className="mb-1">• Clic droit sur un jour actif pour accéder aux options d'ajout</p>
                <p className="mb-1">• Clic gauche sur un jour pour voir ses détails et supprimer des éléments</p>
                <p>• Les suspensions ne peuvent être créées que pour des dates futures</p>
              </div>
            )}
          </div>
        </div>
        {/* Boutons de gestion de session */}
        <div className="flex gap-2">
          <button
            onClick={handleAddSession}
            disabled={!isAgendaEditable}
            className={`text-white font-semibold py-2 px-4 rounded shadow flex items-center gap-1 ${
              !isAgendaEditable ? "opacity-50 cursor-not-allowed" : ""
            }`}
            style={{
              backgroundColor: isAgendaEditable ? "oklch(76.5% 0.177 163.223)" : "#ccc",
            }}
          >
            <Plus size={18} />
            Session
          </button>
          <button
            onClick={handleCloseSession}
            disabled={!statut || !isAgendaEditable}
            className={`font-semibold py-2 px-4 rounded shadow flex items-center gap-1 transition-all duration-200 ${
              !statut || !isAgendaEditable
                ? "bg-gray-400 text-gray-600 cursor-not-allowed hover:bg-gray-400"
                : "bg-red-500 hover:bg-red-700 text-white"
            }`}
            title={
              !isAgendaEditable
                ? `La fiche est ${ficheStatut || "clôturée"}`
                : statut
                  ? "Clôturer la session active"
                  : "Aucune session active à clôturer"
            }
          >
            <PauseCircle size={18} />
            Clôturer la session
          </button>
        </div>
      </div>

      {/* Indicateur de session active */}
      {currentActiveSession && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm font-medium text-green-800">
              Session active en cours {isAgendaEditable ? "- Vous pouvez ajouter des modifications" : ""}
            </span>
          </div>
        </div>
      )}

      {/* Légende des traitements */}
      {treatments.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {treatments.map((treatment) => (
            <div key={treatment.sessionNumber} className="flex items-center">
              <div className="w-4 h-4 rounded-sm mr-1" style={{ backgroundColor: treatment.color }}></div>
              <span className="text-xs text-gray-700">
                Session {treatment.sessionNumber} ({activeDaysCount[treatment.sessionNumber] || 0} jours actifs)
              </span>
            </div>
          ))}
          <div className="flex items-center ml-2">
            <div className="w-4 h-4 rounded-sm mr-1 bg-gray-100 border border-gray-200"></div>
            <span className="text-xs text-gray-500">Jours inactifs/suspendus</span>
          </div>
        </div>
      )}

      {/* affichage des mois de session/s */}
      <div className="max-h-[calc(100vh-200px)] overflow-y-auto border border-gray-200 rounded-lg shadow-sm">
        {displayMonths.map(
          (
            month, // boucle month             flex-col
          ) => (
            <div key={month.monthKey} className="flex  border-gray-200 last:border-b-0">
              <div className="w-16 py-2 pr-0 font-medium text-gray-700 text-left sticky left-0 bg-white">
                {month.name} <span className="text-xs text-gray-500">{month.year}</span>
              </div>
              <div className="flex-1 py-2 pl-2">
                {month.rows.map(
                  (
                    row,
                    rowIndex, //boucle semaine
                  ) => (
                    <div key={`${month.monthKey}-row-${rowIndex}`} className="flex mb-1">
                      {row.map((dayNumber, colIndex) => {
                        //boucle jour
                        if (dayNumber === null) {
                          return <div key={`empty-${colIndex}`} className="w-8 h-12 m-[1px] invisible"></div>
                        }

                        const day = new Date(month.year, month.monthDate.getMonth(), dayNumber)
                        const treatmentInfo = getTreatmentInfo ? getTreatmentInfo(day) : { hasTreatment: false }
                        const isToday = isSameDay(day, new Date())
                        const dayName = format(day, "EEE", { locale: fr }).substring(0, 1).toUpperCase()

                        const isWeekend = day.getDay() === 5 || day.getDay() === 6

                        
                        const daySuspended = isDaySuspended(day)

                        let bgColor = "white"
                        let textColor = "inherit"
                        let dayNameColor = "text-gray-400"
                        const ringColor = isToday ? "ring-2 ring-green-500" : ""

                        const weekendBorder = isWeekend ? "border border-blue-200" : "" // la couleur a changer

                        if (treatmentInfo.hasTreatment) {
                          if (daySuspended || treatmentInfo.isOverridden) {
                            bgColor = "#f3f4f6"
                            textColor = "#9ca3af"
                            dayNameColor = "text-gray-300"
                          } else {
                            bgColor = treatmentInfo.color
                            dayNameColor = "text-gray-600"
                          }
                        } else {
                          bgColor = "#f9fafb"
                          textColor = "#9ca3af"
                          dayNameColor = "text-gray-300"
                        }

                        return (
                          <button
                            key={colIndex}
                            onClick={(event) => handleDayClick(day, treatmentInfo, event)}
                            onContextMenu={(event) => handleDayClick(day, treatmentInfo, event)}
                            className={`w-8 h-12 flex flex-col items-center justify-start pt-1 m-[1px] rounded-md text-xs font-medium hover:bg-gray-100 transition-colors ${treatmentInfo.hasOverlap ? "ring-1 ring-white" : ""} ${ringColor} ${weekendBorder}`}
                            style={{ backgroundColor: bgColor, color: textColor }}
                            title={
                              treatmentInfo.hasTreatment
                                ? `${treatmentInfo.name} - ${treatmentInfo.treatment} (${treatmentInfo.daysCount} jours)` +
                                  (treatmentInfo.isOverridden
                                    ? ` - Remplacé par Session ${treatmentInfo.sessionNumber}`
                                    : daySuspended
                                      ? " - Traitement suspendu"
                                      : treatmentInfo.hasOverlap
                                        ? " - Chevauche d'autres sessions"
                                        : "")
                                : `${format(day, "dd/MM/yyyy")} - Aucun traitement programmé`
                            }
                          >
                            <span className={`text-[9px] font-medium ${dayNameColor} mb-1`}>{dayName}</span>
                            <span className="text-sm">{dayNumber}</span>

                            <div className="flex justify-between items-end w-full mt-auto mb-1">
                              {/* Point rouge pour effets secondaires  */}
                              {effects.some((effect) => {
                                const currentDayStr = format(day, "yyyy-MM-dd")
                                const effectStartDate =
                                  typeof effect.dateDebut === "string"
                                    ? effect.dateDebut
                                    : format(new Date(effect.dateDebut), "yyyy-MM-dd")

                                // si l'effet a une duree(nbJours > 1) ou une date de fin--> calculer la periode
                                if (effect.nbJours && effect.nbJours > 1) {
                                  const startDate = parseISO(effectStartDate)
                                  const endDate = new Date(startDate)
                                  endDate.setDate(startDate.getDate() + effect.nbJours - 1)
                                  const effectEndDate = format(endDate, "yyyy-MM-dd")

                                  return currentDayStr >= effectStartDate && currentDayStr <= effectEndDate
                                } else if (effect.dateFin) {
                                  const effectEndDate =
                                    typeof effect.dateFin === "string"
                                      ? effect.dateFin
                                      : format(new Date(effect.dateFin), "yyyy-MM-dd")

                                  return currentDayStr >= effectStartDate && currentDayStr <= effectEndDate
                                } else {
                                  // si pas de duree specifiee, afficher seulement sur le jour de debut
                                  return currentDayStr === effectStartDate
                                }
                              }) && <span className="w-2 h-2 bg-red-500 rounded-full ml-1"></span>}

                              {/* Espace pour pousser le point noir a droite */}
                              <div className="flex-1"></div>

                              {/* +point noir pour rendezvous */}
                              {rendezVousDates.includes(format(day, "yyyy-MM-dd")) && (
                                <span className="w-2 h-2 bg-black rounded-full mr-1"></span>
                              )}
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  ),
                )}
              </div>
            </div>
          ),
        )}
        {treatments.length === 0 && (
          <div className="text-center py-4 text-gray-500 text-sm border-t border-gray-100">
            Ajoutez une session pour voir les traitements programmés
          </div>
        )}
      </div>

      {/* Modal d'ajout de note */}
      {isNoteModalOpen && selectedDayForNote && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-96 max-w-[90vw]">
            <div className="flex justify-between items-center border-b border-gray-200 p-4">
              <h3 className="text-lg font-semibold text-gray-800">Ajouter une note</h3>
              <button onClick={handleCloseNoteModal} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="p-4">
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">
                  Date sélectionnée : <strong>{format(selectedDayForNote, "dd/MM/yyyy")}</strong>
                </p>
                <textarea
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Saisissez votre note..."
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  rows={4}
                  autoFocus
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  onClick={handleCloseNoteModal}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={handleAddNote}
                  disabled={!noteText.trim()}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    noteText.trim()
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Ajouter la note
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal des effets secondaires */}
      {isSideEffectModalOpen && (
        <ModalEffetsSecondaires
          open={isSideEffectModalOpen}
          setOpenModal={setIsSideEffectModalOpen}
          selectedDay={selectedDay}
          onSubmit={handleEffectsSubmit}
        />
      )}

      {/* Modal d'informations du jour */}
      {dayInfoModalOpen && selectedDayInfo && (
        <div
          ref={dayInfoModalRef}
          className="fixed bg-white border border-gray-200 rounded-md shadow-lg z-50 w-80 max-h-[400px] overflow-y-auto"
          style={{
            top: "10px",
            left: "50%",
            transform: "translateX(-50%)",
            maxWidth: "calc(100vw - 20px)",
          }}
        >
          <div className="flex justify-between items-center border-b border-gray-200 p-3">
            <h3 className="font-medium text-gray-800">
              {format(selectedDayInfo.date, "dd MMMM yyyy", { locale: fr })}
            </h3>
            <button onClick={() => setDayInfoModalOpen(false)} className="text-gray-400 hover:text-gray-600">
              <X size={18} />
            </button>
          </div>

          <div className="p-4">
            {/* Informations sur le traitement */}
            {selectedDayInfo.treatmentInfo.hasTreatment && (
              <div className="mb-4">
                <h4 className="font-medium text-gray-700 mb-1">Traitement</h4>
                <div className="bg-gray-50 p-2 rounded text-sm">
                  <p>
                    <span className="font-medium">Session:</span> {selectedDayInfo.treatmentInfo.sessionNumber}
                  </p>
                  <p>
                    <span className="font-medium">Traitement:</span> {selectedDayInfo.treatmentInfo.treatment}
                  </p>
                  <p>
                    <span className="font-medium">Durée:</span> {selectedDayInfo.treatmentInfo.daysCount} jours
                  </p>

                  {/* Afficher l'information de suspension si applicable */}
                  {selectedDayInfo.isSuspended && (
                    <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded">
                      <p className="text-yellow-800 font-medium">Traitement suspendu</p>
                      {selectedDayInfo.suspension && selectedDayInfo.suspension.note && (
                        <p className="text-yellow-700 text-xs mt-1">Note: {selectedDayInfo.suspension.note}</p>
                      )}
                      {isAgendaEditable &&
                        selectedDayInfo.suspension &&
                        canCancelSuspension(selectedDayInfo.suspension) && (
                          <button
                            onClick={() => handleCancelSuspension(selectedDayInfo.suspension)}
                            className="mt-2 flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800"
                          >
                            <RefreshCw size={12} /> Annuler la suspension
                          </button>
                        )}
                      {selectedDayInfo.suspension && !canCancelSuspension(selectedDayInfo.suspension) && (
                        <p className="text-yellow-600 text-xs mt-1 italic">Suspension passée - impossible à annuler</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Rendez-vous */}
            <div className="mb-4">
              <h4 className="font-medium text-gray-700 mb-1">Rendez-vous</h4>
              {selectedDayInfo.hasAppointment ? (
                <div className="bg-gray-50 p-2 rounded text-sm flex justify-between items-center">
                  <span>Rendez-vous programmé</span>
                  {isAgendaEditable && (
                    <button
                      onClick={() => handleDeleteAppointment(selectedDayInfo.dateStr)}
                      className="text-red-500 hover:text-red-700"
                      title="Supprimer ce rendez-vous"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ) : (
                <p className="text-sm text-gray-500 italic">Aucun rendez-vous</p>
              )}
            </div>

            {/* Notes */}
            <div className="mb-4">
              <h4 className="font-medium text-gray-700 mb-1">Notes</h4>
              {selectedDayInfo.notes && selectedDayInfo.notes.length > 0 ? (
                <ul className="space-y-2">
                  {selectedDayInfo.notes.map((note, index) => (
                    <li key={index} className="bg-gray-50 p-2 rounded text-sm flex justify-between items-start">
                      <span>{note.text}</span>
                      {isAgendaEditable && (
                        <button
                          onClick={() => handleDeleteNote(note)}
                          className="text-red-500 hover:text-red-700 ml-2 mt-0.5"
                          title="Supprimer cette note"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500 italic">Aucune note</p>
              )}
            </div>

            {/* Effets secondaires */}
            <div className="mb-2">
              <h4 className="font-medium text-gray-700 mb-1">Effets secondaires</h4>
              {selectedDayInfo.effects && selectedDayInfo.effects.length > 0 ? (
                <ul className="space-y-2">
                  {selectedDayInfo.effects.map((effect, index) => (
                    <li key={index} className="bg-gray-50 p-2 rounded text-sm flex justify-between items-start">
                      <div>
                        <p>
                          <span className="font-medium">Effet:</span> {effect.nom}
                        </p>
                        {effect.dateDebut && (
                          <p>
                            <span className="font-medium">Date début:</span> {effect.dateDebut}
                          </p>
                        )}
                        {effect.nbJours && effect.nbJours > 1 && (
                          <p>
                            <span className="font-medium">Durée:</span> {effect.nbJours} jour(s)
                          </p>
                        )}
                      </div>
                      {isAgendaEditable && (
                        <button
                          onClick={() => handleDeleteEffect(effect)}
                          className="text-red-500 hover:text-red-700 ml-2 mt-0.5"
                          title="Supprimer cet effet secondaire"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500 italic">Aucun effet secondaire</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Section des notes existantes */}
      {notes.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-700">Notes de la session</h3>
          <ul className="space-y-2">
            {notes.map((note, index) => (
              <li key={index} className="bg-gray-100 p-2 rounded text-sm text-gray-800">
                <strong>
                  {note.date instanceof Date
                    ? format(note.date, "dd/MM/yyyy")
                    : format(new Date(note.date), "dd/MM/yyyy")}
                  :
                </strong>{" "}
                {note.text}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Enregistrer ou mettre à jour */}
      <div className="mt-6 text-right">
        <button
          onClick={saveOrUpdateSession}
          disabled={!isAgendaEditable}
          className={`font-semibold py-2 px-4 rounded shadow flex items-center gap-1 ml-auto ${
            !isAgendaEditable
              ? "bg-gray-400 text-gray-600 cursor-not-allowed"
              : currentActiveSession
                ? "bg-orange-600 hover:bg-orange-700 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {currentActiveSession ? "Mettre à jour la session" : "Enregistrer la session"}
        </button>
      </div>

      {/* Menu contextuel */}
      {contextMenuPosition && isAgendaEditable && (
        <div
          ref={contextMenuRef}
          className="fixed bg-white border border-gray-200 rounded-md shadow-lg z-50 text-sm"
          style={{
            top: contextMenuPosition.y,
            left: contextMenuPosition.x,
            width: "150px",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => handleMenuAction("suspend")}
            disabled={selectedDay && isDayInPast(selectedDay.day)}
            className={`flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left ${
              selectedDay && isDayInPast(selectedDay.day) ? "opacity-50 cursor-not-allowed text-gray-400" : ""
            }`}
            title={
              selectedDay && isDayInPast(selectedDay.day)
                ? "Impossible de suspendre un traitement dans le passé"
                : "Suspendre le traitement"
            }
          >
            <PauseCircle size={16} /> Suspendre
          </button>
          <button
            onClick={() => handleMenuAction("note")}
            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left"
          >
            <StickyNote size={16} className="text-yellow-600" /> Ajouter une note
          </button>

          {selectedDay && selectedDay.day <= new Date() && (
            <button
              onClick={() => handleMenuAction("side_effect")}
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left"
            >
              <AlertCircle size={16} className="text-red-600" /> Effet secondaire
            </button>
          )}
          <button
            onClick={() => handleMenuAction("rendez_vous")}
            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left"
          >
            <CalendarPlus size={14} className="text-blue-600" /> Ajouter un rendez-vous
          </button>
        </div>
      )}
      <ToastContainer />
    </div>
  )
}

export default Agenda
