import { useState, useEffect, useRef } from "react"
import {
  format,
  isSameDay,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  parseISO,
  startOfDay,
  addMonths,
  subMonths,
} from "date-fns"
import { fr } from "date-fns/locale"
import { ChevronLeft, ChevronRight, CalendarIcon, Clock, X, Pill } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function Agendap() {
  const [sessions, setSessions] = useState([])
  const [currentDate, setCurrentDate] = useState(new Date())
  const [months, setMonths] = useState([])
  const [hoveredDay, setHoveredDay] = useState(null)
  const [nextAppointment, setNextAppointment] = useState(null)
  const calendarRef = useRef(null)
  const navigate = useNavigate()
  const [selectedDayDetails, setSelectedDayDetails] = useState(null)
  const [isDayMenuOpen, setIsDayMenuOpen] = useState(false)
  const [displayMonths, setDisplayMonths] = useState([])
  const [rendezVousDates, setRendezVousDates] = useState([])

  const medicationMap = {
    R: "Rifampicine",
    H: "Isoniazide",
    P: "Pyrazinamide",
    Z: "Pyrazinamide",
    E: "Ethambutol",
    S: "Streptomycin",
    RHZ: "Rifampicine, Isoniazide, Pyrazinamide",
    RHZE: "Rifampicine, Isoniazide, Pyrazinamide, Ethambutol",
    RH: "Rifampicine, Isoniazide",
  }

  const treatmentColors = {
    RHZ: "#f87171",
    RHZE: "#60a5fa",
    RH: "#facc15",
    R: "#c084fc",
    H: "#fb923c",
    Z: "#34d399",
    E: "#f472b6",
    S: "#a78bfa",
  }

  // Generate months in the format similar to the doctor's agenda
  const generateSixMonths = () => {
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

  const generateMonths = (startDate = new Date(), count = 12) => {
    return Array.from({ length: count }, (_, i) => {
      const monthDate = addMonths(startDate, i)
      const start = startOfMonth(monthDate)
      const end = endOfMonth(monthDate)
      return {
        monthKey: `${monthDate.getFullYear()}-${monthDate.getMonth()}`,
        name: format(monthDate, "MMMM", { locale: fr }),
        year: monthDate.getFullYear(),
        month: monthDate.getMonth(),
        days: eachDayOfInterval({ start, end }),
        date: monthDate,
      }
    })
  }

  useEffect(() => {
    const storedSessions = localStorage.getItem("patientSessions")
    let allUpcomingAppointments = []
    let appointmentDates = []

    if (storedSessions) {
      try {
        const parsedSessions = JSON.parse(storedSessions)
        setSessions(parsedSessions)

        if (parsedSessions.length > 0) {
          const earliestDate = parsedSessions.reduce((earliest, session) => {
            if (!session.dateDebut) return earliest
            const sessionStart = parseISO(session.dateDebut)
            return !earliest || sessionStart < earliest ? sessionStart : earliest
          }, null)

          if (earliestDate) {
            setMonths(generateMonths(earliestDate))
            setCurrentDate(earliestDate)
          }

          const today = new Date()
          parsedSessions.forEach((session) => {
            if (session.rendezVous && Array.isArray(session.rendezVous)) {
              const sessionUpcomingAppointments = session.rendezVous
                .filter((rdv) => rdv.date && new Date(rdv.date) >= today)
                .map((rdv) => ({
                  date: rdv.date,
                  sessionId: session._id,
                }))
              allUpcomingAppointments = allUpcomingAppointments.concat(sessionUpcomingAppointments)

              // Extract appointment dates in "yyyy-MM-dd" format
              const rdvDates = session.rendezVous
                .filter((rdv) => rdv.date)
                .map((rdv) => format(new Date(rdv.date), "yyyy-MM-dd"))
              appointmentDates = appointmentDates.concat(rdvDates)
            }
          })

          if (allUpcomingAppointments.length > 0) {
            allUpcomingAppointments.sort((a, b) => new Date(a.date) - new Date(b.date))
            setNextAppointment(allUpcomingAppointments[0])
          } else {
            setNextAppointment(null)
          }

          // Set the unique appointment dates
          setRendezVousDates([...new Set(appointmentDates)])
        }
      } catch (error) {
        console.error("Error parsing patient sessions:", error)
      }
    }
  }, [])

  useEffect(() => {
    setDisplayMonths(generateSixMonths())
  }, [])

  const getSessionsForDay = (day) => {
    return sessions.filter((session) => {
      if (!session?.dateDebut) return false
      const sessionStart = parseISO(session.dateDebut)
      const sessionEnd = session.dateFin ? parseISO(session.dateFin) : new Date()
      const currentDay = startOfDay(day)
      return currentDay >= startOfDay(sessionStart) && currentDay <= startOfDay(sessionEnd)
    })
  }

  const getAllEffetsSignalesForDay = (day) => {
    const allEffetsSignales = []
    sessions.forEach((session) => {
      if (session?.effetsSignales) {
        const dayEffets = session.effetsSignales.filter((effet) => {
          // Add a check to ensure effet.dateDeSignalement is a string before parsing
          if (typeof effet.dateDeSignalement === "string" && effet.dateDeSignalement) {
            return isSameDay(parseISO(effet.dateDeSignalement), day)
          }
          return false // Skip this effect if dateDeSignalement is not a valid string
        })
        dayEffets.forEach((effet) => {
          allEffetsSignales.push({ ...effet, sessionTraitement: session.traitement })
        })
      }
    })
    return allEffetsSignales
  }

  const dayAbbrs = ["D", "L", "M", "M", "J", "V", "S"]

  const formatAppointmentDate = (dateString) => {
    if (!dateString) return "N/A"
    const date = new Date(dateString)
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  const handleDayClick = (day) => {
    const dayEffetsSignales = getAllEffetsSignalesForDay(day)
    const daySessions = getSessionsForDay(day)
    const dateStr = format(day, "yyyy-MM-dd")
    const hasAppointment = rendezVousDates && rendezVousDates.includes(dateStr)
    setSelectedDayDetails({
      day,
      effetsSignales: dayEffetsSignales,
      sessions: daySessions,
      dateStr,
      hasAppointment,
    })
    setIsDayMenuOpen(true)
  }

  const handleCloseDayMenu = () => {
    setIsDayMenuOpen(false)
    setSelectedDayDetails(null)
  }

  const hasEffetSignaleForDay = (dayEffetsSignales) => {
    return dayEffetsSignales.length > 0
  }

  if (sessions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-50 p-1 md:p-2">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-12">
          <div className="text-center">
            <CalendarIcon className="mx-auto h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Aucune session trouvée</h3>
            <p className="text-gray-500">Aucune session de traitement n'est actuellement disponible.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-50 p-1 md:p-2">
      <div className="max-w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-2">
          {/* Sessions Legend Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-teal-500 to-emerald-500 p-2">
                <h2 className="text-base font-bold text-white">Légende des sessions</h2>
              </div>

              <div className="p-3 space-y-3">
                {sessions.map((session, index) => (
                  <div key={session._id || index} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full shadow-sm"
                      style={{ backgroundColor: treatmentColors[session.traitement] || "#94a3b8" }}
                    ></div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 text-xs">
                        {medicationMap[session.traitement] || session.traitement || "Non spécifié"}
                      </p>
                      <div className="text-xs text-gray-500">
                        {session.dateDebut ? new Date(session.dateDebut).toLocaleDateString("fr-FR") : "N/A"}
                        {" - "}
                        {session.dateFin ? new Date(session.dateFin).toLocaleDateString("fr-FR") : "En cours"}
                      </div>
                    </div>
                  </div>
                ))}

                <div className="border-t pt-2 mt-3">
                  <div className="flex items-center gap-1 mb-1">
                    <Clock className="h-3 w-3 text-gray-400" />
                    <span className="text-xs font-medium text-gray-700">
                      Total: {sessions.length} session{sessions.length > 1 ? "s" : ""}
                    </span>
                  </div>
                </div>

                <div className="border-t pt-2 mt-3">
                  <h3 className="text-sm font-semibold text-gray-800 mb-2">Prochain Rendez-vous</h3>
                  {nextAppointment ? (
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                      <div className="flex items-center gap-2 mb-1">
                        <CalendarIcon className="w-4 h-4 text-teal-600" />
                        <p className="text-sm font-medium text-gray-700">
                          {formatAppointmentDate(nextAppointment.date)}
                        </p>
                      </div>
                      <p className="text-xs text-gray-500">Avec Dr. Toumi</p>
                    </div>
                  ) : (
                    <p className="text-xs text-gray-500">Aucun rendez-vous prochainement.</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Calendar Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="flex items-center justify-between p-3 border-b border-gray-100">
                <div>
                  <h2 className="text-lg font-bold text-emerald-800">Mon agenda de Traitement</h2>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setCurrentDate(subMonths(currentDate, 1))}
                    className="p-1 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <ChevronLeft className="h-3 w-3" />
                  </button>
                  <button
                    onClick={() => setCurrentDate(addMonths(currentDate, 1))}
                    className="p-1 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <ChevronRight className="h-3 w-3" />
                  </button>
                </div>
              </div>

              <div className="p-3">
                <div ref={calendarRef} className="overflow-y-auto max-h-[600px] pr-1 space-y-3">
                  {/* Calendar display in doctor's agenda style with cream background */}
                  <div className="max-h-[calc(100vh-200px)] overflow-y-auto bg-[#fdfaf5] rounded-lg p-2">
                    {displayMonths.map((month) => (
                      <div key={month.monthKey} className="flex border-gray-200 last:border-b-0 mb-4">
                        <div className="w-16 py-2 pr-0 font-medium text-gray-700 text-left sticky left-0 bg-[#fdfaf5]">
                          {month.name} <span className="text-xs text-gray-500">{month.year}</span>
                        </div>
                        <div className="flex-1 py-2 pl-2">
                          {month.rows.map((row, rowIndex) => (
                            <div key={`${month.monthKey}-row-${rowIndex}`} className="flex mb-1">
                              {row.map((dayNumber, colIndex) => {
                                if (dayNumber === null) {
                                  return <div key={`empty-${colIndex}`} className="w-8 h-12 m-[1px] invisible"></div>
                                }

                                const day = new Date(month.year, month.monthDate.getMonth(), dayNumber)
                                const daySessions = getSessionsForDay(day)
                                const isCurrentDay = isSameDay(day, new Date())
                                const dayEffetsSignales = getAllEffetsSignalesForDay(day)
                                const hasEffet = hasEffetSignaleForDay(dayEffetsSignales)
                                const dayName = format(day, "EEE", { locale: fr }).substring(0, 1).toUpperCase()
                                const isWeekend = day.getDay() === 5 || day.getDay() === 6

                                const dayStyle = {}
                                if (daySessions.length === 1) {
                                  dayStyle.backgroundColor = treatmentColors[daySessions[0].traitement] || "#94a3b8"
                                } else if (daySessions.length > 1) {
                                  const colors = daySessions.map((s) => treatmentColors[s.traitement] || "#94a3b8")
                                  dayStyle.background = `linear-gradient(45deg, ${colors.join(", ")})`
                                }

                                const hasSession = daySessions.length > 0
                                const textColor = hasSession ? "text-white" : "text-gray-700"
                                const dayNameColor = hasSession ? "text-white opacity-80" : "text-gray-600"
                                const ringColor = isCurrentDay ? "ring-2 ring-black" : ""
                                const weekendBorder = isWeekend ? "border border-blue-200" : ""

                                return (
                                  <div
                                    key={colIndex}
                                    className={`
                                      w-8 h-12 flex flex-col items-center justify-start pt-1 m-[1px] rounded-md text-xs font-medium 
                                      hover:bg-gray-100 transition-colors cursor-pointer
                                      ${ringColor} ${weekendBorder}
                                    `}
                                    style={dayStyle}
                                    onClick={() => handleDayClick(day)}
                                    onMouseEnter={() =>
                                      setHoveredDay({ day, effetsSignales: dayEffetsSignales, sessions: daySessions })
                                    }
                                    onMouseLeave={() => setHoveredDay(null)}
                                  >
                                    <span className={`text-[9px] font-medium ${dayNameColor} mb-1`}>{dayName}</span>
                                    <span className={`text-sm ${textColor}`}>{dayNumber}</span>

                                    <div className="flex justify-start items-end w-full mt-auto mb-1">
                                      {/* Point noir pour effets secondaires */}
                                      {hasEffet && <span className="w-2 h-2 bg-black rounded-full ml-1"></span>}
                                    </div>
                                  </div>
                                )
                              })}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tooltip for hovered day */}
        {hoveredDay && (
          <div className="fixed bottom-4 left-4 bg-gray-900 text-white p-3 rounded-lg shadow-lg z-50 max-w-xs">
            <p className="font-medium">{format(hoveredDay.day, "EEEE d MMMM", { locale: fr })}</p>
            {hoveredDay.sessions.length > 0 && (
              <div className="mt-2">
                <p className="text-sm text-gray-300">Sessions actives:</p>
                {hoveredDay.sessions.map((session, i) => (
                  <div key={i} className="flex items-center gap-2 mt-1">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: treatmentColors[session.traitement] || "#94a3b8" }}
                    ></div>
                    <span className="text-sm text-gray-300">
                      {medicationMap[session.traitement] || session.traitement}
                    </span>
                  </div>
                ))}
              </div>
            )}
            {/* Show effetsSignales in the tooltip */}
            {hoveredDay.effetsSignales.length > 0 && (
              <div className="mt-2">
                <p className="text-sm text-gray-300">Effets secondaires signalés par le médecin:</p>
                {hoveredDay.effetsSignales.map((effet, i) => (
                  <p key={i} className="text-sm text-gray-300 mt-1">
                    {effet.nom} (pour {medicationMap[effet.sessionTraitement] || effet.sessionTraitement})
                  </p>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Day Click Menu/Modal */}
        {isDayMenuOpen && selectedDayDetails && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm relative">
              <button onClick={handleCloseDayMenu} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
                <X className="h-5 w-5" />
              </button>
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Options pour le {format(selectedDayDetails.day, "EEEE d MMMM", { locale: fr })}
              </h3>

              <div className="space-y-3">
                {/* Display details of effets secondaires in the modal */}
                {selectedDayDetails.effetsSignales.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-700 mb-2">
                      Effets secondaires signalés par le médecin pour ce jour :
                    </p>
                    <ul className="list-disc list-inside text-sm text-gray-600">
                      {selectedDayDetails.effetsSignales.map((effet, i) => (
                        <li key={i}>
                          {effet.nom} (pour {medicationMap[effet.sessionTraitement] || effet.sessionTraitement})
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Rendez-vous */}
                {selectedDayDetails.hasAppointment && (
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Rendez-vous programmé pour ce jour</p>
                    <div className="bg-gray-50 p-2 rounded text-sm">
                      <p>Rendez-vous avec Dr. Toumi</p>
                    </div>
                  </div>
                )}

                <button
                  className="w-full flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                  onClick={() => {
                    navigate("/symptomes?date=" + format(selectedDayDetails.day, "yyyy-MM-dd"))
                    handleCloseDayMenu()
                  }}
                >
                  <Pill className="h-5 w-5 mr-2" />
                  Gérer mes symptômes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
