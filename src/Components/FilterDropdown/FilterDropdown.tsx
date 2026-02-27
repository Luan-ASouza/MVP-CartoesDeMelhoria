import { useState } from "react";

export function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-purple-600 text-white px-4 py-2 rounded-lg"
      >
        Abrir Menu
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-48 bg-white shadow-lg rounded-xl border">
          <ul className="py-2">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Perfil
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Configurações
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500">
              Sair
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}