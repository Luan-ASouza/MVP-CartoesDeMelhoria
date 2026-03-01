import logo from '../../assets/Images/logo.svg';

export function Loading() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-linear-to-br from-orange-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <div className="flex flex-col items-center gap-6">
                {/* Animated Logo */}
                <div className="relative">

                    {/* Glow */}
                    <div className="absolute -inset-4 rounded-3xl bg-linear-to-br from-orange-500 via-purple-500 to-pink-500 opacity-20 blur-2xl animate-pulse"></div>

                    {/* Caixa principal */}
                    <div className="relative w-24 h-24 rounded-3xl bg-linear-to-br from-orange-500 via-purple-500 to-pink-500 shadow-2xl flex items-center justify-center">
                        <img
                            src={logo}
                            alt="Logo"
                            className="-inset-4 object-contain rounded-xl p-2"
                        />
                    </div>

                </div>

                {/* Loading Text */}
                <div className="flex flex-col items-center gap-2">
                    <h2 className="text-2xl font-nunito-extrabold text-gray-800 dark:text-white">
                        Melhoria Continua
                    </h2>
                    <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-orange-500 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 rounded-full bg-pink-500 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
