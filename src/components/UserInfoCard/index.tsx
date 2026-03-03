import { Briefcase, User, Users } from 'lucide-react';
import LogoutButton from '../LogoutButton';

interface Usuario {
  nome: string;
  foto: string;
  cargo: string;
  setor: string;
  grupo: string;
}

interface UserInfoCardProps {
  usuario: Usuario;
}

export function UserInfoCard({ usuario }: UserInfoCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-2xl mb-6">
      <div className="flex items-center gap-6 pl-2">
        <img
          src={usuario.foto}
          alt={usuario.nome}
          className="w-24 h-24 rounded-full object-cover ring-4 ring-purple-200 dark:ring-purple-800"
        />

        <div className="flex-1">
          <h3 className="text-2xl font-nunito-extrabold text-gray-800 dark:text-white mb-2">
            {usuario.nome}
          </h3>

          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 bg-purple-50 dark:bg-purple-900/20 px-3 py-1 rounded-full">
              <Briefcase size={16} className="text-purple-600 dark:text-purple-400" />
              <span className="text-sm text-purple-600 dark:text-purple-400 font-medium">
                {usuario.cargo}
              </span>
            </div>

            <div className="flex items-center gap-2 bg-orange-50 dark:bg-orange-900/20 px-3 py-1 rounded-full">
              <User size={16} className="text-orange-600 dark:text-orange-400" />
              <span className="text-sm text-orange-600 dark:text-orange-400 font-medium">
                {usuario.setor}
              </span>
            </div>

            <div className="flex items-center gap-2 bg-pink-50 dark:bg-pink-900/20 px-3 py-1 rounded-full">
              <Users size={16} className="text-pink-600 dark:text-pink-400" />
              <span className="text-sm text-pink-600 dark:text-pink-400 font-medium">
                {usuario.grupo}
              </span>
            </div>
          </div>
        </div>
      </div>
        <div className='pt-2'>
          <LogoutButton />
        </div>
    </div>
  );
}