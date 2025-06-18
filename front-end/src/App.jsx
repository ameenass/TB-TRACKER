// import React, { useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
// import Layout from './Layout.jsx';
// import './index.css';
// import Formulaire from './ajouterPatient.jsx';
// import SearchPatient from './SearchPatient.jsx';
// import Home from './Home.jsx';
// import FichePer from './FichePer.jsx';
// import ProfilePatient from './ProfilePatient.jsx';
// import ConnexionMedecin from './InscriptionMedecin.jsx';
// import Protection from "./Protection.jsx";

// //redirige selon l'etat de connexion
// function RedirectOnStart() {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const isLoggedIn = localStorage.getItem("isMedecinLoggedIn") === "true";
//     if (isLoggedIn) {
//       navigate("/accueil");
//     } else {
//       navigate("/inscription-medecin");
//     }
//   }, [navigate]);

//   return null; //redirige juste
// }

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Redirection initiale */}
//         <Route path="/" element={<RedirectOnStart />} />

//         {/* Routes protégées avec Layout */}
//         <Route path="/" element={<Layout />}>
//           <Route path="/accueil" element={<Home />} />
//           <Route path="rechercher" element={<Protection> <SearchPatient /></Protection>} />
//           <Route path="ajouterpatient" element={<Protection> <Formulaire /></Protection>} />
//           <Route path="profile/:id" element={<Protection> <FichePer /></Protection>} />
//           <Route path="/fiche-details/:id" element={<Protection> <ProfilePatient /></Protection>} />
//         </Route>

//         {/* Page de connexion */}
//         <Route path="/inscription-medecin" element={<ConnexionMedecin />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';

// Médecin layout and pages
import Layout from './Layout.jsx';
import Formulaire from './AjouterPatient.jsx';
import SearchPatient from './SearchPatient.jsx';
import Home from './Home.jsx';
import FichePer from './FichePer.jsx';
import ProfilePatient from './ProfilePatient.jsx';
import Protection from './Protection.jsx';

// Patient layout and pages
import LayoutPatient from './LayoutPatient.jsx';
import HomePatient from './HomePatient.jsx';
import Effetsec from './Effetsec.jsx';
import Agendap from './Agendap.jsx';

// Login
import ConnexionMedecin from './InscriptionMedecin.jsx';

function App() {
  const [isMedecin, setIsMedecin] = useState(localStorage.getItem('isMedecinLoggedIn') === 'true');
  const [isPatient, setIsPatient] = useState(localStorage.getItem('isPatientLoggedIn') === 'true');

  // Function to update login status, passed to login components
  const updateLoginStatus = useCallback(() => {
    setIsMedecin(localStorage.getItem('isMedecinLoggedIn') === 'true');
    setIsPatient(localStorage.getItem('isPatientLoggedIn') === 'true');
  }, []); // useCallback ensures this function reference is stable, preventing unnecessary re-renders of children

  // Initial check on component mount to set correct status
  useEffect(() => {
    updateLoginStatus();
  }, [updateLoginStatus]); // Dependency array includes updateLoginStatus for consistency

  // This useEffect is more for cross-tab/window synchronization and is less critical for the immediate login issue.
  // Keeping it for completeness if cross-tab login status needs to be synced.
  useEffect(() => {
    const handleStorageChange = () => {
      updateLoginStatus();
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [updateLoginStatus]);


  return (
    <Router>
      <Routes>
        {/* Pass updateLoginStatus to ConnexionMedecin component */}
        <Route path="/inscription-medecin" element={<ConnexionMedecin updateLoginStatus={updateLoginStatus} />} />
        
        {/* The InitialRedirect component can now directly use the state from App */}
        <Route path="/" element={<InitialRedirect isMedecin={isMedecin} isPatient={isPatient} />} />

        {/* Médecin layout & protected routes */}
        {isMedecin && (
          <Route path="/" element={<Layout />}>
            <Route path="accueil" element={<Home />} />
            <Route path="rechercher" element={<Protection><SearchPatient /></Protection>} />
            <Route path="ajouterpatient" element={<Protection><Formulaire /></Protection>} />
            <Route path="profile/:id" element={<Protection><FichePer /></Protection>} />
            <Route path="/fiche-details/:id" element={<Protection> <ProfilePatient /></Protection>} />
          </Route>
        )}

        {/* Patient layout & routes */}
        {isPatient && (
          <Route path="/" element={<LayoutPatient />}>
            <Route index element={<HomePatient />} />
            <Route path="accueil-patient" element={<HomePatient />} />
            <Route path="symptomes" element={<Effetsec />} />
            <Route path="agenda" element={<Agendap />} />
          </Route>
        )}

        {/* Catch-all for unauthenticated users trying to access protected routes */}
        {(!isMedecin && !isPatient) && (
             <Route path="*" element={<Navigate to="/inscription-medecin" replace />} />
        )}
      </Routes>
    </Router>
  );
}

// InitialRedirect remains the same, it receives props from App
function InitialRedirect({ isMedecin, isPatient }) {
    if (isMedecin) return <Navigate to="/accueil" replace />;
    if (isPatient) return <Navigate to="/accueil-patient" replace />;
    // If neither is logged in, and the current path is not the login page, redirect to login
    if (window.location.pathname !== '/inscription-medecin') {
        return <Navigate to="/inscription-medecin" replace />;
    }
    return null; // Don't redirect if already on login page or no one is logged in at all
}

export default App;