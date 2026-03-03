import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface DashboardsProps {
  monthlyData: Array<{ mes: string; quantidade: number }>;
  typeData: Array<{ name: string; value: number }>;
  totalCardsYear: number;
  totalCardsMonth: number;
  metaAno: number;
  metaMes: number;
}

const COLORS = ['#f97316', '#a855f7', '#ec4899', '#10b981', '#3b82f6', '#f59e0b', '#6366f1'];

export function Dashboards({ 
  monthlyData, 
  typeData, 
  totalCardsYear, 
  totalCardsMonth,
  metaAno,
  metaMes
}: DashboardsProps) {
  const progressYear = Math.min((totalCardsYear / metaAno) * 100, 100);
  const progressMonth = Math.min((totalCardsMonth / metaMes) * 100, 100);

  return (
    <>
      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Gráfico de Colunas - Últimos Meses */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg">
          <h3 className="text-lg font-nunito-bold text-gray-800 dark:text-white mb-4">
            Cartões por Mês
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="mes" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  border: 'none', 
                  borderRadius: '12px',
                  color: '#fff'
                }} 
              />
              <Bar dataKey="quantidade" fill="url(#colorGradient)" radius={[8, 8, 0, 0]} />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f97316" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico de Rosca - Tipos */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg">
          <h3 className="text-lg font-nunito-bold text-gray-800 dark:text-white mb-4">
            Distribuição por Tipo
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={typeData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {typeData.map((_entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  border: 'none', 
                  borderRadius: '12px',
                  color: '#fff'
                }} 
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Metas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Meta do Ano */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-nunito-bold text-gray-800 dark:text-white">
              Meta do Ano
            </h3>
            <span className="text-2xl font-nunito-extrabold text-orange-600 dark:text-orange-400">
              {totalCardsYear}/{metaAno}
            </span>
          </div>
          <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-linear-to-r from-orange-500 to-orange-600 transition-all duration-500 rounded-full"
              style={{ width: `${progressYear}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            {progressYear.toFixed(0)}% concluído
          </p>
        </div>

        {/* Meta do Mês */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-nunito-bold text-gray-800 dark:text-white">
              Meta do Mês
            </h3>
            <span className="text-2xl font-nunito-extrabold text-purple-600 dark:text-purple-400">
              {totalCardsMonth}/{metaMes}
            </span>
          </div>
          <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-linear-to-r from-purple-500 to-purple-600 transition-all duration-500 rounded-full"
              style={{ width: `${progressMonth}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            {progressMonth.toFixed(0)}% concluído
          </p>
        </div>
      </div>
    </>
  );
}