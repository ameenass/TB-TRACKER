// // ModalEffetsSecondaires.jsx
// import React, { useState } from "react";
// import { X } from "lucide-react";

// function ModalEffetsSecondaires({ open, setOpenModal, selectedDay }) {
//   const [checkedEffects, setCheckedEffects] = useState([]);

//   const effets = [
//     "Anorexie", "Nausées", "Érythème", "Prurit isolé", 
//     "Acné du visage", "Striction de la face", "Céphalées", "Fièvre", 
//     "Trouble de la vision", "Douleurs articulaires"
//   ];

//   if (!open) return null;

//   const toggleEffect = (effet) => {
//     if (checkedEffects.includes(effet)) {
//       setCheckedEffects(checkedEffects.filter(e => e !== effet));
//     } else {
//       setCheckedEffects([...checkedEffects, effet]);
//     }
//   };

//   const handleSubmit = () => {
//     // Logique pour envoyer les effets cochés au backend
//     console.log("Effets signalés :", checkedEffects);
//     console.log("Jour sélectionné :", selectedDay?.day);
//     // TODO : appeler une API ou setState avec les données
//     setOpenModal(false);
//   };

//   return (
//     <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex justify-center items-center">
//       <div className="bg-white w-[600px] max-w-full rounded-lg shadow-lg p-6 relative">
//         <button
//           className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
//           onClick={() => setOpenModal(false)}
//         >
//           <X size={20} />
//         </button>
//         <h2 className="text-xl font-semibold mb-4 text-gray-700">
//           Effets secondaires - {selectedDay ? selectedDay.day.toLocaleDateString() : ""}
//         </h2>
//         <div className="grid grid-cols-2 gap-3">
//           {effets.map((effet) => (
//             <label key={effet} className="flex items-center gap-2">
//               <input
//                 type="checkbox"
//                 checked={checkedEffects.includes(effet)}
//                 onChange={() => toggleEffect(effet)}
//                 className="w-4 h-4 accent-teal-700"
//               />
//               {effet}
//             </label>
//           ))}
//         </div>
//         <div className="mt-6 flex justify-end">
//           <button
//             onClick={handleSubmit}
//             className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
//           >
//             Valider
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ModalEffetsSecondaires;


// import React, { useState, useEffect } from "react";
// import { X } from "lucide-react";

// function ModalEffetsSecondaires({ open, setOpenModal, selectedDay }) {
//   const [search, setSearch] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [selectedEffects, setSelectedEffects] = useState([]);

//   // Simule un fetch depuis la BDD (tu peux remplacer par un appel API)
//   const allEffects = [
//     "Anorexie", "Nausées", "Érythème", "Prurit isolé", 
//     "Acné du visage", "Striction de la face", "Céphalées", 
//     "Fièvre", "Trouble de la vision", "Douleurs articulaires"
//   ];

//   useEffect(() => {
//     if (search.trim() === "") {
//       setSearchResults([]);
//     } else {
//       const filtered = allEffects.filter(effet =>
//         effet.toLowerCase().includes(search.toLowerCase()) &&
//         !selectedEffects.includes(effet)
//       );
//       setSearchResults(filtered);
//     }
//   }, [search, selectedEffects]);

//   if (!open) return null;

//   const handleSelect = (effet) => {
//     if (!selectedEffects.includes(effet)) {
//       setSelectedEffects([...selectedEffects, effet]);
//       setSearch(""); // réinitialise la recherche
//     }
//   };

//   const handleRemove = (effet) => {
//     setSelectedEffects(selectedEffects.filter(e => e !== effet));
//   };

//   const handleSubmit = () => {
//     console.log("Effets signalés :", selectedEffects);
//     console.log("Jour sélectionné :", selectedDay?.day);

//     // Exemple avec fetch ou axios
//     // axios.post('/api/effets-signales', { effets: selectedEffects, jour: selectedDay?.day })

//     setOpenModal(false);
//   };

//   return (
//     <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex justify-center items-center">
//       <div className="bg-white w-[600px] max-w-full rounded-lg shadow-lg p-6 relative">
//         <button
//           className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
//           onClick={() => setOpenModal(false)}
//         >
//           <X size={20} />
//         </button>
//         <h2 className="text-xl font-semibold mb-4 text-gray-700">
//           Effets secondaires - {selectedDay ? selectedDay.day.toLocaleDateString() : ""}
//         </h2>

//         {/* Barre de recherche */}
//         <input
//           type="text"
//           placeholder="Rechercher un effet secondaire..."
//           className="w-full border border-gray-300 rounded px-3 py-2 mb-2"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />

//         {/* Résultats de recherche */}
//         {searchResults.length > 0 && (
//           <ul className="border border-gray-200 rounded p-2 max-h-40 overflow-y-auto mb-3">
//             {searchResults.map((effet) => (
//               <li
//                 key={effet}
//                 className="cursor-pointer hover:bg-gray-100 px-2 py-1"
//                 onClick={() => handleSelect(effet)}
//               >
//                 {effet}
//               </li>
//             ))}
//           </ul>
//         )}

//         {/* Liste des effets sélectionnés */}
//         <div className="flex flex-wrap gap-2 mb-4">
//           {selectedEffects.map((effet) => (
//             <span
//               key={effet}
//               className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full flex items-center gap-2"
//             >
//               {effet}
//               <button onClick={() => handleRemove(effet)}>
//                 <X size={14} />
//               </button>
//             </span>
//           ))}
//         </div>

//         {/* Bouton valider */}
//         <div className="flex justify-end">
//           <button
//             onClick={handleSubmit}
//             className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
//           >
//             Valider
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ModalEffetsSecondaires;


import { useState } from "react";
import { X } from "lucide-react";

function ModalEffetsSecondaires({ open, setOpenModal, selectedDay, onSubmit }) {
  const [isPeriod, setIsPeriod] = useState(false);
  const [startDate, setStartDate] = useState(selectedDay?.day || new Date());
  const [endDate, setEndDate] = useState(null);
  const [selectedEffects, setSelectedEffects] = useState([]);

  const allEffects = [
    { id: "1", nom: "Nausées" },
    { id: "2", nom: "Vomissements" },
    { id: "3", nom: "Anorexie" },
    { id: "4", nom: "Érythème" },
    { id: "5", nom: "Prurit isolé" },
    { id: "6", nom: "Acné du visage" },
    { id: "7", nom: "Striction de la face" },
    { id: "8", nom: "Céphalées" },
    { id: "9", nom: "Fièvre" },
    { id: "10", nom: "Trouble de la vision" },
    { id: "11", nom: "Douleurs articulaires" },
    { id: "12", nom: "Anémie hémolytique" },
    { id: "13", nom: "Purpura" },
    { id: "14", nom: "Hépatite avec ictère" },
    { id: "15", nom: "Surdité Trouble vestibulaire" },
    { id: "16", nom: "Névrite optique" },
    { id: "17", nom: "Épilepsie" },
    { id: "18", nom: "Anurie" },
  ];

  if (!open) return null;

  const handleSelectEffect = (effet) => {
    if (!selectedEffects.find((e) => e.id === effet.id)) {
      setSelectedEffects([...selectedEffects, effet]);
    }
  };

  const handleRemoveEffect = (effet) => {
    setSelectedEffects(selectedEffects.filter((e) => e.id !== effet.id));
  };

  const handleSubmit = async () => {
    const dateSignalement = new Date();

    const effetsSignales = selectedEffects.map((effet) => ({
      idEffetSignale: effet.id,
      nom: effet.nom,
      nbJours: isPeriod && endDate
        ? Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)) + 1
        : 1,
      dateDebut: startDate.toISOString().split("T")[0],
      dateDeSignalement: dateSignalement.toISOString().split("T")[0],
    }));

    const payload = {
      dateVisite: dateSignalement.toISOString().split("T")[0],
      effetsSignales: effetsSignales,
    };

    try {
      const response = await fetch("http://localhost:5000/effets-signales", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Erreur serveur : ${response.status}`);
      }

      const data = await response.json();
      console.log("Réponse du backend :", data);

      if (onSubmit) onSubmit(); // Optionnel : pour recharger la session après soumission
      setOpenModal(false);
    } catch (error) {
      console.error("Erreur lors de l’envoi :", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex justify-center items-center">
      <div className="bg-white w-[600px] max-w-full rounded-lg shadow-lg p-6 relative max-h-[80vh] overflow-y-auto">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={() => setOpenModal(false)}
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Signaler un effet secondaire
        </h2>

        {/* Choix jour ou période */}
        <div className="mb-4">
          <label className="mr-4">
            <input
              type="radio"
              name="mode"
              checked={!isPeriod}
              onChange={() => setIsPeriod(false)}
            />{" "}
            Effet sur un seul jour
          </label>
          <label>
            <input
              type="radio"
              name="mode"
              checked={isPeriod}
              onChange={() => setIsPeriod(true)}
            />{" "}
            Effet sur une période
          </label>
        </div>

        {/* Sélecteur de date(s) */}
        <div className="mb-4 flex flex-col gap-2">
          <label>
            Date de début :
            <input
              type="date"
              className="ml-2 border rounded px-2 py-1"
              value={startDate.toISOString().split("T")[0]}
              onChange={(e) => setStartDate(new Date(e.target.value))}
            />
          </label>
          {isPeriod && (
            <label>
              Date de fin :
              <input
                type="date"
                className="ml-2 border rounded px-2 py-1"
                value={endDate ? endDate.toISOString().split("T")[0] : ""}
                onChange={(e) => setEndDate(new Date(e.target.value))}
              />
            </label>
          )}
        </div>

        {/* Liste d’effets secondaires */}
        <h3 className="text-md font-semibold mb-2 text-gray-600">Effets observés :</h3>
        <ul className="grid grid-cols-2 gap-2 mb-4">
          {allEffects.map((effet) => (
            <li
              key={effet.id}
              className={`cursor-pointer px-3 py-2 rounded border ${
                selectedEffects.find((e) => e.id === effet.id)
                  ? "bg-teal-500 text-white"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => handleSelectEffect(effet)}
            >
              {effet.nom}
            </li>
          ))}
        </ul>

        {/* Effets sélectionnés */}
        <div className="flex flex-wrap gap-2 mb-4">
          {selectedEffects.map((effet) => (
            <span
              key={effet.id}
              className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full flex items-center gap-2"
            >
              {effet.nom}
              <button onClick={() => handleRemoveEffect(effet)}>
                <X size={14} />
              </button>
            </span>
          ))}
        </div>

        {/* Valider */}
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
          >
            Valider
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalEffetsSecondaires;
