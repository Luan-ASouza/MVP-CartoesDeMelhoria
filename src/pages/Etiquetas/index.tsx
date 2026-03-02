import { Hammer } from "lucide-react";

export function Etiquetas() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-b 
      from-orange-50 via-purple-50 to-pink-50
      dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-6">

      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-10 max-w-md w-full text-center">

        <div className="flex justify-center mb-6">
          <div className="p-5 rounded-2xl bg-purple-100 dark:bg-purple-900/30">
            <Hammer 
              size={48} 
              className="text-purple-600 dark:text-purple-400" 
            />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">
          Página em Construção
        </h1>

        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
          Estamos trabalhando para trazer a funcionalidade de etiquetas o mais
          rápido possível. 🚧  
          Em breve você poderá organizar seus cartões de forma ainda melhor!
        </p>

      </div>
    </div>
  );
}

export default Etiquetas;