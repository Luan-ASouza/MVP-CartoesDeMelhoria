import { useState } from 'react';
import { useNavigate } from 'react-router';
import { LogIn } from 'lucide-react';
import { autenticar, salvarUsuario } from '../../mocks/UsuariosMock';

export default function LoginPage() {
  const [matricula, setMatricula] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    setLoading(true);

    setTimeout(() => {
      const usuario = autenticar(matricula, senha);

      if (usuario) {
        salvarUsuario(usuario);
        navigate('/');
      } else {
        setErro('Matrícula ou senha incorretos');
      }

      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-block bg-linear-to-br from-orange-500 via-purple-500 to-pink-500 rounded-3xl p-6 mb-6 shadow-2xl">
            <h1 className="text-5xl text-white font-nunito-black">S</h1>
          </div>
          <h2 className="text-3xl font-nunito-extrabold text-gray-800 dark:text-white mb-2">
            SUMAM
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Sistema Unificado de Melhorias e Aprimoramentos
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8">
          <h3 className="text-xl font-nunito-bold text-gray-800 dark:text-white mb-6 text-center">
            Entrar no Sistema
          </h3>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Matrícula */}
            <div>
              <label htmlFor="matricula" className="block text-gray-700 dark:text-gray-300 mb-2 font-nunito-bold text-sm">
                Matrícula
              </label>
              <input
                type="text"
                id="matricula"
                value={matricula}
                onChange={(e) => setMatricula(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:border-purple-500 focus:outline-none transition-colors"
                placeholder="Digite sua matrícula"
                required
              />
            </div>

            {/* Senha */}
            <div>
              <label htmlFor="senha" className="block text-gray-700 dark:text-gray-300 mb-2 font-nunito-bold text-sm">
                Senha
              </label>
              <input
                type="password"
                id="senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:border-purple-500 focus:outline-none transition-colors"
                placeholder="Digite sua senha"
                required
              />
            </div>

            {/* Erro */}
            {erro && (
              <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-2xl p-3 text-center">
                <p className="text-red-600 dark:text-red-400 text-sm">{erro}</p>
              </div>
            )}

            {/* Botão */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-linear-to-r from-orange-500 to-purple-600 text-white hover:from-orange-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Entrando...</span>
                </>
              ) : (
                <>
                  <LogIn size={20} />
                  <span>Entrar</span>
                </>
              )}
            </button>
          </form>

          {/* Dica */}
          <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-2xl">
            <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
              <strong>Dica:</strong> Use matrícula <code className="bg-white dark:bg-gray-700 px-2 py-1 rounded">2024001</code> e senha <code className="bg-white dark:bg-gray-700 px-2 py-1 rounded">123456</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
