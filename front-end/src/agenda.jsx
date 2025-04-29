import React, { useState } from "react";

const monthsToShow = 6;
const today = new Date();

const getDaysInMonth = (monthIndex, year) => {
  return new Date(year, monthIndex + 1, 0).getDate();
};

const Agenda = () => {
  const year = today.getFullYear();
  const currentMonth = today.getMonth();
  const currentDate = today.getDate();

  const [selectedDate, setSelectedDate] = useState({
    day: currentDate,
    month: currentMonth,
    year: year,
  });

  const months = Array.from({ length: monthsToShow }, (_, i) => {
    const monthIndex = (currentMonth + i) % 12;
    const fullYear = currentMonth + i >= 12 ? year + 1 : year;
    const monthName = new Date(fullYear, monthIndex).toLocaleString("default", {
      month: "long",
    });
    const totalDays = getDaysInMonth(monthIndex, fullYear);
    const startDay = i === 0 ? currentDate : 1;

    const days = Array.from({ length: totalDays - startDay + 1 }, (_, j) => startDay + j);
    while (days.length < 31) {
      days.push(null); // Fill to 31 for layout
    }

    return {
      name: monthName,
      monthIndex,
      year: fullYear,
      days,
    };
  });

  const isSelected = (day, monthIndex, year) =>
    day === selectedDate.day &&
    monthIndex === selectedDate.month &&
    year === selectedDate.year;

  const isToday = (day, monthIndex, year) =>
    day === today.getDate() &&
    monthIndex === today.getMonth() &&
    year === today.getFullYear();

  return (
    <div className="w-[60%] p-4 space-y-3">
      {months.map((month, idx) => (
        <div key={idx} className="flex items-center space-x-2">
          <div className="w-20 text-sm font-medium">{month.name}</div>
          <div
            className="grid gap-[2px] w-full"
            style={{
              gridTemplateColumns: "repeat(31, minmax(0, 1fr))",
            }}
          >
            {month.days.map((day, index) => {
              if (!day) {
                return <div key={index} className="w-6 h-6" />;
              }

              const selected = isSelected(day, month.monthIndex, month.year);
              const todayMatch = isToday(day, month.monthIndex, month.year);

              return (
                <button
                  key={index}
                  onClick={() =>
                    setSelectedDate({ day, month: month.monthIndex, year: month.year })
                  }
                  className={`w-6 h-6 text-[10px] flex flex-col items-center justify-center rounded border transition
                    ${
                      selected
                        ? "bg-emerald-100 border border-emerald-300 text-emerald-500 font-semibold"
                        : todayMatch
                        ? "border-emerald-500 text-emerald-600"
                        : "bg-white"
                    }`}
                >
                  <span>{day}</span>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Agenda;