import React, { useState, useEffect } from "react";

function AdresseSearchDropdown({ adresse, setAdresse }) {
  const [allAdresses, setAllAdresses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [manualMode, setManualMode] = useState(false);
  const [manualAdresse, setManualAdresse] = useState({
    Wilaya: "",
    Commune: "",
    Rue: "",
  });

  // Set static addresses instead of fetching from backend
  useEffect(() => {
    const defaultAdresses = [
      { wilaya: "Oran", commune: "Es Sénia", rue: "Rue Khaled" },
      { wilaya: "Alger", commune: "Bab El Oued", rue: "Rue Didouche Mourad" },
      { wilaya: "Constantine", commune: "El Khroub", rue: "Rue Bouziane" },
      { wilaya: "Tlemcen", commune: "Chetouane", rue: "Rue Emir Abdelkader" },
      { wilaya: "Blida", commune: "Ouled Yaïch", rue: "Rue Ben M'hidi" },
    ];
    setAllAdresses(defaultAdresses);
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSuggestions([]);
      return;
    }

    const filtered = allAdresses.filter((adr) => {
      const search = searchTerm.toLowerCase();
      return (
        adr.wilaya.toLowerCase().includes(search) ||
        adr.commune.toLowerCase().includes(search) ||
        adr.rue.toLowerCase().includes(search) ||
        `${adr.wilaya} - ${adr.commune} - ${adr.rue}`.toLowerCase().includes(search)
      );
    });

    setSuggestions(filtered);
  }, [searchTerm, allAdresses]);

  const handleSelect = (adr) => {
    const structured = {
      Wilaya: adr.wilaya,
      Commune: adr.commune,
      Rue: adr.rue,
    };
    setAdresse([structured]);
    setSearchTerm(`${adr.wilaya} - ${adr.commune} - ${adr.rue}`);
    setShowDropdown(false);
  };

  const handleManualEntry = () => {
    setManualMode(true);
    setShowDropdown(false);
  };

  const handleConfirmManual = () => {
    setAdresse([manualAdresse]);
    setManualMode(false);
    setSearchTerm(
      `${manualAdresse.Wilaya} - ${manualAdresse.Commune} - ${manualAdresse.Rue}`
    );
  };

  return (
    <div className="relative w-full max-w-xl">
      <label className="block font-semibold mb-1">Adresse</label>

      {!manualMode && (
        <input
          type="text"
          className="w-full p-2 border rounded-lg shadow-md"
          placeholder="Ex: Oran - Es Sénia - Rue Khaled"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setShowDropdown(true);
          }}
          onFocus={() => setShowDropdown(true)}
        />
      )}

      {showDropdown && !manualMode && (
        <div className="absolute z-10 bg-white border mt-1 w-full rounded-lg shadow max-h-64 overflow-y-auto">
          {suggestions.length > 0 ? (
            suggestions.map((adr, index) => (
              <div
                key={index}
                onClick={() => handleSelect(adr)}
                className="p-2 hover:bg-teal-100 cursor-pointer"
              >
                {adr.wilaya} - {adr.commune} - {adr.rue}
              </div>
            ))
          ) : (
            <div className="p-2 text-gray-500">
              Aucune suggestion trouvée.
              <button
                className="text-blue-600 underline ml-2"
                onClick={handleManualEntry}
              >
                Ajouter manuellement
              </button>
            </div>
          )}
        </div>
      )}

      {manualMode && (
        <div className="space-y-2 mt-2">
          <input
            className="w-full p-2 border rounded"
            placeholder="Wilaya"
            value={manualAdresse.Wilaya}
            onChange={(e) =>
              setManualAdresse({ ...manualAdresse, Wilaya: e.target.value })
            }
          />
          <input
            className="w-full p-2 border rounded"
            placeholder="Commune"
            value={manualAdresse.Commune}
            onChange={(e) =>
              setManualAdresse({ ...manualAdresse, Commune: e.target.value })
            }
          />
          <input
            className="w-full p-2 border rounded"
            placeholder="Rue"
            value={manualAdresse.Rue}
            onChange={(e) =>
              setManualAdresse({ ...manualAdresse, Rue: e.target.value })
            }
          />
          <button
            className="bg-teal-600 text-white px-4 py-1 rounded"
            onClick={handleConfirmManual}
          >
            Confirmer
          </button>
        </div>
      )}
    </div>
  );
}

export default AdresseSearchDropdown;