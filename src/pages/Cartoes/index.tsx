import { useState } from 'react';
import { Card } from '../../components/Card';
import { CardForm } from '../../components/CardForm';
import { Plus } from 'lucide-react';
import { FilterDropdown } from '../../components/FilterDropdown'
import { SearchBar } from '../../components/SearchBar';
import { useUser } from '../../context/UserContext';
import { type CardData, CardsMock } from '../../mocks/CardMock';


export const Cartoes = () => {
    const { Loggeduser } = useUser();

    // Usuário logado


    const [cards, setCards] = useState<CardData[]>(CardsMock);

    const [showForm, setShowForm] = useState(false);
    const [editingCardId, setEditingCardId] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTypeFilters, setSelectedTypeFilters] = useState<string[]>(['Todos']);


    const types = ['Desenvolvimento', 'Code Review', 'Documentação', 'Bug Fix', 'Design', 'Reunião', 'Planejamento'];

    // Calcular totais
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();

    const totalCardsYear = cards.filter(card => {
        const cardDate = new Date(card.date);
        return cardDate.getFullYear() === currentYear;
    }).length;

    const totalCardsMonth = cards.filter(card => {
        const cardDate = new Date(card.date);
        return cardDate.getFullYear() === currentYear && cardDate.getMonth() === currentMonth;
    }).length;

    const addNewCard = (formData: { type: string; description: string; date: string }) => {
        const newId = Math.max(...cards.map(c => c.id), 0) + 1;

        // Formatar data para o padrão brasileiro
        const dateObj = new Date(formData.date + 'T00:00:00');
        const formattedDate = dateObj.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });

        const newCard: CardData = {
            id: newId,
            date: formattedDate,
            description: formData.description,
            type: formData.type,
            memberName: Loggeduser.userName,
            memberPhoto: Loggeduser.userPhoto
        };

        setCards([newCard, ...cards]);
        setShowForm(false);
    };

    const updateCard = (formData: { type: string; description: string; date: string }) => {
        if (!editingCardId) return;

        // Formatar data para o padrão brasileiro
        const dateObj = new Date(formData.date + 'T00:00:00');
        const formattedDate = dateObj.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });

        setCards(cards.map(card =>
            card.id === editingCardId
                ? {
                    ...card,
                    type: formData.type,
                    description: formData.description,
                    date: formattedDate
                }
                : card
        ));

        setShowForm(false);
        setEditingCardId(null);
    };

    const handleFormSubmit = (formData: { type: string; description: string; date: string }) => {
        if (editingCardId) {
            updateCard(formData);
        } else {
            addNewCard(formData);
        }
    };

    const handleFormClose = () => {
        setShowForm(false);
        setEditingCardId(null);
    };

    const removeCard = (id: number) => {
        setCards(cards.filter(card => card.id !== id));
    };

    const editCard = (id: number) => {
        const card = cards.find(c => c.id === id);
        // Só permite editar se for do usuário logado
        if (card && card.memberName === Loggeduser.userName) {
            setEditingCardId(id);
            setShowForm(true);
        }
    };

    const handleTypeFilterToggle = (type: string) => {
        if (type === 'Todos') {
            setSelectedTypeFilters(['Todos']);
        } else {
            const newFilters = selectedTypeFilters.includes('Todos')
                ? [type]
                : selectedTypeFilters.includes(type)
                    ? selectedTypeFilters.filter(t => t !== type)
                    : [...selectedTypeFilters, type];

            setSelectedTypeFilters(newFilters.length === 0 ? ['Todos'] : newFilters);
        }
    };

    // Filtrar cartões
    const filteredCards = cards.filter(card => {
        // Filtro de pesquisa
        const matchesSearch = searchQuery === '' ||
            card.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            card.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
            card.memberName.toLowerCase().includes(searchQuery.toLowerCase());

        // Filtro de tipo
        const matchesType = selectedTypeFilters.includes('Todos') || selectedTypeFilters.includes(card.type);

        return matchesSearch && matchesType;
    });

    // Converter data do formato brasileiro (DD MMM YYYY) para YYYY-MM-DD
    const convertBrDateToISO = (brDate: string): string => {
        const monthMap: { [key: string]: string } = {
            'jan': '01', 'fev': '02', 'mar': '03', 'abr': '04',
            'mai': '05', 'jun': '06', 'jul': '07', 'ago': '08',
            'set': '09', 'out': '10', 'nov': '11', 'dez': '12'
        };

        const parts = brDate.split(' ');
        if (parts.length !== 3) return new Date().toISOString().split('T')[0];

        const day = parts[0].padStart(2, '0');
        const month = monthMap[parts[1].toLowerCase()] || '01';
        const year = parts[2];

        return `${year}-${month}-${day}`;
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-orange-50 via-purple-50 to-pink-50">


            <SearchBar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
            />

            <div className="px-6 py-8 -mt-6">
                <div className="max-w-7xl mx-auto">
                    {/* Estatísticas */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="bg-linear-to-br from-orange-400 to-orange-600 rounded-3xl p-6 shadow-lg text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                            <div className="relative z-10">
                                <p className="text-white/90 text-sm mb-2">Total do Ano</p>
                                <p className="text-4xl mb-1 font-nunito-extrabold">
                                    {totalCardsYear}
                                </p>
                                <p className="text-white/70 text-xs">cartões</p>
                            </div>
                        </div>

                        <div className="bg-linear-to-br from-purple-400 to-purple-600 rounded-3xl p-6 shadow-lg text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                            <div className="relative z-10">
                                <p className="text-white/90 text-sm mb-2">Total do Mês</p>
                                <p className="text-4xl mb-1 font-nunito-extrabold">
                                    {totalCardsMonth}
                                </p>
                                <p className="text-white/70 text-xs">cartões</p>
                            </div>
                        </div>
                    </div>

                    {/* Título e botão */}
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl text-gray-800 font-nunito-bold">
                            Cartões de melhoria
                        </h2>

                        <button
                            onClick={() => setShowForm(true)}
                            className="flex items-center gap-2 bg-linear-to-r from-orange-500 to-purple-600 text-white px-5 py-3 rounded-2xl hover:from-orange-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                            <Plus size={20} />
                            <span className="text-sm">Novo Cartão</span>
                        </button>
                    </div>

                    {/* Filtros de tipo */}
                    <FilterDropdown
                        onFilter={handleTypeFilterToggle}
                        types={types}
                        selectedTypeFilters={selectedTypeFilters}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredCards.map((card) => (
                            <Card
                                key={card.id}
                                CardData={card}
                                currentUserName={Loggeduser.userName}
                                onRemove={removeCard}
                                onEdit={editCard}
                            />
                        ))}
                    </div>

                    {filteredCards.length === 0 && (
                        <div className="text-center py-20 bg-white rounded-3xl shadow-lg">
                            <div className="text-6xl mb-4">📋</div>
                            <p className="text-gray-400 text-lg mb-6">Nenhum cartão adicionado ainda</p>
                            <button
                                onClick={() => setShowForm(true)}
                                className="inline-flex items-center gap-2 bg-linear-to-r from-orange-500 to-purple-600 text-white px-6 py-3 rounded-2xl hover:from-orange-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
                            >
                                <Plus size={20} />
                                Novo Cartão
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {showForm && (
                <CardForm
                    onClose={handleFormClose}
                    onSubmit={handleFormSubmit}
                    types={types}
                    isEditing={!!editingCardId}
                    initialData={editingCardId ? {
                        type: cards.find(c => c.id === editingCardId)?.type || '',
                        description: cards.find(c => c.id === editingCardId)?.description || '',
                        date: convertBrDateToISO(cards.find(c => c.id === editingCardId)?.date || '')
                    } : undefined}
                />
            )}
        </div>
    );
}