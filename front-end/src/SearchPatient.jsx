// // import React, { useState, useEffect } from "react";
// // import { Link } from "react-router-dom";

// // function SearchPatient() {
// //   const [patients, setPatients] = useState([]);
// //   const [searchTerm, setSearchTerm] = useState("");

  
// //   useEffect(() => {                         //recuperation des patients
// //     const fetchPatients = async () => {
// //       try {
// //         const response = await fetch("http://127.0.0.1:5000/patients"); 
// //         if (!response.ok) {
// //           throw new Error("Erreur lors de la récupération des patients");
// //         }
// //         const data = await response.json();
// //         setPatients(data);
// //       } catch (error) {
// //         console.error("Erreur: ", error);
// //       }
// //     };

// //     fetchPatients();
// //   }, []);




// // //filtrer les patients
// //   const filteredPatients = searchTerm
// //     ? patients.filter((patient) => {
// //         const fullName = `${patient.nom.toLowerCase()}, ${patient.prenom.toLowerCase()}`;
// //         return (
// //           patient.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //           patient.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //           patient.id.toString().includes(searchTerm) ||
// //           fullName.includes(searchTerm.toLowerCase())
// //         );
// //       }):
// //       patients;

// //   return (
// //     <div className="p-6 max-w-4xl mx-auto">
// //       <h1 className="text-2xl font-bold mb-4">Recherche de Patients</h1>
// //       <input
// //         type="text"
// //         placeholder="Rechercher par nom, prénom, ID ou nom complet..."
// //         className="w-full p-2 border rounded-lg mb-6 shadow-md"
// //         value={searchTerm}
// //         onChange={(e) => setSearchTerm(e.target.value)}
// //       />

// //       {filteredPatients.length > 0 ? (
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
// //           {filteredPatients.map((patient) => (
// //             <div
// //               key={patient.id}
// //               className="bg-white p-4 rounded-2xl shadow-lg border hover:shadow-2xl transition"
// //             >
// //               <h2 className="text-xl font-bold mb-2">{patient.nom} {patient.prenom}</h2>
// //               <p className="text-gray-700">ID : {patient.id}</p>
// //               <p className="text-gray-700">Âge : {patient.age} ans</p>
// //               <p className="text-gray-700">Catégorie : {patient.categorie} </p>
// //               <a href="#" className="text-white bg-teal-600 px-4 py-2 rounded-md hover:bg-teal-700 
// //               transition duration-200 inline-block text-center"> Profile
// //               </a>
// //             </div>
// //           ))}
// //         </div>
// //       ) : (
// //         <p className="text-gray-500">Aucun patient trouvé.</p>
// //       )}

// //       <div>
// //         <a href="http://localhost:5174/"></a>
// //       </div>
// //     </div>
// //   );

// // }

// // export default SearchPatient;





// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

// function SearchPatient() {
//   const [patients, setPatients] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     const fetchPatients = () => {
//       fetch("http://127.0.0.1:5000/patients")
//         .then((response) => {
//           if (!response.ok) {
//             throw new Error("Erreur lors de la récupération des patients");
//           }
//           return response.json();
//         })
//         .then((data) => {
//           console.log("patients récupérés", data);
//           setPatients(data);
//         })
//         .catch((error) => {
//           console.error("Erreur:", error);
//         });
//     };

//     fetchPatients();
//   }, []);

//   const filteredPatients = searchTerm
//     ? patients.filter((patient) => {
//         const nom = (patient.nom || "").toLowerCase();
//         const prenom = (patient.prenom || "").toLowerCase();
//         const fullName = `${nom} ${prenom}`;
//         return (
//           nom.includes(searchTerm.toLowerCase()) ||
//           prenom.includes(searchTerm.toLowerCase()) ||
//           (patient._id || "").toString().includes(searchTerm) ||
//           fullName.includes(searchTerm.toLowerCase())
//         );
//       })
//     : patients;

//   return (
//     <div className="p-5 pt-24 max-w-4xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Recherche de Patients</h1>
//       <input
//         type="text"
//         placeholder="Rechercher par nom, prénom, ID..."
//         className="w-full p-2 border rounded-lg mb-6 shadow-md"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />

//       {searchTerm ? (
//         filteredPatients.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {filteredPatients.map((patient) => (
//               <div
//                 key={patient._id}
//                 className="bg-white p-4 rounded-2xl shadow-lg border hover:shadow-2xl transition"
//               >
//                 <h2 className="text-xl font-bold mb-2">
//                   {patient.nom || "Nom inconnu"} {patient.prenom || ""}
//                 </h2>
//                 <p className="text-gray-700">ID : {patient._id}</p>
//                 <p className="text-gray-700">
//                   Âge : {patient.age || "Non renseigné"} ans
//                 </p>
//                 <p className="text-gray-700">
//                   Catégorie : {patient.categorie || "Non renseignée"}
//                 </p>
//                 <Link
//                   to={`/profile/${patient.IDPatient}`}
//                   className="text-white bg-teal-600 px-4 py-2 rounded-md hover:bg-teal-700 transition duration-200 inline-block text-center"
//                 >
//                   Profile
//                 </Link>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-gray-500">Aucun patient trouvé</p>
//         )
//       ) : (
//         <p className="text-gray-500">Veuillez saisir un terme de recherche</p>
//       )}
//     </div>
//   );
// }

// export default SearchPatient;



import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { User, Calendar, MapPin, Search, X, ChevronRight } from "lucide-react"

function SearchPatient() {
  const [patients, setPatients] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    fetch("http://127.0.0.1:5000/patients")
      .then((res) => res.json())
      .then((data) => setPatients(data))
      .catch((err) => console.error("Erreur:", err))
  }, [])

  const filteredPatients = searchTerm
    ? patients.filter((patient) => {
        const fullName = `${patient.nom?.toLowerCase()} ${patient.prenom?.toLowerCase()}`
        return (
          fullName.includes(searchTerm.toLowerCase()) ||
          patient._id?.toString().includes(searchTerm) ||
          patient.adresse?.wilaya?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          patient.adresse?.commune?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      })
    : patients

  const getInitials = (nom, prenom) => `${prenom?.[0] || ""}${nom?.[0] || ""}`.toUpperCase()

  const formatDate = (dateString) => {
    if (!dateString) return "Non renseignée"
    const date = new Date(dateString)
    return date.toLocaleDateString("fr-FR")
  }

  const handleClear = () => {
    setSearchTerm("")
  }

  const calculateAge = (dateString) => {
    if (!dateString) return ""
    const birthDate = new Date(dateString)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDifference = today.getMonth() - birthDate.getMonth()

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }

    return age > 0 ? `(${age} ans)` : ""
  }

  return (
    <div className="p-5 pt-24 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Recherche de Patients</h1>

      {/* Modern Search Bar */}
      <div className="relative w-full max-w-3xl mx-auto mb-10">
        <div
          className={`
            relative flex items-center transition-all duration-300 ease-in-out
            ${isFocused ? "shadow-lg" : "shadow-md"}
            ${isFocused ? "bg-white" : "bg-white/90"}
            rounded-full overflow-hidden
            ${isFocused ? "ring-2 ring-teal-300" : ""}
          `}
        >
          <div className="flex items-center justify-center pl-4">
            <Search className={`h-5 w-5 transition-colors ${isFocused ? "text-teal-500" : "text-gray-400"}`} />
          </div>

          <input
            type="text"
            placeholder="Rechercher un patient par nom, prenom, ou ID ..."
            className="w-full p-3 text-md font-medium focus:outline-none rounded-full bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />

          {searchTerm && (
            <button onClick={handleClear} className="flex items-center justify-center pr-2">
              <div className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              </div>
            </button>
          )}

          <button
            className={`
              flex items-center justify-center h-12 px-6
              bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600
              text-white rounded-r-xl transition-all duration-300
              ${searchTerm ? "opacity-100" : "opacity-90"}
            `}
          >
            <span className="hidden sm:inline mr-2 font-medium">Rechercher</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {searchTerm ? (
        filteredPatients.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPatients.map((patient) => (
              <div
                key={patient._id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden"
              >
                {/* Card Header with gradient */}
                <div className="h-3 bg-gradient-to-r from-teal-500 to-emerald-500"></div>

                <div className="p-5">
                  <div className="flex items-center gap-4">
                    {/* Avatar with initials */}
                    <div className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold bg-gradient-to-br from-teal-400 to-emerald-500 text-white shadow-sm">
                      {getInitials(patient.nom, patient.prenom)}
                    </div>

                    {/* Patient name and ID */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h2 className="text-xl font-bold text-gray-800">
                            {patient.nom} {patient.prenom} 
                          </h2>
                          <div className="flex items-center mt-1">
                            <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                              {patient._id || patient.IDPatient || "ID inconnu"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Patient details */}
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="flex items-start">
                      <div className="mt-0.5 w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center flex-shrink-0">
                        <User className="h-4 w-4 text-teal-500" />
                      </div>
                      <div className="ml-3">
                        <p className="text-xs font-medium text-gray-500 mb-1">Sexe</p>
                        <p className="text-sm font-semibold text-gray-800">{patient.sexe || "Non renseigné"}</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="mt-0.5 w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center flex-shrink-0">
                        <Calendar className="h-4 w-4 text-teal-500" />
                      </div>
                      <div className="ml-3">
                        <p className="text-xs font-medium text-gray-500 mb-1">Date de naissance</p>
                        <p className="text-sm font-semibold text-gray-800">
                          {formatDate(patient.DateNaissance)}{" "}
                          <span className="text-gray-500 font-normal">{calculateAge(patient.DateNaissance)}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start col-span-2">
                      <div className="mt-0.5 w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-4 w-4 text-teal-500" />
                      </div>
                      <div className="ml-3">
                        <p className="text-xs font-medium text-gray-500 mb-1">Wilaya-Commune</p>
                        <p className="text-sm font-semibold text-gray-800">
                          {patient.adresse?.wilaya || "Wilaya inconnue"} -{" "}
                          {patient.adresse?.commune || "Commune inconnue"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-xs text-gray-500">
                    Dernière visite: {/*{patient.lastVisit || "Non renseignée"}*/}
                  </span>
                  <Link
                    to={`/profile/${patient.IDPatient || patient._id}`}
                    className="text-sm font-medium text-teal-600 hover:text-teal-700 transition-colors flex items-center"
                  >
                    Voir le profil
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-gray-700 font-medium mb-1">Aucun patient trouvé</h3>
            <p className="text-gray-500 text-sm">Essayez avec un autre terme de recherche</p>
          </div>
        )
      ) : (
        <div className="py-12 text-center">
          <p className="text-gray-500 text-lg">Entrez au moins un caractère pour commencer la recherche</p>
        </div>
      )}
    </div>
  )
}

export default SearchPatient
