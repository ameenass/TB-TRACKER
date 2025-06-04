import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Layout from './Layout.jsx';
import './index.css';
import Formulaire from './ajouterPatient.jsx';
import SearchPatient from './SearchPatient.jsx';
import Home from './Home.jsx';
import FichePer from './FichePer.jsx';
import ProfilePatient from './ProfilePatient.jsx';
import ConnexionMedecin from './InscriptionMedecin.jsx';
import Protection from "./Protection.jsx";

//redirige selon l'etat de connexion
function RedirectOnStart() {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isMedecinLoggedIn") === "true";
    if (isLoggedIn) {
      navigate("/accueil");
    } else {
      navigate("/inscription-medecin");
    }
  }, [navigate]);

  return null; //redirige juste
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirection initiale */}
        <Route path="/" element={<RedirectOnStart />} />

        {/* Routes protégées avec Layout */}
        <Route path="/" element={<Layout />}>
          <Route path="/accueil" element={<Home />} />
          <Route path="rechercher" element={<Protection> <SearchPatient /></Protection>} />
          <Route path="ajouterpatient" element={<Protection> <Formulaire /></Protection>} />
          <Route path="profile/:id" element={<Protection> <FichePer /></Protection>} />
          <Route path="/fiche-details/:id" element={<Protection> <ProfilePatient /></Protection>} />
        </Route>

        {/* Page de connexion */}
        <Route path="/inscription-medecin" element={<ConnexionMedecin />} />
      </Routes>
    </Router>
  );
}

export default App;
