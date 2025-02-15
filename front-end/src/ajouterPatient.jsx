import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Formulaire = () => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [maladie, setMaladie] = useState('');
  const [allergie, setAllergie] = useState('');
  const [tlphn, setTlphn] = useState('');
  const [adress, setAdress] = useState('');
  const [situation, setSituation] = useState('');
  const [sex, setSex] = useState('');
  const [ddn, setDdn] = useState('');
  const [poids, setPoids] = useState(50);
  const [showPopup, setShowPopup] = useState(false);

  const handleEnregistrer = async () => {
    if (!nom || !prenom || !email || !age || !maladie || !allergie || !tlphn || !adress || !situation || !sex || !ddn || !poids) {
      toast.error("Tous les champs doivent être remplis !");
      return;  // si sont fausses la fonction s'arrette ici
    }

    // Créer un objet avec les données du formulaire
    const formData = {
      nom,
      prenom,
      email,
      age,
      maladie,
      allergie,
      tlphn,
      adress,
      situation,
      sex,
      ddn,
      poids,
    };
    try {
      const response = await fetch('http://localhost:5000/patients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',},
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        toast.success("Données enregistrées avec succès !");
        setShowPopup(true);
      } else {
        toast.error("Erreur lors de l'enregistrement des données.");
      }
    } catch (error) {
      toast.error("Une erreur est survenue : " + error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEnregistrer();
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="max-w-8xl mx-auto p-14 bg-teal-50">
      <ToastContainer />
      <div className='w-full text-center'>
        <h2 className="text-3xl font-semibold mb-9 mt-0 items-center text-teal-900">Formulaire de patient</h2>
      </div>
      <form onSubmit={handleSubmit}>
        {/* Nom et Prénom */}
        <div className="flex mb-6">
          <div className="w-1/2 pr-4">
            <input
              id="nom"
              value={nom}
              type="text"
              onChange={(e) => setNom(e.target.value)}
              className="w-full px-4 py-2 border-2 rounded-md"
              placeholder="Nom"
            />
          </div>
          <div className="w-1/2 pl-4">
            <input
              id="prenom"
              value={prenom}
              type="text"
              onChange={(e) => setPrenom(e.target.value)}
              className="w-full px-4 py-2 border-2 rounded-md"
              placeholder="Prénom"
            />
          </div>
        </div>

        {/* Email, Âge et Téléphone */}
        <div className="flex mb-6">
          <input
            id="email"
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-1/3 px-4 py-2 border-2 rounded-md mr-4"
            placeholder="Email"
          />
          <input
            id="age"
            value={age}
            type="number"
            onChange={(e) => setAge(e.target.value)}
            className="w-1/3 px-4 py-2 border-2 rounded-md mr-4"
            placeholder="Âge"
          />
          <input
            id="tlphn"
            value={tlphn}
            type="tel"
            onChange={(e) => setTlphn(e.target.value)}
            className="w-1/3 px-4 py-2 border-2 rounded-md"
            placeholder="Téléphone"
          />
        </div>

        {/* Adresse */}
        <input
          id="adress"
          value={adress}
          type="text"
          onChange={(e) => setAdress(e.target.value)}
          className="w-full px-4 py-2 border-2 rounded-md mb-6"
          placeholder="Adresse"
        />

        {/* Maladie et Allergie */}
        <div className="flex mb-6">
          <input
            id="maladie"
            value={maladie}
            type="text"
            onChange={(e) => setMaladie(e.target.value)}
            className="w-1/2 px-4 py-2 border-2 rounded-md mr-4"
            placeholder="Maladie"
          />
          <input
            id="allergie"
            value={allergie}
            type="text"
            onChange={(e) => setAllergie(e.target.value)}
            className="w-1/2 px-4 py-2 border-2 rounded-md"
            placeholder="Allergie"
          />
        </div>

        {/* Situation et Sexe */}
        <div className="flex mb-6">
          <select
            id="situation"
            value={situation}
            onChange={(e) => setSituation(e.target.value)}
            className="w-1/2 px-4 py-2 border-2 rounded-md mr-4"
          >
            <option value="">Situation</option>
            <option value="célibataire">Nouveau cas</option>
            <option value="célibataire">Retraitement</option>
            <option value="marié">TB-MR</option>
          </select>
          <select
            id="sex"
            value={sex}
            onChange={(e) => setSex(e.target.value)}
            className="w-1/2 px-4 py-2 border-2 rounded-md"
          >
            <option value="">Sexe</option>
            <option value="Homme">Homme</option>
            <option value="Femme">Femme</option>
          </select>
        </div>

        {/* Date de naissance et Poids */}
        <div className="flex mb-6">
          <input
            id="ddn"
            value={ddn}
            type="date"
            onChange={(e) => setDdn(e.target.value)}
            className="w-1/2 px-4 py-2 border-2 rounded-md mr-4"
          />
          <div className="w-1/2 flex items-center">
            <label className="mr-4">Poids :</label>
            <input
              id="poids-slider"
              type="range"
              min="30"
              max="150"
              value={poids}
              onChange={(e) => setPoids(e.target.value)}
              className="w-full"
            />
            <input
              type="number"
              value={poids}
              onChange={(e) => setPoids(e.target.value)}
              className="ml-4 w-20 px-2 py-1 border-2 rounded-md"
            />
          </div>
        </div>

        {/* Bouton de soumission */}
        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="text-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold px-10 py-3 rounded-md"
          >
            Enregistrer
          </button>
        </div>
      </form>

      {showPopup && (
        <div className="popup bg-white p-6 rounded-md shadow-lg mt-6">
          <h2 className="text-xl font-bold mb-4">Félicitations!</h2>
          <p>Les données ont été enregistrées avec succès.</p>
          <button
            onClick={togglePopup}
            className="mt-4 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md"
          >
            Fermer
          </button>
        </div>
      )}
    </div>
  );
};

export default Formulaire;
