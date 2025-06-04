import { Info, Plus, AlertCircle, PauseCircle, StickyNote, CalendarPlus, ChevronDown, ChevronRight } from "lucide-react";
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
  onSessionsFetched, // New prop to send sessions back to parent
  onSessionClosed, // New prop to handle session closure
}) {
    const [selectedDay, setSelectedDay] = useState(null); // Jour sélectionne dans l'agenda
  const [contextMenuPosition, setContextMenuPosition] = useState(null); // Position du menu contextuel
  const [isSideEffectModalOpen, setIsSideEffectModalOpen] = useState(false); // etat du modal des effets secondaires
  
  const [noteInputVisible, setNoteInputVisible] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [notes, setNotes] = useState([]);
  
  // Gestion des sessions fermées (dropdown)
  const [expandedClosedSessions, setExpandedClosedSessions] = useState(new Set());
  
  const [rendezVousDates, setRendezVousDates] = useState([]);
  const [isSessionClosed, setIsSessionClosed] = useState(false);const [statut, setStatut] = useState(() => {
    const sessionData = localStorage.getItem("sessionTempData");
    const initialStatut = sessionData ? JSON.parse(sessionData).statut !== false : false;
    console.log("Initial statut from localStorage:", initialStatut);
    return initialStatut;
  });

  
  const contextMenuRef = useRef(null);

  // EFFETS 
  

  const { id: idfich } = useParams(); // l'ID de la fiche dans l'URL
  const [sessions, setSessions] = useState([]);  useEffect(() => {
    console.log("useEffect triggered with idfich:", idfich);
    if (!idfich) {
      console.log("No idfich found, returning early");
      return;
    }

    console.log("Fetching sessions for idfich:", idfich);    fetch(`http://localhost:5000/sessions/fiche/${idfich}`)
      .then((res) => {
        console.log("Response status:", res.status);
        return res.json();
      })
      .then((data) => {
        console.log("Sessions récupérées :", data);
        console.log("Number of sessions found:", data.length);
        setSessions(data);
        
        // Send sessions back to parent component for conversion to treatments
        if (onSessionsFetched && typeof onSessionsFetched === 'function') {
          onSessionsFetched(data);
        }
        
        // Check if there's any active session in the backend
        const hasActiveSession = data.some(session => session.statut === true);
        console.log("Has active session from backend:", hasActiveSession);
        console.log("Current statut before update:", statut);
        setStatut(hasActiveSession);
        console.log("Setting statut to:", hasActiveSession);
        // Synchronize localStorage with the active session ID
        if (hasActiveSession) {
          const activeSession = data.find(session => session.statut === true);
          if (activeSession && activeSession._id) {
            localStorage.setItem("currentSessionId", activeSession._id);
            console.log("📌 currentSessionId set to:", activeSession._id);
          }
        } else {
          localStorage.removeItem("currentSessionId");
          console.log("📌 currentSessionId removed");
        }
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
    console.log("Attempting to close session. Current statut:", statut);
  
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

  // Update state only after successful backend update
    setStatut(false);
    setIsSessionClosed(true);
    
    // Clear session data from localStorage
    localStorage.removeItem("currentSessionId");
    localStorage.removeItem("sessionTempData");
    
    // Notify parent component about session closure
    if (onSessionClosed && typeof onSessionClosed === 'function') {
      onSessionClosed(sessionId);
    }
    
    console.log("Session closed successfully. New statut:", false);
  } catch (error) {
    console.error("Erreur lors de la clôture :", error);
    // Don't update state if there was an error
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
  /**
   * Gère l'expansion/collapse des sessions fermées
   */
  const toggleClosedSession = (sessionNumber) => {
    setExpandedClosedSessions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sessionNumber)) {
        newSet.delete(sessionNumber);
      } else {
        newSet.add(sessionNumber);
      }
      return newSet;
    });
  };

  /**
   * Gère le clic sur un jour de l'agenda avec positionnement correct du menu contextuel
   * @param {Date} day - Le jour cliqué
   * @param {Object} treatmentInfo - Informations sur le traitement ce jour-là
   * @param {Event} event - L'événement de clic pour le positionnement
   */  const handleDayClick = (day, treatmentInfo, event) => {
    // Ne rien faire si session clôturée ou si le jour n'appartient pas à la session active
    if (!statut || (treatmentInfo.hasTreatment && !treatmentInfo.isActive)) {
      return;
    }    if (treatmentInfo.hasTreatment && !treatmentInfo.isOverridden) {
      setSelectedDay({ day, treatmentInfo });
      
      // Empêcher la propagation de l'événement
      event.preventDefault();
      event.stopPropagation();
      
      // Utiliser currentTarget pour avoir l'élément exact du bouton
      const rect = event.currentTarget.getBoundingClientRect();
      const menuWidth = 150;
      const menuHeight = 160;
      
      // Position du menu : directement sous le bouton cliqué, centré
      let x = rect.left + (rect.width / 2) - (menuWidth / 2);
      let y = rect.bottom + 5; // 5px d'espacement sous le bouton
      
      // Ajuster si le menu sort de l'écran à droite
      if (x + menuWidth > window.innerWidth - 10) {
        x = window.innerWidth - menuWidth - 10;
      }
      
      // Ajuster si le menu sort de l'écran à gauche
      if (x < 10) {
        x = 10;
      }
      
      // Ajuster si le menu sort de l'écran en bas
      if (y + menuHeight > window.innerHeight - 10) {
        y = rect.top - menuHeight - 5; // Placer au-dessus du bouton
        
        // Si toujours pas de place, ajuster vers le haut
        if (y < 10) {
          y = 10;
        }
      }
      
      console.log('Day button clicked:', day.toDateString());
      console.log('Button rect:', rect);
      console.log('Menu position:', { x, y });
      
      setContextMenuPosition({ x, y });
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
  //   }  // Sauvegarde la session dans le backend
  const saveSessionToBackend = async () => {
    const sessionTempData = localStorage.getItem("sessionTempData");
    if (!sessionTempData) return;

    const session = JSON.parse(sessionTempData);
    // Use the same idfich from URL parameters instead of localStorage
    console.log("Saving session with idfich from URL params:", idfich);
    const payload = {
      ...session,
      idfich, // This uses the idfich from useParams()
      statut,
      rendezVous: rendezVousDates,
      notes: notes.map((note) => ({
        text: note.text,
        date: format(note.date, "yyyy-MM-dd"),
      })),
    };

    console.log("Session payload:", payload);

  try {
    const response = await fetch("http://localhost:5000/sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),   //objt-->json
    });

    const result = await response.json();

    if (!response.ok) throw new Error(result.error || "Erreur lors de l'enregistrement");

    // Sauvegarde de l’ID de session pour pouvoir la clôturer plus tard    localStorage.setItem("currentSessionId", result.session_id);
    console.log("Session sauvegardée avec succès avec ID :", result.session_id);
    
    toast.success("Session sauvegardée avec succès !", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    // Optionnel : tu peux garder sessionTempData ou le supprimer
    localStorage.removeItem("sessionTempData");  } catch (error) {
    console.error("Erreur lors de l'envoi :", error);
    toast.error("Erreur lors de l'enregistrement de la session", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
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
            </button>            {showInfoTooltip && (
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
    backgroundColor: 'oklch(76.5% 0.177 163.223)','&:hover': {backgroundColor: 'oklch(55% 0.118 184.704)' 
    }
  }}
><Plus size={18} />Session
</button>          <button
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
      )}      {/* Sessions en lignes */}
      <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
        {treatments.length > 0 ? (
          <div className="space-y-4">
            {treatments.map((treatment) => (
              <div key={treatment.sessionNumber} className="border border-gray-200 rounded-lg shadow-sm bg-white">
                {/* En-tête de session */}
                <div className="p-4 border-b border-gray-100 bg-gray-50">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-4 h-4 rounded-sm"
                        style={{ backgroundColor: treatment.color }}
                      ></div>
                      
                      {/* Bouton avec dropdown pour sessions fermées */}
                      {!treatment.isActive ? (
                        <button
                          onClick={() => toggleClosedSession(treatment.sessionNumber)}
                          className="flex items-center gap-2 hover:bg-gray-100 rounded px-2 py-1 transition-colors"
                        >
                          {expandedClosedSessions.has(treatment.sessionNumber) ? 
                            <ChevronDown size={16} className="text-gray-600" /> : 
                            <ChevronRight size={16} className="text-gray-600" />
                          }
                          <h3 className="font-semibold text-gray-800">
                            Session {treatment.sessionNumber}
                          </h3>
                        </button>
                      ) : (
                        <h3 className="font-semibold text-gray-800">
                          Session {treatment.sessionNumber}
                        </h3>
                      )}
                      
                      <span className="text-sm text-gray-600">
                        ({activeDaysCount[treatment.sessionNumber] || 0} jours actifs)
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        treatment.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {treatment.isActive ? 'Active' : 'Fermée'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Calendrier complet de la session - Visible pour sessions actives ou fermées expandées */}
                {(treatment.isActive || expandedClosedSessions.has(treatment.sessionNumber)) && (
                  <div className="p-4">
                    {/* En-têtes des jours de la semaine */}
                    <div className="grid grid-cols-7 gap-1 mb-3 text-xs text-gray-500 font-medium border-b pb-2">
                      <div className="text-center py-1">Lun</div>
                      <div className="text-center py-1">Mar</div>
                      <div className="text-center py-1">Mer</div>
                      <div className="text-center py-1">Jeu</div>
                      <div className="text-center py-1">Ven</div>
                      <div className="text-center py-1">Sam</div>
                      <div className="text-center py-1">Dim</div>
                    </div>
                    
                    {/* Affichage par mois avec tous les jours */}
                    {agendaMonths.map((month) => {                      // Vérifier si ce mois contient des jours de cette session
                      const hasSessionDays = month.days.some(day => {
                        const treatmentInfo = getTreatmentInfo(day, treatment.sessionNumber);
                        return treatmentInfo.hasTreatment;
                      });

                      if (!hasSessionDays) return null;

                      return (
                        <div key={`${treatment.sessionNumber}-${month.monthKey}`} className="mb-6">
                          <div className="text-sm font-semibold text-gray-700 mb-3 pb-2 border-b border-gray-200 bg-gray-50 px-3 py-2 rounded-t">
                            {month.name} {month.year}
                          </div>
                          <div className="grid grid-cols-7 gap-1 p-2 bg-gray-50/30 rounded-b">
                            {/* Jours vides pour alignement du premier jour */}
                            {Array.from({
                              length: getDay(month.days[0]) === 0 ? 6 : getDay(month.days[0]) - 1,
                            }).map((_, i) => (
                              <div key={`empty-${i}`} className="w-12 h-16 m-[1px] invisible"></div>
                            ))}
                              {/* Affichage de tous les jours du mois */}
                            {month.days.map((day, i) => {
                              const treatmentInfo = getTreatmentInfo(day, treatment.sessionNumber);
                              const isToday = isSameDay(day, new Date());
                              const dayName = format(day, "EEE", { locale: fr }).substring(0, 1).toUpperCase();
                              const hasSessionTreatment = treatmentInfo.hasTreatment;

                              let bgColor = "#ffffff"; // Blanc par défaut
                              let textColor = "#6b7280"; // Gris moyen
                              let dayNameColor = "text-gray-400";
                              let borderClass = "border border-gray-200";
                              let shadowClass = "";
                              let hoverClass = "";                              if (hasSessionTreatment) {
                                // This day belongs to the current session being displayed
                                bgColor = treatmentInfo.color;
                                textColor = "#ffffff";
                                dayNameColor = "text-gray-100";
                                borderClass = "border-2 border-white/20";
                                shadowClass = "shadow-lg";
                                hoverClass = "hover:scale-105 hover:shadow-xl";
                              } else {
                                // Jours sans traitement pour cette session - style plus subtil
                                bgColor = "#f8fafc";
                                borderClass = "border border-gray-100";
                                hoverClass = "hover:bg-gray-100";
                              }

                              if (isToday) {
                                borderClass += " ring-2 ring-green-500 ring-offset-1";
                              }

                              return (
                                <button
                                  key={i}
                                  onClick={(event) => hasSessionTreatment ? handleDayClick(day, treatmentInfo, event) : null}
                                  disabled={!hasSessionTreatment}
                                  className={`
                                    w-12 h-16 flex flex-col items-center justify-center m-[1px] 
                                    rounded-lg text-xs font-medium transition-all duration-200
                                    ${hasSessionTreatment ? 'cursor-pointer' : 'cursor-default'}
                                    ${borderClass}
                                    ${shadowClass}
                                    ${hoverClass}
                                  `}
                                  style={{ backgroundColor: bgColor, color: textColor }}                                  title={
                                    hasSessionTreatment
                                      ? `${treatmentInfo.name} - ${treatmentInfo.treatment} (${treatmentInfo.daysCount} jours)`
                                      : `${format(day, "dd/MM/yyyy")} - Pas de traitement pour cette session`
                                  }
                                >
                                  <span className={`text-[8px] font-medium ${dayNameColor} mb-1`}>{dayName}</span>
                                  <span className={`text-lg font-bold ${hasSessionTreatment ? 'text-inherit' : 'text-gray-400'}`}>
                                    {day.getDate()}
                                  </span>
                                  
                                  {/* Indicateurs */}
                                  <div className="flex items-center justify-center mt-1 space-x-1">
                                    {/* Indicateur de rendez-vous */}
                                    {rendezVousDates.includes(format(day, "yyyy-MM-dd")) && (
                                      <span className="w-2 h-2 bg-black rounded-full" title="Rendez-vous"></span>
                                    )}                                    {/* Indicateur de session active */}
                                    {hasSessionTreatment && (
                                      <span className="w-1.5 h-1.5 bg-white/70 rounded-full" title="Session active"></span>
                                    )}
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}

            {/* Modal des effets secondaires */}
            {isSideEffectModalOpen && (
              <ModalEffetsSecondaires
                open={isSideEffectModalOpen}
                setOpenModal={setIsSideEffectModalOpen}
                selectedDay={selectedDay}
              />
            )}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500 border border-gray-200 rounded-lg">
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
      </div>      {/* Menu contextuel */}
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
            <CalendarPlus size={14} className="text-blue-600"/> Ajouter un rendez-vous
          </button>
        </div>
      )}
      <ToastContainer />
      </div>
  );
}

export default Agenda;



