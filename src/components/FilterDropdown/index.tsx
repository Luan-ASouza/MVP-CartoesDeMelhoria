import { useState } from "react";
import { ChevronRight, ChevronDown } from 'lucide-react';

interface FilterProps {
  onFilter: (type:string) => void;
  types: string[];
  selectedTypeFilters:string[];
}

export function FilterDropdown({onFilter, types, selectedTypeFilters}:FilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  

  return (
    <div className="relative inline-block">
      <div className="bg-white rounded-2xl p-4 shadow-lg mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center"
      >
        <p className="text-sm text-gray-600 mr-1 font-nunito-bold">Filtrar por tipo </p> {!isOpen? <ChevronRight size={15} color="#4a5565"/> : <ChevronDown size={15} color="#4a5565"/>}
      </button>

      {isOpen && (
          
          <div className="flex flex-wrap gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedTypeFilters.includes('Todos')}
                onChange={() => onFilter('Todos')}
                className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <span className="text-sm text-gray-700">Todos</span>
            </label>
            {types.map((type) => (
              <label key={type} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedTypeFilters.includes(type)}
                  onChange={() => onFilter(type)}
                  className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <span className="text-sm text-gray-700">{type}</span>
              </label>
            ))}
          </div>
      )}
      </div>
    </div>
  );
}