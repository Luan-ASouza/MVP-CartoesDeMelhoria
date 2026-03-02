import { useState } from 'react';
import { X, AlertTriangle } from 'lucide-react';
import { type Armario } from '../../mocks/ArmariosMock';

interface ArmarioFormProps {
  armario: Armario;
  onClose: () => void;
  onSubmit: (data: { dono: string; matricula: string; turno: 'Diurno' | 'Noturno' }) => void;
  onEsvaziar: () => void;
}

export function ArmarioForm({ armario, onClose, onSubmit, onEsvaziar }: ArmarioFormProps) {
  const [dono, setDono] = useState(armario.dono || '');
  const [matricula, setMatricula] = useState(armario.matricula || '');
  const [turno, setTurno] = useState<'Diurno' | 'Noturno'>(armario.turno || 'Diurno');
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!dono.trim() || !matricula.trim()) {
      alert('Por favor, preencha o nome do dono e a matrícula');
      return;
    }

    onSubmit({
      dono: dono.trim(),
      matricula: matricula.trim(),
      turno
    });
  };

  const handleEsvaziar = () => {
    onEsvaziar();
    setShowConfirmModal(false);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="top-0 bg-linear-to-br from-orange-500 via-purple-500 to-pink-500 p-6 rounded-t-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <h2 className="text-2xl text-white font-nunito-extrabold">
                  Editar Armário
                </h2>
                <p className="text-white/80 text-sm mt-1">{armario.nome}</p>
              </div>
              <button
                onClick={onClose}
                className="text-white/80 hover:text-white bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-all"
                aria-label="Fechar"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Nome do Dono */}
            <div>
              <label htmlFor="dono" className="block text-gray-700 dark:text-gray-300 mb-3 font-nunito-bold">
                Nome do Dono
              </label>
              <input
                type="text"
                id="dono"
                value={dono}
                onChange={(e) => setDono(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:border-purple-500 focus:outline-none transition-colors"
                placeholder="Nome completo"
              />
            </div>

            {/* Matrícula */}
            <div>
              <label htmlFor="matricula" className="block text-gray-700 dark:text-gray-300 mb-3 font-nunito-bold">
                Matrícula
              </label>
              <input
                type="text"
                id="matricula"
                value={matricula}
                onChange={(e) => setMatricula(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:border-purple-500 focus:outline-none transition-colors"
                placeholder="Ex: 2024001"
              />
            </div>

            {/* Turno */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-3 font-nunito-bold">
                Turno
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label
                  className={`flex items-center justify-center gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    turno === 'Diurno'
                      ? 'bg-linear-to-br from-orange-400 to-orange-600 border-transparent text-white'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-700'
                  }`}
                >
                  <input
                    type="radio"
                    name="turno"
                    value="Diurno"
                    checked={turno === 'Diurno'}
                    onChange={() => setTurno('Diurno')}
                    className="w-5 h-5 text-orange-600 focus:ring-orange-500"
                  />
                  <span className={`text-sm font-medium ${turno === 'Diurno' ? 'text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                    ☀️ Diurno
                  </span>
                </label>

                <label
                  className={`flex items-center justify-center gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    turno === 'Noturno'
                      ? 'bg-linear-to-br from-indigo-400 to-indigo-600 border-transparent text-white'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-700'
                  }`}
                >
                  <input
                    type="radio"
                    name="turno"
                    value="Noturno"
                    checked={turno === 'Noturno'}
                    onChange={() => setTurno('Noturno')}
                    className="w-5 h-5 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className={`text-sm font-medium ${turno === 'Noturno' ? 'text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                    🌙 Noturno
                  </span>
                </label>
              </div>
            </div>

            {/* Botões */}
            <div className="flex flex-col gap-3 pt-4">
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-6 py-3 rounded-2xl border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 rounded-2xl bg-linear-to-r from-orange-500 to-purple-600 text-white hover:from-orange-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
                >
                  Salvar Alterações
                </button>
              </div>

              {/* Botão Esvaziar - Apenas se estiver ocupado */}
              {armario.ocupado && (
                <button
                  type="button"
                  onClick={() => setShowConfirmModal(true)}
                  className="w-full px-6 py-3 rounded-2xl border-2 border-red-500 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                >
                  Esvaziar Armário
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Modal de Confirmação */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-60 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center shrink-0">
                <AlertTriangle className="text-red-600 dark:text-red-400" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-nunito-bold text-gray-800 dark:text-white mb-2">
                  Esvaziar Armário?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Esta ação irá remover todas as informações do armário <strong>{armario.nome}</strong>.
                  Tem certeza que deseja continuar?
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 px-6 py-3 rounded-2xl border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
              >
                Cancelar
              </button>
              <button
                onClick={handleEsvaziar}
                className="flex-1 px-6 py-3 rounded-2xl bg-red-600 text-white hover:bg-red-700 transition-all shadow-lg hover:shadow-xl"
              >
                Esvaziar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
