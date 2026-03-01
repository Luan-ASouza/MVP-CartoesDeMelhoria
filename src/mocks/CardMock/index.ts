export interface CardData {
    id: number;
    date: string;
    description: string;
    type: string;
    memberName: string;
    memberPhoto: string;
}

export const CardsMock:CardData[] = [
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
    ];