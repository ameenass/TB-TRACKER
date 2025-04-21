// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const Formulaire = () => {
//   const [id, setId] = useState('');
//   const [nom, setNom] = useState('');
//   const [prenom, setPrenom] = useState('');
//   const [email, setEmail] = useState('');
//   const [age, setAge] = useState('');
//   const [maladie, setMaladie] = useState('');
//   const [allergie, setAllergie] = useState('');
//   const [tlphn, setTlphn] = useState('');
//   const [adresse, setAdress] = useState('');
//   const [sexe, setSex] = useState('');
//   const [ddn, setDdn] = useState('');
//   const [poids, setPoids] = useState(50);
//   const [categorie, setCategorie] = useState('');
//   const [preuve, setPreuve] = useState('');
//   const [comptageTuberculeux, setComptageTuberculeux] = useState('');
//   const [localisationTB, setLocalisationTB] = useState('');
//   const [antecedents, setAntecedents] = useState([]);
//   const [remarque, setRemarque] = useState('');
//   const [showPopup, setShowPopup] = useState(false);

//   const handleEnregistrer = async () => {
//     if (!id || !nom || !prenom || !email || !age || !antecedents  || !tlphn || !adresse || !sexe || !ddn || !poids || !categorie || !preuve || !localisationTB ) {
//       toast.error("Tous les champs doivent être remplis !");
//       return;
//     }

//     const formData = {
//       id,
//       nom,
//       prenom,
//       email,
//       age,
//       localisationTB,
//       tlphn,
//       adresse,
//       sexe,
//       ddn,
//       poids,
//       categorie,
//       preuve,
//       comptageTuberculeux,
//       antecedents,
//       remarque
//     };

//     try {
//       const response = await fetch('http://localhost:5000/patients', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       })

//       const data = await response.json();

//       if (response.ok) {
//         toast.success("Données enregistrées avec succès !");
//         setShowPopup(true);
//       } else {
//         toast.error("Erreur lors de l'enregistrement des données.");
//       }
//     } catch (error) {
//       toast.error("Une erreur est survenue : " + error.message);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     handleEnregistrer();
//   };

//   return (
//     <div className="max-w-8xl mx-auto p-14 bg-teal-50">
//       <ToastContainer />
//       <h2 className="text-3xl font-semibold mb-9 text-center text-teal-900">Formulaire de patient</h2>
//       <form onSubmit={handleSubmit}>
//         <input value={id} onChange={(e) => setId(e.target.value)} placeholder="ID Patient" className="w-full px-4 py-2 border-2 rounded-md mb-4" />
//         <input value={nom} onChange={(e) => setNom(e.target.value)} placeholder="Nom" className="w-full px-4 py-2 border-2 rounded-md mb-4" />
//         <input value={prenom} onChange={(e) => setPrenom(e.target.value)} placeholder="Prénom" className="w-full px-4 py-2 border-2 rounded-md mb-4" />
//         <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full px-4 py-2 border-2 rounded-md mb-4" />
//         <input value={age} onChange={(e) => setAge(e.target.value)} type="number" placeholder="Âge" className="w-full px-4 py-2 border-2 rounded-md mb-4" />
//         <input value={tlphn} onChange={(e) => setTlphn(e.target.value)} type="number" placeholder="Numero de telephone" className="w-full px-4 py-2 border-2 rounded-md mb-4" />
        
//         <input value={adresse} onChange={(e) => setAdress(e.target.value)} placeholder="Adresse" className="w-full px-4 py-2 border-2 rounded-md mb-4" />
//         <select value={sexe} onChange={(e) => setSex(e.target.value)} className="w-full px-4 py-2 border-2 rounded-md mb-4">
//           <option value="">Sexe</option>
//           <option value="Homme">Homme</option>
//           <option value="Femme">Femme</option>
//         </select>
//         <input value={ddn} onChange={(e) => setDdn(e.target.value)} type="date" className="w-full px-4 py-2 border-2 rounded-md mb-4" />
//         <select value={categorie} onChange={(e) => setCategorie(e.target.value)} className="w-full px-4 py-2 border-2 rounded-md mb-4">
//           <option value="">Catégorie</option>
//           <option value="1">I</option>
//           <option value="2">II</option>
//           <option value="3">III</option>
//         </select>
//         <select value={preuve} onChange={(e) => setPreuve(e.target.value)} className="w-full px-4 py-2 border-2 rounded-md mb-4">
//           <option value="">Preuve</option>
//           <option value="Bactériologique">Bactériologique</option>
//           <option value="Histologique">Histologique</option>
//           <option value="Sans preuve">Sans preuve</option>
//         </select>


        
//         <select value={antecedents} onChange={(e) => setAntecedents(e.target.value)} className="w-full px-4 py-2 border-2 rounded-md mb-4">
//           <option value="">Antecedents</option>
//           <option value="Tuberculose">Tuberculose</option>
//           <option value="HTA">HTA</option>
//           <option value="Diabète preuve">Diabète</option>
//           <option value="Insuffisance rénale">Insuffisance rénale</option>
//           <option value="Cardiopathie">Cardiopathie</option>
//         </select>
        
//          <div className="w-1/2 flex items-center">
//             <label className="mr-4">Poids:</label>
//             <input
//               id="poids-slider"
//               type="range"
//               min="30"
//               max="150"
//               value={poids}
//               onChange={(e) => setPoids(e.target.value)}
//               className="w-full"
//             />
//             <input
//               type="number"
//               value={poids}
//               onChange={(e) => setPoids(e.target.value)}
//               className="ml-4 w-20 px-2 py-1 border-2 rounded-md"
//             />
//           </div>


//         <textarea value={remarque} onChange={(e) => setRemarque(e.target.value)} placeholder="Remarque" className="w-full px-4 py-2 border-2 rounded-md mb-4"></textarea>
//         <button type="submit" className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-10 py-3 rounded-md">Enregistrer</button>
//       </form>
//     </div>
//   );
// };

// export default Formulaire;








// {/* {showPopup && (
//         <div className="popup bg-white p-6 rounded-md shadow-lg mt-6">
//           <h2 className="text-xl font-bold mb-4">Félicitations!</h2>
//           <p>Les données ont été enregistrées avec succès.</p>
//           <button
//             onClick={togglePopup}
//             className="mt-4 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md"
//           >
//             Fermer
//           </button>
//         </div>
//       )} */}









// import React, { useState } from "react";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { User, Calendar, Phone, MapPin, Mail, Weight, IdCard } from "lucide-react";
// import MultiBoxSelector from "./MultiBoxSelector";
// import AdresseSearchDropdown from "./AdresseSearchDropdown";
// import { Mars, Venus } from 'lucide-react';

// const CheckboxF = ({ value, onChange,id }) => {
//   const options = [
//     { label: 'Male', value: 'male', icon: <Mars className="w-4 h-4 mr-2" /> },
//     { label: 'Female', value: 'female', icon: <Venus className="w-4 h-4 mr-2" /> },
//   ];

//   return (
//     <div className="flex gap-3 flex-wrap">
//       {options.map(({ label, value: val, icon }) => {
//         const isSelected = value === val;
//         const optionId = `${id}-${val}`;
//         return (
//           <div
//             key={val}
//             id={optionId}
//             onClick={() => onChange({ target: { value: val } })}
//             className={`flex items-center cursor-pointer px-4 py-2 border rounded-lg transition-all duration-150 uppercase text-sm font-medium
//               ${isSelected ? 'bg-blue-100 border-blue-500 text-blue-700' : 'bg-white border-gray-300 text-gray-700'}`}
//           >
//             {icon}
//             {label}
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// const CustomFormField = ({
//   id,
//   label,
//   fieldType,
//   value,
//   onChange,
//   placeholder,
//   Icon,
//   isSelect = false,
//   options = []
// }) => {
//   return (
//     <div className="flex flex-col space-y-1 w-full">
//       <label   htmlFor={id} className="text-gray-700 text-sm">{label}</label>
//       <div className="flex items-center border border-gray-300 rounded-lg p-2 bg-white focus-within:border-gray-500">
//         {Icon && <Icon className="w-5 h-5 text-gray-500 mr-2" />}
//         {isSelect ? (
//           <select
//           id={id}
//             value={value}
//             onChange={onChange}
//             className="bg-transparent outline-none text-gray-700 w-full"
//           >
//             <option value="">{placeholder}</option>
//             {options.map((opt, idx) =>
//               opt.options ? (
//                 <optgroup key={idx} label={opt.label}>
//                   {opt.options.map((subOpt) => (
//                     <option key={subOpt} value={subOpt}>
//                       {subOpt}
//                     </option>
//                   ))}
//                 </optgroup>
//               ) : (
//                 <option key={opt.value} value={opt.value}>
//                   {opt.label}
//                 </option>
//               )
//             )}
//           </select>
//         ) : (
//           <input
//           id={id}
//             type={fieldType}
//             value={value}
//             onChange={onChange}
//             placeholder={placeholder}
//             className="bg-transparent outline-none text-gray-700 w-full placeholder-gray-400"
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// const Formulaire = () => {
//   const [IDPatient, setIDPatient] = useState('');
//   const [nom, setNom] = useState('');
//   const [prenom, setPrenom] = useState('');
//   const [email, setEmail] = useState('');
//   const [age, setAge] = useState('');
//   const [adresse, setAdresse] = useState("");
//   const [numero, setNumero] = useState('');
//   const [sexe, setSexe] = useState('');
//   const [DateNaissance, setDateNaissance] = useState('');
//   const [poidsInitial, setPoidsInitial] = useState(50);
//   const [categorie, setCategorie] = useState('');
//   const [preuve, setPreuve] = useState('');
//   const [LocalisationTB, setLocalisationTB] = useState('');
//   const [selectedType, setSelectedType] = useState("");
//   const [selectedSousType, setSelectedSousType] = useState("");
//   const [comptage_tuberculeux, setComptage_tuberculeux] = useState([]);
//   const [antecedents, setAntecedents] = useState([]);
//   const [note, setNote] = useState('');
  
//   const handleEnregistrer = () => {
//     if (!IDPatient || !nom || !prenom || !email || !age || !numero || !DateNaissance || !poidsInitial || !LocalisationTB) {
//       toast.error("Tous les champs doivent être remplis !");
//       return;
//     }

//     const formData = {
//       IDPatient,
//       nom,
//       prenom,
//       email,
//       age,
//       adresse,
//       numero,
//       sexe,
//       DateNaissance,
//       poidsInitial,
//       categorie,
//       preuve,
//       note,
//       LocalisationTB,
//       typeTuberculose: `${selectedType} - ${selectedSousType}`,
//       comptage_tuberculeux,
//       antecedents
//     };

//     fetch('http://localhost:5000/patients', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(formData),
//     })
//     .then(response => {
//       if (!response.ok) {
//         throw new Error("Erreur lors de l'enregistrement des données.");
//       }
//       return response.json();
//     })
//     .then(data => {
//       toast.success("Données enregistrées avec succès !");
//       console.log("Réponse du backend :", data);
      
//     })
//     .catch(error => {
//       toast.error("Une erreur est survenue : " + error.message);
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     handleEnregistrer();
//   };

  
//   //   try {
//   //     const response = await fetch('http://localhost:5000/patients', {
//   //       method: 'POST',
//   //       headers: { 'Content-Type': 'application/json' },
//   //       body: JSON.stringify(formData),
//   //     });
//   //     if (response.ok) {
//   //       toast.success("Données enregistrées avec succès !");
//   //     } else {
//   //       toast.error("Erreur lors de l'enregistrement des données.");
//   //     }
//   //   } catch (error) {
//   //     toast.error("Une erreur est survenue : " + error.message);
//   //   }
//   // };


//   const min = 30;
//   const max = 150;
//   const percent = ((poidsInitial - min) / (max - min)) * 100;

//   const typesTuberculose = {
//     Pulmonaire: ["Jamais traitée", "Déjà traitée"],
//     Extrapulmonaire: [
//       "Pleurale",
//       "Ganglionnaire",
//       "Ostéoarticulaire",
//       "Uro-génitale",
//       "Méningée"
//     ]
//   };

//   const handleTypeChange = (e) => {
//     setSelectedType(e.target.value);
//     setSelectedSousType("");
//   };

//   return (
//     <div className="max-w-6xl mx-auto bg-gray-100 p-5 rounded-lg shadow-lg mt-10">
//       <ToastContainer />
//       <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Formulaire de patient</h2>
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9">
//           <CustomFormField label="ID" id="IDPatient" fieldType="text" value={IDPatient} onChange={(e) => setIDPatient(e.target.value)} placeholder="ID" Icon={IdCard} />
//           <CustomFormField label="Nom" id="nom" fieldType="text" value={nom} onChange={(e) => setNom(e.target.value)} placeholder="Nom" Icon={User} />
//           <CustomFormField label="Prénom" id="prenom" fieldType="text" value={prenom} onChange={(e) => setPrenom(e.target.value)} placeholder="Prénom" Icon={User} />
//           <CustomFormField label="Email" id="email" fieldType="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" Icon={Mail} />
//           <CustomFormField label="Âge" id="age" fieldType="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Âge" Icon={Calendar} />
//           <CustomFormField label="Téléphone" id="numero" fieldType="tel" value={numero} onChange={(e) => setNumero(e.target.value)} placeholder="Téléphone" Icon={Phone} />
       
//         {/* Replace CustomFormField for "Adresse" with AdresseSearchDropdown
//         <div className="col-span-1">
//           <AdresseSearchDropdown  id="adresse" adresse={adresse} setAdresse={setAdresse} />
//         </div>
//       <div className="mt-4">
//         <label className="block font-semibold">Adresse sélectionnée :</label>
//         <p className="text-gray-700">
//   {adresse[0].Rue && adresse[0].Wilaya && adresse[0].Commune
//     ? `${adresse[0].Rue}, ${adresse[0].Commune}, ${adresse[0].Wilaya}`
//     : "Aucune adresse sélectionnée."}
// </p>

//       </div> */}
//       <CustomFormField label="Adresse" id="adresse" fieldType="adrs" value={adresse} onChange={(e) => setAdresse(e.target.value)} placeholder="Adresse" Icon={Phone} />
       
//           <CustomFormField label="Date de naissance" id="DateNaissance" fieldType="date" value={DateNaissance} onChange={(e) => setDateNaissance(e.target.value)} placeholder="" Icon={Calendar} />

//           {/* Poids */}
//           <div className="w-full">
//             <label className="block mb-1 text-gray-700 font-medium">Poids</label>
//             <div className="relative w-full flex items-center p-2">
//               <span className="absolute -top-6 text-lg font-semibold text-teal-600" style={{ left: `calc(${percent}% - 15px)` }}>
//                 {poidsInitial} kg
//               </span>
//               <input type="range" min={min} max={max} id="poidsInitial" value={poidsInitial} onChange={(e) => setPoidsInitial(Number(e.target.value))} className="w-full" />
//             </div>
//           </div>

//           {/* Sexe */}
//           <div className="mb-4">
//             <label className="text-gray-700 text-sm">Sexe</label>
//             <CheckboxF id="sexe" value={sexe} onChange={(e) => setSexe(e.target.value)} />
//           </div>

//           {/* Catégorie */}
//           <CustomFormField
//             label="Catégorie"
//             id="categorie"
//             value={categorie}
//             onChange={(e) => setCategorie(e.target.value)}
//             placeholder="Sélectionnez une catégorie"
//             isSelect={true}
//             options={[
//               { label: 'I', value: 'I' },
//               { label: 'II', value: 'II' },
//               { label: 'III', value: 'III' },
//             ]}
//           />

//           {/* Preuve */}
//           <CustomFormField
//             id="preuve"
//             label="Preuve"
//             value={preuve}
//             onChange={(e) => setPreuve(e.target.value)}
//             placeholder="Sélectionnez une preuve"
//             isSelect={true}
//             options={[
//               { label: 'Bactériologique', value: 'Bactériologique' },
//               { label: 'Histologique', value: 'Histologique' },
//               { label: 'Sans preuve', value: 'Sans preuve' },
//             ]}
//           />

//           {/* Localisation TB */}
//           <CustomFormField
//             id="LocalisationTB"
//             label="Localisation de la tuberculose"
//             value={LocalisationTB}
//             onChange={(e) => setLocalisationTB(e.target.value)}
//             placeholder="Localisation"
//             fieldType="text"
//           />

//           {/* Type et sous-type */}
//           <CustomFormField
//             id="typeTuberculose"
//             label="Type et sous-type"
//             value={selectedSousType}
//             onChange={(e) => setSelectedSousType(e.target.value)}
//             placeholder="Sélectionnez un sous-type"
//             isSelect={true}
//             options={Object.entries(typesTuberculose).map(([type, sousTypes]) => ({
//               label: type,
//               options: sousTypes,
//             }))}
//           />
//         </div>

//         {/* Antécédents et comptage */}
//         <div className="grid grid-cols-3 gap-4">
//           {/* Comptage tuberculeux */}
//           <div className="col-span-1">
//             <label className="font-medium block mb-1">Comptage tuberculeux</label>
//             <MultiBoxSelector
//               id="Comptage_tuberculeux"
//               options={['Proches atteints', 'Proches traités']}
//               selectedValues={comptage_tuberculeux}
//               onChange={setComptage_tuberculeux}
//             />
//           </div>

//           {/* Antécédents */}
//           <div className="col-span-2">
//             <label className="font-medium block mb-1">Antécédents</label>
//             <MultiBoxSelector
//               id="antecedents"
//               options={['Tuberculose', 'HTA', 'Diabète', 'Insuffisance rénale', 'Cardiopathie']}
//               selectedValues={antecedents}
//               onChange={setAntecedents}
//             />
//           </div>

//           {/* Détails supplémentaires */}
//           <div className="flex flex-col space-y-1 w-full mt-4">
//             <label className="text-gray-700 text-sm">Détails supplémentaires</label>
//             <textarea
//               id="note"
//               value={note}
//               onChange={(e) => setNote(e.target.value)}
//               rows={note.split('\n').length + 1}
//               placeholder="Ajoutez des détails supplémentaires ici..."
//               className="border border-gray-300 rounded-lg p-2 bg-white text-gray-700 placeholder-gray-400"
//             />
//           </div>
//         </div>

//         <button type="submit" className="w-full py-2 mt-4 bg-blue-500 text-white font-semibold rounded-lg">Enregistrer</button>
//       </form>
//     </div>
//   );
// };

// export default Formulaire;










import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { User, Calendar, Phone, MapPin, Mail, Weight, IdCard } from "lucide-react";
import MultiBoxSelector from "./MultiBoxSelector";
import AdresseSearchDropdown from "./AdresseSearchDropdown";
import { Mars, Venus } from 'lucide-react';

const CheckboxF = ({ value, onChange,id }) => {
  const options = [
    { label: 'Male', value: 'male', icon: <Mars className="w-4 h-4 mr-2" /> },
    { label: 'Female', value: 'female', icon: <Venus className="w-4 h-4 mr-2" /> },
  ];

  return (
    <div className="flex gap-3 flex-wrap">
      {options.map(({ label, value: val, icon }) => {
        const isSelected = value === val;
        const optionId = `${id}-${val}`;
        return (
          <div
            key={val}
            id={optionId}
            onClick={() => onChange({ target: { value: val } })}
            className={`flex items-center cursor-pointer px-4 py-2 border rounded-lg transition-all duration-150 uppercase text-sm font-medium
              ${isSelected ? 'bg-blue-100 border-blue-500 text-blue-700' : 'bg-white border-gray-300 text-gray-700'}`}
          >
            {icon}
            {label}
          </div>
        );
      })}
    </div>
  );
};

const CustomFormField = ({
  id,
  label,
  fieldType,
  value,
  onChange,
  placeholder,
  Icon,
  isSelect = false,
  options = []
}) => {
  return (
    <div className="flex flex-col space-y-1 w-full">
      <label   htmlFor={id} className="text-gray-700 text-sm">{label}</label>
      <div className="flex items-center border border-gray-300 rounded-lg p-2 bg-white focus-within:border-gray-500">
        {Icon && <Icon className="w-5 h-5 text-gray-500 mr-2" />}
        {isSelect ? (
          <select
          id={id}
            value={value}
            onChange={onChange}
            className="bg-transparent outline-none text-gray-700 w-full"
          >
            <option value="">{placeholder}</option>
            {options.map((opt, idx) =>
              opt.options ? (
                <optgroup key={idx} label={opt.label}>
                  {opt.options.map((subOpt) => (
                    <option key={subOpt} value={subOpt}>
                      {subOpt}
                    </option>
                  ))}
                </optgroup>
              ) : (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              )
            )}
          </select>
        ) : (
          <input
          id={id}
            type={fieldType}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="bg-transparent outline-none text-gray-700 w-full placeholder-gray-400"
          />
        )}
      </div>
    </div>
  );
};

const Formulaire = () => {
  const [IDPatient, setIDPatient] = useState('');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [adresse, setAdresse] = useState([{ Rue: "", Wilaya: "", Commune: "" }]);
  const [numero, setNumero] = useState('');
  const [sexe, setSexe] = useState('');
  const [DateNaissance, setDateNaissance] = useState('');
  const [poidsInitial, setPoidsInitial] = useState(50);
  const [categorie, setCategorie] = useState('');
  const [preuve, setPreuve] = useState('');
  const [LocalisationTB, setLocalisationTB] = useState('');
  const [selectedType, setSelectedType] = useState("");
  const [selectedSousType, setSelectedSousType] = useState("");
  const [Comptage_tuberculeux, setComptage_tuberculeux] = useState([]);
  const [antecedents, setAntecedents] = useState([]);
  const [note, setNote] = useState('');

  const handleEnregistrer = async () => {
    if (!IDPatient || !nom || !prenom || !email || !age || !numero || !sexe || !DateNaissance || !poidsInitial || !categorie || !preuve || !LocalisationTB || !selectedSousType) {
      toast.error("Tous les champs doivent être remplis !");
      return;
    }

    const formData = {
      IDPatient,
      nom,
      prenom,
      email,
      age,
      Adresse: adresse,
      numero,
      sexe,
      DateNaissance,
      poidsInitial,
      categorie,
      preuve,
      note,
      LocalisationTB,
      typeTuberculose:selectedSousType,
      antecedents: antecedents,
      Comptage_tuberculeux:Comptage_tuberculeux,
    };

    try {
      const response = await fetch('http://localhost:5000/patients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        toast.success("Données enregistrées avec succès !");
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
  const min = 30;
  const max = 150;
  const percent = ((poidsInitial - min) / (max - min)) * 100;

  const typesTuberculose = {
    Pulmonaire: ["Jamais traitée", "Déjà traitée"],
    Extrapulmonaire: [
      "Pleurale",
      "Ganglionnaire",
      "Ostéoarticulaire",
      "Uro-génitale",
      "Méningée"
    ]
  };

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
    setSelectedSousType("");
  };

  return (
    <div className="max-w-6xl mx-auto bg-gray-100 p-5 rounded-lg shadow-lg mt-10">
      <ToastContainer />
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Formulaire de patient</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9">
          <CustomFormField label="ID" id="IDPatient" fieldType="text" value={IDPatient} onChange={(e) => setIDPatient(e.target.value)} placeholder="ID" Icon={IdCard} />
          <CustomFormField label="Nom" id="nom" fieldType="text" value={nom} onChange={(e) => setNom(e.target.value)} placeholder="Nom" Icon={User} />
          <CustomFormField label="Prénom" id="prenom" fieldType="text" value={prenom} onChange={(e) => setPrenom(e.target.value)} placeholder="Prénom" Icon={User} />
          <CustomFormField label="Email" id="email" fieldType="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" Icon={Mail} />
          <CustomFormField label="Âge" id="age" fieldType="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Âge" Icon={Calendar} />
          <CustomFormField label="Téléphone" id="numero" fieldType="tel" value={numero} onChange={(e) => setNumero(e.target.value)} placeholder="Téléphone" Icon={Phone} />
       
        {/*Adress*/}
        <div className="col-span-1">
          <AdresseSearchDropdown  id="adresse" adresse={adresse} setAdresse={setAdresse} />
        </div>
      <div className="mt-4">
        <label className="block font-semibold">Adresse sélectionnée :</label>
        <p className="text-gray-700">
        
  {adresse?.[0]?.Rue && adresse?.[0]?.Commune && adresse?.[0]?.Wilaya
    ? `${adresse[0].Rue}, ${adresse[0].Commune}, ${adresse[0].Wilaya}`
    : "Aucune adresse sélectionnée."}
    </p>

      </div>
          <CustomFormField label="Date de naissance" id="DateNaissance" fieldType="date" value={DateNaissance} onChange={(e) => setDateNaissance(e.target.value)} placeholder="" Icon={Calendar} />

          {/* Poids */}
          <div className="w-full">
            <label className="block mb-1 text-gray-700 font-medium">Poids</label>
            <div className="relative w-full flex items-center p-2">
              <span className="absolute -top-6 text-lg font-semibold text-teal-600" style={{ left: `calc(${percent}% - 15px)` }}>
                {poidsInitial} kg
              </span>
              <input type="range" min={min} max={max} id="poidsInitial" value={poidsInitial} onChange={(e) => setPoidsInitial(Number(e.target.value))} className="w-full" />
            </div>
          </div>

          {/* Sexe */}
          <div className="mb-4">
            <label className="text-gray-700 text-sm">Sexe</label>
            <CheckboxF id="sexe" value={sexe} onChange={(e) => setSexe(e.target.value)} />
          </div>

          {/* Catégorie */}
          <CustomFormField
            label="Catégorie"
            id="categorie"
            value={categorie}
            onChange={(e) => setCategorie(e.target.value)}
            placeholder="Sélectionnez une catégorie"
            isSelect={true}
            options={[
              { label: 'I', value: 'I' },
              { label: 'II', value: 'II' },
              { label: 'III', value: 'III' },
            ]}
          />

          {/* Preuve */}
          <CustomFormField
            id="preuve"
            label="Preuve"
            value={preuve}
            onChange={(e) => setPreuve(e.target.value)}
            placeholder="Sélectionnez une preuve"
            isSelect={true}
            options={[
              { label: 'Bactériologique', value: 'Bactériologique' },
              { label: 'Histologique', value: 'Histologique' },
              { label: 'Sans preuve', value: 'Sans preuve' },
            ]}
          />

          {/* Localisation TB */}
          <CustomFormField
            id="LocalisationTB"
            label="Localisation de la tuberculose"
            value={LocalisationTB}
            onChange={(e) => setLocalisationTB(e.target.value)}
            placeholder="Localisation"
            fieldType="text"
          />

          {/* Type et sous-type */}
          <CustomFormField
            id="typeTuberculose"
            label="Type et sous-type"
            value={selectedSousType}
            onChange={(e) => setSelectedSousType(e.target.value)}
            placeholder="Sélectionnez un sous-type"
            isSelect={true}
            options={Object.entries(typesTuberculose).map(([type, sousTypes]) => ({
              label: type,
              options: sousTypes,
            }))}
          />
        </div>

        {/* Antécédents et comptage */}
        <div className="grid grid-cols-3 gap-4">
          {/* Comptage tuberculeux */}
          <div className="col-span-1">
            <label className="font-medium block mb-1">Comptage tuberculeux</label>
            <MultiBoxSelector
              id="Comptage_tuberculeux"
              options={['Proches atteints', 'Proches traités']}
              selectedValues={Comptage_tuberculeux}
              onChange={setComptage_tuberculeux}
            />
          </div>

          {/* Antécédents */}
          <div className="col-span-2">
            <label className="font-medium block mb-1">Antécédents</label>
            <MultiBoxSelector
              id="antecedents"
              options={['Tuberculose', 'HTA', 'Diabète', 'Insuffisance rénale', 'Cardiopathie']}
              selectedValues={antecedents}
              onChange={setAntecedents}
            />
          </div>

          {/* Détails supplémentaires */}
          <div className="flex flex-col space-y-1 w-full mt-4">
            <label className="text-gray-700 text-sm">Détails supplémentaires</label>
            <textarea
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={note.split('\n').length + 1}
              placeholder="Ajoutez des détails supplémentaires ici..."
              className="border border-gray-300 rounded-lg p-2 bg-white text-gray-700 placeholder-gray-400"
            />
          </div>
        </div>
        <button type="submit" className="w-full py-2 mt-4 bg-blue-500 text-white font-semibold rounded-lg">Enregistrer</button>
      </form>
       
    </div>
  );
};

export default Formulaire;