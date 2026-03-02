import { useState } from "react";
import { ChevronRight, ChevronDown } from 'lucide-react';

interface FilterProps {
  onFilter: (type: string) => void;
  types: string[];
  selectedTypeFilters: string[];
}

export function FilterDropdown({ onFilter, types, selectedTypeFilters }: FilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg mb-6">
        
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center ${isOpen ? "mb-4" : ""}`}
        >
          <p className="text-sm text-gray-600 dark:text-gray-400 mr-1 font-nunito-bold">
            Filtrar por tipo
          </p>

          {!isOpen ? (
            <ChevronRight size={15} className="text-gray-600 dark:text-gray-400" />
          ) : (
            <ChevronDown size={15} className="text-gray-600 dark:text-gray-400" />
          )}
        </button>

        {isOpen && (
          <div className="flex flex-wrap gap-3">
            
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedTypeFilters.includes('Todos')}
                onChange={() => onFilter('Todos')}
                className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-purple-600 focus:ring-purple-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Todos
              </span>
            </label>

            {types.map((type) => (
              <label key={type} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedTypeFilters.includes(type)}
                  onChange={() => onFilter(type)}
                  className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-purple-600 focus:ring-purple-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {type}
                </span>
              </label>
            ))}

          </div>
        )}
      </div>
    </div>
  );
}