export interface Armario {
  id: string;
  nome: string;
  dono?: string;
  matricula?: string;
  turno?: 'Diurno' | 'Noturno';
  ultimaAtualizacao?: string;
  ocupado: boolean;
}

export interface ConjuntoArmarios {
  id: string;
  nome: string;
  prefixo: string;
  quantidade: number;
  setor: string;
  armarios: Armario[];
}

// Mock inicial de conjuntos de armários
export const conjuntosArmariosData: ConjuntoArmarios[] = [
  {
    id: '1',
    nome: 'Armários Ala A',
    prefixo: 'A',
    quantidade: 30,
    setor: 'Desenvolvimento',
    armarios: [
      {
        id: 'a1',
        nome: 'A-1',
        dono: 'Ana Silva',
        matricula: '2024001',
        turno: 'Diurno',
        ultimaAtualizacao: '2026-02-28',
        ocupado: true
      },
      {
        id: 'a2',
        nome: 'A-2',
        dono: 'Carlos Souza',
        matricula: '2024002',
        turno: 'Diurno',
        ultimaAtualizacao: '2026-02-25',
        ocupado: true
      },
      {
        id: 'a3',
        nome: 'A-3',
        ocupado: false
      },
      {
        id: 'a4',
        nome: 'A-4',
        dono: 'Mariana Costa',
        matricula: '2024003',
        turno: 'Noturno',
        ultimaAtualizacao: '2026-02-27',
        ocupado: true
      },
      {
        id: 'a5',
        nome: 'A-5',
        ocupado: false
      },
      {
        id: 'a6',
        nome: 'A-6',
        dono: 'Pedro Santos',
        matricula: '2024004',
        turno: 'Diurno',
        ultimaAtualizacao: '2026-02-26',
        ocupado: true
      },
      {
        id: 'a7',
        nome: 'A-7',
        ocupado: false
      },
      {
        id: 'a8',
        nome: 'A-8',
        dono: 'Julia Oliveira',
        matricula: '2024005',
        turno: 'Noturno',
        ultimaAtualizacao: '2026-02-24',
        ocupado: true
      },
      {
        id: 'a9',
        nome: 'A-9',
        ocupado: false
      },
      {
        id: 'a10',
        nome: 'A-10',
        dono: 'Roberto Lima',
        matricula: '2024006',
        turno: 'Diurno',
        ultimaAtualizacao: '2026-02-23',
        ocupado: true
      },
    ]
  },
  {
    id: '2',
    nome: 'Armários Ala B',
    prefixo: 'B',
    quantidade: 25,
    setor: 'Design',
    armarios: [
      {
        id: 'b1',
        nome: 'B-1',
        dono: 'Fernanda Alves',
        matricula: '2024010',
        turno: 'Diurno',
        ultimaAtualizacao: '2026-02-28',
        ocupado: true
      },
      {
        id: 'b2',
        nome: 'B-2',
        ocupado: false
      },
      {
        id: 'b3',
        nome: 'B-3',
        dono: 'Lucas Martins',
        matricula: '2024011',
        turno: 'Noturno',
        ultimaAtualizacao: '2026-02-27',
        ocupado: true
      },
      {
        id: 'b4',
        nome: 'B-4',
        ocupado: false
      },
      {
        id: 'b5',
        nome: 'B-5',
        dono: 'Beatriz Rocha',
        matricula: '2024012',
        turno: 'Diurno',
        ultimaAtualizacao: '2026-02-26',
        ocupado: true
      },
    ]
  },
  {
    id: '3',
    nome: 'Armários Ala C',
    prefixo: 'C',
    quantidade: 40,
    setor: 'Infraestrutura',
    armarios: [
      {
        id: 'c1',
        nome: 'C-1',
        dono: 'Rafael Mendes',
        matricula: '2024020',
        turno: 'Diurno',
        ultimaAtualizacao: '2026-02-28',
        ocupado: true
      },
      {
        id: 'c2',
        nome: 'C-2',
        dono: 'Amanda Ferreira',
        matricula: '2024021',
        turno: 'Noturno',
        ultimaAtualizacao: '2026-02-27',
        ocupado: true
      },
      {
        id: 'c3',
        nome: 'C-3',
        ocupado: false
      },
      {
        id: 'c4',
        nome: 'C-4',
        ocupado: false
      },
      {
        id: 'c5',
        nome: 'C-5',
        dono: 'Gabriel Costa',
        matricula: '2024022',
        turno: 'Diurno',
        ultimaAtualizacao: '2026-02-25',
        ocupado: true
      },
    ]
  }
];

let conjuntos = [...conjuntosArmariosData];

export function getConjuntos(): ConjuntoArmarios[] {
  return conjuntos;
}

export function getConjuntoById(id: string): ConjuntoArmarios | undefined {
  return conjuntos.find(c => c.id === id);
}

export function addConjunto(conjunto: Omit<ConjuntoArmarios, 'id' | 'armarios'>): ConjuntoArmarios {
  const newId = (Math.max(...conjuntos.map(c => parseInt(c.id)), 0) + 1).toString();
  
  // Criar armários vazios baseado na quantidade e prefixo
  const armarios: Armario[] = [];
  for (let i = 1; i <= conjunto.quantidade; i++) {
    armarios.push({
      id: `${conjunto.prefixo.toLowerCase()}${i}`,
      nome: `${conjunto.prefixo}-${i}`,
      ocupado: false
    });
  }

  const novoConjunto: ConjuntoArmarios = {
    id: newId,
    ...conjunto,
    armarios
  };

  conjuntos.push(novoConjunto);
  return novoConjunto;
}

export function updateArmario(
  conjuntoId: string,
  armarioId: string,
  data: Partial<Omit<Armario, 'id' | 'nome'>>
): void {
  const conjunto = conjuntos.find(c => c.id === conjuntoId);
  if (!conjunto) return;

  const armarioIndex = conjunto.armarios.findIndex(a => a.id === armarioId);
  if (armarioIndex === -1) return;

  conjunto.armarios[armarioIndex] = {
    ...conjunto.armarios[armarioIndex],
    ...data
  };
}

export function esvaziarArmario(conjuntoId: string, armarioId: string): void {
  const conjunto = conjuntos.find(c => c.id === conjuntoId);
  if (!conjunto) return;

  const armarioIndex = conjunto.armarios.findIndex(a => a.id === armarioId);
  if (armarioIndex === -1) return;

  conjunto.armarios[armarioIndex] = {
    id: conjunto.armarios[armarioIndex].id,
    nome: conjunto.armarios[armarioIndex].nome,
    ocupado: false
  };
}
