import { useParams } from "react-router-dom";
import { CardsMock } from "../../mocks/CardMock";

export const ExibirCard = () => {
    const { id } = useParams();
    const CardData = CardsMock.find(card => card.id === Number(id))
    return (
        <>
            <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1 flex flex-col h-full">
                {/* Header colorido com gradiente */}
                <div className={`p-4 relative`}>

                    <div className="flex items-center justify-between">
                        <span className="inline-block px-3 py-1 bg-white/30 backdrop-blur-sm text-white rounded-full text-xs">
                        </span>
                    </div>
                </div>

                <div className="p-5 flex-1 flex flex-col">
                    <p className="text-xs text-gray-500 mb-3 flex items-center gap-1">
                        <span>📅</span> {CardData?.date}
                    </p>

                    <p className="text-gray-700 text-sm leading-relaxed mb-4 flex-1">
                        {CardData && CardData.description?.length > 200
                            ? `${CardData.description.substring(0, 200)}...`
                            : CardData?.description}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                        <div className="flex items-center gap-2">
                            <img
                                src={CardData?.memberPhoto}
                                alt={CardData?.memberName}
                                className="w-9 h-9 rounded-full object-cover ring-2 ring-gray-100"
                            />
                            <span className="text-sm text-gray-600">{CardData?.memberName}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};