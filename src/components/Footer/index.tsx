export const Footer = () => {
    return (
        <footer className="bg-gray-950 text-gray-300 py-6">
            <div className="max-w-6xl mx-auto px-6 text-center">
                <p className="text-sm">
                    © {new Date().getFullYear()} Luan Augusto de Souza. Todos os direitos reservados.
                </p>

                <p className="text-xs text-gray-500 mt-2">
                    Desenvolvido com dedicação e foco em melhoria contínua 🚀
                </p>
            </div>
        </footer>
    )
}