// // imports...
// import { format, isSameDay } from "date-fns";
// import { fr } from "date-fns/locale";
// // autres imports...

// // 👉 Fonction utilitaire pour générer les lignes de l’agenda
// function produce(month, width, beg_col) {
//   const res = [];
//   let col = beg_col;
//   let day = 1;

//   while (month > 0) {
//     const row = Array(width).fill(0);
//     let marked = false;

//     for (let i = 0; i < width; i++) {
//       if (i >= beg_col && month > 0) {
//         row[i] = day;
//         day++;
//         month--;
//       } else if (!marked) {
//         col = i;
//         marked = true;
//       }
//     }

//     beg_col = 0;
//     res.push(row);
//   }

//   return { matrix: res, lastCol: col };
// }

import { format, isSameDay } from "date-fns";
import { fr } from "date-fns/locale";

export default function DayCell({ day, treatmentInfo, onDayClick, hasRendezVous }) {
  const isToday = isSameDay(day, new Date());
  const dayName = format(day, "EEE", { locale: fr }).substring(0, 1).toUpperCase();

  let bgColor = "white";
  let textColor = "inherit";
  const ringColor = isToday ? "ring-2 ring-green-500" : "";

  if (treatmentInfo.hasTreatment) {
    if (treatmentInfo.isOverridden) {
      bgColor = "#f3f4f6";
      textColor = "#9ca3af";
    } else {
      bgColor = treatmentInfo.color;
    }
  } else if (treatmentInfo.isOutsideTreatmentPeriod) {
    bgColor = "#f3f4f6";
    textColor = "#9ca3af";
  }

  return (
    <button
      onClick={(event) => onDayClick(day, treatmentInfo, event)}
      className={`
        w-8 h-12 flex flex-col items-center justify-start pt-1 m-[1px] 
        rounded-md text-xs font-medium
        hover:bg-gray-100 transition-colors
        ${treatmentInfo.hasOverlap ? "ring-1 ring-white" : ""}
        ${ringColor}
      `}
      style={{ backgroundColor: bgColor, color: textColor }}
      title={treatmentInfo.hasTreatment ? `${treatmentInfo.name} - ${treatmentInfo.treatment}` : ""}
    >
      <span className={`text-[9px] font-medium text-gray-400 mb-1`}>{dayName}</span>
      <span className="text-sm">{day.getDate()}</span>
      {hasRendezVous && (
        <span className="w-3 h-3 bg-black rounded-full mt-auto ml-auto mr-1 mb-1"></span>
      )}
    </button>
  );
}
