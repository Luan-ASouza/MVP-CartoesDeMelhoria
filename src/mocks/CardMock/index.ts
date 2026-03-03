export interface CardData {
    id: number;
    date: string;
    description: string;
    type: string;
    memberName: string;
    memberPhoto: string;
}

export const CardsMock: CardData[] = [
    { id: 1, date: '28 Fev 2026', description: 'Finalizei a implementação do novo sistema de autenticação com OAuth2.', type: 'Desenvolvimento', memberName: 'Ana Silva', memberPhoto: 'https://images.unsplash.com/photo-1649589244330-09ca58e4fa64?w=100&h=100&fit=crop' },
    { id: 2, date: '27 Fev 2026', description: 'Realizei a revisão de código dos componentes de UI.', type: 'Code Review', memberName: 'Carlos Souza', memberPhoto: 'https://images.unsplash.com/photo-1672685667592-0392f458f46f?w=100&h=100&fit=crop' },
    { id: 3, date: '25 Fev 2026', description: 'Documentação completa da API REST foi atualizada.', type: 'Documentação', memberName: 'Mariana Costa', memberPhoto: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop' },
    { id: 4, date: '20 Fev 2026', description: 'Corrigi bugs críticos relatados pelos usuários.', type: 'Bug Fix', memberName: 'Pedro Santos', memberPhoto: 'https://images.unsplash.com/photo-1524538198441-241ff79d153b?w=100&h=100&fit=crop' },
    { id: 5, date: '15 Jan 2026', description: 'Implementei novo componente de tabela responsiva.', type: 'Desenvolvimento', memberName: 'Ana Silva', memberPhoto: 'https://images.unsplash.com/photo-1649589244330-09ca58e4fa64?w=100&h=100&fit=crop' },
    { id: 6, date: '10 Jan 2026', description: 'Revisei PRs da sprint anterior.', type: 'Code Review', memberName: 'Carlos Souza', memberPhoto: 'https://images.unsplash.com/photo-1672685667592-0392f458f46f?w=100&h=100&fit=crop' },
    { id: 7, date: '05 Jan 2026', description: 'Criei documentação de onboarding.', type: 'Documentação', memberName: 'Mariana Costa', memberPhoto: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop' },
    { id: 8, date: '20 Dez 2025', description: 'Ajustei responsividade da dashboard.', type: 'Bug Fix', memberName: 'Pedro Santos', memberPhoto: 'https://images.unsplash.com/photo-1524538198441-241ff79d153b?w=100&h=100&fit=crop' },
];