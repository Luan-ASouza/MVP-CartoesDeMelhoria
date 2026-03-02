import { lazy, Suspense, useState } from 'react';
import { useNavigate } from 'react-router';
import { Grid3x2, Plus, Search } from 'lucide-react';
import { getConjuntos, addConjunto, type ConjuntoArmarios } from '../../mocks/ArmariosMock'
import ConjuntoFormSkeleton from '../../components/ConjuntoForm/ConjuntoFormSkeleton';
import ConjuntoArmario from '../../components/ConjuntoArmário';

const ConjuntoForm = lazy(() => import('../../components/ConjuntoForm'));

export default function ArmariosPage() {
    const [conjuntos, setConjuntos] = useState<ConjuntoArmarios[]>(getConjuntos());
    const [showForm, setShowForm] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleCreateConjunto = (data: { nome: string; prefixo: string; quantidade: number; setor: string }) => {
        const novoConjunto = addConjunto(data);
        setConjuntos(getConjuntos());
        setShowForm(false);
        // Navegar para a página de detalhes do novo conjunto
        navigate(`/armarios/${novoConjunto.id}`);
    };

    const filteredConjuntos = conjuntos.filter(conjunto =>
        conjunto.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
        conjunto.setor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        conjunto.prefixo.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="px-6 py-8 min-h-screen bg-linear-to-b from-orange-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">

            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-nunito-extrabold text-gray-800 dark:text-white mb-2">
                            Conjuntos de Armários
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Gerencie os conjuntos de armários do grupo
                        </p>
                    </div>

                    <button
                        onClick={() => setShowForm(true)}
                        className="flex items-center gap-2 bg-linear-to-r from-orange-500 to-purple-600 text-white px-5 py-3 rounded-2xl hover:from-orange-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                        <Plus size={20} />
                        <span className="text-sm">Novo Conjunto de Armários</span>
                    </button>
                </div>

                {/* Search Bar */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg mb-8">
                    <div className="flex items-center gap-3">
                        <Search className="text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Buscar conjuntos por nome, setor ou prefixo..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="flex-1 outline-none bg-transparent text-gray-700 dark:text-gray-300 placeholder-gray-400"
                        />
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-linear-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center">
                                <Grid3x2 className="text-white" size={24} />
                            </div>
                            <div>
                                <p className="text-2xl font-nunito-extrabold text-gray-800 dark:text-white">
                                    {conjuntos.length}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Conjuntos</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-linear-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center">
                                <span className="text-white text-xl font-nunito-extrabold">∑</span>
                            </div>
                            <div>
                                <p className="text-2xl font-nunito-extrabold text-gray-800 dark:text-white">
                                    {conjuntos.reduce((sum, c) => sum + c.armarios.length, 0)}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Total de armários</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-linear-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center">
                                <span className="text-white text-xl font-nunito-extrabold">✓</span>
                            </div>
                            <div>
                                <p className="text-2xl font-nunito-extrabold text-gray-800 dark:text-white">
                                    {conjuntos.reduce((sum, c) => sum + c.armarios.filter(a => a.ocupado).length, 0)}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Armários ocupados</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Conjuntos Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredConjuntos.map((conjunto, index) => {                        
                        return (
                            <ConjuntoArmario
                                conjunto={conjunto}
                                index={index}
                            />
                        );
                    })}
                </div>

                {filteredConjuntos.length === 0 && (
                    <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-3xl shadow-lg">
                        <div className="text-6xl mb-4">📦</div>
                        <p className="text-gray-400 text-lg mb-6">
                            {searchQuery ? 'Nenhum conjunto encontrado' : 'Nenhum conjunto criado ainda'}
                        </p>
                        {!searchQuery && (
                            <button
                                onClick={() => setShowForm(true)}
                                className="inline-flex items-center gap-2 bg-linear-to-r from-orange-500 to-purple-600 text-white px-6 py-3 rounded-2xl hover:from-orange-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
                            >
                                <Plus size={20} />
                                Novo Conjunto de Armários
                            </button>
                        )}
                    </div>
                )}
            </div>

            {showForm && (
                <Suspense fallback={<ConjuntoFormSkeleton />}>
                    <ConjuntoForm
                        onClose={() => setShowForm(false)}
                        onSubmit={handleCreateConjunto}
                    />
                </Suspense >
            )}
        </div >
    );
}
