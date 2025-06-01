// import React, { useEffect, useState } from "react";
// import wilayasData from "./wilaya.json";

// const AdresseFormField = ({ adresse, setAdresse }) => {
//   const [communes, setCommunes] = useState([]);

//   useEffect(() => {
//     const selectedWilaya = wilayasData.find(w => w.nom === adresse.wilaya);
//     setCommunes(selectedWilaya ? selectedWilaya.communes : []);
//   }, [adresse.wilaya]);
//   return (
//     <div className="flex flex-col gap-6">
//       {/* Wilaya */}
//       <div className="flex flex-col gap-2">
//         <label className="text-sm font-medium text-gray-700">Wilaya</label>
//         <div className="relative">
//           <select
//             className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-700 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
//             value={adresse.wilaya}
//             onChange={(e) => setAdresse({ wilaya: e.target.value, commune: "" })}
//           >
//             <option value="">-- Sélectionner une wilaya --</option>
//             {wilayasData.map((w) => (
//               <option key={w.num} value={w.nom}>{w.nom}</option>
//             ))}
//           </select>
//         </div>
//       </div>
  
//       {/* Commune */}
//       <div className="flex flex-col gap-2">
//         <label className="text-sm font-medium text-gray-700">Commune</label>
//         <div className="relative">
//           <select
//             className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-700 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 disabled:bg-gray-100 disabled:cursor-not-allowed"
//             value={adresse.commune}
//             onChange={(e) => setAdresse(prev => ({ ...prev, commune: e.target.value }))}
//             disabled={!adresse.wilaya}
//           >
//             <option value="">-- Sélectionner une commune --</option>
//             {communes.map((c) => (
//               <option key={c.ons} value={c.fr}>{c.fr} ({c.ar})</option>
//             ))}
//           </select>
//         </div>
//       </div>
//     </div>
//   );
  
// };

// export default AdresseFormField;



import { useEffect, useState } from "react"
import { MapPin } from "lucide-react"
import wilayasData from "./wilaya.json"

const AdresseSearchDropdown= ({ adresse, setAdresse }) => {
  const [communes, setCommunes] = useState([])

  useEffect(() => {
    const selectedWilaya = wilayasData.find((w) => w.nom === adresse.wilaya)
    setCommunes(selectedWilaya ? selectedWilaya.communes : [])
  }, [adresse.wilaya])

  return (
    <div className="flex flex-col space-y-4 w-full">
      {/* Wilaya */}
      <div>
        <label className="text-gray-700 text-sm font-medium">Wilaya</label>
        <div className="flex items-center border border-gray-300 rounded-lg p-2.5 bg-white focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500 transition-all duration-200">
          <MapPin className="w-5 h-5 text-emerald-500 mr-2" />
          <select
            className="bg-transparent outline-none text-gray-700 w-full"
            value={adresse.wilaya}
            onChange={(e) => setAdresse({ wilaya: e.target.value, commune: "" })}
          >
            <option value="">Sélectionner une wilaya</option>
            {wilayasData.map((w) => (
              <option key={w.num} value={w.nom}>
                {w.nom}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Commune */}
      <div>
        <label className="text-gray-700 text-sm font-medium">Commune</label>
        <div className="flex items-center border border-gray-300 rounded-lg p-2.5 bg-white focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500 transition-all duration-200">
          <MapPin className="w-5 h-5 text-emerald-500 mr-2" />
          <select
            className="bg-transparent outline-none text-gray-700 w-full"
            value={adresse.commune}
            onChange={(e) => setAdresse((prev) => ({ ...prev, commune: e.target.value }))}
            disabled={!adresse.wilaya}
          >
            <option value=""> Sélectionner une commune </option>
            {communes.map((c) => (
              <option key={c.ons} value={c.fr}>
                {c.fr} ({c.ar})
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

export default AdresseSearchDropdown
