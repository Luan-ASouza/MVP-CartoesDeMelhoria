interface SearchBarProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
}

export const SearchBar = ({ searchQuery, onSearchChange }: SearchBarProps) => {
    return (
        <>
            {/* Barra de busca */}
            <div className="bg-white rounded-2xl px-4 mx-6 mb-6 py-3 shadow-lg">
                <input
                    type="text"
                    placeholder="Buscar cartões..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full outline-none text-gray-700 placeholder-gray-400"
                />
            </div>
        </>
    )
}