export interface Usuario {
  matricula: string;
  nome: string;
  foto: string;
  setor: string;
  cargo: 'Líder' | 'Secretário' | 'Integrante' | 'Orientador';
  grupo: string;
}

// Mock de usuários
const usuarios: { [matricula: string]: { senha: string; dados: Usuario } } = {
  '2024001': {
    senha: '123456',
    dados: {
      matricula: '2024001',
      nome: 'Ana Silva',
      foto: 'https://images.unsplash.com/photo-1649589244330-09ca58e4fa64?w=200&h=200&fit=crop',
      setor: 'Desenvolvimento',
      cargo: 'Líder',
      grupo: 'Desenvolvedores Frontend'
    }
  },
  '2024002': {
    senha: '123456',
    dados: {
      matricula: '2024002',
      nome: 'Carlos Souza',
      foto: 'https://images.unsplash.com/photo-1672685667592-0392f458f46f?w=200&h=200&fit=crop',
      setor: 'Desenvolvimento',
      cargo: 'Integrante',
      grupo: 'Desenvolvedores Frontend'
    }
  },
  '2024003': {
    senha: '123456',
    dados: {
      matricula: '2024003',
      nome: 'Mariana Costa',
      foto: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop',
      setor: 'Design',
      cargo: 'Secretário',
      grupo: 'Desenvolvedores Frontend'
    }
  },
  '2024004': {
    senha: '123456',
    dados: {
      matricula: '2024004',
      nome: 'Pedro Santos',
      foto: 'https://images.unsplash.com/photo-1524538198441-241ff79d153b?w=200&h=200&fit=crop',
      setor: 'Infraestrutura',
      cargo: 'Orientador',
      grupo: 'Desenvolvedores Frontend'
    }
  }
};

export function autenticar(matricula: string, senha: string): Usuario | null {
  const usuario = usuarios[matricula];
  if (usuario && usuario.senha === senha) {
    return usuario.dados;
  }
  return null;
}

export function getUsuarioLogado(): Usuario | null {
  const usuarioStr = localStorage.getItem('usuario');
  if (usuarioStr) {
    return JSON.parse(usuarioStr);
  }
  return null;
}

export function salvarUsuario(usuario: Usuario): void {
  localStorage.setItem('usuario', JSON.stringify(usuario));
}

export function logout(): void {
  localStorage.removeItem('usuario');
}
