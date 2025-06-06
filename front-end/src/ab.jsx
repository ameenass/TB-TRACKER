//agenda.jsx:
const handleDayClick = (day, treatmentInfo, event) => {
  // Ne rien faire si session clôturée ou si le jour n'appartient pas à la session active
  if (!statut || (treatmentInfo.hasTreatment && !treatmentInfo.isActive)) {
    return;
  }
  
  // Vérifier si c'est un clic droit
  if (event.button === 2 || event.type === 'contextmenu') {
    // Empêcher le menu contextuel par défaut du navigateur
    event.preventDefault();
    
    if (treatmentInfo.hasTreatment && !treatmentInfo.isOverridden) {
      setSelectedDay({ day, treatmentInfo });
      
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
      
      console.log('Day button right-clicked:', day.toDateString());
      console.log('Button rect:', rect);
      console.log('Menu position:', { x, y });
      
      setContextMenuPosition({ x, y });
    }
  } else {   // iciiiiiiiiiiiiiiiiiiiiiiiiii 
    // Clic gauche normal - ouvrir le modal d'ajout
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



// handle option:
const handleOptionClick = (action) => {
    if (!selectedDay) return;

    // Initialisation de la plage pour la suspension
    if (action === "suspend") {
      setState([
        {
          startDate: selectedDay.day,
          endDate: selectedDay.day,
          key: "selection",
        },
      ]);
    }}


//le btn sus:
<button
            onClick={() => handleMenuAction("suspend")}
            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left"
          >
            <PauseCircle size={16} /> Suspendre
          </button>


//dans profile patient.jsx:

const [state, setState] = useState([
    { startDate: new Date(), endDate: addDays(new Date(), 6), key: "selection" },
  ]);
const getSelectedDaysCount = () => {
    if (!state[0].startDate || !state[0].endDate) return 0;
    return differenceInCalendarDays(state[0].endDate, state[0].startDate) + 1;
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
  }; 


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
        />
