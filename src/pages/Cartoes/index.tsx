import { useState, useMemo, lazy, Suspense } from 'react';
import { Card } from '../../components/Card';
import { Plus } from 'lucide-react';
import { FilterDropdown } from '../../components/FilterDropdown';
import { SearchBar } from '../../components/SearchBar';
import { useUser } from '../../context/UserContext';
import { type CardData, CardsMock } from '../../mocks/CardMock';
import CardFormSkeleton from '../../components/CardForm/CardFormSkeleton';
import { Dashboards } from '../../components/Dashboards';

const CardForm = lazy(() => import('../../components/CardForm/CardForm'));

export const Cartoes = () => {
    const { Loggeduser } = useUser();

    const [cards, setCards] = useState<CardData[]>(CardsMock);
    const [showForm, setShowForm] = useState(false);
    const [editingCardId, setEditingCardId] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTypeFilters, setSelectedTypeFilters] = useState<string[]>(['Todos']);

    const types = [
        'Desenvolvimento',
        'Code Review',
        'Documentação',
        'Bug Fix',
        'Design',
        'Reunião',
        'Planejamento'
    ];

    const META_ANO = 90;
    const META_MES = 8;

    // 🔹 Parsear data brasileira
    const parseDate = (brDate: string): Date => {
        const monthMap: { [key: string]: number } = {
            'jan': 0, 'fev': 1, 'mar': 2, 'abr': 3, 'mai': 4, 'jun': 5,
            'jul': 6, 'ago': 7, 'set': 8, 'out': 9, 'nov': 10, 'dez': 11
        };

        const parts = brDate.split(' ');
        const day = parseInt(parts[0]);
        const month = monthMap[parts[1]?.toLowerCase()];
        const year = parseInt(parts[2]);

        return new Date(year, month, day);
    };

    // 🔹 Dados gráfico últimos 6 meses
    const monthlyData = useMemo(() => {
        const last6Months = [];
        const now = new Date();

        for (let i = 5; i >= 0; i--) {
            const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const monthName = date.toLocaleDateString('pt-BR', { month: 'short' });

            const count = cards.filter(card => {
                const cardDate = parseDate(card.date);
                return (
                    cardDate.getMonth() === date.getMonth() &&
                    cardDate.getFullYear() === date.getFullYear()
                );
            }).length;

            last6Months.push({ mes: monthName, quantidade: count });
        }

        return last6Months;
    }, [cards]);

    // 🔹 Dados gráfico tipos
    const typeData = useMemo(() => {
        const typeCounts: { [key: string]: number } = {};

        cards.forEach(card => {
            typeCounts[card.type] = (typeCounts[card.type] || 0) + 1;
        });

        return Object.entries(typeCounts).map(([name, value]) => ({
            name,
            value
        }));
    }, [cards]);

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();

    const totalCardsYear = cards.filter(card =>
        parseDate(card.date).getFullYear() === currentYear
    ).length;

    const totalCardsMonth = cards.filter(card => {
        const cardDate = parseDate(card.date);
        return (
            cardDate.getFullYear() === currentYear &&
            cardDate.getMonth() === currentMonth
        );
    }).length;

    // 🔹 Filtros
    const filteredCards = cards.filter(card => {
        const matchesSearch =
            searchQuery === '' ||
            card.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            card.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
            card.memberName.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesType =
            selectedTypeFilters.includes('Todos') ||
            selectedTypeFilters.includes(card.type);

        return matchesSearch && matchesType;
    });

    // 🔹 Agrupar por mês
    const cardsByMonth = useMemo(() => {
        const grouped: { [key: string]: CardData[] } = {};

        filteredCards.forEach(card => {
            const date = parseDate(card.date);
            const key = date.toLocaleDateString('pt-BR', {
                month: 'long',
                year: 'numeric'
            });

            if (!grouped[key]) grouped[key] = [];
            grouped[key].push(card);
        });

        return Object.entries(grouped).sort((a, b) => {
            const dateA = parseDate(a[1][0].date);
            const dateB = parseDate(b[1][0].date);
            return dateB.getTime() - dateA.getTime();
        });
    }, [filteredCards]);

    // 🔹 CRUD
    const addNewCard = (formData: { type: string; description: string; date: string }) => {
        const newId = Math.max(...cards.map(c => c.id), 0) + 1;

        const dateObj = new Date(formData.date + 'T00:00:00');
        const formattedDate = dateObj.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });

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

        const dateObj = new Date(formData.date + 'T00:00:00');
        const formattedDate = dateObj.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });

        setCards(cards.map(card =>
            card.id === editingCardId
                ? { ...card, type: formData.type, description: formData.description, date: formattedDate }
                : card
        ));

        setShowForm(false);
        setEditingCardId(null);
    };

    const handleFormSubmit = (formData: { type: string; description: string; date: string }) => {
        editingCardId ? updateCard(formData) : addNewCard(formData);
    };

    const handleFormClose = () => {
        setShowForm(false);
        setEditingCardId(null);
    };

    const removeCard = (id: number) =>
        setCards(cards.filter(card => card.id !== id));

    const editCard = (id: number) => {
        const card = cards.find(c => c.id === id);
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
        <div className="min-h-screen bg-linear-to-b from-orange-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">

            <SearchBar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
            />

            <div className="px-6 py-8 -mt-6">
                <div className="max-w-7xl mx-auto">

                    {/* Título */}
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl text-gray-800 dark:text-white font-nunito-bold">
                            Cartões de melhoria
                        </h2>

                        <button
                            onClick={() => setShowForm(true)}
                            className="flex items-center gap-2 bg-linear-to-r from-orange-500 to-purple-600 text-white px-5 py-3 rounded-2xl shadow-lg"
                        >
                            <Plus size={20} />
                            <span className="text-sm">Novo Cartão</span>
                        </button>
                    </div>

                    {/* Dashboard */}
                    <Dashboards
                        monthlyData={monthlyData}
                        typeData={typeData}
                        totalCardsYear={totalCardsYear}
                        totalCardsMonth={totalCardsMonth}
                        metaAno={META_ANO}
                        metaMes={META_MES}
                    />

                    {/* Filtros */}
                    <FilterDropdown
                        onFilter={handleTypeFilterToggle}
                        types={types}
                        selectedTypeFilters={selectedTypeFilters}
                    />

                    {/* Cards por mês */}
                    {cardsByMonth.map(([monthYear, monthCards]) => (
                        <div key={monthYear} className="mb-8">
                            <h3 className="text-xl font-nunito-bold text-gray-800 dark:text-white mb-4 capitalize">
                                {monthYear}
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {monthCards.map((card) => (
                                    <Card
                                        key={card.id}
                                        CardData={card}
                                        currentUserName={Loggeduser.userName}
                                        onRemove={removeCard}
                                        onEdit={editCard}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}

                </div>
            </div>

            {showForm && (
                <Suspense fallback={<CardFormSkeleton />}>
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
                </Suspense>
            )}
        </div>
    );
};

export default Cartoes;