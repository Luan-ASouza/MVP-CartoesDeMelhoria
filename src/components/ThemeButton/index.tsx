import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon } from 'lucide-react'

export const ThemeButton = () => {
    const { isDark, toggleTheme } = useTheme();
    return (
        <button
            onClick={toggleTheme}
            className="flex shadow-lg hover:shadow-3xl items-center justify-between w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
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
    )
}

export default ThemeButton;