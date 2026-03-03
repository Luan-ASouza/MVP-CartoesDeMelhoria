import { LogOut } from "lucide-react";
import { logout } from "../../mocks/UsuariosMock";
import { useNavigate } from "react-router-dom";


export const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/')
    }
    return (
        <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 w-full transition-all"
        >
            <LogOut size={20} />
            <span className="font-medium">Desconectar</span>
        </button>
    )
}

export default LogoutButton;