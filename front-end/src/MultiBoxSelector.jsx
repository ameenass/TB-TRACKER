import React from 'react';

const MultiBoxSelector = ({ options, selectedValues, onChange, id }) => {
  const toggleOption = (value) => {
    const newValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];
    onChange(newValues);
  };

  return (
    <div id={id} className="flex gap-3 flex-wrap">
      {options.map((option) => (
        <div
          key={option}
          className={`cursor-pointer px-4 py-2 border rounded-lg ${
            selectedValues.includes(option)
              ? 'bg-blue-100 border-blue-500 text-blue-600 shadow'
              : 'bg-white border-gray-300 text-gray-600'
          } hover:border-blue-400`}
          onClick={() => toggleOption(option)}
        >
          {option}
        </div>
      ))}
    </div>
  );
};

export default MultiBoxSelector;
