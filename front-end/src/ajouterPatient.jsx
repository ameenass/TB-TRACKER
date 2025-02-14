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
  const [nume, setNume] = useState('');
  const [numU, setNumU] = useState('');
  const [adress, setAdress] = useState('');
  const [situation, setSituation] = useState('');
  const [sex, setSex] = useState('');
  const [ddt, setDdt] = useState('');
       const [weight, setWeight] = useState(50);
      
// Handle slider
const handleSliderChange = (e) => {
  setWeight(e.target.value);
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
  const phoneRegex = /^[0-9]{8,15}$/; // Allows 8 to 15 digits
  if (!phoneRegex.test(nume) || !phoneRegex.test(numU)) {
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
  if (!ddt) {
    toast.error("Veuillez sélectionner une date de naissance");
    return;
  }

  // Weight validation
  const weightValue = parseInt(weight, 10);
  if (isNaN(weightValue) || weightValue < 1 || weightValue > 500) {
    toast.error("Veuillez entrer un poids valide");
    return;
  }

  // All fields are valid ??
  if (nom && email && prenom && age && maladie && allergie && nume && numU && adress) {
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
                value={ddt}
                  name="ddt"
                  type="date"
                  
                  placeholder="Date de naissance"
                  
                  onChange={(e) => setDdt(e.target.value)}                  className="w-full px-4 py-2 border-2 text-black  border-opacity-50  bg-teal-50 rounded-md outline-none border-teal-800 focus:border-teal-800 focus:outline-none transition duration-200"
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
          type="range"
          min="30"
          max="200"

          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className=" w-full h-2  bg-teal-200  text-black rounded-lg cursor-pointer"
        />
        {/* weight display */}
        <span className=" ml-1 text-xl font-semibold">{weight}Kg</span>
      </div>
    </div>
              <div className="w-1/2 pl-4">
                <label htmlFor="sex" className=" relative block font-semibold text-gray-700">
                <select
               value={sex}
                name="sex"
                
                
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
                 value={nume}
                  name="nume"
                  type="text"
                  
                  onChange={(e) => setNume(e.target.value)}
                  className="w-full px-4 py-2 border-2 bg-teal-50 border-opacity-50 rounded-md border-teal-800 outline-none  focus:border-teal-800 focus:outline-none transition duration-200"
                /> 
               Num_Telephone         </label>
              </div>
              <div className="w-1/2 pl-4">
                <label htmlFor="numU" className=" relative block font-semibold text-gray-700">
                <input
                 value={numU}
                  name="numU"
                  type="text"
                
                  onChange={(e) => setNumU(e.target.value)}
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