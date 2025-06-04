// // // import React, { useState, useEffect } from 'react';
// // // import { useParams } from 'react-router-dom';
// // // import { ChevronDown, ChevronRight, HeartPulse, Phone, UserCircle2 } from "lucide-react";

// // // function ProfilePatient() {
// // //   const [fiche, setFiche] = useState(null);
// // //   const [patient, setPatient] = useState(null);
// // //   const [expandedSection, setExpandedSection] = useState(null);
// // //   const { id } = useParams(); // Cet id est l idfich de la fiche

// // //   useEffect(() => {
// // //     const fetchData = async () => {
// // //       try {
// // //         // en 1errecuperer la fiche
// // //         const resFiche = await fetch(`http://localhost:5000/fiches/${id}`);
// // //         const dataFiche = await resFiche.json();
// // //         setFiche(dataFiche);

// // //         // apres le patient de cette fiche ici
// // //         if (dataFiche && dataFiche.IDPatient) {
// // //           const resPatient = await fetch(`http://localhost:5000/patients/${dataFiche.IDPatient}`);
// // //           const dataPatient = await resPatient.json();
// // //           setPatient(dataPatient);
// // //         }
// // //       } catch (error) {
// // //         console.error("Erreur lors de la récupération des données:", error);
// // //       }
// // //     };
// // //     fetchData();
// // //   }, [id]);

// // //   const toggleSection = (section) => {
// // //     setExpandedSection(prev => (prev === section ? null : section));
// // //   };

// // //   if (!fiche || !patient) return <div className="p-5">Chargement...</div>;

// // //   return (
// // //     <div className="pt-20 w-full min-h-screen bg-white p-2">
// // //       <div className="grid grid-cols-[300px_1fr] gap-2 min-h-screen">
// // //         {/* Left Panel */}
// // //         <div className="w-full h-full bg-white shadow-md overflow-hidden rounded-r-lg">
// // //           <div className="bg-green-100 p-4 flex items-center">
// // //             <div className="w-15 h-15 bg-gray-200 rounded-full flex items-center justify-center border-4 border-white">
// // //               <span className="text-gray-400 text-4xl">
// // //                 {patient.nom?.charAt(0) || 'P'}
// // //               </span>
// // //             </div>
// // //             <div className="ml-6">
// // //               <h1 className="text-xl font-bold text-green-800">
// // //                 {patient.nom} {patient.prenom}
// // //               </h1>
// // //               <div className="flex items-center mt-1 space-x-3">
// // //                 <span className="bg-white text-green-800 px-2 py-1 text-xs font-semibold rounded-full">Création</span>
// // //                 <span className="text-gray-600 text-sm">ID: {patient.IDPatient}</span>
// // //               </div>
// // //             </div>
// // //           </div>

// // //           {/* Collapsible Sections */}
// // //           <div className="divide-y divide-gray-200">
// // //             {/* Informations Générales */}
// // //             <div>
// // //               <div
// // //                 className="group cursor-pointer hover:bg-green-50"
// // //                 onClick={() => toggleSection("generalInfo")}
// // //               >
// // //                 <div className="flex items-center justify-between p-4">
// // //                   <div className="flex items-center gap-3 text-gray-700">
// // //                     <UserCircle2 className="text-green-600 h-5 w-5" />
// // //                     <h3 className="font-medium">Informations Générales</h3>
// // //                   </div>
// // //                   {expandedSection === "generalInfo" ? <ChevronDown /> : <ChevronRight />}
// // //                 </div>
// // //               </div>
// // //               {expandedSection === "generalInfo" && (
// // //                 <div className="px-4 pb-4">
// // //                   <div className="space-y-3">
// // //                     <div className="flex justify-between">
// // //                       <span className="text-gray-600">Genre</span>
// // //                       <span className="text-gray-800">{patient.sexe}</span>
// // //                     </div>
// // //                     <div className="flex justify-between">
// // //                       <span className="text-gray-600">Date de naissance</span>
// // //                       <span className="text-gray-800">{patient.DateNaissance}</span>
// // //                     </div>
// // //                     <div className="flex justify-between">
// // //                       <span className="text-gray-600">Adresse</span>
// // //                       <span className="text-gray-800">
// // //                         {patient.adresse?.commune}  
// // //                         {patient.adresse?.wilaya}
// // //                       </span>
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //               )}
// // //             </div>

// // //             {/* Contact Info */}
// // //             <div>
// // //               <div
// // //                 className="group cursor-pointer hover:bg-green-50"
// // //                 onClick={() => toggleSection("contactInfo")}
// // //               >
// // //                 <div className="flex items-center justify-between p-4">
// // //                   <div className="flex items-center gap-3 text-gray-700">
// // //                     <Phone className="text-green-600 h-5 w-5" />
// // //                     <h3 className="font-medium">Contact</h3>
// // //                   </div>
// // //                   {expandedSection === "contactInfo" ? <ChevronDown /> : <ChevronRight />}
// // //                 </div>
// // //               </div>
// // //               {expandedSection === "contactInfo" && (
// // //                 <div className="px-4 pb-4">
// // //                   <div className="space-y-3">
// // //                     <div className="flex justify-between">
// // //                       <span className="text-gray-600">Numéro</span>
// // //                       <span className="text-gray-800">{patient.numero}</span>
// // //                     </div>
// // //                     <div className="flex justify-between">
// // //                       <span className="text-gray-600">Email</span>
// // //                       <span className="text-gray-800">{patient.email}</span>
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //               )}
// // //             </div>

// // //             {/* Informations Médicales */}
// // //             <div>
// // //               <div
// // //                 className="group cursor-pointer hover:bg-green-50"
// // //                 onClick={() => toggleSection("medicalInfo")}
// // //               >
// // //                 <div className="flex items-center justify-between p-4">
// // //                   <div className="flex items-center gap-3 text-gray-700">
// // //                     <HeartPulse className="text-green-600 h-5 w-5" />
// // //                     <h3 className="font-medium">Informations Médicales</h3>
// // //                   </div>
// // //                   {expandedSection === "medicalInfo" ? <ChevronDown /> : <ChevronRight />}
// // //                 </div>
// // //               </div>
// // //               {expandedSection === "medicalInfo" && (
// // //                 <div className="px-4 pb-4 animate-slideDown space-y-4">
// // //                   <div className="border p-4 rounded shadow">
// // //                     <div className="space-y-3">
// // //                       <div className="flex justify-between">
// // //                         <span className="text-gray-600">Categorie</span>
// // //                         <span className="text-gray-800">{fiche.categorie}</span>
// // //                       </div>
// // //                       <div className="flex justify-between">
// // //                         <span className="text-gray-600">Preuve</span>
// // //                         <span className="text-gray-800">{fiche.preuve}</span>
// // //                       </div>
// // //                       <div className="flex justify-between">
// // //                         <span className="text-gray-600">Type TB</span>
// // //                         <span className="text-gray-800">{fiche.selectedSousType}</span>
// // //                       </div>
// // //                       <div className="flex justify-between">
// // //                         <span className="text-gray-600">Comptage tuberculeux</span>
// // //                         <span className="text-gray-800">{fiche.Comptage_tuberculeux}</span>
// // //                       </div>
// // //                       <div className="flex justify-between">
// // //                         <span className="text-gray-600">Antecedents</span>
// // //                         <span className="text-gray-800">{fiche.antecedents}</span>
// // //                       </div>
// // //                       <div className="flex justify-between">
// // //                         <span className="text-gray-600">Poids</span>
// // //                         <span className="text-gray-800">{fiche.poidsInitial}</span>
// // //                       </div>
// // //                       <div className="flex justify-between">
// // //                         <span className="text-gray-600">Détails supplémentaires</span>
// // //                         <span className="text-gray-800">{fiche.note}</span>
// // //                       </div>
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //               )}
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* Right Section (Vide pour l'instant) */}
// // //         <div></div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default ProfilePatient;

// // import { useState, useEffect } from "react"
// // import { useParams } from "react-router-dom"
// // import {
// //   ChevronDown,
// //   ChevronRight,
// //   HeartPulse,
// //   Phone,
// //   UserCircle2,
// //   X,
// //   Plus,
// //   Calendar,
// //   Info,
// //   Trash2,
// // } from "lucide-react"
// // import { DateRange } from "react-date-range"
// // import {
// //   format,
// //   addDays,
// //   differenceInCalendarDays,
// //   startOfMonth,
// //   endOfMonth,
// //   eachDayOfInterval,
// //   isSameDay,
// //   getMonth,
// //   getYear,
// //   isAfter,
// //   isBefore,
// //   getDay,
// // } from "date-fns"
// // import { fr } from "date-fns/locale"
// // import "react-date-range/dist/styles.css"
// // import "react-date-range/dist/theme/default.css"

// // function ProfilePatient() {
// //   const [fiche, setFiche] = useState(null)
// //   const [patient, setPatient] = useState(null)
// //   const [expandedSection, setExpandedSection] = useState(null)
// //   const { id } = useParams() // Cet id est l idfich de la fiche

// //   //agendaaaaa
// //   const treatmentColors = {
// //     RHZ: "#fecaca", // red-100
// //     RHZE: "#bfdbfe", // blue-100
// //     RH: "#fef9c3", // yellow-100
// //     R: "#e9d5ff", // purple-100
// //     E: "#fbcfe8", // pink-100
// //     Z: "#bbf7d0", // green-100
// //     H: "#bbf7d0",
// //     S: "#bbf7d0",
// //   }

// //   const [selectedTreatment, setSelectedTreatment] = useState("RHZ")
// //   const [state, setState] = useState([
// //     {
// //       startDate: new Date(),
// //       endDate: addDays(new Date(), 6),
// //       key: "selection",
// //     },
// //   ])
// //   const [isModalOpen, setIsModalOpen] = useState(false)
// //   // Store treatments with their color information
// //   const [treatments, setTreatments] = useState([])
// //   // Store months to display in agenda
// //   const [agendaMonths, setAgendaMonths] = useState([])
// //   // Session counter
// //   const [sessionCounter, setSessionCounter] = useState(1)
// //   // Treatment date boundaries
// //   const [treatmentBoundaries, setTreatmentBoundaries] = useState({
// //     earliestDate: null,
// //     latestDate: null,
// //   })
// //   // Show info tooltip
// //   const [showInfoTooltip, setShowInfoTooltip] = useState(false)
// //   // Active days count per session (accounting for overlaps)
// //   const [activeDaysCount, setActiveDaysCount] = useState({})
// //   // Modal mode (add or delete)
// //   const [modalMode, setModalMode] = useState("add")
// //   // Selected session for deletion
// //   const [selectedSession, setSelectedSession] = useState(null)
// //   // Deletion note
// //   const [deletionNote, setDeletionNote] = useState("")
// //   // Session notes history
// //   const [sessionNotes, setSessionNotes] = useState({})

// //   // Day names in French (short)
// //   const dayNames = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"]

// //   // Calculate treatment boundaries (earliest start date and latest end date)
// //   const calculateTreatmentBoundaries = (treatmentsList) => {
// //     if (!treatmentsList || treatmentsList.length === 0) {
// //       return { earliestDate: null, latestDate: null }
// //     }

// //     // Get all dates from all treatments
// //     const allDates = treatmentsList.flatMap((treatment) => treatment.dates)

// //     if (allDates.length === 0) {
// //       return { earliestDate: null, latestDate: null }
// //     }

// //     // Find earliest and latest dates
// //     const earliestDate = allDates.reduce((earliest, date) => (isBefore(date, earliest) ? date : earliest), allDates[0])

// //     const latestDate = allDates.reduce((latest, date) => (isAfter(date, latest) ? date : latest), allDates[0])

// //     return { earliestDate, latestDate }
// //   }

// //   // Calculate active days count for each session (accounting for overlaps)
// //   const calculateActiveDaysCount = (treatmentsList) => {
// //     if (!treatmentsList || treatmentsList.length === 0) {
// //       return {}
// //     }

// //     // Sort treatments by timestamp (newest first)
// //     const sortedTreatments = [...treatmentsList].sort((a, b) => b.timestamp - a.timestamp)

// //     // Track which days are already claimed by newer treatments
// //     const claimedDays = new Set()

// //     // Calculate active days for each treatment
// //     const activeDays = {}

// //     sortedTreatments.forEach((treatment) => {
// //       let activeCount = 0

// //       treatment.dates.forEach((date) => {
// //         const dateStr = date.toISOString().split("T")[0]
// //         if (!claimedDays.has(dateStr)) {
// //           activeCount++
// //           claimedDays.add(dateStr)
// //         }
// //       })

// //       activeDays[treatment.sessionNumber] = activeCount
// //     })

// //     return activeDays
// //   }

// //   // Generate months data based on treatments
// //   const generateAgendaMonths = (treatmentsList) => {
// //     if (!treatmentsList || treatmentsList.length === 0) {
// //       // If no treatments, show current month
// //       const currentDate = new Date()
// //       const start = startOfMonth(currentDate)
// //       const end = endOfMonth(currentDate)
// //       const days = eachDayOfInterval({ start, end })

// //       return [
// //         {
// //           name: format(currentDate, "MMM", { locale: fr }),
// //           year: format(currentDate, "yyyy"),
// //           days: days,
// //           monthKey: `${getYear(currentDate)}-${getMonth(currentDate)}`,
// //         },
// //       ]
// //     }

// //     // Collect all dates from all treatments
// //     const allDates = treatmentsList.flatMap((treatment) => treatment.dates)

// //     // Find unique months from all dates
// //     const uniqueMonths = {}

// //     allDates.forEach((date) => {
// //       const monthStart = startOfMonth(date)
// //       const monthKey = `${getYear(monthStart)}-${getMonth(monthStart)}`

// //       if (!uniqueMonths[monthKey]) {
// //         const monthEnd = endOfMonth(monthStart)
// //         const days = eachDayOfInterval({ start: monthStart, end: monthEnd })

// //         uniqueMonths[monthKey] = {
// //           name: format(monthStart, "MMM", { locale: fr }),
// //           year: format(monthStart, "yyyy"),
// //           days: days,
// //           monthKey: monthKey,
// //         }
// //       }
// //     })

// //     // Convert to array and sort by date
// //     return Object.values(uniqueMonths).sort((a, b) => {
// //       const [yearA, monthA] = a.monthKey.split("-").map(Number)
// //       const [yearB, monthB] = b.monthKey.split("-").map(Number)

// //       if (yearA !== yearB) return yearA - yearB
// //       return monthA - monthB
// //     })
// //   }

// //    const openModal = (mode = "add", sessionInfo = null) => {
// //     setModalMode(mode)
// //     setSelectedSession(sessionInfo)

// //     if (mode === "delete" && sessionInfo) {
// //       // Set the date range to the selected day for deletion
// //       setState([
// //         {
// //           startDate: state[0].startDate,
// //           endDate: state[0].endDate,
// //           key: "selection",
// //         },
// //       ])
// //     }

// //     setIsModalOpen(true)
// //   }

// //   const closeModal = () => {
// //     setIsModalOpen(false)
// //     setModalMode("add")
// //     setSelectedSession(null)
// //     setDeletionNote("")
// //   }

// //   const handleSave = () => {
// //     const start = state[0].startDate
// //     const end = state[0].endDate
// //     const days = differenceInCalendarDays(end, start) + 1

// //     // Générer correctement toutes les dates dans l'intervalle
// //     const dates = []
// //     for (let i = 0; i < days; i++) {
// //       dates.push(addDays(new Date(start), i))
// //     }

// //     // Add new treatment with color information and session number
// //     const newTreatment = {
// //       dates: dates,
// //       treatment: selectedTreatment,
// //       color: treatmentColors[selectedTreatment],
// //       sessionNumber: sessionCounter,
// //       daysCount: days,
// //       timestamp: Date.now(), // Add timestamp to track order of addition
// //     }

// //     const updatedTreatments = [...treatments, newTreatment]
// //     setTreatments(updatedTreatments)

// //     // Increment session counter for next session
// //     setSessionCounter(sessionCounter + 1)

// //     // Update treatment boundaries
// //     const newBoundaries = calculateTreatmentBoundaries(updatedTreatments)
// //     setTreatmentBoundaries(newBoundaries)

// //     // Update active days count
// //     const newActiveDaysCount = calculateActiveDaysCount(updatedTreatments)
// //     setActiveDaysCount(newActiveDaysCount)

// //     // Update agenda months based on new treatments
// //     const updatedAgendaMonths = generateAgendaMonths(updatedTreatments)
// //     setAgendaMonths(updatedAgendaMonths)

// //     setIsModalOpen(false)
// //   }

// //   const handleDelete = () => {
// //     if (!selectedSession) return

// //     const start = state[0].startDate
// //     const end = state[0].endDate

// //     // Find the treatment to modify
// //     const updatedTreatments = treatments
// //       .map((treatment) => {
// //         if (treatment.sessionNumber === selectedSession.sessionNumber) {
// //           // Filter out dates that are within the selected range
// //           const updatedDates = treatment.dates.filter((date) => {
// //             // Assurons-nous que la comparaison des dates est faite correctement
// //             const dateToCheck = new Date(date)
// //             const startToCheck = new Date(start)
// //             const endToCheck = new Date(end)

// //             // Normaliser les dates pour comparer uniquement les jours (sans les heures)
// //             dateToCheck.setHours(0, 0, 0, 0)
// //             startToCheck.setHours(0, 0, 0, 0)
// //             endToCheck.setHours(0, 0, 0, 0)

// //             // Vérifier si la date est dans l'intervalle (inclus début et fin)
// //             return !(dateToCheck >= startToCheck && dateToCheck <= endToCheck)
// //           })

// //           // If we have a deletion note, save it
// //           if (deletionNote.trim()) {
// //             const noteKey = `session_${treatment.sessionNumber}_deletion_${Date.now()}`
// //             setSessionNotes((prev) => ({
// //               ...prev,
// //               [noteKey]: {
// //                 sessionNumber: treatment.sessionNumber,
// //                 date: new Date(),
// //                 note: deletionNote,
// //                 deletedRange: `${format(start, "dd/MM/yyyy")} - ${format(end, "dd/MM/yyyy")}`,
// //                 treatment: treatment.treatment,
// //               },
// //             }))
// //           }

// //           // Return updated treatment with filtered dates
// //           return {
// //             ...treatment,
// //             dates: updatedDates,
// //             daysCount: updatedDates.length,
// //           }
// //         }
// //         return treatment
// //       })
// //       .filter((treatment) => treatment.dates.length > 0) // Remove treatments with no dates left

// //     setTreatments(updatedTreatments)

// //     // Update treatment boundaries
// //     const newBoundaries = calculateTreatmentBoundaries(updatedTreatments)
// //     setTreatmentBoundaries(newBoundaries)

// //     // Update active days count
// //     const newActiveDaysCount = calculateActiveDaysCount(updatedTreatments)
// //     setActiveDaysCount(newActiveDaysCount)

// //     // Update agenda months based on new treatments
// //     const updatedAgendaMonths = generateAgendaMonths(updatedTreatments)
// //     setAgendaMonths(updatedAgendaMonths)

// //     closeModal()
// //   }

// //   // Check if a date has a treatment scheduled and get its info
// //   const getTreatmentInfo = (date) => {
// //     // Check if date is before earliest treatment date or after latest treatment date
// //     if (treatmentBoundaries.earliestDate && treatmentBoundaries.latestDate) {
// //       if (isBefore(date, treatmentBoundaries.earliestDate) || isAfter(date, treatmentBoundaries.latestDate)) {
// //         return {
// //           hasTreatment: false,
// //           isOutsideTreatmentPeriod: true,
// //         }
// //       }
// //     }

// //     // Find all treatments that include this date
// //     const matchingTreatments = treatments.filter((treatment) =>
// //       treatment.dates.some((treatmentDate) => isSameDay(treatmentDate, date)),
// //     )

// //     if (matchingTreatments.length > 0) {
// //       // Sort by timestamp (most recent first) to prioritize newer treatments
// //       matchingTreatments.sort((a, b) => b.timestamp - a.timestamp)

// //       // Get the most recent treatment
// //       const mostRecentTreatment = matchingTreatments[0]

// //       // Check if this is an overridden day (belongs to an older treatment but is covered by a newer one)
// //       const isOverridden =
// //         matchingTreatments.length > 1 && matchingTreatments[0].timestamp > matchingTreatments[1].timestamp

// //       return {
// //         hasTreatment: true,
// //         color: mostRecentTreatment.color,
// //         name: `Session ${mostRecentTreatment.sessionNumber}`,
// //         daysCount: mostRecentTreatment.daysCount,
// //         isOutsideTreatmentPeriod: false,
// //         sessionNumber: mostRecentTreatment.sessionNumber,
// //         treatment: mostRecentTreatment.treatment,
// //         hasOverlap: matchingTreatments.length > 1,
// //         isOverridden: isOverridden,
// //         overriddenSessionNumber: isOverridden ? matchingTreatments[1].sessionNumber : null,
// //         allTreatments: matchingTreatments,
// //       }
// //     }

// //     return {
// //       hasTreatment: false,
// //       isOutsideTreatmentPeriod: false,
// //     }
// //   }

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         // en 1errecuperer la fiche
// //         const resFiche = await fetch(`http://localhost:5000/fiches/${id}`)
// //         const dataFiche = await resFiche.json()
// //         setFiche(dataFiche)

// //         // apres le patient de cette fiche ici
// //         if (dataFiche && dataFiche.IDPatient) {
// //           const resPatient = await fetch(`http://localhost:5000/patients/${dataFiche.IDPatient}`)
// //           const dataPatient = await resPatient.json()
// //           setPatient(dataPatient)
// //         }
// //       } catch (error) {
// //         console.error("Erreur lors de la récupération des données:", error)
// //       }
// //     }
// //     fetchData()

// //     // Initialize agenda with current month
// //     setAgendaMonths(generateAgendaMonths([]))
// //   }, [id])

// //   const toggleSection = (section) => {
// //     setExpandedSection((prev) => (prev === section ? null : section))
// //   }

// //   // Calculate number of selected days
// //   const getSelectedDaysCount = () => {
// //     if (!state[0].startDate || !state[0].endDate) return 0
// //     return differenceInCalendarDays(state[0].endDate, state[0].startDate) + 1
// //   }

// //   if (!fiche || !patient) return <div className="p-5">Chargement...</div>

// //   return (
// //     <div className="pt-6 w-full min-h-screen bg-white p-2">
// //       <div className="grid grid-cols-[300px_1fr] gap-0 min-h-screen">
// //         {/* Left Panel */}
// //         <div className="w-full h-full bg-white shadow-md overflow-hidden rounded-r-lg">
// //           <div className="bg-green-100 p-4 flex items-center">
// //             <div className="w-15 h-15 bg-gray-200 rounded-full flex items-center justify-center border-4 border-white">
// //               <span className="text-gray-400 text-4xl">{patient.nom?.charAt(0) || "P"}</span>
// //             </div>
// //             <div className="ml-6">
// //               <h1 className="text-xl font-bold text-green-800">
// //                 {patient.nom} {patient.prenom}
// //               </h1>
// //               <div className="flex items-center mt-1 space-x-3">
// //                 <span className="bg-white text-green-800 px-2 py-1 text-xs font-semibold rounded-full">Création</span>
// //                 <span className="text-gray-600 text-sm">ID: {patient.IDPatient}</span>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Collapsible Sections */}
// //           <div className="divide-y divide-gray-200">
// //             {/* Informations Générales */}
// //             <div>
// //               <div className="group cursor-pointer hover:bg-green-50" onClick={() => toggleSection("generalInfo")}>
// //                 <div className="flex items-center justify-between p-4">
// //                   <div className="flex items-center gap-3 text-gray-700">
// //                     <UserCircle2 className="text-green-600 h-5 w-5" />
// //                     <h3 className="font-medium">Informations Générales</h3>
// //                   </div>
// //                   {expandedSection === "generalInfo" ? <ChevronDown /> : <ChevronRight />}
// //                 </div>
// //               </div>
// //               {expandedSection === "generalInfo" && (
// //                 <div className="px-4 pb-4">
// //                   <div className="space-y-3">
// //                     <div className="flex justify-between">
// //                       <span className="text-gray-600">Genre</span>
// //                       <span className="text-gray-800">{patient.sexe}</span>
// //                     </div>
// //                     <div className="flex justify-between">
// //                       <span className="text-gray-600">Date de naissance</span>
// //                       <span className="text-gray-800">{patient.DateNaissance}</span>
// //                     </div>
// //                     <div className="flex justify-between">
// //                       <span className="text-gray-600">Adresse</span>
// //                       <span className="text-gray-800">
// //                         {patient.adresse?.commune} {patient.adresse?.wilaya}
// //                       </span>
// //                     </div>
// //                   </div>
// //                 </div>
// //               )}
// //             </div>

// //             {/* Contact Info */}
// //             <div>
// //               <div className="group cursor-pointer hover:bg-green-50" onClick={() => toggleSection("contactInfo")}>
// //                 <div className="flex items-center justify-between p-4">
// //                   <div className="flex items-center gap-3 text-gray-700">
// //                     <Phone className="text-green-600 h-5 w-5" />
// //                     <h3 className="font-medium">Contact</h3>
// //                   </div>
// //                   {expandedSection === "contactInfo" ? <ChevronDown /> : <ChevronRight />}
// //                 </div>
// //               </div>
// //               {expandedSection === "contactInfo" && (
// //                 <div className="px-4 pb-4">
// //                   <div className="space-y-3">
// //                     <div className="flex justify-between">
// //                       <span className="text-gray-600">Numéro</span>
// //                       <span className="text-gray-800">{patient.numero}</span>
// //                     </div>
// //                     <div className="flex justify-between">
// //                       <span className="text-gray-600">Email</span>
// //                       <span className="text-gray-800">{patient.email}</span>
// //                     </div>
// //                   </div>
// //                 </div>
// //               )}
// //             </div>

// //             {/* Informations Médicales */}
// //             <div>
// //               <div className="group cursor-pointer hover:bg-green-50" onClick={() => toggleSection("medicalInfo")}>
// //                 <div className="flex items-center justify-between p-4">
                  
// // <div className="flex items-center gap-3 text-gray-700">
// //                     <HeartPulse className="text-green-600 h-5 w-5" />
// //                     <h3 className="font-medium">Informations Médicales</h3>
// //                   </div>
// //                   {expandedSection === "medicalInfo" ? <ChevronDown /> : <ChevronRight />}
// //                 </div>
// //               </div>
// //               {expandedSection === "medicalInfo" && (
// //                 <div className="px-4 pb-4 animate-slideDown space-y-4">
// //                   <div className="border p-4 rounded shadow">
// //                     <div className="space-y-3">
// //                       <div className="flex justify-between">
// //                         <span className="text-gray-600">Categorie</span>
// //                         <span className="text-gray-800">{fiche.categorie}</span>
// //                       </div>
// //                       <div className="flex justify-between">
// //                         <span className="text-gray-600">Preuve</span>
// //                         <span className="text-gray-800">{fiche.preuve}</span>
// //                       </div>
// //                       <div className="flex justify-between">
// //                         <span className="text-gray-600">Type TB</span>
// //                         <span className="text-gray-800">{fiche.selectedSousType}</span>
// //                       </div>
// //                       <div className="flex justify-between">
// //                         <span className="text-gray-600">Comptage tuberculeux</span>
// //                         <span className="text-gray-800">{fiche.Comptage_tuberculeux}</span>
// //                       </div>
// //                       <div className="flex justify-between">
// //                         <span className="text-gray-600">Antecedents</span>
// //                         <span className="text-gray-800">{fiche.antecedents}</span>
// //                       </div>
// //                       <div className="flex justify-between">
// //                         <span className="text-gray-600">Poids</span>
// //                         <span className="text-gray-800">{fiche.poidsInitial}</span>
// //                       </div>
// //                       <div className="flex justify-between">
// //                         <span className="text-gray-600">Détails supplémentaires</span>
// //                         <span className="text-gray-800">{fiche.note}</span>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>
// //               )}
// //             </div>

// //             {/* Session Notes */}
// //             {Object.keys(sessionNotes).length > 0 && (
// //               <div>
// //                 <div className="group cursor-pointer hover:bg-green-50" onClick={() => toggleSection("sessionNotes")}>
// //                   <div className="flex items-center justify-between p-4">
// //                     <div className="flex items-center gap-3 text-gray-700">
// //                       <Calendar className="text-green-600 h-5 w-5" />
// //                       <h3 className="font-medium">Notes de Session</h3>
// //                     </div>
// //                     {expandedSection === "sessionNotes" ? <ChevronDown /> : <ChevronRight />}
// //                   </div>
// //                 </div>
// //                 {expandedSection === "sessionNotes" && (
// //                   <div className="px-4 pb-4 animate-slideDown space-y-4">
// //                     {Object.entries(sessionNotes).map(([key, note]) => (
// //                       <div key={key} className="border p-4 rounded shadow bg-gray-50">
// //                         <div className="flex justify-between items-start mb-2">
// //                           <div>
// //                             <span className="font-medium text-gray-800">Session {note.sessionNumber}</span>
// //                             <span className="text-sm text-gray-500 ml-2">
// //                               ({format(note.date, "dd/MM/yyyy HH:mm")})
// //                             </span>
// //                           </div>
// //                           <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
// //                             Jours supprimés
// //                           </span>
// //                         </div>
// //                         <p className="text-sm text-gray-600 mb-2">
// //                           <span className="font-medium">Période:</span> {note.deletedRange}
// //                         </p>
// //                         <p className="text-sm text-gray-600 mb-2">
// //                           <span className="font-medium">Traitement:</span> {note.treatment}
// //                         </p>
// //                         <p className="text-sm text-gray-600">
// //                           <span className="font-medium">Note:</span> {note.note}
// //                         </p>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 )}
// //               </div>
// //             )}
// //           </div>
// //         </div>

// //         {/* Right Section - Agenda */}
// //         <div className="p-4">
// //           <div className="flex justify-between items-center mb-4">
// //             <div className="flex items-center">
// //               <h2 className="text-2xl font-bold text-gray-800 mr-2">Agenda</h2>
// //               <div className="relative">
// //                 <button
// //                   className="text-gray-400 hover:text-gray-600 transition-colors"
// //                   onMouseEnter={() => setShowInfoTooltip(true)}
// //                   onMouseLeave={() => setShowInfoTooltip(false)}
// //                 >
// //                   <Info size={16} />
// //                 </button>
// //                 {showInfoTooltip && (
// //                   <div className="absolute left-0 top-full mt-2 w-64 p-2 bg-white shadow-lg rounded-md border border-gray-200 z-10 text-xs text-gray-600">
// //                     <p className="mb-1">• Les jours en gris sont en dehors de la période de traitement</p>
// //                     <p className="mb-1">
// //                       • Les sessions plus récentes remplacent les anciennes en cas de chevauchement
// //                     </p>
// //                     <p className="mb-1">• Les jours remplacés d'une session apparaissent en gris</p>
// //                     <p>• Cliquez sur un jour pour ajouter ou supprimer une session</p>
// //                   </div>
// //                 )}
// //               </div>
// //             </div>
// //             <button
// //               onClick={() => openModal("add")}
// //               className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded shadow flex items-center gap-1"
// //             >
// //               <Plus size={18} />
// //               Session
// //             </button>
// //           </div>

// //           {/* Treatment Legend */}
// //           {treatments.length > 0 && (
// //             <div className="mb-4 flex flex-wrap gap-2">
// //               {treatments.map((treatment) => (
// //                 <div key={treatment.sessionNumber} className="flex items-center">
// //                   <div className="w-4 h-4 rounded-sm mr-1" style={{ backgroundColor: treatment.color }}></div>
// //                   <span className="text-xs text-gray-700">
// //                     Session {treatment.sessionNumber} ({activeDaysCount[treatment.sessionNumber] || 0} jours actifs)
// //                   </span>
// //                 </div>
// //               ))}
// //               <div className="flex items-center ml-2">
// //                 <div className="w-4 h-4 rounded-sm mr-1 bg-gray-100 border border-gray-200"></div>
// //                 <span className="text-xs text-gray-500">Jours inactifs/hors période</span>
// //               </div>
// //             </div>
// //           )}

// //           {/* Compact Agenda with elegant day names */}
// //           <div className="max-h-[calc(100vh-200px)] overflow-y-auto border border-gray-200 rounded-lg shadow-sm">
// //             {agendaMonths.length > 0 ? (
// //               <div className="relative">
// //                 {/* Fixed day names header that stays visible while scrolling */}
// //                 {/* Nous supprimons l'en-tête fixe des jours car chaque jour affiche maintenant son propre nom */}

// //                 {agendaMonths.map((month) => (
// //                   <div key={month.monthKey} className="flex border-gray-200 last:border-b-0">
// //                     {/* Month label */}
// //                     <div className="w-16 py-2 pr-0 font-medium text-gray-700 text-right sticky left-0 bg-white">
// //                       {month.name} <span className="text-xs text-gray-500">{month.year}</span>
// //                     </div>

// //                     {/* Days grid with proper alignment */}
// //                     <div className="flex-1 py-2 pl-2">
// //                       <div className="flex flex-wrap">
// //                         {/* Add empty spaces for proper day alignment */}
// //                         {Array.from({ length: getDay(month.days[0]) === 0 ? 6 : getDay(month.days[0]) - 1 }).map(
// //                           (_, i) => (
// //                             <div key={`empty-${i}`} className="w-8 h-12 m-[1px] invisible"></div>
// //                           ),
// //                         )}

// //                         {month.days.map((day, i) => {
// //                           const treatmentInfo = getTreatmentInfo(day)
// //                           const isToday = isSameDay(day, new Date())
// //                           const dayName = format(day, "EEE", { locale: fr }).substring(0, 1).toUpperCase()

// //                           // Determine background color
// //                           let bgColor = "white"
// //                           let textColor = "inherit"
// //                           let dayNameColor = "text-gray-400"
// //                           const ringColor = isToday ? "ring-2 ring-green-500" : ""

// //                           if (treatmentInfo.hasTreatment) {
// //                             if (treatmentInfo.isOverridden) {
// //                               // This is a day from an older session that's been overridden
// //                               bgColor = "#f3f4f6" // gray-100
// //                               textColor = "#9ca3af" // gray-400
// //                               dayNameColor = "text-gray-300"
// //                             } else {
// //                               // Active treatment day
// //                               bgColor = treatmentInfo.color
// //                               dayNameColor = "text-gray-600"
// //                             }
// //                           } else if (treatmentInfo.isOutsideTreatmentPeriod) {
// //                             // Outside treatment period
// //                             bgColor = "#f3f4f6" // gray-100
// //                             textColor = "#9ca3af" // gray-400
// //                             dayNameColor = "text-gray-300"
// //                           }

// //                           return (
// //                             <button
// //                               key={i}
// //                               onClick={() => {
// //                                 if (treatmentInfo.hasTreatment && !treatmentInfo.isOverridden) {
// //                                   // If clicking on a day with active treatment, open delete modal
// //                                   setState([
// //                                     {
// //                                       startDate: day,
// //                                       endDate: day,
// //                                       key: "selection",
// //                                     },
// //                                   ])
// //                                   openModal("delete", treatmentInfo)
// //                                 } else {
// //                                   // Otherwise open add modal
// //                                   setState([
// //                                     {
// //                                       startDate: day,
// //                                       endDate: day,
// //                                       key: "selection",
// //                                     },
// //                                   ])
// //                                   openModal("add")
// //                                 }
// //                               }}
// //                               className={`
// //                                 w-8 h-12 flex flex-col items-center justify-start pt-1 m-[1px] 
// //                                 rounded-md text-xs font-medium
// //                                 hover:bg-gray-100 transition-colors
// //                                 ${treatmentInfo.hasOverlap ? "ring-1 ring-white" : ""}
// //                                 ${ringColor}
// //                               `}
// //                               style={{
// //                                 backgroundColor: bgColor,
// //                                 color: textColor,
// //                               }}
// //                               title={
// //                                 treatmentInfo.hasTreatment
// //                                   ? `${treatmentInfo.name} - ${treatmentInfo.treatment} (${treatmentInfo.daysCount} jours)${
// //                                       treatmentInfo.isOverridden
// //                                         ? ` - Remplacé par Session ${treatmentInfo.sessionNumber}`
// //                                         : treatmentInfo.hasOverlap
// //                                           ? " - Chevauche d'autres sessions"
// //                                           : ""
// //                                     }`
// //                                   : ""
// //                               }
// //                             >
// //                               {/* Day name */}
// //                               <span className={`text-[9px] font-medium ${dayNameColor} mb-1`}>{dayName}</span>

// //                               {/* Day number */}
// //                               <span className="text-sm">{day.getDate()}</span>

                              
// //                             </button>
// //                           )
// //                         })}
// //                       </div>
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
// //             ) : (
// //               <div className="text-center py-8 text-gray-500">
// //                 Aucun traitement programmé. Ajoutez une session pour voir l'agenda.
// //               </div>
// //             )}
// //           </div>

// //           {isModalOpen && (
// //             <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
// //               <div className="bg-white rounded-lg shadow-lg w-[95%] max-w-3xl p-8 relative">
// //                 <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={closeModal}>
// //                   <X size={20} />
// //                 </button>

// //                 {modalMode === "add" ? (
// //                   <>
// //                     {/* Add Mode */}
// //                     <h3 className="text-xl font-bold text-gray-800 mb-4">Ajouter une session</h3>

// //                     {/* Step 1: Choisir un médicament */}
// //                     <div className="mb-4">
// //                       <p className="text-lg font-semibold mb-2 text-green-800">1. Choisir un médicament</p>
// //                       <div className="flex flex-wrap gap-2">
// //                         {Object.keys(treatmentColors).map((treatment) => (
// //                           <button
// //                             key={treatment}
// //                             onClick={() => setSelectedTreatment(treatment)}
// //                             className={`px-3 py-1 rounded ${
// //                               selectedTreatment === treatment ? "border-2 border-green-800" : ""
// //                             }`}
// //                             style={{ backgroundColor: treatmentColors[treatment] }}
// //                           >
// //                             {treatment}
// //                           </button>
// //                         ))}
// //                       </div>
// //                     </div>

// //                     {/* Step 2: Sélectionner la date */}
// //                     <div>
// //                       <div className="flex justify-between items-center mb-2">
// //                         <p className="text-lg font-semibold text-green-800">2. Sélectionner la date</p>
// //                         <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
// //                           <Calendar className="h-4 w-4 text-gray-600 mr-1" />
// //                           <span className="text-sm font-medium text-gray-700">
// //                             {getSelectedDaysCount()} jour{getSelectedDaysCount() > 1 ? "s" : ""} sélectionné
// //                             {getSelectedDaysCount() > 1 ? "s" : ""}
// //                           </span>
// //                         </div>
// //                       </div>
// //                       <div className="max-h-[400px] overflow-y-auto">
// //                         <DateRange
// //                           ranges={state}
// //                           onChange={(item) => setState([item.selection])}
// //                           rangeColors={[treatmentColors[selectedTreatment] || "#90cdf4"]}
// //                           months={2}
// //                           direction="horizontal"
// //                           showMonthAndYearPickers={true}
// //                           showDateDisplay={true}
// //                           locale={fr}
// //                         />
// //                       </div>
// //                     </div>

// //                     {/* Save Button */}
// //                     <div className="mt-4">
// //                       <button
// //                         onClick={handleSave}
// //                         className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow"
// //                       >
// //                         Enregistrer
// //                       </button>
// //                     </div>
// //                   </>
// //                 ) : (
// //                   <>
// //                     {/* Delete Mode */}
// //                     <h3 className="text-xl font-bold text-gray-800 mb-4">
// //                       Suspension de traitement {selectedSession?.sessionNumber}
// //                     </h3>

// //                     <div className="mb-4">
// //                       <div className="flex items-center mb-2">
// //                         <div
// //                           className="w-4 h-4 rounded-sm mr-2"
// //                           style={{ backgroundColor: selectedSession?.color }}
// //                         ></div>
// //                         <p className="font-medium">
// //                           {selectedSession?.treatment} - Session {selectedSession?.sessionNumber}
// //                         </p>
// //                       </div>

// //                       <p className="text-sm text-gray-600 mb-4">Sélectionnez les jours à supprimer de cette session.</p>
// //                     </div>

// //                     {/* Select days to delete */}
// //                     <div>
// //                       <div className="flex justify-between items-center mb-2">
// //                         <p className="text-lg font-semibold text-red-800">Sélectionner les jours à supprimer</p>
// //                         <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
// //                           <Calendar className="h-4 w-4 text-gray-600 mr-1" />
// //                           <span className="text-sm font-medium text-gray-700">
// //                             {getSelectedDaysCount()} jour{getSelectedDaysCount() > 1 ? "s" : ""} sélectionné
// //                             {getSelectedDaysCount() > 1 ? "s" : ""}
// //                           </span>
// //                         </div>
// //                       </div>
// //                       <div className="max-h-[250px] overflow-y-auto">
// //                         <DateRange
// //                           ranges={state}
// //                           onChange={(item) => setState([item.selection])}
// //                           rangeColors={["#f87171"]} // red-400
// //                           months={2}
// //                           direction="horizontal"
// //                           showMonthAndYearPickers={true}
// //                           showDateDisplay={true}
// //                           locale={fr}
// //                         />
// //                       </div>
// //                     </div>

// //                     {/* Note for deletion */}
// //                     <div className="mt-4">
// //                       <label htmlFor="deletionNote" className="block text-sm font-medium text-gray-700 mb-1">
// //                         Raison de la Suspension
// //                       </label>
// //                       <textarea
// //                         id="deletionNote"
// //                         rows={3}
// //                         className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
// //                         placeholder="Expliquez pourquoi..."
// //                         value={deletionNote}
// //                         onChange={(e) => setDeletionNote(e.target.value)}
// //                       ></textarea>
// //                     </div>

// //                     {/* Action Buttons */}
// //                     <div className="mt-4 flex justify-between">
// //                       <button
// //                         onClick={closeModal}
// //                         className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded shadow"
// //                       >
// //                         Annuler
// //                       </button>
// //                       <button
// //                         onClick={handleDelete}
// //                         className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded shadow flex items-center"
// //                       >
// //                         <Trash2 size={18} className="mr-2" />
// //                         Supprimer les jours
// //                       </button>
// //                     </div>
// //                   </>
// //                 )}
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

// // export default ProfilePatient



// import { useState, useEffect } from "react"
// import { useParams } from "react-router-dom"
// import {
//   format,
//   addDays,
//   differenceInCalendarDays,
//   startOfMonth,
//   endOfMonth,
//   eachDayOfInterval,
//   isSameDay,
//   getMonth,
//   getYear,
//   isAfter,
//   isBefore,
//   getDay,
// } from "date-fns"
// import { fr } from "date-fns/locale"
// import { PatientSidebar } from "./components/PatientSideBar"
// import { Agenda } from "./components/Agenda"
// import { TreatmentModal } from "./components/TreatmentModal"

// function ProfilePatient() {
//   const [fiche, setFiche] = useState(null)
//   const [patient, setPatient] = useState(null)
//   const [expandedSection, setExpandedSection] = useState(null)
//   const { id } = useParams()

//   // Configuration des traitements
//   const treatmentColors = {
//     RHZ: "#fecaca",
//     RHZE: "#bfdbfe",
//     RH: "#fef9c3",
//     R: "#e9d5ff",
//     E: "#fbcfe8",
//     Z: "#bbf7d0",
//     H: "#bbf7d0",
//     S: "#bbf7d0",
//   }

//   // États pour l'agenda et les traitements
//   const [selectedTreatment, setSelectedTreatment] = useState("RHZ")
//   const [state, setState] = useState([{ startDate: new Date(), endDate: addDays(new Date(), 6), key: "selection" }])
//   const [isModalOpen, setIsModalOpen] = useState(false)
//   const [treatments, setTreatments] = useState([])
//   const [agendaMonths, setAgendaMonths] = useState([])
//   const [sessionCounter, setSessionCounter] = useState(1)
//   const [treatmentBoundaries, setTreatmentBoundaries] = useState({ earliestDate: null, latestDate: null })
//   const [showInfoTooltip, setShowInfoTooltip] = useState(false)
//   const [activeDaysCount, setActiveDaysCount] = useState({})
//   const [modalMode, setModalMode] = useState("add")
//   const [selectedSession, setSelectedSession] = useState(null)
//   const [deletionNote, setDeletionNote] = useState("")
//   const [sessionNotes, setSessionNotes] = useState({})


//   // Fonctions utilitaires pour les traitements
//   const calculateTreatmentBoundaries = (treatmentsList) => {
//     // Implémentation existante
//   }

//   const calculateActiveDaysCount = (treatmentsList) => {
//     // Implémentation existante
//   }

//   const generateAgendaMonths = (treatmentsList) => {
//     // Implémentation existante
//   }
//   const openModal = (mode = "add", sessionInfo = null) => {
//      setModalMode(mode)
//      setSelectedSession(sessionInfo)

//      if (mode === "delete" && sessionInfo) {
//        // Set the date range to the selected day for deletion
//        setState([
//          {
//            startDate: state[0].startDate,
//            endDate: state[0].endDate,
//            key: "selection",
//          },
//        ])
//      }

//      setIsModalOpen(true)
//    }
//   const closeModal = () => {
//     setIsModalOpen(false)
//      setModalMode("add")
//      setSelectedSession(null)
//      setDeletionNote("")
//   }
  


//   const handleSave = () => {
    
//     const start = state[0].startDate
//     const end = state[0].endDate
//     const days = differenceInCalendarDays(end, start) + 1

//     // Générer correctement toutes les dates dans l'intervalle
//     const dates = []
//     for (let i = 0; i < days; i++) {
//       dates.push(addDays(new Date(start), i))
//     }

//     // Add new treatment with color information and session number
//     const newTreatment = {
//       dates: dates,
//       treatment: selectedTreatment,
//       color: treatmentColors[selectedTreatment],
//       sessionNumber: sessionCounter,
//       daysCount: days,
//       timestamp: Date.now(), // Add timestamp to track order of addition
//     }

//     const updatedTreatments = [...treatments, newTreatment]
//     setTreatments(updatedTreatments)

//     // Increment session counter for next session
//     setSessionCounter(sessionCounter + 1)

//     // Update treatment boundaries
//     const newBoundaries = calculateTreatmentBoundaries(updatedTreatments)
//     setTreatmentBoundaries(newBoundaries)

//     // Update active days count
//     const newActiveDaysCount = calculateActiveDaysCount(updatedTreatments)
//     setActiveDaysCount(newActiveDaysCount)

//     // Update agenda months based on new treatments
//     const updatedAgendaMonths = generateAgendaMonths(updatedTreatments)
//     setAgendaMonths(updatedAgendaMonths)

//     setIsModalOpen(false)
//   }


    
// const handleDelete = () => {
//     if (!selectedSession) return

//     const start = state[0].startDate
//     const end = state[0].endDate

//     const updatedTreatments = treatments
//       .map((treatment) => {
//         if (treatment.sessionNumber === selectedSession.sessionNumber) {
//           const updatedDates = treatment.dates.filter((date) => {
//             const dateToCheck = new Date(date)
//             const startToCheck = new Date(start)
//             const endToCheck = new Date(end)

//             dateToCheck.setHours(0, 0, 0, 0)
//             startToCheck.setHours(0, 0, 0, 0)
//             endToCheck.setHours(0, 0, 0, 0)

//             return !(dateToCheck >= startToCheck && dateToCheck <= endToCheck)
//           })

//           if (deletionNote.trim()) {
//             const noteKey = `session_${treatment.sessionNumber}_deletion_${Date.now()}`
//             setSessionNotes((prev) => ({
//               ...prev,
//               [noteKey]: {
//                 sessionNumber: treatment.sessionNumber,
//                 date: new Date(),
//                 note: deletionNote,
//                 deletedRange: `${format(start, "dd/MM/yyyy")} - ${format(end, "dd/MM/yyyy")}`,
//                 treatment: treatment.treatment,
//               },
//             }))
//           }

//           return {
//             ...treatment,
//             dates: updatedDates,
//             daysCount: updatedDates.length,
//           }
//         }
//         return treatment
//       })
//       .filter((t) => t.dates.length > 0)

//     setTreatments(updatedTreatments)
//     setTreatmentBoundaries(calculateTreatmentBoundaries(updatedTreatments))
//     setActiveDaysCount(calculateActiveDaysCount(updatedTreatments))
//     setAgendaMonths(generateAgendaMonths(updatedTreatments))
//     closeModal()
//   }


//   const getTreatmentInfo = (date) => {
//   if (!treatmentBoundaries || !treatmentBoundaries.earliestDate || !treatmentBoundaries.latestDate) {
//     return {
//       hasTreatment: false,
//       isOutsideTreatmentPeriod: false,
//     }
//   }

//   if (
//     isBefore(date, treatmentBoundaries.earliestDate) ||
//     isAfter(date, treatmentBoundaries.latestDate)
//   ) {
//     return {
//       hasTreatment: false,
//       isOutsideTreatmentPeriod: true,
//     }
//   }

//   const matchingTreatments = treatments.filter((treatment) =>
//     treatment.dates.some((treatmentDate) => isSameDay(treatmentDate, date)),
//   )

//   if (matchingTreatments.length > 0) {
//     matchingTreatments.sort((a, b) => b.timestamp - a.timestamp)
//     const mostRecentTreatment = matchingTreatments[0]
//     const isOverridden =
//       matchingTreatments.length > 1 &&
//       matchingTreatments[0].timestamp > matchingTreatments[1].timestamp

//     return {
//       hasTreatment: true,
//       color: mostRecentTreatment.color,
//       name: `Session ${mostRecentTreatment.sessionNumber}`,
//       daysCount: mostRecentTreatment.daysCount,
//       isOutsideTreatmentPeriod: false,
//       sessionNumber: mostRecentTreatment.sessionNumber,
//       treatment: mostRecentTreatment.treatment,
//       hasOverlap: matchingTreatments.length > 1,
//       isOverridden: isOverridden,
//       overriddenSessionNumber: isOverridden
//         ? matchingTreatments[1].sessionNumber
//         : null,
//       allTreatments: matchingTreatments,
//     }
//   }

//   return {
//     hasTreatment: false,
//     isOutsideTreatmentPeriod: false,
//   }
// }


//   const getSelectedDaysCount = () => {
//     if (!state[0].startDate || !state[0].endDate) return 0
//     return differenceInCalendarDays(state[0].endDate, state[0].startDate) + 1
//   }

//   // Effets et chargement des données
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const resFiche = await fetch(`http://localhost:5000/fiches/${id}`)
//         const dataFiche = await resFiche.json()
//         setFiche(dataFiche)

//         if (dataFiche && dataFiche.IDPatient) {
//           const resPatient = await fetch(`http://localhost:5000/patients/${dataFiche.IDPatient}`)
//           const dataPatient = await resPatient.json()
//           setPatient(dataPatient)
//         }
//       } catch (error) {
//         console.error("Erreur lors de la récupération des données:", error)
//       }
//     }
//     fetchData()

//     setAgendaMonths(generateAgendaMonths([]))
//   }, [id])

//   const toggleSection = (section) => {
//     setExpandedSection((prev) => (prev === section ? null : section))
//   }

//   if (!fiche || !patient) return <div className="p-5">Chargement...</div>

//   return (
//     <div className="pt-6 w-full min-h-screen bg-white p-2">
//       <div className="grid grid-cols-[300px_1fr] gap-0 min-h-screen">
//         <PatientSidebar
//           patient={patient}
//           fiche={fiche}
//           expandedSection={expandedSection}
//           toggleSection={toggleSection}
//           sessionNotes={sessionNotes}
//         />

//         <Agenda
//           treatments={treatments}
//           treatmentColors={treatmentColors}
//           agendaMonths={agendaMonths}
//           treatmentBoundaries={treatmentBoundaries}
//           activeDaysCount={activeDaysCount}
//           sessionNotes={sessionNotes}
//           openModal={openModal}
//           getTreatmentInfo={getTreatmentInfo}
//         />

      

//       </div>

//       <TreatmentModal
//         isModalOpen={isModalOpen}
//         closeModal={closeModal}
//         modalMode={modalMode}
//         selectedTreatment={selectedTreatment}
//         setSelectedTreatment={setSelectedTreatment}
//         treatmentColors={treatmentColors}
//         state={state}
//         setState={setState}
//         getSelectedDaysCount={getSelectedDaysCount}
//         handleSave={handleSave}
//         handleDelete={handleDelete}
//         selectedSession={selectedSession}
//         deletionNote={deletionNote}
//         setDeletionNote={setDeletionNote}
//       />
//     </div>
//   )
// }

// export default ProfilePatient



import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  ChevronDown,
  ChevronRight,
  HeartPulse,
  Phone,
  UserCircle2,
  Calendar,
} from "lucide-react";
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
} from "date-fns";
import { fr } from "date-fns/locale";
import Agenda from "./Agenda";
import SessionCreationModal from "./SessionCreationModal";

function ProfilePatient() {
  const { id } = useParams();

  const [fiche, setFiche] = useState(null);
  const [patient, setPatient] = useState(null);
  const [expandedSection, setExpandedSection] = useState(null);

  const treatmentColors = {
    RHZ: "#f87171",
    RHZE: "#60a5fa",
    RH: "#facc15",
    R: "#c084fc",
    H: "#fb923c",
    Z: "#34d399",
    E: "#f472b6",
    S: "#94a3b8",
  };

  const [selectedTreatment, setSelectedTreatment] = useState("RHZ");
  const [state, setState] = useState([
    { startDate: new Date(), endDate: addDays(new Date(), 6), key: "selection" },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedSession, setSelectedSession] = useState(null);
  const [deletionNote, setDeletionNote] = useState("");

  const [treatments, setTreatments] = useState([]);
  const [agendaMonths, setAgendaMonths] = useState([]);
  const [sessionCounter, setSessionCounter] = useState(1);
  const [treatmentBoundaries, setTreatmentBoundaries] = useState({ earliestDate: null, latestDate: null });
  const [showInfoTooltip, setShowInfoTooltip] = useState(false);
  const [activeDaysCount, setActiveDaysCount] = useState({});
  const [sessionNotes, setSessionNotes] = useState({});
  
  const getSelectedDaysCount = () => {
    if (!state[0].startDate || !state[0].endDate) return 0;
    return differenceInCalendarDays(state[0].endDate, state[0].startDate) + 1;
  };

  const openModal = (mode = "add", sessionInfo = null) => {
    setModalMode(mode);
    setSelectedSession(sessionInfo);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setModalMode("add");
    setSelectedSession(null);
    setDeletionNote("");
  };
  // Function to handle session closure
  const handleSessionClosed = (sessionId) => {
    console.log("Session closed, updating treatments:", sessionId);
    
    // Update treatments to mark the closed session as inactive
    const updatedTreatments = treatments.map(treatment => {
      // Find the treatment that corresponds to this session
      // We'll update based on the active status since we don't store sessionId in treatments
      if (treatment.isActive) {
        return {
          ...treatment,
          isActive: false,
          isClosed: true
        };
      }
      return treatment;
    });
    
    setTreatments(updatedTreatments);
    console.log("Treatments updated after session closure");
  };

  // Function to handle sessions fetched from backend
  const handleSessionsFetched = (sessionsData) => {
    console.log("Converting sessions to treatments:", sessionsData);
    
    const convertedTreatments = sessionsData.map((session, index) => {
      const startDate = new Date(session.dateDebut);
      const endDate = new Date(session.dateFin);
      const days = [];
      
      // Generate array of dates from start to end
      for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
        days.push(new Date(d));
      }
      
      return {
        dates: days,
        treatment: session.traitement,
        color: treatmentColors[session.traitement] || "#90cdf4",
        sessionNumber: session.sessionNumber || (index + 1),
        daysCount: days.length,
        timestamp: new Date(session.dateDebut).getTime(),
        isActive: session.statut === true, // Preserve the actual session status
        isClosed: session.statut === false // Add a flag to track closed sessions
      };
    });
    
    console.log("Converted treatments:", convertedTreatments);
    
    setTreatments(convertedTreatments);
    setTreatmentBoundaries(calculateTreatmentBoundaries(convertedTreatments));
    setActiveDaysCount(calculateActiveDaysCount(convertedTreatments));
    setAgendaMonths(generateAgendaMonths(convertedTreatments));
    
    // Update session counter to continue from the last session
    if (convertedTreatments.length > 0) {
      const maxSessionNumber = Math.max(...convertedTreatments.map(t => t.sessionNumber || 0));
      setSessionCounter(maxSessionNumber + 1);
    }
  };

  const calculateTreatmentBoundaries = (list) => {
    const allDates = list.flatMap((t) => t.dates);
    if (!allDates.length) return { earliestDate: null, latestDate: null };
    return {
      earliestDate: allDates.reduce((a, b) => (isBefore(b, a) ? b : a), allDates[0]),
      latestDate: allDates.reduce((a, b) => (isAfter(b, a) ? b : a), allDates[0]),
    };
  };

  const calculateActiveDaysCount = (list) => {
    const claimed = new Set();
    const sorted = [...list].sort((a, b) => b.timestamp - a.timestamp);
    const active = {};
    sorted.forEach((t) => {
      let count = 0;
      t.dates.forEach((d) => {
        const str = d.toISOString().split("T")[0];
        if (!claimed.has(str)) {
          claimed.add(str);
          count++;
        }
      });
      active[t.sessionNumber] = count;
    });
    return active;
  };

  const generateAgendaMonths = (list) => {
    const allDates = list.flatMap((t) => t.dates);
    const uniqueMonths = {};
    allDates.forEach((date) => {
      const key = `${getYear(date)}-${getMonth(date)}`;
      if (!uniqueMonths[key]) {
        const start = startOfMonth(date);
        const end = endOfMonth(date);
        uniqueMonths[key] = {
          name: format(start, "MMM", { locale: fr }),
          year: format(start, "yyyy"),
          days: eachDayOfInterval({ start, end }),
          monthKey: key,
        };
      }
    });
  //   return Object.values(uniqueMonths).sort((a, b) => a.monthKey.localeCompare(b.monthKey));
      return Object.values(uniqueMonths)
    .sort((a, b) => {
      const [yearA, monthA] = a.monthKey.split('-').map(Number);
      const [yearB, monthB] = b.monthKey.split('-').map(Number);
      
      return yearA === yearB 
        ? monthA - monthB 
        : yearA - yearB;
    });
};

const [activeSessionNumber, setActiveSessionNumber] = useState(null);


const handleSave = () => {
  const start = state[0].startDate;
  const end = state[0].endDate;
  const days = differenceInCalendarDays(end, start) + 1;
  const dates = Array.from({ length: days }, (_, i) => addDays(start, i));

  const newTreatment = {
    dates,
    treatment: selectedTreatment,
    color: treatmentColors[selectedTreatment],
    sessionNumber: sessionCounter,
    daysCount: days,
    timestamp: Date.now(),

    isActive: true // New session is active

  };

  // Keep all existing treatments but add the new one
  // Don't modify existing treatments' isActive status here
  const updated = [...treatments, newTreatment];
  
  setTreatments(updated);
  setActiveSessionNumber(sessionCounter);
  setSessionCounter((s) => s + 1);
  setTreatmentBoundaries(calculateTreatmentBoundaries(updated));
  setActiveDaysCount(calculateActiveDaysCount(updated));
  setAgendaMonths(generateAgendaMonths(updated));

  
  const sessionInfo = {
    traitement: selectedTreatment,
    dateDebut: start.toISOString(),
    dateFin: end.toISOString(),
    sessionNumber: sessionCounter,
    isActive: true,
    statut: true
  };
  localStorage.setItem("sessionTempData", JSON.stringify(sessionInfo));

  closeModal();
};

  const handleDelete = () => {
    if (!selectedSession) return;

    const start = new Date(state[0].startDate);
    const end = new Date(state[0].endDate);

    const updated = treatments
      .map((t) => {
        if (t.sessionNumber === selectedSession.sessionNumber) {
          const filteredDates = t.dates.filter((d) => d < start || d > end);
          if (deletionNote.trim()) {
            const noteKey = `session_${t.sessionNumber}_deletion_${Date.now()}`;
            setSessionNotes((prev) => ({
              ...prev,
              [noteKey]: {
                sessionNumber: t.sessionNumber,
                date: new Date(),
                note: deletionNote,
                deletedRange: `${format(start, "dd/MM/yyyy")} - ${format(end, "dd/MM/yyyy")}`,
                treatment: t.treatment,
              },
            }));
          }
          return { ...t, dates: filteredDates, daysCount: filteredDates.length };
        }
        return t;
      })
      .filter((t) => t.dates.length > 0);

    setTreatments(updated);
    setTreatmentBoundaries(calculateTreatmentBoundaries(updated));
    setActiveDaysCount(calculateActiveDaysCount(updated));
    setAgendaMonths(generateAgendaMonths(updated));
    closeModal();
  };  const getTreatmentInfo = (date, specificSessionNumber = null) => {
    if (treatmentBoundaries.earliestDate && treatmentBoundaries.latestDate) {
      if (isBefore(date, treatmentBoundaries.earliestDate) || isAfter(date, treatmentBoundaries.latestDate)) {
        return { hasTreatment: false, isOutsideTreatmentPeriod: true };
      }
    }

    const matches = treatments.filter((t) => t.dates.some((d) => isSameDay(d, date)));
    if (matches.length > 0) {
      // If a specific session is requested (for row-based display), return that session's info
      if (specificSessionNumber !== null) {
        const sessionMatch = matches.find(t => t.sessionNumber === specificSessionNumber);
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
            isOverridden: false, // Never override in session-specific view
            overriddenSessionNumber: null,
            allTreatments: matches,
            isActive: sessionMatch.isActive,
            isClosed: sessionMatch.isClosed || false
          };
        } else {
          return { hasTreatment: false, isOutsideTreatmentPeriod: false };
        }
      }

      // For global view (context menu, etc.), use the most recent session
      matches.sort((a, b) => b.timestamp - a.timestamp);
      const recent = matches[0];
      const isOverridden = matches.length > 1 && recent.timestamp > matches[1].timestamp;
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
        isClosed: recent.isClosed || false
      };
    }

    return { hasTreatment: false, isOutsideTreatmentPeriod: false };
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resFiche = await fetch(`http://localhost:5000/fiches/${id}`);
        const dataFiche = await resFiche.json();
        setFiche(dataFiche);

        localStorage.setItem("idfich", dataFiche._id);

        if (dataFiche?.IDPatient) {
          const resPatient = await fetch(`http://localhost:5000/patients/${dataFiche.IDPatient}`);
          const dataPatient = await resPatient.json();
          setPatient(dataPatient);
        }
      } catch (err) {
        console.error("Erreur:", err);
      }
    };
    fetchData();
    setAgendaMonths(generateAgendaMonths([]));
  }, [id]);

  const toggleSection = (key) => {
    setExpandedSection((prev) => (prev === key ? null : key));
  };

  if (!fiche || !patient) return <div className="p-5">Chargement...</div>;

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
                <span className="text-gray-600 text-sm">ID: {patient.IDPatient}</span>
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
                      <span className="text-gray-800">{patient.adresse?.commune} {patient.adresse?.wilaya}</span>
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

              
          </div>
        </div>        {/* RIGHT AGENDA PANEL */}
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
  );
}

export default ProfilePatient;