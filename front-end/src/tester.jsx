// import React, { useState, useEffect } from "react";

// function SearchPatient() {
//   const [patients, setPatients] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");

//   // Récupérer les patients depuis le backend au chargement du composant
//   useEffect(() => {
//     const fetchPatients = async () => {
//       try {
//         const response = await fetch("http://127.0.0.1:5000/patients"); // Remplace par l'URL de ton API
//         if (!response.ok) {
//           throw new Error("Erreur lors de la récupération des patients");
//         }
//         const data = await response.json();
//         setPatients(data);
//       } catch (error) {
//         console.error("Erreur: ", error);
//       }
//     };

//     fetchPatients();
//   }, []);


//   // useEffect(() => {
//   //   const fetchPatients = () => {
//   //     fetch("/api/patients") // Remplace par l'URL de ton API
//   //       .then((response) => {
//   //         if (!response.ok) {
//   //           throw new Error("Erreur lors de la récupération des patients");
//   //         }
//   //         return response.json();
//   //       })
//   //       .then((data) => {
//   //         setPatients(data);
//   //       })
//   //       .catch((error) => {
//   //         console.error("Erreur: ", error);
//   //       });
//   //   };

//   //   fetchPatients();
//   // }, []);


// //filtrer les patients
//   const filteredPatients = searchTerm
//     ? patients.filter((patient) => {
//         const fullName = `${patient.nom.toLowerCase()}, ${patient.prenom.toLowerCase()}`;
//         return (
//           patient.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           patient.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           patient.id.toString().includes(searchTerm) ||
//           fullName.includes(searchTerm.toLowerCase())
//         );
//       }):
//       patients;

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Recherche de Patients</h1>
//       <input
//         type="text"
//         placeholder="Rechercher par nom, prénom, ID ou nom complet..."
//         className="w-full p-2 border rounded-lg mb-6 shadow-md"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />

//       {filteredPatients.length > 0 ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {filteredPatients.map((patient) => (
//             <div
//               key={patient.id}
//               className="bg-white p-4 rounded-2xl shadow-lg border hover:shadow-2xl transition"
//             >
//               <h2 className="text-xl font-bold mb-2">{patient.nom} {patient.prenom}</h2>
//               <p className="text-gray-700">ID : {patient.id}</p>
//               <p className="text-gray-700">Âge : {patient.age} ans</p>
//               <p className="text-gray-700">Catégorie : {patient.categorie} </p>
//               <button className="text-white bg-teal-600 px-4 py-2 rounded-md hover:bg-teal-700 transition duration-200">
//                 Profile
//               </button>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="text-gray-500">Aucun patient trouvé.</p>
//       )}

//       <div>
//         <a href="http://localhost:5174/"></a>
//       </div>
//     </div>
//   );

// }
// export default SearchPatient;



// //code avec ordre alphab:
// import React, { useState, useEffect } from "react";

// function SearchPatient() {
//   const [patients, setPatients] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");

//   // Récupérer les patients depuis le backend au chargement du composant
//   useEffect(() => {
//     const fetchPatients = async () => {
//       try {
//         const response = await fetch("http://127.0.0.1:5000/patients"); // Remplace par l'URL de ton API
//         if (!response.ok) {
//           throw new Error("Erreur lors de la récupération des patients");
//         }
//         const data = await response.json();
//         setPatients(data);
//       } catch (error) {
//         console.error("Erreur: ", error);
//       }
//     };

//     fetchPatients();
//   }, []);

//   // Tri des patients par ordre alphabétique (nom, prénom)
//   const sortedPatients = [...patients].sort((a, b) => {
//     const nameA = `${a.nom.toLowerCase()} ${a.prenom.toLowerCase()}`;
//     const nameB = `${b.nom.toLowerCase()} ${b.prenom.toLowerCase()}`;
//     return nameA.localeCompare(nameB);
//   });

//   // Filtrer les patients avec recherche exacte
//   const filteredPatients = searchTerm
//     ? sortedPatients.filter((patient) => {
//         const fullName = `${patient.nom.toLowerCase()} ${patient.prenom.toLowerCase()}`;
//         return (
//           patient.nom.toLowerCase() === searchTerm.toLowerCase() ||
//           patient.prenom.toLowerCase() === searchTerm.toLowerCase() ||
//           patient.id.toString() === searchTerm ||
//           fullName === searchTerm.toLowerCase()
//         );
//       })
//     : sortedPatients;

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Recherche de Patients</h1>
//       <input
//         type="text"
//         placeholder="Rechercher par nom, prénom, ID ou nom complet..."
//         className="w-full p-2 border rounded-lg mb-6 shadow-md"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />

//       {filteredPatients.length > 0 ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {filteredPatients.map((patient) => (
//             <div
//               key={patient.id}
//               className="bg-white p-4 rounded-2xl shadow-lg border hover:shadow-2xl transition"
//             >
//               <h2 className="text-xl font-bold mb-2">
//                 {patient.nom} {patient.prenom}
//               </h2>
//               <p className="text-gray-700">ID : {patient.id}</p>
//               <p className="text-gray-700">Âge : {patient.age} ans</p>
//               <p className="text-gray-700">Catégorie : {patient.categorie}</p>
//               <button className="text-white bg-teal-600 px-4 py-2 rounded-md hover:bg-teal-700 transition duration-200">
//                 Profile
//               </button>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="text-gray-500">Aucun patient trouvé.</p>
//       )}
//     </div>
//   );
// }

// export default SearchPatient;















// ca c pour le check box des antecedents:
// <div className="w-full px-4 py-2 border-2 rounded-md mb-4">
//   <label className="block font-semibold mb-2">Antécédents</label>
//   <div>
//     <input
//       type="checkbox"
//       value="Tuberculose"
//       checked={antecedents.includes("Tuberculose")}
//       onChange={(e) => handleCheckboxChange(e)}
//       className="mr-2"
//     />
//     <label>Tuberculose</label>
//   </div>
//   <div>
//     <input
//       type="checkbox"
//       value="HTA"
//       checked={antecedents.includes("HTA")}
//       onChange={(e) => handleCheckboxChange(e)}
//       className="mr-2"
//     />
//     <label>HTA</label>
//   </div>
//   <div>
//     <input
//       type="checkbox"
//       value="Diabète"
//       checked={antecedents.includes("Diabète")}
//       onChange={(e) => handleCheckboxChange(e)}
//       className="mr-2"
//     />
//     <label>Diabète</label>
//   </div>
//   <div>
//     <input
//       type="checkbox"
//       value="Insuffisance rénale"
//       checked={antecedents.includes("Insuffisance rénale")}
//       onChange={(e) => handleCheckboxChange(e)}
//       className="mr-2"
//     />
//     <label>Insuffisance rénale</label>
//   </div>
//   <div>
//     <input
//       type="checkbox"
//       value="Cardiopathie"
//       checked={antecedents.includes("Cardiopathie")}
//       onChange={(e) => handleCheckboxChange(e)}
//       className="mr-2"
//     />
//     <label>Cardiopathie</label>
//   </div>
// </div>
