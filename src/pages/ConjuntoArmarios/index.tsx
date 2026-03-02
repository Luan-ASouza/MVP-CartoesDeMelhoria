import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, Pencil, Search } from 'lucide-react';
import { getConjuntoById, updateArmario, esvaziarArmario, type Armario } from '../../mocks/ArmariosMock';
import { ArmarioForm } from '../../components/ArmarioForm';

type FilterType = 'todos' | 'ocupados' | 'vazios';

export default function ConjuntoDetalhePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [conjunto, setConjunto] = useState(getConjuntoById(id || ''));
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<FilterType>('todos');
  const [editingArmario, setEditingArmario] = useState<Armario | null>(null);

  useEffect(() => {
    if (!conjunto) {
      navigate('/armarios');
    }
  }, [conjunto, navigate]);

  if (!conjunto) {
    return null;
  }

  const ocupados = conjunto.armarios.filter(a => a.ocupado).length;
  const vazios = conjunto.armarios.filter(a => !a.ocupado).length;
  const total = conjunto.armarios.length;
  const percentualOcupado = Math.round((ocupados / total) * 100);

  const filteredArmarios = conjunto.armarios.filter(armario => {
    const matchesSearch = 
      armario.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (armario.dono && armario.dono.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (armario.matricula && armario.matricula.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesFilter = 
      filter === 'todos' ||
      (filter === 'ocupados' && armario.ocupado) ||
      (filter === 'vazios' && !armario.ocupado);

    return matchesSearch && matchesFilter;
  });

  const handleUpdateArmario = (armarioId: string, data: { dono: string; matricula: string; turno: 'Diurno' | 'Noturno' }) => {
    const hoje = new Date().toISOString().split('T')[0];
    updateArmario(conjunto.id, armarioId, {
      ...data,
      ocupado: true,
      ultimaAtualizacao: hoje
    });
    setConjunto(getConjuntoById(conjunto.id));
    setEditingArmario(null);
  };

  const handleEsvaziarArmario = (armarioId: string) => {
    esvaziarArmario(conjunto.id, armarioId);
    setConjunto(getConjuntoById(conjunto.id));
    setEditingArmario(null);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  return (
    <div className="px-6 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate('/armarios')}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Voltar para conjuntos</span>
        </button>

        {/* Hero */}
        <div className="bg-linear-to-br from-orange-500 via-purple-500 to-pink-500 rounded-3xl p-8 mb-8 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-white/30 backdrop-blur-sm rounded-full px-4 py-2">
                    <span className="text-white font-nunito-bold">{conjunto.prefixo}</span>
                  </div>
                  <span className="text-white/80 text-sm">{conjunto.setor}</span>
                </div>
                <h1 className="text-4xl font-nunito-extrabold text-white mb-2">
                  {conjunto.nome}
                </h1>
                <p className="text-white/90">
                  {conjunto.quantidade} armários no total
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                <p className="text-white/80 text-sm mb-1">Ocupados</p>
                <p className="text-3xl font-nunito-extrabold text-white">{ocupados}</p>
              </div>
              
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                <p className="text-white/80 text-sm mb-1">Vazios</p>
                <p className="text-3xl font-nunito-extrabold text-white">{vazios}</p>
              </div>
              
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                <p className="text-white/80 text-sm mb-1">Taxa de Ocupação</p>
                <p className="text-3xl font-nunito-extrabold text-white">{percentualOcupado}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 flex items-center gap-3">
              <Search className="text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Buscar por armário, dono ou matrícula..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 outline-none bg-transparent text-gray-700 dark:text-gray-300 placeholder-gray-400"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('todos')}
                className={`px-4 py-2 rounded-xl text-sm transition-all ${
                  filter === 'todos'
                    ? 'bg-linear-to-r from-orange-500 to-purple-600 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Todos ({total})
              </button>
              <button
                onClick={() => setFilter('ocupados')}
                className={`px-4 py-2 rounded-xl text-sm transition-all ${
                  filter === 'ocupados'
                    ? 'bg-linear-to-r from-orange-500 to-purple-600 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Ocupados ({ocupados})
              </button>
              <button
                onClick={() => setFilter('vazios')}
                className={`px-4 py-2 rounded-xl text-sm transition-all ${
                  filter === 'vazios'
                    ? 'bg-linear-to-r from-orange-500 to-purple-600 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Vazios ({vazios})
              </button>
            </div>
          </div>
        </div>

        {/* Armários Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredArmarios.map((armario) => (
            <div
              key={armario.id}
              className={`rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${
                armario.ocupado
                  ? 'bg-white dark:bg-gray-800'
                  : 'bg-gray-50 dark:bg-gray-900 border-2 border-dashed border-gray-300 dark:border-gray-700'
              }`}
            >
              {/* Header */}
              <div className={`p-4 ${
                armario.ocupado
                  ? 'bg-linear-to-br from-orange-400 to-purple-600'
                  : 'bg-gray-200 dark:bg-gray-800'
              }`}>
                <div className="flex items-center justify-between">
                  <span className={`text-lg font-nunito-bold ${
                    armario.ocupado ? 'text-white' : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {armario.nome}
                  </span>
                  {armario.ocupado && (
                    <div className="bg-white/30 backdrop-blur-sm rounded-full px-2 py-1">
                      <span className="text-white text-xs">
                        {armario.turno === 'Diurno' ? '☀️' : '🌙'}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                {armario.ocupado ? (
                  <>
                    <div className="mb-3">
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Dono</p>
                      <p className="font-medium text-gray-800 dark:text-white">{armario.dono}</p>
                    </div>

                    <div className="mb-3">
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Matrícula</p>
                      <p className="font-mono text-sm text-gray-700 dark:text-gray-300">{armario.matricula}</p>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Última atualização</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{formatDate(armario.ultimaAtualizacao)}</p>
                    </div>

                    <button
                      onClick={() => setEditingArmario(armario)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all"
                    >
                      <Pencil size={14} />
                      <span className="text-sm font-medium">Editar</span>
                    </button>
                  </>
                ) : (
                  <div className="py-6 text-center">
                    <div className="text-4xl mb-2">📭</div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">Armário vazio</p>
                    <button
                      onClick={() => setEditingArmario(armario)}
                      className="px-4 py-2 rounded-xl bg-linear-to-r from-orange-500 to-purple-600 text-white text-sm hover:from-orange-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
                    >
                      Atribuir
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredArmarios.length === 0 && (
          <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-3xl shadow-lg">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-400 text-lg">Nenhum armário encontrado</p>
          </div>
        )}
      </div>

      {/* Edit Form */}
      {editingArmario && (
        <ArmarioForm
          armario={editingArmario}
          onClose={() => setEditingArmario(null)}
          onSubmit={(data) => handleUpdateArmario(editingArmario.id, data)}
          onEsvaziar={() => handleEsvaziarArmario(editingArmario.id)}
        />
      )}
    </div>
  );
}
