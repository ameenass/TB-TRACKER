import React, { useEffect, useState } from 'react';
import { Pill, Calendar } from 'lucide-react';

export default function HomePatient() {
  const [patientPrenom, setPatientPrenom] = useState(''); // Patient's first name
  const [currentMedication, setCurrentMedication] = useState(null); // Medication data
  const [nextAppointment, setNextAppointment] = useState(null); // Appointment data

  // Define the medication code map
  const medicationMap = {
    'R': 'Rifampicine',
    'H': 'Isoniazide',
    'Z': 'Pyrazinamide',
    'E': 'Ethambutol',
    'S': 'Streptomycin',
    'RHZ': 'Rifampicine, Isoniazide, Pyrazinamide',
    'RHZE': 'Rifampicine, Isoniazide, Pyrazinamide, Ethambutol',
    'RH': 'Rifampicine, Isoniazide',
    // Add any other codes you might use (e.g., 'Z' for Pyrazinamide if 'P' isn't used, 'M' for Moxifloxacin etc.)
    // If a code is not found, it will default back to the code itself.
  };

  useEffect(() => {
    // Load patient name from local storage
    const prenom = localStorage.getItem('patientPrenom') || 'Patient';
    setPatientPrenom(prenom);

    // Retrieve ALL sessions from localStorage (plural key)
    const storedSessions = localStorage.getItem('patientSessions'); // <-- Corrected key
    let medicationToDisplay = { name: 'Aucun médicament enregistré' };
    let allUpcomingAppointments = [];

    if (storedSessions) {
      try {
        const sessionsArray = JSON.parse(storedSessions); // Parse as an array of sessions

        // --- Logic for Current Medication ---
        // Find the currently active session (statut: true)
        const activeSession = sessionsArray.find(session => session.statut === true);

        if (activeSession && activeSession.traitement && activeSession.traitement.trim() !== '') {
          // If the treatment is a single character, map it. If it's a combined code, map it directly.
          // This handles both single-drug codes and multi-drug regimen codes like "RHZ"
          const mappedTreatment = medicationMap[activeSession.traitement.toUpperCase()];
          if (mappedTreatment) {
            medicationToDisplay.name = mappedTreatment;
          } else {
            // If it's a new combination not in the map, try to split and map individual letters
            const translatedMedications = activeSession.traitement
              .split('')
              .map(code => medicationMap[code.toUpperCase()] || code);
            medicationToDisplay.name = translatedMedications.join(' + ');
          }
        }

        // --- Logic for Next Appointment ---
        const today = new Date();
        sessionsArray.forEach(session => {
          if (session.rendezVous && Array.isArray(session.rendezVous)) {
            const sessionUpcomingAppointments = session.rendezVous
              .filter(rdv => rdv.date && new Date(rdv.date) >= today) // Filter out past appointments
              .map(rdv => ({ // Ensure the structure is consistent for sorting
                date: rdv.date,
                sessionId: session._id, // Add session ID for context if needed
              }));
            allUpcomingAppointments = allUpcomingAppointments.concat(sessionUpcomingAppointments);
          }
        });

        if (allUpcomingAppointments.length > 0) {
          // Sort all upcoming appointments to find the very next one
          allUpcomingAppointments.sort((a, b) => new Date(a.date) - new Date(b.date));
          setNextAppointment(allUpcomingAppointments[0]);
        } else {
          setNextAppointment(null); // No upcoming appointments found across all sessions
        }

      } catch (e) {
        console.error("Error parsing patientSessions from localStorage", e);
        // Fallback in case of parsing error
        medicationToDisplay = { name: 'Erreur de chargement des médicaments' };
        setNextAppointment(null);
      }
    }

    setCurrentMedication(medicationToDisplay);

  }, []); // Empty dependency array means this runs once on mount

  // Helper to format appointment date for display (only date, no time)
  const formatAppointmentDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-50 p-4 md:p-8">
      <section className="max-w-7xl mx-auto">
        {/* Welcome Banner */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent mb-2 leading-normal">
            Bonjour, {patientPrenom}
          </h2>
          <p className="text-gray-700 text-lg mt-2">
            Passez une bonne journée et n'oubliez pas de prendre soin de votre santé !
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Médicament Section */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Médicament à prendre</h2>
            {currentMedication ? (
              <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="bg-teal-100 p-3 rounded-full">
                  <Pill className="w-6 h-6 text-teal-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 text-lg">
                    {currentMedication.name || 'N/A'}
                  </h3>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">Aucun médicament trouvé ou enregistré pour le moment.</p>
            )}
          </div>

          {/* Prochain Rendez-vous Section */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Prochain Rendez-vous</h2>
            {nextAppointment ? (
              <div className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white p-5 rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-sm opacity-90">Date</p>
                    <p className="font-bold text-2xl">{formatAppointmentDate(nextAppointment.date)}</p>
                  </div>
                  <Calendar className="w-10 h-10 opacity-70" />
                </div>
                <p className="text-sm opacity-90">Avec</p>
                <p className="font-semibold text-lg">Dr. Toumi</p>
              </div>
            ) : (
                <p className="text-gray-500">Aucun rendez-vous prochainement.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
