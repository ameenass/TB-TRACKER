// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

// function SearchPatient() {
//   const [patients, setPatients] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");

  
//   useEffect(() => {                         //recuperation des patients
//     const fetchPatients = async () => {
//       try {
//         const response = await fetch("http://127.0.0.1:5000/patients"); 
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
//               <a href="#" className="text-white bg-teal-600 px-4 py-2 rounded-md hover:bg-teal-700 
//               transition duration-200 inline-block text-center"> Profile
//               </a>
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






import React, { useState, useEffect } from "react";

function SearchPatient() {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/patients");
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des patients");
        }
        const data = await response.json();
        console.log("patients récupérés ",data)
        setPatients(data);
      } catch (error) {
        console.error("Erreur: ", error);
      }
    };

    fetchPatients();
  }, []);

  const filteredPatients = searchTerm
    ? patients.filter((patient) => {
        const fullName = `${patient.nom.toLowerCase()} ${patient.prenom.toLowerCase()}`;
        return (
          patient.nom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          patient.prenom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          patient._id?.toString().includes(searchTerm) ||
          fullName.includes(searchTerm.toLowerCase())
        );
      })
    : patients;

  return (
    <div className="p-5 pt-24 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Recherche de Patients</h1>
      <input
        type="text"
        placeholder="Rechercher par nom, prénom, ID..."
        className="w-full p-2 border rounded-lg mb-6 shadow-md"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredPatients.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPatients.map((patient) => (
            <div
              key={patient._id}
              className="bg-white p-4 rounded-2xl shadow-lg border hover:shadow-2xl transition"
            >
              <h2 className="text-xl font-bold mb-2">
                {patient.nom} {patient.prenom}
              </h2>
              <p className="text-gray-700">ID : {patient._id}</p>
              <p className="text-gray-700">Âge : {patient.age || "Non renseigné"} ans</p>
              <p className="text-gray-700">Catégorie : {patient.categorie || "Non renseigné"}</p>
              <a href="#" className="text-white bg-teal-600 px-4 py-2 rounded-md hover:bg-teal-70transition duration-200 inline-block text-center">
                Profile</a>
            </div>
          ))}
        </div>)     : ( <p className="text-gray-500">Aucun patient trouvé</p> )
        }
    </div>
  );
}

export default SearchPatient;