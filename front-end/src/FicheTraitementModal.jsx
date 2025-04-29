import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { User, Calendar, Weight, IdCard } from "lucide-react";
import MultiBoxSelector from "./MultiBoxSelector";
import { v4 as uuidv4 } from 'uuid';

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
  
export default function FicheTraitementModal({ open, setOpenModal }) {
 const[date_debut, setDate_debut]=useState('');
 const[date_cloture, setDate_cloture]=useState('');
 const[statut, setStatut]=useState('');
 const [poidsInitial, setPoidsInitial] = useState(50);
 const [categorie, setCategorie] = useState('');
 const [preuve, setPreuve] = useState(''); 
  const [LocalisationTB, setLocalisationTB] = useState(''); 
 const [selectedSousType, setSelectedSousType] = useState("");
 const [Comptage_tuberculeux, setComptage_tuberculeux] = useState([]);
 const [antecedents, setAntecedents] = useState([]);
 const [note, setNote] = useState('');

  
  const handleEnregistrer = async () => {
    if (!poidsInitial || !preuve || !categorie || !selectedSousType || !Comptage_tuberculeux || !antecedents || !date_debut || !date_cloture || !statut) {
      toast.error("Tous les champs doivent être remplis !");
      return;
    }
  
    const formData = {
      idfich: uuidv4(), // génère un id unique
      date_debut, // attention: doit être bien au format "YYYY-MM-DD"
      date_cloture,
      statut,
      categorie,
      LocalisationTB,
      preuve,
      selectedSousType, // pas "typeTuberculose"
      Comptage_tuberculeux: Comptage_tuberculeux.length > 0,
      antecedents, // transforme tableau -> string séparée par virgule
      poidsInitial: parseFloat(poidsInitial), // bien float
      note: note || "", // optionnel
    };

    try {
        console.log("FormData sent to backend:", formData);
        const response = await fetch('http://localhost:5000/ajouter_fiche', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          const data = await response.json();
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
    
 
    if (!open) return null;
    return(
        <div className=" pt-24 mx-auto overlay fixed inset-0 bg-black/20 backdrop-blur-sm flex justify-center items-center">
           <div className="modalcontainer absolute bg-slate-100 w-2/3 max-h-[90vh] overflow-y-auto mx-auto p-6 my-4 rounded-lg shadow-lg">
            <ToastContainer />
      <h2 className="text-xl w-full font-semibold mb-6 text-center text-gray-800">Fiche de traitement</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
   <CustomFormField label="Date debut" id="date_debut" fieldType="date" value={date_debut} onChange={(e)=>setDate_debut(e.target.value)} placeholder="" Icon={Calendar}/>
   <CustomFormField label="Date cloture" id="date_cloture" fieldType="date" value={date_cloture} onChange={(e)=>setDate_cloture(e.target.value)} placeholder="" Icon={Calendar}/>
      {/*Catégorie*/} 
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

           {/*Preuve*/}
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
           {/*statut*/}
          <CustomFormField
            id="statut"
            label="Statut"
            value={statut}
            onChange={(e) => setStatut(e.target.value)}
            placeholder="Sélectionnez"
            isSelect={true}
            options={[
              { label: 'Creation', value: 'Creation' },
              { label: ' Perdu', value: ' Perdu' },
              { label: ' En cours', value: ' En cours' },
              { label: '  Traite(e)', value: '  Traite(e)' },
            ]}
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
        
          {/* Localisation TB */}
          <CustomFormField
            id="LocalisationTB"
            label="Localisation de la tuberculose"
            value={LocalisationTB}
            onChange={(e) => setLocalisationTB(e.target.value)}
            placeholder="Localisation"
            fieldType="text"
          />
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
     </div>
   <button type="submit" className="w-full py-2 mt-4 bg-blue-500 text-white font-semibold rounded-lg">Enregistrer</button>
     </form>
              </div>
              </div>
    );
}