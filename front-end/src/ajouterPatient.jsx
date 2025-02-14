import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
    const Formulaire = () => {
  // Declaration
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [maladie, setMaladie] = useState('');
  const [allergie, setAllergie] = useState('');
  const [tlphn, setTlphn] = useState('');
  const [tlphnum, setTlphnum] = useState('');
  const [adress, setAdress] = useState('');
  const [situation, setSituation] = useState('');
  const [sex, setSex] = useState('');
  const [ddn, setDdn] = useState('');
       const [poids, setPoids] = useState(50);
      
// Handle slider
const handleSliderChange = (e) => {
  setPoids(e.target.value);
};

//handle form submission
const handleSubmit = (e) => {
  e.preventDefault();

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    toast.error("Format d'email invalide");
    return;
  }

  // Phone number validation
  const phoneRegex = /^0(5|6|7)\d{8}$/;
  if (!phoneRegex.test(tlphn)) {
    toast.error("Numéro de téléphone invalide");
    return;
  }

  // Age validation
  const ageValue = parseInt(age, 10);
  if (isNaN(ageValue) || ageValue < 1 || ageValue > 120) {
    toast.error("Veuillez entrer un âge valide");
    return;
  }

  // Situation validation
  if (!situation) {
    toast.error("Veuillez sélectionner une situation");
    return;
  }

  // Sex validation
  if (!sex) {
    toast.error("Veuillez sélectionner un sexe");
    return;
  }

  // Date validation
  if (!ddn) {
    toast.error("Veuillez sélectionner une date de naissance");
    return;
  }

  // Weight validation
  const weightValue = parseInt(poids, 10);
  if (isNaN(weightValue) || weightValue < 1 || weightValue > 500) {
    toast.error("Veuillez entrer un poids valide");
    return;
  }

  // All fields are valid ??
  if (nom && email && prenom && age && tlphn && adress && situation && sex && ddn) {

    toast.success("Formulaire soumis avec succès!");
  } else {
    toast.error("Veuillez remplir tous les champs!");
  }
};


      return (
        <div className="max-w-8xl mx-auto p-14 bg-teal-50">
           <ToastContainer />
            <div className='w-full text-center'>
          <h2 className="text-3xl font-semibold mb-9 mt-0 items-center text-teal-900">Formulaire de patient
          </h2>
          </div>
          <form onSubmit={handleSubmit}>
            {/* nom prenom */}
            <div className="flex mb-6">
              <div className="w-1/2 pr-4">
                <label className=" relative block font-semibold text-gray-700">    
                <input
                  id="nom"
                  value={nom}
                  name="nom"
                  type="text"
                  onChange={(e) => setNom(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-opacity-50 bg- rounded-md border-teal-800 outline-none  focus:border-teal-800 focus:outline-none transition duration-200 bg-teal-50 text-black"
                /> Nom
               
                 </label>
              </div>
              <div className="w-1/2 pl-4">
                <label  className=" relative block font-semibold text-gray-700">
                <input
                id="prenom"
            value={prenom}
                  name="prenom"
                  type="text"
                  
                  onChange={(e) => setPrenom(e.target.value)}
                  
                  className="w-full  text-black  px-4 py-2 border-2 border-opacity-50 bg-teal-50 rounded-md border-teal-800 outline-none  focus:border-teal-800 focus:outline-none transition duration-200"
                /> 
               Prenom
                 </label>
              </div>
            </div>
            {/* age ddt */} 
            <div className="flex mb-6">
              <div className="w-1/2 pr-4">
                <label htmlFor="age" className=" relative block font-semibold text-gray-700">
                <input
                id="age"
                value={age}
                  name="age"
                  type="number"
                  
                 onChange={(e) => setAge(e.target.value)}
                  className="w-full px-4 py-2 border-2  text-black  bg-teal-50 border-opacity-50 rounded-md border-teal-800 outline-none focus:border-teal-800 focus:outline-none transition duration-200"
                /> 
Age
                 </label>
              </div>
              <div className="w-1/2 pl-4">
                <label htmlFor="ddn" className=" relative block font-semibold text-gray-700">
                <input
                value={ddn}
                id="ddn"
                  name="ddn"
                  type="date"
                  
                  placeholder="Date de naissance"
                  
                  onChange={(e) => setDdn(e.target.value)}                  className="w-full px-4 py-2 border-2 text-black  border-opacity-50  bg-teal-50 rounded-md outline-none border-teal-800 focus:border-teal-800 focus:outline-none transition duration-200"
                /> 
               Date de naissance              </label>
              </div>
              </div>
               {/* poids sex */} 
            <div className="flex mb-6">
              <div className="w-1/2 pr-4">
              <div className="flex relative  items-center space-x-4">
        {/* weight slider */}
        <input
        id="poids"
          type="range"
          min="30"
          max="200"

          value={poids}
          onChange={(e) => setPoids(e.target.value)}
          className=" w-full h-2  bg-teal-200  text-black rounded-lg cursor-pointer"
        />
        {/* weight display */}
        <span className=" ml-1 text-xl font-semibold">{poids}Kg</span>
      </div>
    </div>
              <div className="w-1/2 pl-4">
                <label htmlFor="sex" className=" relative block font-semibold text-gray-700">
                <select
               value={sex}
                name="sex"
                id="sex"
                required
                
                
                onChange={(e) => setSex(e.target.value)}
                className="w-full px-4 py-2 border-2 border-opacity-50  bg-teal-50 rounded-md border-teal-800 outline-none  focus:border-teal-800 focus:outline-none transition duration-200"
              >
                <option value="">Sexe</option>
                <option value="homme">Homme</option>
                <option value="femme">Femme</option>
                </select>
              </label>
              </div>
            </div>
             {/* num by side*/}
            <div className="flex mb-6">
              <div className="w-1/2 pr-4">
                <label htmlFor="num" className=" relative block font-semibold text-gray-700">
                <input
                 value={tlphn}
                  name="tlphn"
                  type="text"
                  id="tlphn"
                  
                  onChange={(e) => setTlphn(e.target.value)}
                  className="w-full px-4 py-2 border-2 bg-teal-50 border-opacity-50 rounded-md border-teal-800 outline-none  focus:border-teal-800 focus:outline-none transition duration-200"
                /> 
               Num_Telephone         </label>
              </div>
              <div className="w-1/2 pl-4">
                <label htmlFor="numU" className=" relative block font-semibold text-gray-700">
                <input
                 value={tlphnum}
                  name="tlphnum"
                  type="text"
                  id="tlphnum"
                
                  onChange={(e) => setTlphnum(e.target.value)}
                  className="w-full px-4 py-2 border-2 text-black  bg-teal-50 border-opacity-50 rounded-md border-teal-800 outline-none  focus:border-teal-800 focus:outline-none transition duration-200"
                /> 
                Numéro d'urgence
                 </label>
              </div>
</div>
{/* email */}
 <div className="flex mb-6">
              <div className="w-1/2 pr-4">
                <label htmlFor="email" className=" relative block font-semibold text-gray-700">
                <input
                  name="email"
                value={email}
                  type="email"
                 id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2 border-2 text-black bg-teal-50 border-opacity-50 rounded-md border-teal-800 outline-none  focus:border-teal-800 focus:outline-none transition duration-200"
                /> 
              Email
                 </label>
              </div>
              <div className="w-1/2 pl-4">
                <label htmlFor="adress" className=" relative block font-semibold text-gray-700">
                <input
                  name="adress"
              value={adress}
                  type="text"
                 id="adresse"
                  onChange={(e) => setAdress(e.target.value)}
                  className="w-full px-4 py-2 border-2 text-black  bg-teal-50 border-opacity-50 rounded-md border-teal-800 outline-none  focus:border-teal-800 focus:outline-none transition duration-200"
                /> 
              Adresse
                 </label>
              </div>
              </div>
             {/* Autre maladie allergie categorie*/} 
             <div className="flex mb-6">
              <div className="w-1/2 pr-2">
                <label htmlFor="maladie" className=" relative block font-semibold text-gray-700">
                <input
                  name="maladie"
                  id="autreMaladie"
                 value={maladie}
                  type="text"
                                    onChange={(e) => setMaladie(e.target.value)}
                  className="w-full px-4 py-2 border-2  text-black  bg-teal-50 border-opacity-50 rounded-md border-teal-800 outline-none focus:border-teal-800 focus:outline-none transition duration-200"
                /> 
               Autre maladie
                 </label>
              </div>
              <div className="w-1/2 pl-4 pr-4 ">
                <label htmlFor="poids" className=" relative block font-semibold text-gray-700">
                <input
                 value={allergie}
                  name="allergie"
                  type="text"
                 id="allergie"
          
                  onChange={(e) => setAllergie(e.target.value)}
                  className="w-full px-4 py-2 border-2 text-black  bg-teal-50  border-opacity-50 rounded-md border-teal-800 outline-none  focus:border-teal-800 focus:outline-none transition duration-200"
                /> 
                Allergie
                 </label>
              </div>
              </div>
              <div className="flex mb-6">
                <div className="w-1/2">
                <label htmlFor="situation" className=" relative block font-semibold text-gray-700">
                <select
               id="situation"
                name="situation"
               value={situation}
                onChange={(e) => setSituation(e.target.value)}
                className="w-full px-4 py-2 border-2 text-teal-800  bg-teal-50 border-opacity-50 rounded-md border-teal-800 outline-none  focus:border-teal-800 focus:outline-none transition duration-200"
              >
                <option value=""> Situation</option>
                <option value="nouveau cas" className="w-full">Nouveau cas</option>
                <option value="retraitement">Retraitement</option>
                <option value="tb-mr">TB-MR</option>
                </select>
              </label>
              </div>
            </div>

 <div className="flex justify-end ">
           
            <div className="flex pr-4">
              <button
                type="button"
                className="px-6 py-2 font-semibold text-teal-800 bg-teal-50 rounded-md focus:outline-none border-2 border-teal-800"
              >
                Annuler
              </button>
            </div>
             <div className="flex pl-4">
              <button
                type="submit"
                className="px-6 py-2 bg-teal-800 font-semibold text-white rounded-md focus:outline-none"
              >
                Enregistrer
              
              </button>
            </div>
</div>
          </form>
        </div>
      );
    }
    export default Formulaire;