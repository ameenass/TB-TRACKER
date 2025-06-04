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
      nbJours: isPeriod && endDate   //en mode periode ,end date--> y a une periode
        ? Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)) + 1
        : 1,
      dateDebut: startDate.toISOString().split("T")[0],  // "2025-06-02T14:30:00.000Z"  [2025-06-02 , 14:30:00.000Z]
      dateDeSignalement: dateSignalement.toISOString().split("T")[0],
    }));

    const payload = {
      // dateVisite: dateSignalement.toISOString().split("T")[0],
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

      if (onSubmit) onSubmit(); // recharger l'interface
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
