import { Mars, Venus } from 'lucide-react';

const CheckboxF = ({ value, onChange }) => {
  const options = [
    { label: 'Male', value: 'male', icon: <Mars className="w-4 h-4 mr-2" /> },
    { label: 'Female', value: 'female', icon: <Venus className="w-4 h-4 mr-2" /> },
  ];

  return (
    <div className="flex gap-3 flex-wrap">
      {options.map(({ label, value: val, icon }) => {
        const isSelected = value === val;
        return (
          <div
            key={val}
            onClick={() => onChange({ target: { value: val } })}
            className={`flex items-center cursor-pointer px-4 py-2 border rounded-lg transition-all duration-150 uppercase text-sm font-medium
              ${isSelected ? 'bg-blue-100 border-blue-500 text-blue-700' : 'bg-white border-gray-300 text-gray-700'}`}
          >
            {icon}
            {label}
          </div>
        );
      })}
    </div>
  );
};

export default CheckboxF;