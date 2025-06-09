import React, { useEffect, useState } from 'react';
import { Pill, Calendar } from 'lucide-react';

export default function HomePatient() {
  const [patientPrenom, setPatientPrenom] = useState('');
  // Change to hold a single medication object or null, reflecting the 'traitement' string
  const [currentMedication, setCurrentMedication] = useState(null);
  const [nextAppointmentDate, setNextAppointmentDate] = useState('');

  const patientId = localStorage.getItem('IDPatient');

  useEffect(() => {
    const prenom = localStorage.getItem('patientPrenom');
    if (prenom) setPatientPrenom(prenom);

    const fetchData = async () => {
      try {
        if (!patientId) return;

        const fichesRes = await fetch(`http://localhost:5000/patients/${patientId}/fiches`);
        const fiches = await fichesRes.json();

        if (!Array.isArray(fiches) || fiches.length === 0) return;

        // Assuming idfich is available directly on the first fiche object
        const idfich = fiches[0].idfich;

        const sessionRes = await fetch(`http://localhost:5000/sessions/fiche/${idfich}/details`);
        const sessionDetails = await sessionRes.json();

        if (!Array.isArray(sessionDetails) || sessionDetails.length === 0) {
          // If no sessions or empty sessions, apply default for both localStorage and display
          localStorage.setItem('currentPatientMedication', 'Isoniazide'); // Default for Effetsec.jsx
          setCurrentMedication({ name: 'Rifampicine', dose: '300 mg', time: '08:00 am' }); // Default for HomePatient.jsx display
          console.warn("No actual sessions found, setting 'Isoniazide' as default for testing.");
          return; // Exit early as no further session processing is needed
        }

        let closestAppointment = null;
        let latestMedicationFound = null;

        // Sort sessions by dateDebut in descending order to get the latest one
        sessionDetails.sort((a, b) => new Date(b.dateDebut) - new Date(a.dateDebut));


        for (const session of sessionDetails) {
          // Process rendezVous for the closest appointment
          if (session.rendezVous && session.rendezVous.length > 0) {
            const rendezVousDates = session.rendezVous.map(rdv => new Date(rdv.date));
            rendezVousDates.sort((a, b) => a - b); // Sort ascending for closest
            if (!closestAppointment || rendezVousDates[0] < closestAppointment) {
              closestAppointment = rendezVousDates[0];
            }
          }

          // Find the latest medication
          if (session.traitement) {
             // We've already sorted by dateDebut, so the first 'traitement' found will be the latest
            latestMedicationFound = {
              medication: session.traitement,
              // Assuming dateDebut is available from session for comparison, though not strictly needed after sorting
              dateDebut: session.dateDebut
            };
            // ⭐ Break after finding the latest medication from the sorted list
            break;
          }
        }

        setNextAppointmentDate(closestAppointment ? closestAppointment.toLocaleDateString('fr-FR') : 'N/A');

        if (latestMedicationFound && latestMedicationFound.medication) {
            // Set current medication for display
            setCurrentMedication({ name: latestMedicationFound.medication, dose: '300 mg', time: '08:00 am' });
            // Also store in localStorage for Effetsec.jsx
            localStorage.setItem('currentPatientMedication', latestMedicationFound.medication);
        } else {
            // ⭐⭐⭐ TEMPORARY FOR TESTING: Override with a default medication for both display and localStorage ⭐⭐⭐
            localStorage.setItem('currentPatientMedication', 'Rifampicine'); // For Effetsec.jsx
            setCurrentMedication({ name: 'Isoniazide', dose: '300 mg', time: '08:00 am' }); // For HomePatient.jsx display
            console.warn("No actual medication found, setting 'Rifampicine' as default for testing.");
        }

      } catch (err) {
        console.error('Erreur lors du chargement des données:', err);
        // ⭐⭐⭐ TEMPORARY FOR TESTING: If an error occurs, still set default for testing ⭐⭐⭐
        localStorage.setItem('currentPatientMedication', 'Isoniazide');
        setCurrentMedication({ name: 'Isoniazide', dose: '300 mg', time: '08:00 am' });
        console.warn("Error fetching data, setting 'Rifampicine' as default for testing.");
      }
    };

    fetchData();
  }, [patientId]); // Depend on patientId to refetch if it changes

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
          {/* Médicament Section (singular) */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Médicament à prendre</h2>
            {currentMedication ? (
              <div
                className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg border border-gray-200"
              >
                <div className="bg-teal-100 p-3 rounded-full">
                  <Pill className="w-6 h-6 text-teal-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 text-lg">
                    {currentMedication.name || 'Médicament'}
                  </h3>
                  <p className="text-gray-600 text-sm">{currentMedication.dose}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-700">{currentMedication.time}</p>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">Aucun médicament trouvé.</p>
            )}
          </div>

          {/* Prochain Rendez-vous Section */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Prochain Rendez-vous</h2>
            <div className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white p-5 rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-sm opacity-90">Date et Heure</p>
                  <p className="font-bold text-2xl">
                    {nextAppointmentDate || 'N/A'}
                  </p>
                </div>
                <Calendar className="w-10 h-10 opacity-70" />
              </div>
              <p className="text-sm opacity-90">Avec</p>
              <p className="font-semibold text-lg">Dr. Toumi malak</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}