import React, { useEffect, useState } from "react";
import wilayasData from "./wilaya.json";

const AdresseFormField = ({ adresse, setAdresse }) => {
  const [communes, setCommunes] = useState([]);

  useEffect(() => {
    const selectedWilaya = wilayasData.find(w => w.nom === adresse.wilaya);
    setCommunes(selectedWilaya ? selectedWilaya.communes : []);
  }, [adresse.wilaya]);

  return (
    <div className="flex flex-col gap-4">
      {/* Wilaya */}
      <div>
        <label className="block mb-1 text-gray-700 font-medium">Wilaya</label>
        <select
          className="w-full border p-2 rounded"
          value={adresse.wilaya}
          onChange={(e) => setAdresse({ wilaya: e.target.value, commune: "" })}
        >
          <option value="">-- Sélectionner une wilaya --</option>
          {wilayasData.map((w) => (
            <option key={w.num} value={w.nom}>{w.nom}</option>
          ))}
        </select>
      </div>

      {/* Commune */}
      <div>
        <label className="block mb-1 text-gray-700 font-medium">Commune</label>
        <select
          className="w-full border p-2 rounded"
          value={adresse.commune}
          onChange={(e) => setAdresse(prev => ({ ...prev, commune: e.target.value }))}
          disabled={!adresse.wilaya}
        >
          <option value="">-- Sélectionner une commune --</option>
          {communes.map((c) => (
            <option key={c.ons} value={c.fr}>{c.fr} ({c.ar})</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default AdresseFormField;
