export function CardFormSkeleton() {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 shadow-x2 animate-pulse">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl h-[90vh] overflow-y-auto no-scrollbar shadow-x2 animate-pulse">
        {/* Header */}
        <div className={`bg-linear-to-r from-orange-500 to-purple-600 p-6 rounded-t-3xl relative transition-all duration-300 h-20 shadow-x2 animate-pulse`}>          
        </div>
      </div>
    </div>
  );
}




export default CardFormSkeleton;