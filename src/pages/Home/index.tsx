import { Link } from 'react-router';
import { NotebookPen, BookOpen, Tags, TrendingUp } from 'lucide-react';
import logo from '../../assets/Images/logo.svg';

export default function Home() {
  const menuCards = [
    {
      path: '/cartoes',
      title: 'Cartões de Melhoria',
      description: 'Gerencie e visualize os cartões de melhoria da equipe',
      icon: NotebookPen,
      gradient: 'from-blue-400 to-blue-600',
    },
    {
      path: '/armarios',
      title: 'Armários',
      description: 'Organize e acesse seus armários virtuais',
      icon: BookOpen,
      gradient: 'from-green-400 to-green-600',
    },
    {
      path: '/etiquetas',
      title: 'Etiquetas',
      description: 'Crie e gerencie etiquetas personalizadas',
      icon: Tags,
      gradient: 'from-purple-400 to-purple-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-orange-500 via-purple-500 to-pink-500 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="relative z-10 px-6 py-16 text-center">
          <img 
            src={logo} 
            alt="SUMAM Logo" 
            className="w-24 h-24 mx-auto mb-6 object-contain bg-white/20 backdrop-blur-sm rounded-3xl p-4"
          />
          <h1 className="text-5xl text-white mb-4 font-nunito-black">
            Melhoria Continua
          </h1>
          <p className="text-xl text-white/90 mb-2">Sistema Unificado de Melhorias e Aprimoramentos</p>
          <p className="text-white/70">Desenvolvedores Frontend</p>
        </div>

        {/* Ondas na parte inferior */}
        <div className="absolute bottom-0 left-0 right-0 h-8">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0,0 C150,60 350,0 600,40 C850,80 1050,20 1200,60 L1200,120 L0,120 Z" fill="currentColor" className="text-orange-50 dark:text-gray-900" />
          </svg>
        </div>
      </div>

      {/* Stats Section */}
      <div className="px-6 -mt-6 mb-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center mb-4">
                  <TrendingUp className="text-white" size={24} />
                </div>
                <p className="text-3xl font-nunito-extrabold text-gray-800 dark:text-white mb-1">24</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Melhorias este mês</p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mb-4">
                  <NotebookPen className="text-white" size={24} />
                </div>
                <p className="text-3xl font-nunito-extrabold text-gray-800 dark:text-white mb-1">156</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total de cartões</p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-pink-500/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-600 rounded-2xl flex items-center justify-center mb-4">
                  <BookOpen className="text-white" size={24} />
                </div>
                <p className="text-3xl font-nunito-extrabold text-gray-800 dark:text-white mb-1">8</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Armários ativos</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Cards */}
      <div className="px-6 pb-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-nunito-bold text-gray-800 dark:text-white mb-8 text-center">
            Acesso Rápido
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {menuCards.map((card) => {
              const Icon = card.icon;
              
              return (
                <Link
                  key={card.path}
                  to={card.path}
                  className="group bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${card.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="text-white" size={32} />
                  </div>
                  
                  <h3 className="text-xl font-nunito-bold text-gray-800 dark:text-white mb-3">
                    {card.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {card.description}
                  </p>
                  
                  <div className="mt-6 flex items-center gap-2 text-purple-600 dark:text-purple-400 font-medium text-sm group-hover:gap-3 transition-all">
                    Acessar
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
