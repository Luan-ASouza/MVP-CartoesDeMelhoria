export function ConjuntoFormSkeleton() {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 shadow-x2 animate-pulse">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-2xl w-full h-[90vh] overflow-y-auto shadow-x2 animate-pulse">
        {/* Header */}
        <div className="top-0 bg-linear-to-br from-orange-500 via-purple-500 to-pink-500 p-6 rounded-t-3xl relative overflow-hidden shadow-x2 animate-pulse">
        </div>
      </div>
    </div>
  );
}

export default ConjuntoFormSkeleton;