import { ArrowLeft, Menu } from 'lucide-react';
import logo from '../../assets/Images/logo.svg';

interface HeaderProps {
  groupName: string;
  userName: string;
  userPhoto: string;
  onBack?: () => void;
  onMenuClick?: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function Header({ groupName, userName, userPhoto, onBack, onMenuClick, searchQuery, onSearchChange }: HeaderProps) {
  return (
    <header className="relative bg-linear-to-br from-orange-500 via-purple-500 to-pink-500 overflow-hidden">
      {/* Formas decorativas */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
      
      <div className="relative z-10 px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="p-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-xl transition-colors"
            aria-label="Voltar"
          >
            <ArrowLeft size={24} className="text-white" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-xl px-3 py-1.5">
              <img
                src={userPhoto}
                alt={userName}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-white/30"
              />
              <span className="text-white text-sm font-medium">{userName}</span>
            </div>
            
            <button
              onClick={onMenuClick}
              className="p-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-xl transition-colors"
              aria-label="Menu"
            >
              <Menu size={24} className="text-white" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <img 
            src={logo} 
            alt="Melhoria Continua Logo" 
            className="w-12 h-12 object-contain bg-white/20 backdrop-blur-sm rounded-xl p-2"
          />
          <div>
            <h1 className="text-2xl text-white leading-tight font-nunito font-black">
              Melhoria Continua
            </h1>
            <p className="text-sm text-white/80">{groupName}</p>
          </div>
        </div>

        {/* Barra de busca */}
        <div className="bg-white rounded-2xl px-4 py-3 shadow-lg">
          <input 
            type="text" 
            placeholder="Buscar cartões..." 
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full outline-none text-gray-700 placeholder-gray-400"
          />
        </div>
      </div>

      {/* Ondas na parte inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-8">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full">
          <path d="M0,0 C150,60 350,0 600,40 C850,80 1050,20 1200,60 L1200,120 L0,120 Z" fill="#fef3f0" />
        </svg>
      </div>
    </header>
  );
}