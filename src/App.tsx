import { useState } from 'react';
import { Card } from './Components/Cards/Card';
import { Header } from './Components/Header/Header.tsx';
import { Plus } from 'lucide-react';

interface CardData {
  id: number;
  date: string;
  description: string;
  type: string;
  memberName: string;
  memberPhoto: string;
}

export default function App() {
  const [cards, setCards] = useState<CardData[]>([
    {
      id: 1,
      date: '23 Fev 2026',
      description: 'Finalizei a implementação do novo sistema de autenticação com OAuth2. Todos os testes foram realizados com sucesso.',
      type: 'Desenvolvimento',
      memberName: 'Ana Silva',
      memberPhoto: 'https://images.unsplash.com/photo-1649589244330-09ca58e4fa64?w=100&h=100&fit=crop'
    },
    {
      id: 2,
      date: '22 Fev 2026',
      description: 'Realizei a revisão de código dos componentes de UI. Encontrei algumas melhorias de performance que foram aplicadas.',
      type: 'Code Review',
      memberName: 'Carlos Souza',
      memberPhoto: 'https://images.unsplash.com/photo-1672685667592-0392f458f46f?w=100&h=100&fit=crop'
    },
    {
      id: 3,
      date: '21 Fev 2026',
      description: 'Documentação completa da API REST foi atualizada. Incluí exemplos práticos e melhores práticas de uso.',
      type: 'Documentação',
      memberName: 'Mariana Costa',
      memberPhoto: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop'
    },
    {
      id: 4,
      date: '20 Fev 2026',
      description: 'Corrigi bugs críticos relatados pelos usuários. Sistema está mais estável e responsivo agora.',
      type: 'Bug Fix',
      memberName: 'Pedro Santos',
      memberPhoto: 'https://images.unsplash.com/photo-1524538198441-241ff79d153b?w=100&h=100&fit=crop'
    }
  ]);

  const memberPhotos = [
    'https://images.unsplash.com/photo-1649589244330-09ca58e4fa64?w=100&h=100&fit=crop',
    'https://images.unsplash.com/photo-1672685667592-0392f458f46f?w=100&h=100&fit=crop',
    'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop',
    'https://images.unsplash.com/photo-1524538198441-241ff79d153b?w=100&h=100&fit=crop'
  ];

  const types = ['Desenvolvimento', 'Code Review', 'Documentação', 'Bug Fix', 'Design', 'Reunião', 'Planejamento'];
  const memberNames = ['Ana Silva', 'Carlos Souza', 'Mariana Costa', 'Pedro Santos', 'Julia Oliveira', 'Ricardo Lima'];

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

  const addNewCard = () => {
    const newId = Math.max(...cards.map(c => c.id)) + 1;
    const randomType = types[Math.floor(Math.random() * types.length)];
    const randomMember = memberNames[Math.floor(Math.random() * memberNames.length)];
    const randomPhoto = memberPhotos[Math.floor(Math.random() * memberPhotos.length)];
    
    const newCard: CardData = {
      id: newId,
      date: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }),
      description: `Nova tarefa adicionada ao projeto. Aguardando revisão e aprovação dos demais membros do time.`,
      type: randomType,
      memberName: randomMember,
      memberPhoto: randomPhoto
    };

    setCards([...cards, newCard]);
  };

  const removeCard = (id: number) => {
    setCards(cards.filter(card => card.id !== id));
  };

  const editCard = (id: number) => {
    console.log('Editar card:', id);
    // Aqui você pode adicionar lógica para abrir um modal de edição
  };

  const handleBack = () => {
    console.log('Voltar clicado');
  };

  const handleMenuClick = () => {
    console.log('Menu clicado');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-purple-50 to-pink-50">
      <Header 
        groupName="Desenvolvedores Frontend"
        onBack={handleBack}
        onMenuClick={handleMenuClick}
      />
      
      <div className="px-6 py-8 -mt-6">
        <div className="max-w-7xl mx-auto">
          {/* Estatísticas */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-gradient-to-br from-orange-400 to-orange-600 rounded-3xl p-6 shadow-lg text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="relative z-10">
                <p className="text-white/90 text-sm mb-2">Total do Ano</p>
                <p className="text-4xl mb-1">
                  {totalCardsYear}
                </p>
                <p className="text-white/70 text-xs">cartões</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-400 to-purple-600 rounded-3xl p-6 shadow-lg text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="relative z-10">
                <p className="text-white/90 text-sm mb-2">Total do Mês</p>
                <p className="text-4xl mb-1">
                  {totalCardsMonth}
                </p>
                <p className="text-white/70 text-xs">cartões</p>
              </div>
            </div>
          </div>

          {/* Título e botão */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl text-gray-800" style={{ fontFamily: '"Nunito", sans-serif', fontWeight: 700 }}>
              Cartões de melhoria
            </h2>
            
            <button
              onClick={addNewCard}
              className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-purple-600 text-white px-5 py-3 rounded-2xl hover:from-orange-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Plus size={20} />
              <span className="text-sm">Novo Cartão</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {cards.map((card) => (
              <Card
                key={card.id}
                id={card.id}
                date={card.date}
                description={card.description}
                type={card.type}
                memberName={card.memberName}
                memberPhoto={card.memberPhoto}
                onRemove={removeCard}
                onEdit={editCard}
              />
            ))}
          </div>

          {cards.length === 0 && (
            <div className="text-center py-20 bg-white rounded-3xl shadow-lg">
              <div className="text-6xl mb-4">📋</div>
              <p className="text-gray-400 text-lg mb-6">Nenhum cartão adicionado ainda</p>
              <button
                onClick={addNewCard}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-purple-600 text-white px-6 py-3 rounded-2xl hover:from-orange-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
              >
                <Plus size={20} />
                Novo Cartão
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}