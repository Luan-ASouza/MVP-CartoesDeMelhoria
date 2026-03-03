import { useState } from 'react';
import { Plus, ShoppingCart, Trash2, Send } from 'lucide-react';

interface Etiqueta {
  id: string;
  tamanho: string;
  largura: number;
  altura: number;
}

interface EtiquetaCarrinho {
  etiqueta: Etiqueta;
  texto: string;
  quantidade: number;
}

const tamanhos: Etiqueta[] = [
  { id: '1', tamanho: '5x3cm', largura: 5, altura: 3 },
  { id: '2', tamanho: '7x5cm', largura: 7, altura: 5 },
  { id: '3', tamanho: '9x6cm', largura: 9, altura: 6 },
  { id: '4', tamanho: '10x7cm', largura: 10, altura: 7 },
  { id: '5', tamanho: '13x9cm', largura: 13, altura: 9 },
  { id: '6', tamanho: '15x10cm', largura: 15, altura: 10 },
];

export default function EtiquetasPage() {
  const [etiquetaSelecionada, setEtiquetaSelecionada] = useState<Etiqueta | null>(null);
  const [texto, setTexto] = useState('');
  const [quantidade, setQuantidade] = useState(1);
  const [carrinho, setCarrinho] = useState<EtiquetaCarrinho[]>([]);

  const handleSelecionarEtiqueta = (etiqueta: Etiqueta) => {
    setEtiquetaSelecionada(etiqueta);
    setTexto('');
    setQuantidade(1);
  };

  const handleAdicionarAoCarrinho = () => {
    if (!etiquetaSelecionada || !texto.trim()) {
      alert('Por favor, preencha o texto da etiqueta');
      return;
    }

    const novoItem: EtiquetaCarrinho = {
      etiqueta: etiquetaSelecionada,
      texto: texto.trim(),
      quantidade
    };

    setCarrinho([...carrinho, novoItem]);
    setEtiquetaSelecionada(null);
    setTexto('');
    setQuantidade(1);
  };

  const handleRemoverDoCarrinho = (index: number) => {
    setCarrinho(carrinho.filter((_, i) => i !== index));
  };

  const handleSolicitarEtiquetas = () => {
    if (carrinho.length === 0) {
      alert('Adicione etiquetas ao carrinho primeiro');
      return;
    }

    console.log('Enviando para API:', carrinho);
    alert(`Solicitação enviada! Total: ${carrinho.reduce((sum, item) => sum + item.quantidade, 0)} etiquetas`);
    setCarrinho([]);
  };

  const totalEtiquetas = carrinho.reduce((sum, item) => sum + item.quantidade, 0);

  return (
    <div className="min-h-screen bg-linear-to-b from-orange-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto ">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-nunito-extrabold text-gray-800 dark:text-white mb-2">
              Etiquetas de Melhoria
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Selecione o tamanho e personalize suas etiquetas
            </p>
          </div>
        </div>

        {/* Grid de Etiquetas */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg mb-8">
          <h2 className="text-xl font-nunito-bold text-gray-800 dark:text-white mb-6">
            Escolha o Tamanho
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {tamanhos.map((etiqueta) => {
              const aspectRatio = etiqueta.largura / etiqueta.altura;
              
              return (
                <button
                  key={etiqueta.id}
                  onClick={() => handleSelecionarEtiqueta(etiqueta)}
                  className="group relative bg-linear-to-br from-orange-400 to-purple-600 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden flex items-center justify-center"
                  style={{ 
                    aspectRatio: aspectRatio.toString(),
                    minHeight: '120px'
                  }}
                >
                  {/* Marca d'água */}
                  <div className="absolute bottom-2 right-2 text-white/30 text-xs font-nunito-bold transform rotate-[-15deg]">
                    melhoria
                  </div>
                  
                  {/* Tamanho */}
                  <div className="relative z-10 text-white text-center">
                    <p className="text-2xl font-nunito-extrabold">{etiqueta.tamanho}</p>
                  </div>

                  {/* Efeito hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulário de Personalização */}
          {etiquetaSelecionada && (
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg">
              <h2 className="text-xl font-nunito-bold text-gray-800 dark:text-white mb-6">
                Personalizar Etiqueta
              </h2>

              {/* Preview da Etiqueta */}
              <div className="mb-6 flex justify-center">
                <div 
                  className="relative bg-linear-to-br from-orange-400 to-purple-600 rounded-2xl shadow-xl flex items-center justify-center p-6"
                  style={{
                    width: `${etiquetaSelecionada.largura * 20}px`,
                    height: `${etiquetaSelecionada.altura * 20}px`,
                    maxWidth: '100%',
                    aspectRatio: (etiquetaSelecionada.largura / etiquetaSelecionada.altura).toString()
                  }}
                >
                  {/* Marca d'água */}
                  <div className="absolute bottom-2 right-2 text-white/30 text-xs font-nunito-bold transform rotate-[-15deg]">
                    melhoria
                  </div>
                  
                  {/* Texto */}
                  <p className="text-white text-center font-nunito-bold px-2" style={{ fontSize: `${Math.min(etiquetaSelecionada.largura * 2, 20)}px` }}>
                    {texto || 'Digite seu texto'}
                  </p>
                </div>
              </div>

              {/* Campos do Form */}
              <div className="space-y-4">
                <div>
                  <label htmlFor="texto" className="block text-gray-700 dark:text-gray-300 mb-2 font-nunito-bold text-sm">
                    Texto da Etiqueta
                  </label>
                  <textarea
                    id="texto"
                    value={texto}
                    onChange={(e) => setTexto(e.target.value)}
                    rows={3}
                    maxLength={50}
                    className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:border-purple-500 focus:outline-none transition-colors resize-none"
                    placeholder="Digite o texto para a etiqueta..."
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {texto.length}/50 caracteres
                  </p>
                </div>

                <div>
                  <label htmlFor="quantidade" className="block text-gray-700 dark:text-gray-300 mb-2 font-nunito-bold text-sm">
                    Quantidade
                  </label>
                  <input
                    type="number"
                    id="quantidade"
                    value={quantidade}
                    onChange={(e) => setQuantidade(Math.max(1, parseInt(e.target.value) || 1))}
                    min="1"
                    max="100"
                    className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:border-purple-500 focus:outline-none transition-colors"
                  />
                </div>

                <button
                  onClick={handleAdicionarAoCarrinho}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-linear-to-r from-orange-500 to-purple-600 text-white hover:from-orange-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
                >
                  <Plus size={20} />
                  Adicionar ao Carrinho
                </button>
              </div>
            </div>
          )}

          {/* Carrinho */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-nunito-bold text-gray-800 dark:text-white flex items-center gap-2">
                <ShoppingCart size={24} />
                Carrinho
              </h2>
              <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 px-3 py-1 rounded-full text-sm font-bold">
                {totalEtiquetas}
              </span>
            </div>

            {carrinho.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🏷️</div>
                <p className="text-gray-400">Seu carrinho está vazio</p>
              </div>
            ) : (
              <>
                <div className="space-y-3 mb-6 max-h-96 overflow-y-auto">
                  {carrinho.map((item, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-4 flex items-center gap-4"
                    >
                      <div 
                        className="shrink-0 bg-linear-to-br from-orange-400 to-purple-600 rounded-xl flex items-center justify-center relative"
                        style={{
                          width: '60px',
                          height: `${(item.etiqueta.altura / item.etiqueta.largura) * 60}px`
                        }}
                      >
                        <div className="absolute bottom-0.5 right-0.5 text-white/30 text-[6px] font-nunito-bold transform rotate-[-15deg]">
                          melhoria
                        </div>
                        <p className="text-white text-[8px] font-nunito-bold text-center px-1">
                          {item.texto.length > 20 ? item.texto.substring(0, 20) + '...' : item.texto}
                        </p>
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="font-nunito-bold text-gray-800 dark:text-white text-sm">
                          {item.etiqueta.tamanho}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 text-xs truncate">
                          {item.texto}
                        </p>
                        <p className="text-gray-500 dark:text-gray-500 text-xs mt-1">
                          Qtd: {item.quantidade}
                        </p>
                      </div>

                      <button
                        onClick={() => handleRemoverDoCarrinho(index)}
                        className="shrink-0 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-xl transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleSolicitarEtiquetas}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-linear-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 transition-all shadow-lg hover:shadow-xl"
                >
                  <Send size={20} />
                  Solicitar Etiquetas ({totalEtiquetas})
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
