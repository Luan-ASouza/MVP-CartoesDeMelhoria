import { Grid3x2 } from "lucide-react";
import { type ConjuntoArmarios } from '../../mocks/ArmariosMock';
import { useNavigate } from 'react-router';

interface ConjuntoArmarioProps {
    conjunto: ConjuntoArmarios;
    index: number;
}

export const ConjuntoArmario = ({ conjunto, index }: ConjuntoArmarioProps) => {
    const navigate = useNavigate();

    
    const getOcupacaoInfo = (conjunto: ConjuntoArmarios) => {
        const ocupados = conjunto.armarios.filter(a => a.ocupado).length;
        const total = conjunto.armarios.length;
        const percentual = Math.round((ocupados / total) * 100);
        return { ocupados, total, percentual };
    };

    const gradientes = [
        'from-blue-400 to-blue-600',
        'from-purple-400 to-purple-600',
        'from-pink-400 to-pink-600',
        'from-green-400 to-green-600',
        'from-orange-400 to-orange-600',
        'from-indigo-400 to-indigo-600',
    ];

    const { ocupados, total, percentual } = getOcupacaoInfo(conjunto);
    const gradient = gradientes[index % gradientes.length];

    return (
        <div
            key={conjunto.id}
            onClick={() => navigate(`/armarios/${conjunto.id}`)}
            className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer overflow-hidden"
        >
            <div className={`bg-linear-to-br ${gradient} p-6 relative`}>
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <div className="relative z-10 flex items-start justify-between">
                    <Grid3x2 className="text-white" size={40} />
                    <div className="bg-white/30 backdrop-blur-sm rounded-full px-3 py-1">
                        <span className="text-white text-xs font-nunito-bold">{conjunto.prefixo}</span>
                    </div>
                </div>
            </div>

            <div className="p-6">
                <h3 className="text-xl font-nunito-bold text-gray-800 dark:text-white mb-2">
                    {conjunto.nome}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    {conjunto.setor}
                </p>

                {/* Progress Bar */}
                <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-2">
                        <span>Ocupação: {percentual}%</span>
                        <span>{ocupados}/{total}</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                            className={`h-full bg-linear-to-r ${gradient} transition-all duration-300`}
                            style={{ width: `${percentual}%` }}
                        ></div>
                    </div>
                </div>

                <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                    <button className="text-purple-600 dark:text-purple-400 text-sm font-medium hover:text-purple-700 dark:hover:text-purple-300 transition-colors">
                        Gerenciar armários →
                    </button>
                </div>
            </div>
        </div>
    )
};

export default ConjuntoArmario;