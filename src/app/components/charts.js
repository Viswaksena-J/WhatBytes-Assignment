import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, Tooltip as LineTooltip, ResponsiveContainer as LineResponsiveContainer } from 'recharts';

const pieChartData = [
  { name: 'HTML Tools, Forms, History', value: 80, color: '#4F46E5' },
  { name: 'Tags & References', value: 60, color: '#F59E0B' },
  { name: 'Tables & References in HTML', value: 24, color: '#EF4444' },
  { name: 'Tables & CSS Basics', value: 96, color: '#10B981' },
];

const lineChartData = [
  { x: '0%', y: 5 }, { x: '25%', y: 10 }, { x: '30%', y: 30 },
  { x: '50%', y: 50 }, { x: '75%', y: 40 }, { x: '100%', y: 20 }
];

const Charts = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Section */}
        <div className="lg:col-span-2">
          <h1 className="text-2xl font-bold mb-4">Skill Test - Hyper Text Markup Language</h1>
          <div className="bg-gray-100 p-4 rounded-md mb-6 flex justify-between items-center">
            <p>Questions: 08 | Duration: 15 mins | Submitted on 5 June 2021</p>
            <button className="bg-blue-500 text-white py-2 px-4 rounded-md">Update</button>
          </div>

          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-xl font-semibold mb-4">Quick Statistics</h2>
            <div className="flex justify-between items-center mb-6">
              <div className="text-center">
                <span className="text-3xl font-bold">1</span>
                <p>Your Rank</p>
              </div>
              <div className="text-center">
                <span className="text-3xl font-bold">30%</span>
                <p>Percentile</p>
              </div>
              <div className="text-center">
                <span className="text-3xl font-bold">10/15</span>
                <p>Correct Answers</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 mt-6 rounded-md shadow-md">
            <h2 className="text-xl font-semibold mb-4">Comparison Graph</h2>
            <LineResponsiveContainer width="100%" height={300}>
              <LineChart data={lineChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="x" />
                <YAxis />
                <LineTooltip />
                <Legend />
                <Line type="monotone" dataKey="y" stroke="#8884d8" />
              </LineChart>
            </LineResponsiveContainer>
          </div>
        </div>

        <div>
          <div className="bg-white p-6 rounded-md shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">Syllabus Wise Analysis</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieChartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-xl font-semibold mb-4">Question Analysis</h2>
            <p>You scored 10 out of 15. Some improvement needed.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;
