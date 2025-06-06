import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ChevronDown, ChevronRight, HeartPulse, UserCircle2 } from "lucide-react"
import {
  format,
  addDays,
  isBefore,
  isAfter,
  isSameDay,
  differenceInCalendarDays,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getMonth,
  getYear,
} from "date-fns"
import { fr } from "date-fns/locale"
import Agenda from "./Agenda"
import SessionCreationModal from "./SessionCreationModal"
import { XCircle } from "lucide-react"

function ProfilePatient() {
  const { id } = useParams()

  const [fiche, setFiche] = useState(null)
  const [patient, setPatient] = useState(null)
  const [expandedSection, setExpandedSection] = useState(null)

  const treatmentColors = {
    RHZ: "#f87171",
    RHZE: "#60a5fa",
    RH: "#facc15",
    R: "#c084fc",
    H: "#fb923c",
    Z: "#34d399",
    E: "#f472b6",
    S: "#94a3b8",
  }

  const [selectedTreatment, setSelectedTreatment] = useState("RHZ")
  const [state, setState] = useState([{ startDate: new Date(), endDate: addDays(new Date(), 6), key: "selection" }])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState("add")
  const [selectedSession, setSelectedSession] = useState(null)
  const [deletionNote, setDeletionNote] = useState("")

  const [treatments, setTreatments] = useState([])
  const [agendaMonths, setAgendaMonths] = useState([])
  const [sessionCounter, setSessionCounter] = useState(1)
  const [treatmentBoundaries, setTreatmentBoundaries] = useState({ earliestDate: null, latestDate: null })
  const [showInfoTooltip, setShowInfoTooltip] = useState(false)
  const [activeDaysCount, setActiveDaysCount] = useState({})
  const [menuOuvert, setMenuOuvert] = useState()
  const [sessionNotes, setSessionNotes] = useState({})

  // État pour stocker les suspensions
  const [suspensions, setSuspensions] = useState([])

  const getSelectedDaysCount = () => {
    if (!state[0].startDate || !state[0].endDate) return 0
    return differenceInCalendarDays(state[0].endDate, state[0].startDate) + 1
  }

  const openModal = (mode = "add", sessionInfo = null) => {
    setModalMode(mode)
    setSelectedSession(sessionInfo)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setModalMode("add")
    setSelectedSession(null)
    setDeletionNote("")
  }

  const handleSessionClosed = (sessionId) => {
    console.log("Session closed, updating treatments:", sessionId)

    const updatedTreatments = treatments.map((treatment) => {
      if (treatment.isActive) {
        return {
          ...treatment,
          isActive: false,
          isClosed: true,
        }
      }
      return treatment
    })

    setTreatments(updatedTreatments)
    console.log("Treatments updated after session closure")
  }

  const handleSessionsFetched = (sessionsData) => {
    console.log("Converting sessions to treatments:", sessionsData)

    const convertedTreatments = sessionsData.map((session, index) => {
      const startDate = new Date(session.dateDebut)
      const endDate = new Date(session.dateFin)
      const days = []

      for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
        days.push(new Date(d))
      }

      return {
        dates: days,
        treatment: session.traitement,
        color: treatmentColors[session.traitement] || "#90cdf4",
        sessionNumber: session.sessionNumber || index + 1,
        daysCount: days.length,
        timestamp: new Date(session.dateDebut).getTime(),
        isActive: session.statut === true,
        isClosed: session.statut === false,
      }
    })

    console.log("Converted treatments:", convertedTreatments)

    setTreatments(convertedTreatments)
    setTreatmentBoundaries(calculateTreatmentBoundaries(convertedTreatments))
    setActiveDaysCount(calculateActiveDaysCount(convertedTreatments))
    setAgendaMonths(generateAgendaMonths(convertedTreatments))

    if (convertedTreatments.length > 0) {
      const maxSessionNumber = Math.max(...convertedTreatments.map((t) => t.sessionNumber || 0))
      setSessionCounter(maxSessionNumber + 1)
    }
  }

  const calculateTreatmentBoundaries = (list) => {
    const allDates = list.flatMap((t) => t.dates)
    if (!allDates.length) return { earliestDate: null, latestDate: null }
    return {
      earliestDate: allDates.reduce((a, b) => (isBefore(b, a) ? b : a), allDates[0]),
      latestDate: allDates.reduce((a, b) => (isAfter(b, a) ? b : a), allDates[0]),
    }
  }

  const calculateActiveDaysCount = (list) => {
    const claimed = new Set()
    const sorted = [...list].sort((a, b) => b.timestamp - a.timestamp)
    const active = {}
    sorted.forEach((t) => {
      let count = 0
      t.dates.forEach((d) => {
        const str = d.toISOString().split("T")[0]
        if (!claimed.has(str)) {
          claimed.add(str)
          count++
        }
      })
      active[t.sessionNumber] = count
    })
    return active
  }

  const generateAgendaMonths = (list) => {
    const allDates = list.flatMap((t) => t.dates)
    const uniqueMonths = {}
    allDates.forEach((date) => {
      const key = `${getYear(date)}-${getMonth(date)}`
      if (!uniqueMonths[key]) {
        const start = startOfMonth(date)
        const end = endOfMonth(date)
        uniqueMonths[key] = {
          name: format(start, "MMM", { locale: fr }),
          year: format(start, "yyyy"),
          days: eachDayOfInterval({ start, end }),
          monthKey: key,
        }
      }
    })
    return Object.values(uniqueMonths).sort((a, b) => {
      const [yearA, monthA] = a.monthKey.split("-").map(Number)
      const [yearB, monthB] = b.monthKey.split("-").map(Number)

      return yearA === yearB ? monthA - monthB : yearA - yearB
    })
  }

  const [activeSessionNumber, setActiveSessionNumber] = useState(null)

  const handleSave = () => {
    const start = state[0].startDate
    const end = state[0].endDate
    const days = differenceInCalendarDays(end, start) + 1
    const dates = Array.from({ length: days }, (_, i) => addDays(start, i))

    const newTreatment = {
      dates,
      treatment: selectedTreatment,
      color: treatmentColors[selectedTreatment],
      sessionNumber: sessionCounter,
      daysCount: days,
      timestamp: Date.now(),
      isActive: true,
    }

    const updated = [...treatments, newTreatment]

    setTreatments(updated)
    setActiveSessionNumber(sessionCounter)
    setSessionCounter((s) => s + 1)
    setTreatmentBoundaries(calculateTreatmentBoundaries(updated))
    setActiveDaysCount(calculateActiveDaysCount(updated))
    setAgendaMonths(generateAgendaMonths(updated))

    const sessionInfo = {
      traitement: selectedTreatment,
      dateDebut: start.toISOString(),
      dateFin: end.toISOString(),
      sessionNumber: sessionCounter,
      isActive: true,
      statut: true,
    }
    localStorage.setItem("sessionTempData", JSON.stringify(sessionInfo))

    closeModal()
  }

  // Fonction modifiée pour gérer les suspensions
  const handleDelete = () => {
    if (!selectedSession) return

    const start = new Date(state[0].startDate)
    const end = new Date(state[0].endDate)

    // Ajouter cette suspension à la liste avec le bon format
    setSuspensions((prev) => [
      ...prev,
      {
        startDate: start,
        endDate: end,
        note: deletionNote || "",
        sessionNumber: selectedSession.sessionNumber,
        treatment: selectedSession.treatment,
      },
    ])

    console.log("Suspension ajoutée:", {
      startDate: start,
      endDate: end,
      note: deletionNote,
      sessionNumber: selectedSession.sessionNumber,
    })

    const updated = treatments
      .map((t) => {
        if (t.sessionNumber === selectedSession.sessionNumber) {
          const filteredDates = t.dates.filter((d) => d < start || d > end)
          if (deletionNote.trim()) {
            const noteKey = `session_${t.sessionNumber}_deletion_${Date.now()}`
            setSessionNotes((prev) => ({
              ...prev,
              [noteKey]: {
                sessionNumber: t.sessionNumber,
                date: new Date(),
                note: deletionNote,
                deletedRange: `${format(start, "dd/MM/yyyy")} - ${format(end, "dd/MM/yyyy")}`,
                treatment: t.treatment,
              },
            }))
          }
          return { ...t, dates: filteredDates, daysCount: filteredDates.length }
        }
        return t
      })
      .filter((t) => t.dates.length > 0)

    setTreatments(updated)
    setTreatmentBoundaries(calculateTreatmentBoundaries(updated))
    setActiveDaysCount(calculateActiveDaysCount(updated))
    setAgendaMonths(generateAgendaMonths(updated))
    closeModal()
  }

  const getTreatmentInfo = (date, specificSessionNumber = null) => {
    if (treatmentBoundaries.earliestDate && treatmentBoundaries.latestDate) {
      if (isBefore(date, treatmentBoundaries.earliestDate) || isAfter(date, treatmentBoundaries.latestDate)) {
        return { hasTreatment: false, isOutsideTreatmentPeriod: true }
      }
    }

    const matches = treatments.filter((t) => t.dates.some((d) => isSameDay(d, date)))
    if (matches.length > 0) {
      if (specificSessionNumber !== null) {
        const sessionMatch = matches.find((t) => t.sessionNumber === specificSessionNumber)
        if (sessionMatch) {
          return {
            hasTreatment: true,
            color: sessionMatch.color,
            name: `Session ${sessionMatch.sessionNumber}`,
            daysCount: sessionMatch.daysCount,
            isOutsideTreatmentPeriod: false,
            sessionNumber: sessionMatch.sessionNumber,
            treatment: sessionMatch.treatment,
            hasOverlap: matches.length > 1,
            isOverridden: false,
            overriddenSessionNumber: null,
            allTreatments: matches,
            isActive: sessionMatch.isActive,
            isClosed: sessionMatch.isClosed || false,
          }
        } else {
          return { hasTreatment: false, isOutsideTreatmentPeriod: false }
        }
      }

      matches.sort((a, b) => b.timestamp - a.timestamp)
      const recent = matches[0]
      const isOverridden = matches.length > 1 && recent.timestamp > matches[1].timestamp
      return {
        hasTreatment: true,
        color: recent.color,
        name: `Session ${recent.sessionNumber}`,
        daysCount: recent.daysCount,
        isOutsideTreatmentPeriod: false,
        sessionNumber: recent.sessionNumber,
        treatment: recent.treatment,
        hasOverlap: matches.length > 1,
        isOverridden,
        overriddenSessionNumber: isOverridden ? matches[1].sessionNumber : null,
        allTreatments: matches,
        isActive: recent.isActive,
        isClosed: recent.isClosed || false,
      }
    }

    return { hasTreatment: false, isOutsideTreatmentPeriod: false }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resFiche = await fetch(`http://localhost:5000/fiches/${id}`)
        const dataFiche = await resFiche.json()
        setFiche(dataFiche)

        localStorage.setItem("idfich", dataFiche._id)

        if (dataFiche?.IDPatient) {
          const resPatient = await fetch(`http://localhost:5000/patients/${dataFiche.IDPatient}`)
          const dataPatient = await resPatient.json()
          setPatient(dataPatient)
        }
      } catch (err) {
        console.error("Erreur:", err)
      }
    }
    fetchData()
    setAgendaMonths(generateAgendaMonths([]))
  }, [id])

  const toggleSection = (key) => {
    setExpandedSection((prev) => (prev === key ? null : key))
  }

  const handleClotureClick = async (nouveauStatut) => {
    try {
      const response = await fetch(`http://localhost:5000/fiches/${fiche.idfich}/statut`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ statut: nouveauStatut }),
      })

      if (response.ok) {
        console.log("Statut mis à jour avec succès !")
        setMenuOuvert(false)
      } else {
        console.error("Erreur lors de la mise à jour du statut")
      }
    } catch (error) {
      console.error("Erreur réseau :", error)
    }
  }

  if (!fiche || !patient) return <div className="p-5">Chargement...</div>

  return (
    <div className="pt-6 w-full min-h-screen bg-white p-2">
      <div className="grid grid-cols-[300px_1fr] gap-0 min-h-screen">
        {/* LEFT PANEL */}
        <div className="w-full h-full bg-white shadow-md overflow-hidden rounded-r-lg">
          <div className="bg-green-100 p-4 flex items-center">
            <div className="w-15 h-15 bg-gray-200 rounded-full flex items-center justify-center border-4 border-white">
              <span className="text-gray-400 text-4xl">{patient.nom?.charAt(0)}</span>
            </div>
            <div className="ml-6">
              <h1 className="text-xl font-bold text-green-800">
                {patient.nom} {patient.prenom}
              </h1>
              <div className="flex items-center mt-1 space-x-3">
                <span className="bg-white text-green-800 px-2 py-1 text-xs font-semibold rounded-full">Création</span>
                
              </div>
            </div>
          </div>

          {/* Sections */}
          <div className="divide-y divide-gray-200">
            {/* GENERAL */}
            <div>
              <div className="cursor-pointer hover:bg-green-50" onClick={() => toggleSection("generalInfo")}>
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3 text-gray-700">
                    <UserCircle2 className="text-green-600 h-5 w-5" />
                    <h3 className="font-medium">Informations Générales</h3>
                  </div>
                  {expandedSection === "generalInfo" ? <ChevronDown /> : <ChevronRight />}
                </div>
              </div>
              {expandedSection === "generalInfo" && (
                <div className="px-4 pb-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Genre</span>
                      <span className="text-gray-800">{patient.sexe}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date de naissance</span>
                      <span className="text-gray-800">{patient.DateNaissance}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Adresse</span>
                      <span className="text-gray-800">
                        {patient.adresse?.commune} {patient.adresse?.wilaya}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Informations Medicales */}
            <div>
              <div className="group cursor-pointer hover:bg-green-50" onClick={() => toggleSection("medicalInfo")}>
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3 text-gray-700">
                    <HeartPulse className="text-green-600 h-5 w-5" />
                    <h3 className="font-medium">Informations Médicales</h3>
                  </div>
                  {expandedSection === "medicalInfo" ? <ChevronDown /> : <ChevronRight />}
                </div>
              </div>
              {expandedSection === "medicalInfo" && (
                <div className="px-4 pb-4 animate-slideDown space-y-4">
                  <div className="border p-4 rounded shadow">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Categorie</span>
                        <span className="text-gray-800">{fiche.categorie}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Preuve</span>
                        <span className="text-gray-800">{fiche.preuve}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Type TB</span>
                        <span className="text-gray-800">{fiche.selectedSousType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Comptage tuberculeux</span>
                        <span className="text-gray-800">{fiche.Comptage_tuberculeux}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Antecedents</span>
                        <span className="text-gray-800">{fiche.antecedents}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Poids</span>
                        <span className="text-gray-800">{fiche.poidsInitial}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Détails supplémentaires</span>
                        <span className="text-gray-800">{fiche.note}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Cloturer la fiche */}
            <div className="p-4 border-t border-gray-200">
              <div className="relative">
                <button
                  onClick={() => setMenuOuvert(!menuOuvert)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-all shadow-md hover:shadow-lg active:scale-95"
                >
                  <XCircle className="h-5 w-5" />
                  Clôturer la fiche
                </button>

                {/* Menu de cloture */}
                {menuOuvert && (
                  <div className="absolute left-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden">
                    <button
                      onClick={() => handleClotureClick("cloturée")}
                      className="w-full text-left px-4 py-3 hover:bg-red-50 text-gray-700 hover:text-red-600 transition-colors"
                    >
                      Clôturer seulement
                    </button>
                    <button
                      onClick={() => handleClotureClick("perdu")}
                      className="w-full text-left px-4 py-3 hover:bg-red-50 text-gray-700 hover:text-red-600 transition-colors"
                    >
                      Perdu de vue
                    </button>
                    <button
                      onClick={() => handleClotureClick("décès")}
                      className="w-full text-left px-4 py-3 hover:bg-red-50 text-gray-700 hover:text-red-600 transition-colors"
                    >
                      Décès
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT AGENDA PANEL */}
        <Agenda
          treatments={treatments}
          activeDaysCount={activeDaysCount}
          agendaMonths={agendaMonths}
          getTreatmentInfo={getTreatmentInfo}
          setState={setState}
          openModal={openModal}
          showInfoTooltip={showInfoTooltip}
          setShowInfoTooltip={setShowInfoTooltip}
          onSessionsFetched={handleSessionsFetched}
          onSessionClosed={handleSessionClosed}
          suspensions={suspensions}
          setSuspensions={setSuspensions}
        />
      </div>

      {/* MODAL */}
      <SessionCreationModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        modalMode={modalMode}
        treatmentColors={treatmentColors}
        selectedTreatment={selectedTreatment}
        setSelectedTreatment={setSelectedTreatment}
        state={state}
        setState={setState}
        handleSave={handleSave}
        handleDelete={handleDelete}
        getSelectedDaysCount={getSelectedDaysCount}
        selectedSession={selectedSession}
        deletionNote={deletionNote}
        setDeletionNote={setDeletionNote}
      />
    </div>
  )
}

export default ProfilePatient
