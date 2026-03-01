import { Home, NotebookPen, Grid3x2, Tags, LogOut, Moon, Sun } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { useTheme } from '../../context/ThemeContext';
import { useUser } from '../../context/UserContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { Loggeduser } = useUser();
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();

  const menuItems = [
    { path: '/', label: 'Início', icon: Home },
    { path: '/cartoes', label: 'Cartões', icon: NotebookPen },
    { path: '/armarios', label: 'Armários', icon: Grid3x2 },
    { path: '/etiquetas', label: 'Etiquetas', icon: Tags },
  ];

  const handleLogout = () => {
    console.log('Desconectando...');
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-80 bg-white dark:bg-gray-900 shadow-2xl z-50 transform transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div className="flex flex-col h-full">
          {/* User Profile */}
          <div className="bg-linear-to-br from-orange-500 via-purple-500 to-pink-500 p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10 flex flex-col items-center">
              <img
                src={Loggeduser.userPhoto}
                alt={Loggeduser.userName}
                className="w-24 h-24 rounded-full object-cover ring-4 ring-white/30 mb-3"
              />
              <h3 className="text-white text-lg font-nunito-bold">{Loggeduser.userName}</h3>
              <p className="text-white/80 text-sm">Desenvolvedora Frontend</p>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;

                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={onClose}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                        ? 'bg-linear-to-r from-orange-500 to-purple-600 text-white shadow-lg'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                    >
                      <Icon size={20} />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 w-full transition-all"
              >
                <LogOut size={20} />
                <span className="font-medium">Desconectar</span>
              </button>
            </div>
          </nav>

          {/* Theme Toggle */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={toggleTheme}
              className="flex items-center justify-between w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
            >
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                {isDark ? 'Tema Escuro' : 'Tema Claro'}
              </span>
              <div className="flex items-center gap-2">
                {isDark ? (
                  <Moon size={20} className="text-purple-500" />
                ) : (
                  <Sun size={20} className="text-orange-500" />
                )}
              </div>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
