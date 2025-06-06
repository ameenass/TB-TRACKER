// import { useState } from "react"
// import { DateRange } from "react-date-range"
// import { format } from "date-fns"
// import { fr } from "date-fns/locale"
// import { X, Plus, Calendar, Trash2 } from "lucide-react"
// import "react-date-range/dist/styles.css"
// import "react-date-range/dist/theme/default.css"

// export function TreatmentModal({
//   isModalOpen,
//   closeModal,
//   modalMode,
//   selectedTreatment,
//   setSelectedTreatment,
//   treatmentColors,
//   state,
//   setState,
//   getSelectedDaysCount,
//   handleSave,
//   handleDelete,
//   selectedSession,
//   deletionNote,
//   setDeletionNote,
// }) {
//   if (!isModalOpen) return null

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg shadow-lg w-[95%] max-w-3xl p-8 relative">
//         <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={closeModal}>
//           <X size={20} />
//         </button>

//         {modalMode === "add" ? (
//           <AddTreatmentModal
//             selectedTreatment={selectedTreatment}
//             setSelectedTreatment={setSelectedTreatment}
//             treatmentColors={treatmentColors}
//             state={state}
//             setState={setState}
//             getSelectedDaysCount={getSelectedDaysCount}
//             handleSave={handleSave}
//           />
//         ) : (
//           <DeleteTreatmentModal
//             selectedSession={selectedSession}
//             state={state}
//             setState={setState}
//             getSelectedDaysCount={getSelectedDaysCount}
//             deletionNote={deletionNote}
//             setDeletionNote={setDeletionNote}
//             handleDelete={handleDelete}
//             closeModal={closeModal}
//           />
//         )}
//       </div>
//     </div>
//   )
// }

// function AddTreatmentModal({
//   selectedTreatment,
//   setSelectedTreatment,
//   treatmentColors,
//   state,
//   setState,
//   getSelectedDaysCount,
//   handleSave,
// }) {
//   return (
//     <>
//       <h3 className="text-xl font-bold text-gray-800 mb-4">Ajouter une session</h3>

//       <div className="mb-4">
//         <p className="text-lg font-semibold mb-2 text-green-800">1. Choisir un médicament</p>
//         <div className="flex flex-wrap gap-2">
//           {Object.keys(treatmentColors).map((treatment) => (
//             <button
//               key={treatment}
//               onClick={() => setSelectedTreatment(treatment)}
//               className={`px-3 py-1 rounded ${
//                 selectedTreatment === treatment ? "border-2 border-green-800" : ""
//               }`}
//               style={{ backgroundColor: treatmentColors[treatment] }}
//             >
//               {treatment}
//             </button>
//           ))}
//         </div>
//       </div>

//       <div>
//         <div className="flex justify-between items-center mb-2">
//           <p className="text-lg font-semibold text-green-800">2. Sélectionner la date</p>
//           <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
//             <Calendar className="h-4 w-4 text-gray-600 mr-1" />
//             <span className="text-sm font-medium text-gray-700">
//               {getSelectedDaysCount()} jour{getSelectedDaysCount() > 1 ? "s" : ""} sélectionné
//               {getSelectedDaysCount() > 1 ? "s" : ""}
//             </span>
//           </div>
//         </div>
//         <div className="max-h-[400px] overflow-y-auto">
//           <DateRange
//             ranges={state}
//             onChange={(item) => setState([item.selection])}
//             rangeColors={[treatmentColors[selectedTreatment] || "#90cdf4"]}
//             months={2}
//             direction="horizontal"
//             showMonthAndYearPickers={true}
//             showDateDisplay={true}
//             locale={fr}
//           />
//         </div>
//       </div>

//       <div className="mt-4">
//                        <button
//                          onClick={handleSave}
//                          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow"
//                        >
//                          Enregistrer
//                        </button>
//                      </div>
//     </>
//   )
// }

// function DeleteTreatmentModal({
//   selectedSession,
//   state,
//   setState,
//   getSelectedDaysCount,
//   deletionNote,
//   setDeletionNote,
//   handleDelete,
//   closeModal,
// }) {
//   return (
//     <>
//       <h3 className="text-xl font-bold text-gray-800 mb-4">
//         Suspension de traitement {selectedSession?.sessionNumber}
//       </h3>

//       <div className="mb-4">
//         <div className="flex items-center mb-2">
//           <div
//             className="w-4 h-4 rounded-sm mr-2"
//             style={{ backgroundColor: selectedSession?.color }}
//           ></div>
//           <p className="font-medium">
//             {selectedSession?.treatment} - Session {selectedSession?.sessionNumber}
//           </p>
//         </div>

//         <p className="text-sm text-gray-600 mb-4">Sélectionnez les jours à supprimer de cette session.</p>
//       </div>

//       <div>
//         <div className="flex justify-between items-center mb-2">
//           <p className="text-lg font-semibold text-red-800">Sélectionner les jours à supprimer</p>
//           <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
//             <Calendar className="h-4 w-4 text-gray-600 mr-1" />
//             <span className="text-sm font-medium text-gray-700">
//               {getSelectedDaysCount()} jour{getSelectedDaysCount() > 1 ? "s" : ""} sélectionné
//               {getSelectedDaysCount() > 1 ? "s" : ""}
//             </span>
//           </div>
//         </div>
//         <div className="max-h-[250px] overflow-y-auto">
//           <DateRange
//             ranges={state}
//             onChange={(item) => setState([item.selection])}
//             rangeColors={["#f87171"]}
//             months={2}
//             direction="horizontal"
//             showMonthAndYearPickers={true}
//             showDateDisplay={true}
//             locale={fr}
//           />
//         </div>
//       </div>

//       <div className="mt-4">
//         <label htmlFor="deletionNote" className="block text-sm font-medium text-gray-700 mb-1">
//           Raison de la Suspension
//         </label>
//         <textarea
//           id="deletionNote"
//           rows={3}
//           className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
//           placeholder="Expliquez pourquoi..."
//           value={deletionNote}
//           onChange={(e) => setDeletionNote(e.target.value)}
//         ></textarea>
//       </div>

//       <div className="mt-4 flex justify-between">
//         <button
//           onClick={closeModal}
//           className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded shadow"
//         >
//           Annuler
//         </button>
//         <button
//           onClick={handleDelete}
//           className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded shadow flex items-center"
//         >
//           <Trash2 size={18} className="mr-2" />
//           Supprimer les jours
//         </button>
//       </div>
//     </>
//   )
// }
"use client"
import { DateRange } from "react-date-range"
import { fr } from "date-fns/locale"
import { X, Calendar, Trash2 } from "lucide-react"
import "react-date-range/dist/styles.css"
import "react-date-range/dist/theme/default.css"

function SessionCreationModal({
  isModalOpen,
  closeModal,
  modalMode,
  selectedTreatment,
  setSelectedTreatment,
  treatmentColors,
  state,
  setState,
  getSelectedDaysCount,
  handleSave,
  handleDelete,
  selectedSession,
  deletionNote,
  setDeletionNote,
}) {
  if (!isModalOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-xl p-4 relative">
        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={closeModal}>
          <X size={20} />
        </button>

        {modalMode === "add" ? (
          <AddTreatmentModal
            selectedTreatment={selectedTreatment}
            setSelectedTreatment={setSelectedTreatment}
            treatmentColors={treatmentColors}
            state={state}
            setState={setState}
            getSelectedDaysCount={getSelectedDaysCount}
            handleSave={handleSave}
          />
        ) : modalMode === "suspend" ? (
          <SuspendTreatmentModal
            selectedSession={selectedSession}
            state={state}
            setState={setState}
            getSelectedDaysCount={getSelectedDaysCount}
            deletionNote={deletionNote}
            setDeletionNote={setDeletionNote}
            handleDelete={handleDelete}
            closeModal={closeModal}
          />
        ) : (
          <DeleteTreatmentModal
            selectedSession={selectedSession}
            state={state}
            setState={setState}
            getSelectedDaysCount={getSelectedDaysCount}
            deletionNote={deletionNote}
            setDeletionNote={setDeletionNote}
            handleDelete={handleDelete}
            closeModal={closeModal}
          />
        )}
      </div>
    </div>
  )
}

function AddTreatmentModal({
  selectedTreatment,
  setSelectedTreatment,
  treatmentColors,
  state,
  setState,
  getSelectedDaysCount,
  handleSave,
}) {
  return (
    <>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">Ajouter une session</h3>

      <div className="mb-4">
        <p className="text-lg font-semibold mb-2 text-green-800">1. Choisir un médicament</p>
        <div className="flex flex-wrap gap-2">
          {Object.keys(treatmentColors).map((treatment) => (
            <button
              key={treatment}
              onClick={() => setSelectedTreatment(treatment)}
              className={`px-2 py-1 text-sm rounded ${
                selectedTreatment === treatment ? "border-2 border-green-800" : ""
              }`}
              style={{ backgroundColor: treatmentColors[treatment] }}
            >
              {treatment}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <p className="text-lg font-semibold text-green-800">2. Sélectionner la date</p>
          <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
            <Calendar className="h-4 w-4 text-gray-600 mr-1" />
            <span className="text-sm font-medium text-gray-700">
              {getSelectedDaysCount()} jour{getSelectedDaysCount() > 1 ? "s" : ""} sélectionné
              {getSelectedDaysCount() > 1 ? "s" : ""}
            </span>
          </div>
        </div>

        <div className="max-h-[400px] overflow-y-auto">
          <div style={{ transform: "scale(0.85)", transformOrigin: "top left" }}>
            <DateRange
              ranges={state}
              onChange={(item) => setState([item.selection])}
              rangeColors={[treatmentColors[selectedTreatment] || "#90cdf4"]}
              months={6}
              direction="horizontal"
              showMonthAndYearPickers={true}
              showDateDisplay={true}
              locale={fr}
            />
          </div>
        </div>
      </div>

      <div className="mt-4">
        <button
          onClick={handleSave}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow"
        >
          Enregistrer
        </button>
      </div>
    </>
  )
}

function SuspendTreatmentModal({
  selectedSession,
  state,
  setState,
  getSelectedDaysCount,
  deletionNote,
  setDeletionNote,
  handleDelete,
  closeModal,
}) {
  return (
    <>
      <h3 className="text-xl font-bold text-gray-800 mb-4">
        Suspension de traitement - Session {selectedSession?.sessionNumber}
      </h3>

      <div className="mb-4">
        <div className="flex items-center mb-2">
          <div className="w-4 h-4 rounded-sm mr-2" style={{ backgroundColor: selectedSession?.color }}></div>
          <p className="font-medium">
            {selectedSession?.treatment} - Session {selectedSession?.sessionNumber}
          </p>
        </div>

        <p className="text-sm text-gray-600 mb-4">Sélectionnez la période à suspendre pour cette session.</p>
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <p className="text-lg font-semibold text-orange-800">Période de suspension</p>
          <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
            <Calendar className="h-4 w-4 text-gray-600 mr-1" />
            <span className="text-sm font-medium text-gray-700">
              {getSelectedDaysCount()} jour{getSelectedDaysCount() > 1 ? "s" : ""} sélectionné
              {getSelectedDaysCount() > 1 ? "s" : ""}
            </span>
          </div>
        </div>
        <div className="max-h-[250px] overflow-y-auto">
          <DateRange
            ranges={state}
            onChange={(item) => setState([item.selection])}
            rangeColors={["#f97316"]} // orange-500
            months={2}
            direction="horizontal"
            showMonthAndYearPickers={true}
            showDateDisplay={true}
            locale={fr}
          />
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="deletionNote" className="block text-sm font-medium text-gray-700 mb-1">
          Raison de la Suspension
        </label>
        <textarea
          id="deletionNote"
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          placeholder="Expliquez la raison de la suspension..."
          value={deletionNote}
          onChange={(e) => setDeletionNote(e.target.value)}
        ></textarea>
      </div>

      <div className="mt-4 flex justify-between">
        <button
          onClick={closeModal}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded shadow"
        >
          Annuler
        </button>
        <button
          onClick={handleDelete}
          className="bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium py-2 px-4 rounded shadow-sm flex items-center"
        >
          <Trash2 size={18} className="mr-2" />
          Suspendre la période
        </button>
      </div>
    </>
  )
}

function DeleteTreatmentModal({
  selectedSession,
  state,
  setState,
  getSelectedDaysCount,
  deletionNote,
  setDeletionNote,
  handleDelete,
  closeModal,
}) {
  return (
    <>
      <h3 className="text-xl font-bold text-gray-800 mb-4">
        Suppression de traitement - Session {selectedSession?.sessionNumber}
      </h3>

      <div className="mb-4">
        <div className="flex items-center mb-2">
          <div className="w-4 h-4 rounded-sm mr-2" style={{ backgroundColor: selectedSession?.color }}></div>
          <p className="font-medium">
            {selectedSession?.treatment} - Session {selectedSession?.sessionNumber}
          </p>
        </div>

        <p className="text-sm text-gray-600 mb-4">
          Sélectionnez les jours à supprimer définitivement de cette session.
        </p>
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <p className="text-lg font-semibold text-red-800">Sélectionner les jours à supprimer</p>
          <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
            <Calendar className="h-4 w-4 text-gray-600 mr-1" />
            <span className="text-sm font-medium text-gray-700">
              {getSelectedDaysCount()} jour{getSelectedDaysCount() > 1 ? "s" : ""} sélectionné
              {getSelectedDaysCount() > 1 ? "s" : ""}
            </span>
          </div>
        </div>
        <div className="max-h-[250px] overflow-y-auto">
          <DateRange
            ranges={state}
            onChange={(item) => setState([item.selection])}
            rangeColors={["#f87171"]}
            months={2}
            direction="horizontal"
            showMonthAndYearPickers={true}
            showDateDisplay={true}
            locale={fr}
          />
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="deletionNote" className="block text-sm font-medium text-gray-700 mb-1">
          Raison de la Suppression
        </label>
        <textarea
          id="deletionNote"
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
          placeholder="Expliquez pourquoi..."
          value={deletionNote}
          onChange={(e) => setDeletionNote(e.target.value)}
        ></textarea>
      </div>

      <div className="mt-4 flex justify-between">
        <button
          onClick={closeModal}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded shadow"
        >
          Annuler
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-1.5 px-3 rounded shadow-sm flex items-center"
        >
          <Trash2 size={18} className="mr-2" />
          Supprimer les jours
        </button>
      </div>
    </>
  )
}

export default SessionCreationModal
