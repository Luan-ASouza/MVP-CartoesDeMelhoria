import { useState } from 'react';
import { X } from 'lucide-react';

interface CardData {
  type: string;
  description: string;
  date: string;
}

interface CardFormProps {
  onSubmit: (data: CardData) => void;
  onClose: () => void;
  types: string[];
  initialData?: CardData;
  isEditing?: boolean;
  editingCardId?: number | null;
}

export function CardForm({ onSubmit, onClose, types, initialData, isEditing = false}: CardFormProps) {
  const [selectedType, setSelectedType] = useState(initialData?.type || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [date, setDate] = useState(initialData?.date || new Date().toISOString().split('T')[0]);

  const MAX_CHARS = 200;

  // Cores baseadas no tipo - mesmas do Card
  const typeColors: { [key: string]: string } = {
    'Desenvolvimento': 'from-blue-400 to-blue-600',
    'Code Review': 'from-purple-400 to-purple-600',
    'Documentação': 'from-green-400 to-green-600',
    'Bug Fix': 'from-red-400 to-red-600',
    'Design': 'from-pink-400 to-pink-600',
    'Reunião': 'from-yellow-400 to-yellow-600',
    'Planejamento': 'from-indigo-400 to-indigo-600'
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedType || !description || !date) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    onSubmit({ type: selectedType, description, date });
  };

  const selectedGradient = selectedType ? typeColors[selectedType] : '';

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto scrollbar-hide">
        {/* Header */}
        <div className={`bg-linear-to-r ${selectedGradient || 'from-orange-500 to-purple-600'} p-6 rounded-t-3xl relative transition-all duration-300`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-all"
            aria-label="Fechar"
          >
            <X size={20} />
          </button>
          <h2 className="text-2xl text-white font-nunito-extrabold">
            {isEditing ? 'Editar Cartão de Melhoria' : 'Novo Cartão de Melhoria'}
          </h2>
          {selectedType && (
            <p className="text-white/80 text-sm mt-1">{selectedType}</p>
          )}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Tipo de Melhoria */}
          <div>
            <label className="block text-gray-700 mb-3 font-nunito-bold">
              Tipo de Melhoria
            </label>
            <div className="grid grid-cols-2 gap-3">
              {types.map((type) => {
                const gradient = typeColors[type] || 'from-gray-400 to-gray-600';
                const isSelected = selectedType === type;
                
                return (
                  <label
                    key={type}
                    className={`flex items-center gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      isSelected
                        ? `bg-linear-to-br ${gradient} border-transparent text-white`
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="type"
                      value={type}
                      checked={isSelected}
                      onChange={(e) => setSelectedType(e.target.value)}
                      className="w-5 h-5 text-purple-600 focus:ring-purple-500"
                    />
                    <span className={`text-sm ${isSelected ? 'text-white font-medium' : 'text-gray-700'}`}>{type}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Descrição */}
          <div>
            <label htmlFor="description" className="block text-gray-700 mb-3 font-nunito-bold">
              Descrição da Melhoria
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={MAX_CHARS}
              rows={5}
              className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors resize-none"
              placeholder="Descreva a melhoria realizada..."
            />
            <p className={`text-sm mt-1 ${description.length >= MAX_CHARS ? 'text-red-500' : 'text-gray-500'}`}>
              {description.length}/{MAX_CHARS} caracteres
            </p>
          </div>

          {/* Data */}
          <div>
            <label htmlFor="date" className="block text-gray-700 mb-3 font-nunito-bold">
              Data
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors"
            />
          </div>

          {/* Botões */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 rounded-2xl border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 rounded-2xl bg-linear-to-r from-orange-500 to-purple-600 text-white hover:from-orange-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
            >
              {isEditing ? 'Salvar Alterações' : 'Adicionar Cartão'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}