import { useState } from 'react';
import { X } from 'lucide-react';

interface ConjuntoFormProps {
  onClose: () => void;
  onSubmit: (data: { nome: string; prefixo: string; quantidade: number; setor: string }) => void;
}

export function ConjuntoForm({ onClose, onSubmit }: ConjuntoFormProps) {
  const [nome, setNome] = useState('');
  const [prefixo, setPrefixo] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [setor, setSetor] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nome || !prefixo || !quantidade || !setor) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    const quantidadeNum = parseInt(quantidade);
    if (isNaN(quantidadeNum) || quantidadeNum < 1 || quantidadeNum > 200) {
      alert('Quantidade deve ser entre 1 e 200');
      return;
    }

    // Validar prefixo - apenas letras
    const prefixoLimpo = prefixo.trim().toUpperCase();
    if (!/^[A-Z]+$/.test(prefixoLimpo)) {
      alert('Prefixo deve conter apenas letras');
      return;
    }

    onSubmit({
      nome: nome.trim(),
      prefixo: prefixoLimpo,
      quantidade: quantidadeNum,
      setor: setor.trim()
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="top-0 bg-linear-to-br from-orange-500 via-purple-500 to-pink-500 p-6 rounded-t-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10 flex items-center justify-between">
            <h2 className="text-2xl text-white font-nunito-extrabold">
              Novo Conjunto de Armários
            </h2>
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
          {/* Nome do Conjunto */}
          <div>
            <label htmlFor="nome" className="block text-gray-700 dark:text-gray-300 mb-3 font-nunito-bold">
              Nome do Conjunto
            </label>
            <input
              type="text"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:border-purple-500 focus:outline-none transition-colors"
              placeholder="Ex: Armários Ala D"
            />
          </div>

          {/* Prefixo e Quantidade */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="prefixo" className="block text-gray-700 dark:text-gray-300 mb-3 font-nunito-bold">
                Prefixo
              </label>
              <input
                type="text"
                id="prefixo"
                value={prefixo}
                onChange={(e) => setPrefixo(e.target.value)}
                maxLength={3}
                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:border-purple-500 focus:outline-none transition-colors uppercase"
                placeholder="Ex: D"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Apenas letras (A-Z)
              </p>
            </div>

            <div>
              <label htmlFor="quantidade" className="block text-gray-700 dark:text-gray-300 mb-3 font-nunito-bold">
                Quantidade
              </label>
              <input
                type="number"
                id="quantidade"
                value={quantidade}
                onChange={(e) => setQuantidade(e.target.value)}
                min="1"
                max="200"
                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:border-purple-500 focus:outline-none transition-colors"
                placeholder="Ex: 30"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                1 a 200 armários
              </p>
            </div>
          </div>

          {/* Setor */}
          <div>
            <label htmlFor="setor" className="block text-gray-700 dark:text-gray-300 mb-3 font-nunito-bold">
              Setor
            </label>
            <input
              type="text"
              id="setor"
              value={setor}
              onChange={(e) => setSetor(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:border-purple-500 focus:outline-none transition-colors"
              placeholder="Ex: Desenvolvimento"
            />
          </div>

          {/* Preview */}
          {prefixo && quantidade && (
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-2xl p-4 border-2 border-purple-200 dark:border-purple-800">
              <p className="text-sm text-purple-900 dark:text-purple-300 mb-2 font-nunito-bold">
                Preview dos armários:
              </p>
              <p className="text-sm text-purple-700 dark:text-purple-400">
                {prefixo.toUpperCase()}-1 até {prefixo.toUpperCase()}-{quantidade}
              </p>
            </div>
          )}

          {/* Botões */}
          <div className="flex gap-3 pt-4">
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
              Criar Conjunto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ConjuntoForm;