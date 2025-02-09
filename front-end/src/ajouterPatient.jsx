import React, { useState } from "react";
    const Formulaire = () => {
      const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        age: "",
        gender: "",
        email: "",
      });
       const [weight, setWeight] = useState(50);
      
        const handleSliderChange = (e) => {
          setWeight(e.target.value); // Update weight when slider changes
        };
      
      
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
      };
    
      return (
        <div className="max-w-8xl mx-auto p-6 bg-teal-50">
            <div className='w-full text-center'>
          <h2 className="text-2xl font-semibold mb-4 items-center">Enregistrer patient</h2>
          </div>
          <form onSubmit={handleSubmit}>
            {/* nom prenom side by side */}
            <div className="flex mb-4">
              <div className="w-1/2 pr-2">
                <label htmlFor="nom" className=" relative block font-semibold text-gray-700">    
                <input
                  id="nom"
                  name="Nom"
                  type="text"
                  value={formData.nom}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border-2 border-opacity-50 bg-teal-50 rounded-md border-teal-800 outline-none  focus:border-teal-800 focus:outline-none transition duration-200"
                /> 
               <span className="absolute left-0 top-2 mx-2 px-2 transition duration-200 input-text ">Nom</span>
                 </label>
              </div>
              <div className="w-1/2 pr-2">
                <label htmlFor="prenom" className=" relative block font-semibold text-gray-700">
                <input
                  id="prenom"
                  name="Prenom"
                  type="text"
                  value={formData.prenom}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border-2 border-opacity-50 bg-teal-50 rounded-md border-teal-800 outline-none  focus:border-teal-800 focus:outline-none transition duration-200"
                /> 
               <span className="absolute left-0 top-2 mx-2 px-2 transition duration-200 input-text ">Prenom</span>
                 </label>
              </div>
            </div>
            {/* Age ddt by side */} 
            <div className="flex mb-4">
              <div className="w-1/2 pr-2">
                <label htmlFor="age" className=" relative block font-semibold text-gray-700">
                <input
                  id="age"
                  name="Age"
                  type="number"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border-2  bg-teal-50 border-opacity-50 rounded-md border-teal-800 outline-none focus:border-teal-800 focus:outline-none transition duration-200"
                /> 
               <span className="absolute left-0 top-2 mx-2 px-2 transition duration-200 input-number ">Age</span>
                 </label>
              </div>
              <div className="w-1/2 pr-2">
                <label htmlFor="ddn" className=" relative block font-semibold text-gray-700">
                <input
                  id="ddn"
                  name="Date"
                  type="date"
                  placeholder=""
                  value={formData.ddt}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border-2 border-opacity-50  bg-teal-50 rounded-md outline-none focus:border-teal-800 focus:outline-none transition duration-200"
                /> 
               <span className="absolute left-0 top-2 mx-2 px-2 transition duration-200 input-date ">Date de naissance</span>
                 </label>
              </div>
              </div>
               {/* poids sex by side */} 
            <div className="flex mb-4">
              <div className="w-1/2 pr-2">
              <div className="flex relative  items-center space-x-4">
        {/* Weight slider */}
        <input
          type="range"
          min="30"
          max="200"
          value={weight}
          onChange={handleSliderChange}
          className=" w-full h-2  bg-teal-200 rounded-lg cursor-pointer"
        />
        {/* Weight display */}
        <span className=" ml-1 text-xl font-semibold">{weight}Kg</span>
      </div>
    </div>
              <div className="w-1/2 pr-2">
                <label htmlFor="sex" className=" relative block font-semibold text-gray-700">
                <select
                id="sex"
                name="Sex"
                value={formData.sex}
                onChange={handleChange}
                className="w-full px-4 py-2 border-2 border-opacity-50  bg-teal-50 rounded-md border-teal-800 outline-none  focus:border-teal-800 focus:outline-none transition duration-200"
              >
                <option value="">Sélectionnez le sexe</option>
                <option value="male">Male</option>
                <option value="female">Femelle</option>
                </select>
              </label>
              </div>
            </div>
             {/* num by side*/}
            <div className="flex mb-4">
              <div className="w-1/2 pr-2">
                <label htmlFor="num" className=" relative block font-semibold text-gray-700">
                <input
                  id="num"
                  name="numPersonelle"
                  type="text"
                  value={formData.nume}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border-2 bg-teal-50 border-opacity-50 rounded-md border-teal-800 outline-none  focus:border-teal-800 focus:outline-none transition duration-200"
                /> 
               <span className="absolute left-0 top-2 mx-2 px-2 transition duration-200 input-text ">N_telephone</span>
                 </label>
              </div>
              <div className="w-1/2 pr-2">
                <label htmlFor="numU" className=" relative block font-semibold text-gray-700">
                <input
                  id="numU"
                  name="numUrgent"
                  type="text"
                  value={formData.numU}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border-2 bg-teal-50 border-opacity-50 rounded-md border-teal-800 outline-none  focus:border-teal-800 focus:outline-none transition duration-200"
                /> 
               <span className="absolute left-0 top-2 mx-2 px-2 transition duration-200 input-text ">Contact urgent</span>
                 </label>
              </div>
</div>
{/* email */}
<div className="flex mb-4">
              <div className="w-1/2 pr-2">
                <label htmlFor="email" className=" relative block font-semibold text-gray-700">
                <input
                  id="email"
                  name="Email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border-2  bg-teal-50 border-opacity-50 rounded-md border-teal-800 outline-none  focus:border-teal-800 focus:outline-none transition duration-200"
                /> 
               <span className="absolute left-0 top-2 mx-2 px-2 transition duration-200 input-email ">Email</span>
                 </label>
              </div>
              <div className="w-1/2 pr-2">
                <label htmlFor="adress" className=" relative block font-semibold text-gray-700">
                <input
                  id="adress"
                  name="Adress"
                  type="text"
                  value={formData.adress}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border-2 bg-teal-50 border-opacity-50 rounded-md border-teal-800 outline-none  focus:border-teal-800 focus:outline-none transition duration-200"
                /> 
               <span className="absolute left-0 top-2 mx-2 px-2 transition duration-200 input-text ">Adress</span>
                 </label>
              </div>
              </div>
             {/* Autre maladie allergie categorie*/} 
             <div className="flex mb-4">
              <div className="w-1/3 pr-2">
                <label htmlFor="maladie" className=" relative block font-semibold text-gray-700">
                <input
                  id="maladie"
                  name="Maladie"
                  type="text"
                  value={formData.maladie}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border-2  bg-teal-50 border-opacity-50 rounded-md border-teal-800 outline-none focus:border-teal-800 focus:outline-none transition duration-200"
                /> 
               <span className="absolute left-0 top-2 mx-2 px-2 transition duration-200 input-text ">Autre maladie</span>
                 </label>
              </div>
              <div className="w-1/3 pr-2">
                <label htmlFor="poids" className=" relative block font-semibold text-gray-700">
                <input
                  id="poids"
                  name="Poids"
                  type="text"
                  value={formData.poids}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border-2 bg-teal-50  border-opacity-50 rounded-md border-teal-800 outline-none  focus:border-teal-800 focus:outline-none transition duration-200"
                /> 
               <span className="absolute left-0 top-2 mx-2 px-2 transition duration-200 input-text ">Allergie</span>
                 </label>
              </div>
              <div className="w-1/3 pr-2">
                <label htmlFor="situation" className=" relative block font-semibold text-gray-700">
                <select
                id="situation"
                name="Situation"
                value={formData.setuation}
                onChange={handleChange}
                className="w-full px-4 py-2 border-2  bg-teal-50 border-opacity-50 rounded-md border-teal-800 outline-none  focus:border-teal-800 focus:outline-none transition duration-200"
              >
                <option value=""> Situation</option>
                <option value="Nouveau cas"></option>
                <option value="Retraitement"></option>
                <option value="TB-MR"></option>
                </select>
              </label>
              </div>
            </div>

{/*jh*/}

 
            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className="px-6 py-2 bg-teal-800 text-white rounded-md focus:outline-none"
              >
                Enregitrer
              </button>
            </div>
       
          </form>
        </div>
      );
    };
    
    export default Formulaire;
    