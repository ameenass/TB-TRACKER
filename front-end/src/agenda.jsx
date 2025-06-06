import { Info, Plus, AlertCircle, PauseCircle, StickyNote, CalendarPlus } from "lucide-react"
import { format, isSameDay, getDay, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns"
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
}) {
  const [selectedDay, setSelectedDay] = useState(null)
  const [contextMenuPosition, setContextMenuPosition] = useState(null)
  const [isSideEffectModalOpen, setIsSideEffectModalOpen] = useState(false)

  const [noteInputVisible, setNoteInputVisible] = useState(false)
  const [noteText, setNoteText] = useState("")
  const [notes, setNotes] = useState([])
  const [effects, setEffects] = useState([])

  // Gestion des sessions fermées (dropdown)
  const [expandedClosedSessions, setExpandedClosedSessions] = useState(new Set())

  const [rendezVousDates, setRendezVousDates] = useState([])
  const [isSessionClosed, setIsSessionClosed] = useState(false)
  const [statut, setStatut] = useState(() => {
    const sessionData = localStorage.getItem("sessionTempData")
    const initialStatut = sessionData ? JSON.parse(sessionData).statut !== false : false
    console.log("Initial statut from localStorage:", initialStatut)
    return initialStatut
  })

  const [currentActiveSession, setCurrentActiveSession] = useState(null)

  
  const generateSixMonths = () => {
    const months = []
    const currentDate = new Date()

    for (let i = 0; i < 24; i++) {  //24 months pour le moment 
      const monthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + i, 1)
      const year = monthDate.getFullYear()
      const month = monthDate.getMonth()

      const start = startOfMonth(monthDate)
      const end = endOfMonth(monthDate)
      const days = eachDayOfInterval({ start, end })

      months.push({
        monthKey: `${year}-${month}`,
        name: monthDate.toLocaleDateString("fr-FR", { month: "long" }),
        year: year,
        days: days,
      })
    }

    return months
  }

  const displayMonths = generateSixMonths()
  const contextMenuRef = useRef(null)
  const { id: idfich } = useParams()
  const [sessions, setSessions] = useState([])

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

            // Charger les données de la session active
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

  // Fonction pour charger les données de la session active
  const loadActiveSessionData = (activeSession) => {
    console.log("Loading active session data:", activeSession)

    // Charger les notes existantes
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

    // chargement des effets secondaires existants
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

    // Charger les rendez-vous existants
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

    // Charger les suspensions existantes
    if (activeSession.suspensions && Array.isArray(activeSession.suspensions)) {
      console.log("Suspensions loaded:", activeSession.suspensions)
    }
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (contextMenuRef.current && !contextMenuRef.current.contains(event.target)) {
        setContextMenuPosition(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleCloseSession = async () => {
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

      // Reset des données locales
      setNotes([])
      setEffects([])
      setRendezVousDates([])

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
// a retirer
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
      setState([
        {
          startDate: day,
          endDate: day,
          key: "selection",
        },
      ])
      openModal("add", treatmentInfo)
    }
  }

  const handleOptionClick = (action) => {
    if (!selectedDay) return

    if (action === "suspend") {
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
      setNoteInputVisible(true)
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

  // soumission des effets secondaires depuis le modal
  const handleEffectsSubmit = (effectsData) => {
    console.log("Effects received from modal:", effectsData)
    setEffects((prev) => [...prev, ...effectsData.effetsSignales])
    setIsSideEffectModalOpen(false)
    toast.success("Effet secondaire ajouté avec succès !", {
      position: "top-right",
      autoClose: 2000,
    })
  }

  // Fonction modifiée pour sauvegarder ou mettre à jour la session
  const saveOrUpdateSession = async () => {
    const sessionId = localStorage.getItem("currentSessionId")
    const isUpdatingExistingSession = sessionId && currentActiveSession

    if (isUpdatingExistingSession) {
      // Mise à jour d'une session existante
      await updateExistingSession(sessionId)
    } else {
      // création d'une nvl session
      await saveNewSession()
    }
  }

  // mettre a jour une session existante
  const updateExistingSession = async (sessionId) => {
    const updateData = {
      rendezVous: rendezVousDates,
      notes: notes.map((note) => ({
        text: note.text,
        date: format(note.date, "yyyy-MM-dd"),
      })),
      effetsSignales: effects,
      suspensions: suspensions.map((susp) => ({
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

      // Recharger les données de la session
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

  // Fonction pour sauvegarder une nouvelle session
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
        date: format(note.date, "yyyy-MM-dd"),
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

      // Mettre à jour l'état de la session active
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

  return (
    <div className="p-4 relative">
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
                <p>• Cliquez sur un jour actif pour accéder aux options</p>
              </div>
            )}
          </div>
        </div>
        {/* Boutons de gestion de session */}
        <div className="flex gap-2">
          <button
            onClick={handleAddSession}
            className="text-white font-semibold py-2 px-4 rounded shadow flex items-center gap-1"
            style={{
              backgroundColor: "oklch(76.5% 0.177 163.223)",
              "&:hover": { backgroundColor: "oklch(55% 0.118 184.704)" },
            }}
          >
            <Plus size={18} />
            Session
          </button>
          <button
            onClick={handleCloseSession}
            disabled={!statut}
            className={`font-semibold py-2 px-4 rounded shadow flex items-center gap-1 transition-all duration-200 ${
              !statut
                ? "bg-gray-400 text-gray-600 cursor-not-allowed hover:bg-gray-400"
                : "bg-red-500 hover:bg-red-700 text-white"
            }`}
            title={statut ? "Clôturer la session active" : "Aucune session active à clôturer"}
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
              Session active en cours - Vous pouvez ajouter des modifications
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
            <span className="text-xs text-gray-500">Jours inactifs/hors période</span>
          </div>
        </div>
      )}

      {/* Sessions en lignes */}
      <div className="max-h-[calc(100vh-200px)] overflow-y-auto border border-gray-200 rounded-lg shadow-sm">
        <div className="relative">
          {displayMonths.map((month) => (
            <div key={month.monthKey} className="flex border-gray-200 last:border-b-0">
              <div className="w-16 py-2 pr-0 font-medium text-gray-700 text-right sticky left-0 bg-white">
                {month.name} <span className="text-xs text-gray-500">{month.year}</span>
              </div>

              <div className="flex-1 py-2 pl-2">
                <div className="flex flex-wrap">
                  {/* Jours vides pour alignement */}
                  {Array.from({
                    length: getDay(month.days[0]) === 0 ? 6 : getDay(month.days[0]) - 1,
                  }).map((_, i) => (
                    <div key={`empty-${i}`} className="w-8 h-12 m-[1px] invisible"></div>
                  ))}

                  {/* Jours du mois */}
                  {month.days.map((day, i) => {
                    const treatmentInfo = getTreatmentInfo ? getTreatmentInfo(day) : { hasTreatment: false }
                    const isToday = isSameDay(day, new Date())
                    const dayName = format(day, "EEE", { locale: fr }).substring(0, 1).toUpperCase()

                    let bgColor = "white"
                    let textColor = "inherit"
                    let dayNameColor = "text-gray-400"
                    const ringColor = isToday ? "ring-2 ring-green-500" : ""

                    if (treatmentInfo.hasTreatment) {
                      if (treatmentInfo.isOverridden) {
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
                        key={i}
                        onClick={(event) => handleDayClick(day, treatmentInfo, event)}
                        onContextMenu={(event) => handleDayClick(day, treatmentInfo, event)}
                        className={`w-8 h-12 flex flex-col items-center justify-start pt-1 m-[1px] rounded-md text-xs font-medium hover:bg-gray-100 transition-colors ${treatmentInfo.hasOverlap ? "ring-1 ring-white" : ""} ${ringColor}`}
                        style={{ backgroundColor: bgColor, color: textColor }}
                        title={
                          treatmentInfo.hasTreatment
                            ? `${treatmentInfo.name} - ${treatmentInfo.treatment} (${treatmentInfo.daysCount} jours)` +
                              (treatmentInfo.isOverridden
                                ? ` - Remplacé par Session ${treatmentInfo.sessionNumber}`
                                : treatmentInfo.hasOverlap
                                  ? " - Chevauche d'autres sessions"
                                  : "")
                            : `${format(day, "dd/MM/yyyy")} - Aucun traitement programmé`
                        }
                      >
                        <span className={`text-[9px] font-medium ${dayNameColor} mb-1`}>{dayName}</span>
                        <span className="text-sm">{day.getDate()}</span>

                        
                        {/* {rendezVousDates.includes(format(day, "yyyy-MM-dd")) && (
                          <span className="w-3 h-3 bg-black rounded-full mt-auto ml-auto mr-1 mb-1"></span>
                        )} */}

                        <div className="flex justify-between items-end w-full mt-auto mb-1">
  {/* Point rouge pour effets secondaires (cote gauche) */}
  {effects.some(effect => {
    const effectDate = typeof effect.dateDebut === 'string' 
      ? effect.dateDebut 
      : format(new Date(effect.dateDebut), "yyyy-MM-dd");
    return effectDate === format(day, "yyyy-MM-dd");
  }) && (
    <span className="w-2 h-2 bg-red-500 rounded-full ml-1"></span>
  )}
  
  {/* Espace pour pousser le point noir à droite */}
  <div className="flex-1"></div>
  
  {/* Point noir pour rendez-vous (cote droit) */}
  {rendezVousDates.includes(format(day, "yyyy-MM-dd")) && (
    <span className="w-2 h-2 bg-black rounded-full mr-1"></span>
  )}
</div>
                        
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          ))}
          {treatments.length === 0 && (
            <div className="text-center py-4 text-gray-500 text-sm border-t border-gray-100">
              Ajoutez une session pour voir les traitements programmés
            </div>
          )}
        </div>
      </div>

      {/* Modal des effets secondaires */}
      {isSideEffectModalOpen && (
        <ModalEffetsSecondaires
          open={isSideEffectModalOpen}
          setOpenModal={setIsSideEffectModalOpen}
          selectedDay={selectedDay}
          onSubmit={handleEffectsSubmit}
        />
      )}

      {/* Section des notes */}
      {noteInputVisible && selectedDay && (
        <div className="mt-4 p-4 border-t border-gray-200">
          <div className="mb-2 text-sm text-gray-700">
            Ajouter une note pour le <strong>{format(selectedDay.day, "dd/MM/yyyy")}</strong> :
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              className="border px-2 py-1 rounded w-full"
              placeholder="Votre note..."
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
            />
            <button
              onClick={() => {
                if (!noteText.trim()) return
                setNotes((prev) => [
                  ...prev,
                  {
                    text: noteText,
                    date: selectedDay.day,
                  },
                ])
                setNoteText("")
                setNoteInputVisible(false)
                setSelectedDay(null)
                toast.success("Note ajoutée avec succès !", {
                  position: "top-right",
                  autoClose: 2000,
                })
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
            >
              Valider
            </button>
          </div>
        </div>
      )}

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

      {/* enregisterer ou mettre */}
      <div className="mt-6 text-right">
        <button
          onClick={saveOrUpdateSession}
          className={`font-semibold py-2 px-4 rounded shadow flex items-center gap-1 ml-auto ${
            currentActiveSession
              ? "bg-orange-600 hover:bg-orange-700 text-white"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {currentActiveSession ? "Mettre à jour la session" : "Enregistrer la session"}
        </button>
      </div>

      {/* Menu contextuel */}
      {contextMenuPosition && (
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
            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left"
          >
            <PauseCircle size={16} /> Suspendre
          </button>
          <button
            onClick={() => handleMenuAction("note")}
            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left"
          >
            <StickyNote size={16} className="text-yellow-600" /> Ajouter une note
          </button>

          <button
            onClick={() => handleMenuAction("side_effect")}
            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left"
          >
            <AlertCircle size={16} className="text-red-600" /> Effet secondaire
          </button>
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
