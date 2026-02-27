import { Trash2, Pencil } from 'lucide-react';

interface CardProps {
  id: number;
  date: string;
  description: string;
  type: string;
  memberName: string;
  memberPhoto: string;
  onRemove: (id: number) => void;
  onEdit: (id: number) => void;
  currentUserName?: string;
}

export function Card({ id, date, description, type, memberName, memberPhoto, onRemove, onEdit, currentUserName }: CardProps) {
  // Cores baseadas no tipo
  const typeColors: { [key: string]: string } = {
    'Desenvolvimento': 'from-blue-400 to-blue-600',
    'Code Review': 'from-purple-400 to-purple-600',
    'Documentação': 'from-green-400 to-green-600',
    'Bug Fix': 'from-red-400 to-red-600',
    'Design': 'from-pink-400 to-pink-600',
    'Reunião': 'from-yellow-400 to-yellow-600',
    'Planejamento': 'from-indigo-400 to-indigo-600'
  };

  const gradient = typeColors[type] || 'from-gray-400 to-gray-600';

  return (
    <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1 flex flex-col h-full">
      {/* Header colorido com gradiente */}
      <div className={`bg-linear-to-br ${gradient} p-4 relative`}>
        {currentUserName === memberName && (
        <div className="absolute top-3 right-3">
          <button
            onClick={() => onRemove(id)}
            className="text-white/80 hover:text-white bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-all flex items-center justify-center"
            aria-label="Remover card"
          >
            <Trash2 size={16} />
          </button>
        </div>
        )}
        
        <div className="flex items-center justify-between">
          <span className="inline-block px-3 py-1 bg-white/30 backdrop-blur-sm text-white rounded-full text-xs">
            {type}
          </span>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <p className="text-xs text-gray-500 mb-3 flex items-center gap-1">
          <span>📅</span> {date}
        </p>

        <p className="text-gray-700 text-sm leading-relaxed mb-4 flex-1">
          {description.length > 200 ? `${description.substring(0, 200)}...` : description}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
          <div className="flex items-center gap-2">
            <img
              src={memberPhoto}
              alt={memberName}
              className="w-9 h-9 rounded-full object-cover ring-2 ring-gray-100"
            />
            <span className="text-sm text-gray-600">{memberName}</span>
          </div>

          {currentUserName === memberName && (
            <button
              onClick={() => onEdit(id)}
              className="flex items-center gap-1.5 text-gray-500 hover:text-purple-600 transition-colors px-3 py-2 hover:bg-purple-50 rounded-xl"
              aria-label="Editar card"
            >
              <Pencil size={14} />
              <span className="text-xs">Editar</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}