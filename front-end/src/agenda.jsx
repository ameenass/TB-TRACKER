// import { useState } from "react"
// import { format, isSameDay, getDay } from "date-fns"
// import { fr } from "date-fns/locale"
// import { Plus, Info } from "lucide-react"

// export function Agenda({
//   treatments,
//   treatmentColors,
//   agendaMonths,
//   treatmentBoundaries,
//   activeDaysCount = {},
//   sessionNotes,
//   openModal,
//   getTreatmentInfo,
// }) {
//   const [showInfoTooltip, setShowInfoTooltip] = useState(false)

//   return (
//     <div className="p-4">
//       <AgendaHeader
//         showInfoTooltip={showInfoTooltip}
//         setShowInfoTooltip={setShowInfoTooltip}
//         openModal={openModal}
//       />

//       <TreatmentLegend
//         treatments={treatments}
//         activeDaysCount={activeDaysCount}
//       />

//       <AgendaGrid
//         agendaMonths={agendaMonths}
//         getTreatmentInfo={getTreatmentInfo}
//         openModal={openModal}
//       />

//       <Agenda
//   treatments={treatments}
//   treatmentColors={treatmentColors}
//   agendaMonths={agendaMonths}
//   treatmentBoundaries={treatmentBoundaries || { earliestDate: null, latestDate: null }}
//   activeDaysCount={activeDaysCount}
//   sessionNotes={sessionNotes}
//   openModal={openModal}
//   getTreatmentInfo={getTreatmentInfo}
// />

//     </div>
//   )
// }

// function AgendaHeader({ showInfoTooltip, setShowInfoTooltip, openModal }) {
//   return (
//     <div className="flex justify-between items-center mb-4">
//       <div className="flex items-center">
//         <h2 className="text-2xl font-bold text-gray-800 mr-2">Agenda</h2>
//         <InfoTooltip
//           showInfoTooltip={showInfoTooltip}
//           setShowInfoTooltip={setShowInfoTooltip}
//         />
//       </div>
//       <button
//         onClick={() => openModal("add")}
//         className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded shadow flex items-center gap-1"
//       >
//         <Plus size={18} />
//         Session
//       </button>
//     </div>
//   )
// }

// function InfoTooltip({ showInfoTooltip, setShowInfoTooltip }) {
//   return (
//     <div
//       className="relative"
//       onMouseEnter={() => setShowInfoTooltip(true)}
//       onMouseLeave={() => setShowInfoTooltip(false)}
//     >
//       <button className="text-gray-400 hover:text-gray-600 transition-colors">
//         <Info size={16} />
//       </button>
//       {showInfoTooltip && (
//         <div className="absolute left-0 top-full mt-2 w-64 p-2 bg-white shadow-lg rounded-md border border-gray-200 z-10 text-xs text-gray-600">
//           <p className="mb-1">• Les jours en gris sont hors période de traitement</p>
//           <p className="mb-1">• Les sessions récentes remplacent les anciennes (chevauchement)</p>
//           <p className="mb-1">• Les jours remplacés apparaissent en gris</p>
//           <p>• Cliquez sur un jour pour ajouter ou supprimer une session</p>
//         </div>
//       )}
//     </div>
//   )
// }

// function TreatmentLegend({ treatments, activeDaysCount }) {
//   return (
//     <div className="mb-4 flex flex-wrap gap-2">
//       {Array.isArray(treatments) &&
//         treatments
//           .filter((t) => t && typeof t === "object" && t.sessionNumber !== undefined)
//           .map((treatment) => (
//             <div key={treatment.sessionNumber} className="flex items-center">
//               <div
//                 className="w-4 h-4 rounded-sm mr-1"
//                 style={{ backgroundColor: treatment.color || "#ccc" }}
//               ></div>
//               <span className="text-xs text-gray-700">
//                 Session {treatment.sessionNumber} ({activeDaysCount[treatment.sessionNumber] || 0} jours)
//               </span>
//             </div>
//           ))}
//       <div className="flex items-center ml-2">
//         <div className="w-4 h-4 rounded-sm mr-1 bg-gray-100 border border-gray-200"></div>
//         <span className="text-xs text-gray-500">Inactif / hors période</span>
//       </div>
//     </div>
//   )
// }
// function generateEmptyMonth() {
//   const today = new Date()
//   const start = new Date(today.getFullYear(), today.getMonth(), 1)
//   const end = new Date(today.getFullYear(), today.getMonth() + 1, 0)
//   const days = []

//   for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
//     days.push(new Date(d))
//   }

//   return {
//     monthKey: `${today.getFullYear()}-${today.getMonth() + 1}`,
//     name: format(today, "LLLL", { locale: fr }),
//     year: today.getFullYear(),
//     days,
//   }
// }

// function AgendaGrid({ agendaMonths, getTreatmentInfo, openModal }) {
//   return (
//     <div className="relative">
//   {(Array.isArray(agendaMonths) && agendaMonths.length > 0
//     ? agendaMonths
//     : [generateEmptyMonth()]
//   ).map((month) => (
//     <div key={month.monthKey} className="flex border-gray-200 last:border-b-0">
//       <div className="w-16 py-2 pr-0 font-medium text-gray-700 text-right sticky left-0 bg-white">
//         {month.name} <span className="text-xs text-gray-500">{month.year}</span>
//       </div>
//       <div className="flex-1 py-2 pl-2">
//         <div className="flex flex-wrap">
//           {Array.from({ length: getDay(month.days[0]) === 0 ? 6 : getDay(month.days[0]) - 1 }).map(
//             (_, i) => (
//               <div key={`empty-${i}`} className="w-8 h-12 m-[1px] invisible"></div>
//             )
//           )}
//           {month.days.map((day, i) => (
//             <DayCell
//               key={i}
//               day={day}
//               getTreatmentInfo={getTreatmentInfo}
//               openModal={openModal}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   ))}
// </div>

//   )
// }

// function DayCell({ day, getTreatmentInfo, openModal }) {
//   const treatmentInfo = getTreatmentInfo(day)
//   const isToday = isSameDay(day, new Date())
//   const dayName = format(day, "EEE", { locale: fr }).substring(0, 1).toUpperCase()

//   let bgColor = "white"
//   let textColor = "inherit"
//   let dayNameColor = "text-gray-400"
//   const ringClass = isToday ? "ring-2 ring-green-500" : ""

//   if (treatmentInfo.hasTreatment) {
//     if (treatmentInfo.isOverridden) {
//       bgColor = "#f3f4f6"
//       textColor = "#9ca3af"
//       dayNameColor = "text-gray-300"
//     } else {
//       bgColor = treatmentInfo.color || "#ccc"
//       dayNameColor = "text-gray-600"
//     }
//   } else if (treatmentInfo.isOutsideTreatmentPeriod) {
//     bgColor = "#f3f4f6"
//     textColor = "#9ca3af"
//     dayNameColor = "text-gray-300"
//   }

//   return (
//     <button
//       onClick={() => {
//         if (treatmentInfo.hasTreatment && !treatmentInfo.isOverridden) {
//           openModal("delete", treatmentInfo)
//         } else {
//           openModal("add", { date: day })
//         }
//       }}
//       className={`w-8 h-12 flex flex-col items-center justify-start pt-1 m-[1px] 
//         rounded-md text-xs font-medium transition-colors hover:bg-gray-100 
//         ${treatmentInfo.hasOverlap ? "ring-1 ring-white" : ""} ${ringClass}`}
//       style={{
//         backgroundColor: bgColor,
//         color: textColor,
//       }}
//       title={
//         treatmentInfo.hasTreatment
//           ? `${treatmentInfo.name} - ${treatmentInfo.treatment} (${treatmentInfo.daysCount} jours)${
//               treatmentInfo.isOverridden
//                 ? ` - Remplacé par Session ${treatmentInfo.sessionNumber}`
//                 : treatmentInfo.hasOverlap
//                   ? " - Chevauchement"
//                   : ""
//             }`
//           : ""
//       }
//     >
//       <span className={`text-[9px] font-medium ${dayNameColor} mb-1`}>{dayName}</span>
//       <span className="text-sm">{day.getDate()}</span>
//     </button>
//   )
// }


// import { Info, Plus } from "lucide-react";
// import { format, isSameDay, getDay } from "date-fns";
// import { fr } from "date-fns/locale";

// function Agenda({
//   treatments,
//   activeDaysCount,
//   agendaMonths,
//   getTreatmentInfo,
//   setState,
//   openModal,
//   showInfoTooltip,
//   setShowInfoTooltip,
// }) {
//   return (
//     <div className="p-4">
//       <div className="flex justify-between items-center mb-4">
//         <div className="flex items-center">
//           <h2 className="text-2xl font-bold text-gray-800 mr-2">Agenda</h2>
//           <div className="relative">
//             <button
//               className="text-gray-400 hover:text-gray-600 transition-colors"
//               onMouseEnter={() => setShowInfoTooltip(true)}
//               onMouseLeave={() => setShowInfoTooltip(false)}
//             >
//               <Info size={16} />
//             </button>
//             {showInfoTooltip && (
//               <div className="absolute left-0 top-full mt-2 w-64 p-2 bg-white shadow-lg rounded-md border border-gray-200 z-10 text-xs text-gray-600">
//                 <p className="mb-1">• Les jours en gris sont en dehors de la période de traitement</p>
//                 <p className="mb-1">• Les sessions plus récentes remplacent les anciennes en cas de chevauchement</p>
//                 <p className="mb-1">• Les jours remplacés d'une session apparaissent en gris</p>
//                 <p>• Cliquez sur un jour pour ajouter ou supprimer une session</p>
//               </div>
//             )}
//           </div>
//         </div>
//         <button
//           onClick={() => openModal("add")}
//           className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded shadow flex items-center gap-1"
//         >
//           <Plus size={18} />
//           Session
//         </button>
//       </div>

//       {treatments.length > 0 && (
//         <div className="mb-4 flex flex-wrap gap-2">
//           {treatments.map((treatment) => (
//             <div key={treatment.sessionNumber} className="flex items-center">
//               <div
//                 className="w-4 h-4 rounded-sm mr-1"
//                 style={{ backgroundColor: treatment.color }}
//               ></div>
//               <span className="text-xs text-gray-700">
//                 Session {treatment.sessionNumber} ({activeDaysCount[treatment.sessionNumber] || 0} jours actifs)
//               </span>
//             </div>
//           ))}
//           <div className="flex items-center ml-2">
//             <div className="w-4 h-4 rounded-sm mr-1 bg-gray-100 border border-gray-200"></div>
//             <span className="text-xs text-gray-500">Jours inactifs/hors période</span>
//           </div>
//         </div>
//       )}

//       <div className="max-h-[calc(100vh-200px)] overflow-y-auto border border-gray-200 rounded-lg shadow-sm">
//         {agendaMonths.length > 0 ? (
//           <div className="relative">
//             {agendaMonths.map((month) => (
//               <div key={month.monthKey} className="flex border-gray-200 last:border-b-0">
//                 <div className="w-16 py-2 pr-0 font-medium text-gray-700 text-right sticky left-0 bg-white">
//                   {month.name} <span className="text-xs text-gray-500">{month.year}</span>
//                 </div>

//                 <div className="flex-1 py-2 pl-2">
//                   <div className="flex flex-wrap">
//                     {Array.from({
//                       length: getDay(month.days[0]) === 0 ? 6 : getDay(month.days[0]) - 1,
//                     }).map((_, i) => (
//                       <div key={`empty-${i}`} className="w-8 h-12 m-[1px] invisible"></div>
//                     ))}

//                     {month.days.map((day, i) => {  // i index pour la cle react
//                       const treatmentInfo = getTreatmentInfo(day);    // pour les infos du jour
//                       const isToday = isSameDay(day, new Date());
//                       const dayName = format(day, "EEE", { locale: fr }).substring(0, 1).toUpperCase();

//                       let bgColor = "white";
//                       let textColor = "inherit";
//                       let dayNameColor = "text-gray-400";
//                       const ringColor = isToday ? "ring-2 ring-green-500" : "";

//                       if (treatmentInfo.hasTreatment) {
//                         if (treatmentInfo.isOverridden) {
//                           bgColor = "#f3f4f6";
//                           textColor = "#9ca3af";
//                           dayNameColor = "text-gray-300";
//                         } else {
//                           bgColor = treatmentInfo.color; // il prend la couleur de la session 
//                           dayNameColor = "text-gray-600";
//                         }
//                       } else if (treatmentInfo.isOutsideTreatmentPeriod) {
//                         bgColor = "#f3f4f6";
//                         textColor = "#9ca3af";
//                         dayNameColor = "text-gray-300";
//                       }

//                       return (
//                         <button
//                           key={i}
//                           onClick={() => { // 2 actions pour la suppression/ajout une pour la selection setstate et l'autre pour supprimer/add qui sont selectionnes
//                             setState([
//                               {
//                                 startDate: day,
//                                 endDate: day,
//                                 key: "selection",
//                               },
//                             ]);
//                             openModal(
//                               treatmentInfo.hasTreatment && !treatmentInfo.isOverridden ? "delete" : "add",
//                               treatmentInfo
//                             );
//                           }}
//                           className={`
//                             w-8 h-12 flex flex-col items-center justify-start pt-1 m-[1px] 
//                             rounded-md text-xs font-medium
//                             hover:bg-gray-100 transition-colors
//                             ${treatmentInfo.hasOverlap ? "ring-1 ring-white" : ""}
//                             ${ringColor}
//                           `}
//                           style={{
//                             backgroundColor: bgColor,
//                             color: textColor,
//                           }}
//                           title={
//                             treatmentInfo.hasTreatment
//                               ? `${treatmentInfo.name} - ${treatmentInfo.treatment} (${treatmentInfo.daysCount} jours)` +
//                                 (treatmentInfo.isOverridden
//                                   ? ` - Remplacé par Session ${treatmentInfo.sessionNumber}`
//                                   : treatmentInfo.hasOverlap
//                                   ? " - Chevauche d'autres sessions"
//                                   : "")
//                               : ""
//                           }
//                         >
//                           <span className={`text-[9px] font-medium ${dayNameColor} mb-1`}>{dayName}</span>
//                           <span className="text-sm">{day.getDate()}</span>
//                         </button>
//                       );
//                     })}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-8 text-gray-500">
//             Aucun traitement programmé. Ajoutez une session pour voir l'agenda.
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Agenda;


// // Fusionné : Fonctionnalités du 1er code + sous-menu contextuel du 2ème code
// import { Info, Plus, AlertCircle, PauseCircle, StickyNote , CalendarPlus } from "lucide-react";
// import { format, isSameDay, getDay } from "date-fns";
// import { fr } from "date-fns/locale";
// import { useRef, useState ,useEffect } from "react";
// import ModalEffetsSecondaires from "./ModalEffetsSecondaires";


// function Agenda({
//   treatments, activeDaysCount, agendaMonths, getTreatmentInfo, setState, openModal,showInfoTooltip, setShowInfoTooltip,})
//    {
//   const [selectedDay, setSelectedDay] = useState(null);
//   const [contextMenuPosition, setContextMenuPosition] = useState(null);
//   const [isSideEffectModalOpen, setIsSideEffectModalOpen] = useState(false);

//   const [noteInputVisible, setNoteInputVisible] = useState(false);
//   const [noteText, setNoteText] = useState("");
//   const [notes, setNotes] = useState([]); // pour stocker les notes ajoutées
//   const [rendezVousDates, setRendezVousDates] = useState([]); // dates des rendez-vous

//   const [isSessionClosed, setIsSessionClosed] = useState(false);
// //   const [statut,setStatut] = useState(true);



// // useEffect(() => {
// //   const sessionTempData = localStorage.getItem("sessionTempData");
// //   if (sessionTempData) {
// //     const session = JSON.parse(sessionTempData);

// //     // tu peux stocker ça dans un useState ou l'envoyer directement au backend
// //     console.log("Session récupérée:", session);

// //     // Optionnel : l'envoyer tout de suite au backend
// //     // fetch("/api/sessions", {
// //     //   method: "POST",
// //     //   headers: { "Content-Type": "application/json" },
// //     //   body: JSON.stringify(session),
// //     // });

// //     // Nettoyer si tu veux pas que ça reste
// //     localStorage.removeItem("sessionTempData");
// //   }
// // }, []);



// // const saveSessionToBackend = async () => {
// //   const sessionTempData = localStorage.getItem("sessionTempData");
// //   if (!sessionTempData) return;

// //   const session = JSON.parse(sessionTempData);
// //    const idfich = localStorage.getItem("idfich");
// //   const payload = {
// //     ...session,
// //     idfich,
// //     statut,
// //     rendezVous: rendezVousDates,
// //     notes: notes.map((note) => ({
// //       text: note.text,
// //       date: format(note.date, "yyyy-MM-dd"),
// //     })),
// //   };

// //   try {
// //     const response = await fetch("http://localhost:5000/sessions", {
// //       method: "POST",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify(payload),
// //     });

// //     if (!response.ok) throw new Error("Erreur lors de l'enregistrement");

// //     console.log("Session sauvegardée avec succès !");
// //     localStorage.removeItem("sessionTempData");
// //   } catch (error) {
// //     console.error("Erreur lors de l'envoi :", error);
// //   }
// // };



// //   const handleDayClick = (day, treatmentInfo) => {
// //     if (treatmentInfo.hasTreatment && !treatmentInfo.isOverridden) {
// //       setSelectedDay({ day, treatmentInfo });
// //       setContextMenuPosition({ x: event.clientX, y: event.clientY });
// //     } else {
// //       setState([
// //         {
// //           startDate: day,
// //           endDate: day,
// //           key: "selection",
// //         },
// //       ]);
// //       openModal("add", treatmentInfo);
      
// //     }
// //   };


// const contextMenuRef = useRef(null);

// useEffect(() => {
//   const handleClickOutside = (event) => {
//     if (contextMenuRef.current && !contextMenuRef.current.contains(event.target)) {
//       setContextMenuPosition(null);
//     }
//   };

//   document.addEventListener('mousedown', handleClickOutside);
//   return () => document.removeEventListener('mousedown', handleClickOutside);
// }, []);

// const handleMenuAction = (action) => {
//   handleOptionClick(action);
//   setContextMenuPosition(null); // Ferme le menu après sélection
// };
// const [statut, setStatut] = useState(() => {
//     // Vérifier dans le localStorage si une session est déjà clôturée
//     const sessionData = localStorage.getItem("sessionTempData");
//     return sessionData ? JSON.parse(sessionData).statut !== false : true;
//   });

//   // Fonction pour clôturer la session
//   const handleCloseSession = () => {
//     setStatut(false);
//     setIsSessionClosed(true);
    
//     // Mettre à jour la session dans le localStorage
//     const sessionTempData = localStorage.getItem("sessionTempData");
//     if (sessionTempData) {
//       const session = JSON.parse(sessionTempData);
//       session.statut = false;
//       localStorage.setItem("sessionTempData", JSON.stringify(session));
//     }
    
//     // Optionnel : sauvegarder immédiatement
//     saveSessionToBackend();
//   };

//   // Fonction pour ajouter une nouvelle session
//   const handleAddSession = () => {
//     // Vérifier si une session active existe déjà
//     if (statut) {
//       alert("Une session est déjà en cours. Veuillez la clôturer avant d'en créer une nouvelle.");
//       return;
//     }
    
//     // Réinitialiser les données pour une nouvelle session
//     setNotes([]);
//     setRendezVousDates([]);
//     setStatut(true);
//     setIsSessionClosed(false);
    
//     // Ouvrir le modal pour ajouter la session
//     openModal("add");
//   };

//   // Modifier handleDayClick pour vérifier le statut
//   // const handleDayClick = (day, treatmentInfo) => {
//   //   if (!statut) return; // Ne rien faire si session clôturée
    
//   //   if (treatmentInfo.hasTreatment && !treatmentInfo.isOverridden) {
//   //     setSelectedDay({ day, treatmentInfo });
//   //     setContextMenuPosition({ x: event.clientX, y: event.clientY });
//   //   } else {
//   //     setState([
//   //       {
//   //         startDate: day,
//   //         endDate: day,
//   //         key: "selection",
//   //       },
//   //     ]);
//   //     openModal("add", treatmentInfo);
//   //   }
//   // };
// const handleDayClick = (day, treatmentInfo) => {
//   // Ne rien faire si session clôturée ou si le jour n'appartient pas à la session active
//   if (!statut || (treatmentInfo.hasTreatment && !treatmentInfo.isActive)) {
//     return;
//   }

//   if (treatmentInfo.hasTreatment && !treatmentInfo.isOverridden) {
//     setSelectedDay({ day, treatmentInfo });
//     setContextMenuPosition({ x: event.clientX, y: event.clientY });
//   } else {
//     setState([
//       {
//         startDate: day,
//         endDate: day,
//         key: "selection",
//       },
//     ]);
//     openModal("add", treatmentInfo);
//   }
// };
//   // Modifier le saveSessionToBackend pour inclure le statut
//   const saveSessionToBackend = async () => {
//     const sessionTempData = localStorage.getItem("sessionTempData");
//     if (!sessionTempData) return;

//     const session = JSON.parse(sessionTempData);
//     const idfich = localStorage.getItem("idfich");
//     const payload = {
//       ...session,
//       idfich,
//       statut, // Inclure le statut actuel
//       rendezVous: rendezVousDates,
//       notes: notes.map((note) => ({
//         text: note.text,
//         date: format(note.date, "yyyy-MM-dd"),
//       })),
//     };

//     try {
//       const response = await fetch("http://localhost:5000/sessions", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (!response.ok) throw new Error("Erreur lors de l'enregistrement");

//       console.log("Session sauvegardée avec succès !");
//       localStorage.removeItem("sessionTempData");
//     } catch (error) {
//       console.error("Erreur lors de l'envoi :", error);
//     }
//   };


//   const handleOptionClick = (action) => {
//   if (!selectedDay) return;

//   // si l'action est "suspend"--> on initialise la plage avec le jour clique
//   if (action === "suspend") {
//     setState([
//       {
//         startDate: selectedDay.day,
//         endDate: selectedDay.day,
//         key: "selection",
//       },
//     ]);
//   }

//   if (action === "side_effect") {
//   setIsSideEffectModalOpen(true);
//   setContextMenuPosition(null); 
//   return;
// }

//  if (action === "note") {
//   setNoteInputVisible(true);
//   setContextMenuPosition(null);
//   return;
// }

// if (action === "rendez_vous") {
//   const dateStr = format(selectedDay.day, "yyyy-MM-dd");
//   if (!rendezVousDates.includes(dateStr)) {
//     setRendezVousDates((prev) => [...prev, dateStr]);
//   }
//   setContextMenuPosition(null);
//   setSelectedDay(null);
//   return;
// }


//   openModal(action, selectedDay.treatmentInfo);
//   setContextMenuPosition(null);
//   setSelectedDay(null);
// };

//   return (
//     <div className="p-4 relative ">
//       <div className="flex justify-between items-center mb-4">
//         <div className="flex items-center">
//           <h2 className="text-2xl font-bold text-gray-800 mr-2">Agenda</h2>
//           <div className="relative">
//             <button
//               className="text-gray-400 hover:text-gray-600 transition-colors"
//               onMouseEnter={() => setShowInfoTooltip(true)}
//               onMouseLeave={() => setShowInfoTooltip(false)}
//             >
//               <Info size={16} />
//             </button>
//             {showInfoTooltip && (
//               <div className="absolute left-0 top-full mt-2 w-64 p-2 bg-white shadow-lg rounded-md border border-gray-200 z-10 text-xs text-gray-600">
//                 <p className="mb-1">• Les jours en gris sont en dehors de la période de traitement</p>
//                 <p className="mb-1">• Les sessions plus récentes remplacent les anciennes en cas de chevauchement</p>
//                 <p className="mb-1">• Les jours remplacés d'une session apparaissent en gris</p>
//                 <p>• Cliquez sur un jour actif pour accéder aux options</p>
//               </div>
//             )}
//           </div>
//         </div>
//         {/* <button
//           onClick={() => openModal("add")}
//           className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded shadow flex items-center gap-1"
//         >
//           <Plus size={18} />
//           Session
//         </button>
//          <button
//     onClick={() => setIsSessionClosed(true)}
//     disabled={isSessionClosed}
//     className={`bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded shadow flex items-center gap-1 disabled:bg-gray-400 disabled:cursor-not-allowed`}
//   >
//     <PauseCircle size={18} />
//     Clôturer la session
//   </button> */}
//         <div className="flex gap-2">
//           <button
//             onClick={handleAddSession}
//             className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded shadow flex items-center gap-1"
//           >
//             <Plus size={18} />
//             Session
//           </button>
//           <button
//             onClick={handleCloseSession}
//             disabled={!statut}
//             className={`bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded shadow flex items-center gap-1 ${
//               !statut ? "bg-gray-400 cursor-not-allowed" : ""
//             }`}
//           >
//             <PauseCircle size={18} />
//             Clôturer la session
//           </button>
//         </div>
//       </div>

//       {treatments.length > 0 && (
//         <div className="mb-4 flex flex-wrap gap-2">
//           {treatments.map((treatment) => (
//             <div key={treatment.sessionNumber} className="flex items-center">
//               <div
//                 className="w-4 h-4 rounded-sm mr-1"
//                 style={{ backgroundColor: treatment.color }}
//               ></div>
//               <span className="text-xs text-gray-700">
//                 Session {treatment.sessionNumber} ({activeDaysCount[treatment.sessionNumber] || 0} jours actifs)
//               </span>
//             </div>
//           ))}
//           <div className="flex items-center ml-2">
//             <div className="w-4 h-4 rounded-sm mr-1 bg-gray-100 border border-gray-200"></div>
//             <span className="text-xs text-gray-500">Jours inactifs/hors période</span>
//           </div>
//         </div>
//       )}

      


//       <div className="max-h-[calc(100vh-200px)] overflow-y-auto border border-gray-200 rounded-lg shadow-sm">
//         {agendaMonths.length > 0 ? (
//           <div className="relative">
//             {agendaMonths.map((month) => (
//               <div key={month.monthKey} className="flex border-gray-200 last:border-b-0">
//                 <div className="w-16 py-2 pr-0 font-medium text-gray-700 text-right sticky left-0 bg-white">
//                   {month.name} <span className="text-xs text-gray-500">{month.year}</span>
//                 </div>

//                 <div className="flex-1 py-2 pl-2">
//                   <div className="flex flex-wrap">
//                     {Array.from({
//                       length: getDay(month.days[0]) === 0 ? 6 : getDay(month.days[0]) - 1,
//                     }).map((_, i) => (
//                       <div key={`empty-${i}`} className="w-8 h-12 m-[1px] invisible"></div>
//                     ))}

//                     {month.days.map((day, i) => {
//                       const treatmentInfo = getTreatmentInfo(day);
//                       const isToday = isSameDay(day, new Date());
//                       const dayName = format(day, "EEE", { locale: fr }).substring(0, 1).toUpperCase();



//                       let bgColor = "white";
//                       let textColor = "inherit";
//                       let dayNameColor = "text-gray-400";
//                       const ringColor = isToday ? "ring-2 ring-green-500" : "";

//                       if (treatmentInfo.hasTreatment) {
//                         if (treatmentInfo.isOverridden) {
//                           bgColor = "#f3f4f6";
//                           textColor = "#9ca3af";
//                           dayNameColor = "text-gray-300";
//                         } else {
//                           bgColor = treatmentInfo.color;
//                           dayNameColor = "text-gray-600";
//                         }
//                       } else if (treatmentInfo.isOutsideTreatmentPeriod) {
//                         bgColor = "#f3f4f6";
//                         textColor = "#9ca3af";
//                         dayNameColor = "text-gray-300";
//                       }

//                       return (
//                         <button
//                           key={i}
//                           onClick={(event) => handleDayClick(day, treatmentInfo)}
//                           className={`
//                             w-8 h-12 flex flex-col items-center justify-start pt-1 m-[1px] 
//                             rounded-md text-xs font-medium
//                             hover:bg-gray-100 transition-colors
//                             ${treatmentInfo.hasOverlap ? "ring-1 ring-white" : ""}
//                             ${ringColor}
//                           `}
//                           style={{ backgroundColor: bgColor, color: textColor }}
//                           title={
//                             treatmentInfo.hasTreatment
//                               ? `${treatmentInfo.name} - ${treatmentInfo.treatment} (${treatmentInfo.daysCount} jours)` +
//                                 (treatmentInfo.isOverridden
//                                   ? ` - Remplacé par Session ${treatmentInfo.sessionNumber}`
//                                   : treatmentInfo.hasOverlap
//                                   ? " - Chevauche d'autres sessions"
//                                   : "")
//                               : ""
//                           }
//                         >
//                           <span className={`text-[9px] font-medium ${dayNameColor} mb-1`}>{dayName}</span>
//                           <span className="text-sm">{day.getDate()}</span>
//                           {rendezVousDates.includes(format(day, "yyyy-MM-dd")) && (
//   <span className="w-3 h-3 bg-black rounded-full mt-auto ml-auto mr-1 mb-1"></span>

// )}

//                         </button>
//                         );
//                     })}

//                     {isSideEffectModalOpen && (
//   <ModalEffetsSecondaires
//     open={isSideEffectModalOpen}
//     setOpenModal={setIsSideEffectModalOpen}
//     selectedDay={selectedDay}
//   />
// )}

//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-8 text-gray-500">
//             Aucun traitement programmé. Ajoutez une session pour voir l'agenda.
//           </div>
//         )}
//       </div>

//       {noteInputVisible && selectedDay && (
//   <div className="mt-4 p-4 border-t border-gray-200">
//     <div className="mb-2 text-sm text-gray-700">
//       Ajouter une note pour le <strong>{format(selectedDay.day, "dd/MM/yyyy")}</strong> :
//     </div>
//     <div className="flex items-center gap-2">
//       <input
//         type="text"
//         className="border px-2 py-1 rounded w-full"
//         placeholder="Votre note..."
//         value={noteText}
//         onChange={(e) => setNoteText(e.target.value)}
//       />
//       <button
//         onClick={() => {
//           if (!noteText.trim()) return;
//           setNotes((prev) => [
//             ...prev,
//             {
//               text: noteText,
//               date: selectedDay.day,
//             },
//           ]);
//           setNoteText("");
//           setNoteInputVisible(false);
//           setSelectedDay(null);
//         }}
//         className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
//       >
//         Valider
//       </button>
//     </div>
//   </div>
// )}

// {notes.length > 0 && (
//   <div className="mt-6">
//     <h3 className="text-lg font-semibold mb-2 text-gray-700">Notes de la session</h3>
//     <ul className="space-y-2">
//       {notes.map((note, index) => (
//         <li key={index} className="bg-gray-100 p-2 rounded text-sm text-gray-800">
//           <strong>{format(note.date, "dd/MM/yyyy")} :</strong> {note.text}
//         </li>
//       ))}
//     </ul>
//   </div>
// )}

// <div className="mt-6 text-right">
//   <button
//     onClick={saveSessionToBackend}
//     className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
//   >
//     Enregistrer la session
//   </button>
// </div>



//       {/* {contextMenuPosition && (
//   <div
//     className="absolute bg-white border border-gray-200 rounded-md shadow-md z-50 text-sm"
//     style={{
//       top: contextMenuPosition.y,
//       left: contextMenuPosition.x,
//       width: "150px", // 👈 largeur fixe pour centrer correctement
//     }}
//   >
//     <button
//       onClick={() => handleOptionClick("suspend")}
//       className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left"
//     >
//       <PauseCircle size={16} /> Suspendre
//     </button>
//     <button
//       onClick={() => handleOptionClick("note")}
//       className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left"
//     >
//       <StickyNote size={16} className="text-yellow-600" /> Ajouter une note
//     </button>
//     <button
//       onClick={() => handleOptionClick("side_effect")}
//       className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left"
//     >
//       <AlertCircle size={16} className="text-red-600" /> Effet secondaire
//     </button>
//     <button
//       onClick={() => handleOptionClick("rendez_vous")}
//       className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left"
//     >
//       <CalendarPlus size={14} className="text-blue-600"/> Ajouter un rendez-vous
//     </button>

    
//   </div>
// )} */}



// {contextMenuPosition && (
//   <div
//     ref={contextMenuRef}
//     className="absolute bg-white border border-gray-200 rounded-md shadow-md z-50 text-sm"
//     style={{
//       top: contextMenuPosition.y,
//       left: contextMenuPosition.x,
//       width: "150px",
//     }}
//     onClick={(e) => e.stopPropagation()} // Empêche la propagation aux éléments parents
//   >
//     <button
//       onClick={() => handleMenuAction("suspend")}
//       className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left"
//     >
//       <PauseCircle size={16} /> Suspendre
//     </button>
//     <button
//       onClick={() => handleMenuAction("note")}
//       className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left"
//     >
//       <StickyNote size={16} className="text-yellow-600" /> Ajouter une note
//     </button>
//     <button
//       onClick={() => handleMenuAction("side_effect")}
//       className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left"
//     >
//       <AlertCircle size={16} className="text-red-600" /> Effet secondaire
//     </button>
//     <button
//       onClick={() => handleMenuAction("rendez_vous")}
//       className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left"
//     >
//       <CalendarPlus size={14} className="text-blue-600"/> Ajouter un rendez-vous
//     </button>
//   </div>
// )}

//     </div>
//   );
// }

// export default Agenda;


import { Info, Plus, AlertCircle, PauseCircle, StickyNote, CalendarPlus } from "lucide-react";
import { format, isSameDay, getDay } from "date-fns";
import { fr } from "date-fns/locale";
import { useRef, useState, useEffect } from "react";
import ModalEffetsSecondaires from "./ModalEffetsSecondaires";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useParams } from "react-router-dom";

/**
 * Composant Agenda - Affiche un calendrier de traitement avec différentes fonctionnalités
 * @param {Object} props - Les propriétés du composant
 * @param {Array} props.treatments - Liste des traitements
 * @param {Object} props.activeDaysCount - Nombre de jours actifs par session
 * @param {Array} props.agendaMonths - Mois à afficher dans l'agenda
 * @param {Function} props.getTreatmentInfo - Fonction pour obtenir les infos d'un traitement
 * @param {Function} props.setState - Fonction pour mettre à jour l'état
 * @param {Function} props.openModal - Fonction pour ouvrir un modal
 * @param {boolean} props.showInfoTooltip - État d'affichage du tooltip d'info
 * @param {Function} props.setShowInfoTooltip - Fonction pour gérer l'affichage du tooltip
 */
function Agenda({
  treatments, 
  activeDaysCount, 
  agendaMonths, 
  getTreatmentInfo, 
  setState, 
  openModal,
  showInfoTooltip, 
  setShowInfoTooltip,
}) {
  
  const [selectedDay, setSelectedDay] = useState(null); // Jour sélectionne dans l'agenda
  const [contextMenuPosition, setContextMenuPosition] = useState(null); // Position du menu contextuel
  const [isSideEffectModalOpen, setIsSideEffectModalOpen] = useState(false); // etat du modal des effets secondaires
  
  const [noteInputVisible, setNoteInputVisible] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [notes, setNotes] = useState([]);
  
  const [rendezVousDates, setRendezVousDates] = useState([]);
  
  const [isSessionClosed, setIsSessionClosed] = useState(false);
  const [statut, setStatut] = useState(() => {
   
    const sessionData = localStorage.getItem("sessionTempData");
    return sessionData ? JSON.parse(sessionData).statut !== false : true;
  });

  
  const contextMenuRef = useRef(null);

  // EFFETS 
  

  const { idfich } = useParams(); // l'ID de la fiche dans l'URL
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    if (!idfich) return;

    fetch(`http://localhost:5000/sessions/fiche/${idfich}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Sessions récupérées :", data);
        setSessions(data);
      })
      .catch((err) =>
        console.error("Erreur lors de la récupération des sessions :", err)
      );
  }, [idfich]);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (contextMenuRef.current && !contextMenuRef.current.contains(event.target)) {
        setContextMenuPosition(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // SESSION :
  // const handleCloseSession = () => {
  //   setStatut(false);
  //   setIsSessionClosed(true);
    
  //   // Mise à jour du localStorage
  //   const sessionTempData = localStorage.getItem("sessionTempData");
  //   if (sessionTempData) {
  //     const session = JSON.parse(sessionTempData);
  //     session.statut = false;
  //     localStorage.setItem("sessionTempData", JSON.stringify(session));
  //   }
    
  //   saveSessionToBackend();
  // };
 const handleCloseSession = async () => {
  setStatut(false);
  setIsSessionClosed(true);

  const sessionId = localStorage.getItem("currentSessionId");
  if (!sessionId) {
    console.error("ID de session introuvable.");
    return;
  }

  try {
    const response = await fetch(`http://localhost:5000/sessions/${sessionId}/cloturer`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) throw new Error("Échec de la clôture de la session.");

    const result = await response.json();
    console.log(result.message);
  } catch (error) {
    console.error("Erreur lors de la clôture :", error);
  }
};

  //Ajoute une nouvelle session
  
  const handleAddSession = () => {
  if (statut) {
    toast.warning('Une session est déjà en cours. Veuillez la clôturer avant d\'en créer une nouvelle.', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return;
  }
  
 
  setNotes([]);
  setRendezVousDates([]);
  setStatut(true);
  setIsSessionClosed(false);
  
  openModal("add");
};

  // ============ GESTION DES JOURS ============
  /**
   * Gère le clic sur un jour de l'agenda
   * @param {Date} day - Le jour cliqué
   * @param {Object} treatmentInfo - Informations sur le traitement ce jour-là
   */
  const handleDayClick = (day, treatmentInfo) => {
    if (!statut || (treatmentInfo.hasTreatment && !treatmentInfo.isActive)) { // session cloturee ou pas de traitement
      return;
    }

    if (treatmentInfo.hasTreatment && !treatmentInfo.isOverridden) {
      setSelectedDay({ day, treatmentInfo });
      setContextMenuPosition({ x: event.clientX, y: event.clientY });
    } else {
      setState([
        {
          startDate: day,
          endDate: day,
          key: "selection",
        },
      ]);
      openModal("add", treatmentInfo);
    }
  };

  // ============ GESTION DES ACTIONS ============
  /**
   * Gère les actions du menu contextuel
   * @param {string} action - L'action sélectionnée
   */
  const handleOptionClick = (action) => {
    if (!selectedDay) return;

    if (action === "suspend") {
      setState([
        {
          startDate: selectedDay.day,
          endDate: selectedDay.day,
          key: "selection",
        },
      ]);
    }

  if (action === "note") {
  setNoteInputVisible(true);
  setContextMenuPosition(null);
   return;
 }
    switch(action) {
      case "side_effect":
        setIsSideEffectModalOpen(true);
        break;
      
          
      case "rendez_vous":
        const dateStr = format(selectedDay.day, "yyyy-MM-dd");
        if (!rendezVousDates.includes(dateStr)) {   // a faire plus tard si la date est deja presente
          setRendezVousDates((prev) => [...prev, dateStr]);
        }
        break;
      default:
        openModal(action, selectedDay.treatmentInfo);
    }

    setContextMenuPosition(null);
    setSelectedDay(null);
  };

  /**
   * Ferme le menu après sélection d'une action
   * @param {string} action - L'action sélectionnée
   */
  const handleMenuAction = (action) => {
    handleOptionClick(action);
    setContextMenuPosition(null);
  };

  // ============ SAUVEGARDE ============
  /**
   * Sauvegarde la session dans le backend
   */
  // const saveSessionToBackend = async () => {
  //   const sessionTempData = localStorage.getItem("sessionTempData");
  //   if (!sessionTempData) return;

  //   const session = JSON.parse(sessionTempData);
  //   const idfich = localStorage.getItem("idfich");
  //   const payload = {
  //     ...session,
  //     idfich,
  //     statut,
  //     rendezVous: rendezVousDates,
  //     notes: notes.map((note) => ({
  //       text: note.text,
  //       date: format(note.date, "yyyy-MM-dd"),
  //     })),
  //   };

  //   try {
  //     const response = await fetch("http://localhost:5000/sessions", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(payload),
  //     });

  //     if (!response.ok) throw new Error("Erreur lors de l'enregistrement");

  //     console.log("Session sauvegardée avec succès !");
  //     localStorage.removeItem("sessionTempData");
  //   } catch (error) {
  //     console.error("Erreur lors de l'envoi :", error);
  //   }
  // };

  const saveSessionToBackend = async () => {
  const sessionTempData = localStorage.getItem("sessionTempData");
  if (!sessionTempData) return;

  const session = JSON.parse(sessionTempData);  //json parse txt json-->objt 
  const idfich = localStorage.getItem("idfich");  //localst n'accepte que ca string
  const payload = {
    ...session,
    idfich,
    statut,
    rendezVous: rendezVousDates,
    notes: notes.map((note) => ({
      text: note.text,
      date: format(note.date, "yyyy-MM-dd"),
    })),
  };

  try {
    const response = await fetch("http://localhost:5000/sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),   //objt-->json
    });

    const result = await response.json();

    if (!response.ok) throw new Error(result.error || "Erreur lors de l'enregistrement");

    // Sauvegarde de l’ID de session pour pouvoir la clôturer plus tard
    localStorage.setItem("currentSessionId", result.session_id);
    toast.success("Session enregistrée avec succès !");
    console.log("Session sauvegardee avec succes avec ID :", result.session_id);

    // Optionnel : tu peux garder sessionTempData ou le supprimer
    localStorage.removeItem("sessionTempData");
  } catch (error) {
    console.error("Erreur lors de l'envoi :", error);
    toast.error("Une erreur est survenue : " + error.message);
  }
};
//this oneeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
// useEffect(() => {
//   const fetchSessions = async () => {
//     const idfich = localStorage.getItem("idfich"); // ou une prop
//     if (!idfich) return;

//     try {
//       const response = await fetch(`http://localhost:5000/sessions/fiche/${idfich}`);
//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.error || "Erreur lors du chargement des sessions");
//       }

//       setSessions(data); // ou autre nom de ton state
//     } catch (err) {
//       console.error("Erreur en récupérant les sessions :", err.message);
//     }
//   };

//   fetchSessions();
// }, []);



  // ============ RENDU ============
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
                <p className="mb-1">• Les jours en gris sont en dehors de la période de traitement</p>
                <p className="mb-1">• Les sessions plus récentes remplacent les anciennes en cas de chevauchement</p>
                <p className="mb-1">• Les jours remplacés d'une session apparaissent en gris</p>
                <p>• Cliquez sur un jour actif pour accéder aux options</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Boutons de gestion de session */}
        <div className="flex gap-2">
         <button onClick={handleAddSession} className="text-white font-semibold py-2 px-4 rounded shadow flex items-center gap-1"
         style={{ backgroundColor: 'oklch(76.5% 0.177 163.223)','&:hover': {backgroundColor: 'oklch(55% 0.118 184.704)' }
         }}
         ><Plus size={18} />Session
        </button>
          <button
            onClick={handleCloseSession}
            disabled={!statut}
            className={`bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded shadow flex items-center gap-1 ${
              !statut ? "bg-gray-400 cursor-not-allowed" : ""
            }`}
          >
            <PauseCircle size={18} />
            Clôturer la session
          </button>
        </div>
      </div>

      {/* Légende des traitements */}
      {treatments.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {treatments.map((treatment) => (
            <div key={treatment.sessionNumber} className="flex items-center">
              <div
                className="w-4 h-4 rounded-sm mr-1"
                style={{ backgroundColor: treatment.color }}
              ></div>
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

      {/* Calendrier */}
      <div className="max-h-[calc(100vh-200px)] overflow-y-auto border border-gray-200 rounded-lg shadow-sm">
        {agendaMonths.length > 0 ? (
          <div className="relative">
            {agendaMonths.map((month) => (
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
                      const treatmentInfo = getTreatmentInfo(day);
                      const isToday = isSameDay(day, new Date());
                      const dayName = format(day, "EEE", { locale: fr }).substring(0, 1).toUpperCase();

                      // Calcul des styles en fonction du traitement
                      let bgColor = "white";
                      let textColor = "inherit";
                      let dayNameColor = "text-gray-400";
                      const ringColor = isToday ? "ring-2 ring-green-500" : "";

                      if (treatmentInfo.hasTreatment) {
                        if (treatmentInfo.isOverridden) {
                          bgColor = "#f3f4f6";
                          textColor = "#9ca3af";
                          dayNameColor = "text-gray-300";
                        } else {
                          bgColor = treatmentInfo.color;
                          dayNameColor = "text-gray-600";
                        }
                      } else if (treatmentInfo.isOutsideTreatmentPeriod) {
                        bgColor = "#f3f4f6";
                        textColor = "#9ca3af";
                        dayNameColor = "text-gray-300";
                      }

                      return (
                        <button
                          key={i}
                          onClick={(event) => handleDayClick(day, treatmentInfo)}
                          className={`
                            w-8 h-12 flex flex-col items-center justify-start pt-1 m-[1px] 
                            rounded-md text-xs font-medium
                            hover:bg-gray-100 transition-colors
                            ${treatmentInfo.hasOverlap ? "ring-1 ring-white" : ""}
                            ${ringColor}
                          `}
                          style={{ backgroundColor: bgColor, color: textColor }}
                          title={
                            treatmentInfo.hasTreatment
                              ? `${treatmentInfo.name} - ${treatmentInfo.treatment} (${treatmentInfo.daysCount} jours)` +
                                (treatmentInfo.isOverridden
                                  ? ` - Remplacé par Session ${treatmentInfo.sessionNumber}`
                                  : treatmentInfo.hasOverlap
                                  ? " - Chevauche d'autres sessions"
                                  : "")
                              : ""
                          }
                        >
                          <span className={`text-[9px] font-medium ${dayNameColor} mb-1`}>{dayName}</span>
                          <span className="text-sm">{day.getDate()}</span>
                          {rendezVousDates.includes(format(day, "yyyy-MM-dd")) && (
                            <span className="w-3 h-3 bg-black rounded-full mt-auto ml-auto mr-1 mb-1"></span>
                          )}
                        </button>
                      );
                    })}

                    {/* Modal des effets secondaires */}
                    {isSideEffectModalOpen && (
                      <ModalEffetsSecondaires
                        open={isSideEffectModalOpen}
                        setOpenModal={setIsSideEffectModalOpen}
                        selectedDay={selectedDay}
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            Aucun traitement programmé. Ajoutez une session pour voir l'agenda.
          </div>
        )}
      </div>

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
          if (!noteText.trim()) return;
          setNotes((prev) => [
            ...prev,
            {
              text: noteText,
              date: selectedDay.day,
            },
          ]);
          setNoteText("");
          setNoteInputVisible(false);
          setSelectedDay(null);
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
          <strong>{format(note.date, "dd/MM/yyyy")} :</strong> {note.text}
        </li>
      ))}
    </ul>
  </div>
)}


      {/* Bouton de sauvegarde */}
      <div className="mt-6 text-right">
        <button
          onClick={saveSessionToBackend}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          Enregistrer la session
        </button>
      </div>

      {/* Menu contextuel */}
      {contextMenuPosition && (
        <div
          ref={contextMenuRef}
          className="absolute bg-white border border-gray-200 rounded-md shadow-md z-50 text-sm"
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
            <CalendarPlus size={14} className="text-blue-600"/> Ajouter un rendez-vous
          </button>
        </div>
      )}
      <ToastContainer />
      </div>
  );
}

export default Agenda;



