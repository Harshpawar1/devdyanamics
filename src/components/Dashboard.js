import React, { useEffect, useState } from 'react';
import { fetchData } from '../services/api';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from 'recharts';
import './Dashboard.css';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('');
  const [showBarChart, setShowBarChart] = useState(true);
  const [showLineChart, setShowLineChart] = useState(true);
  const [showPieChart, setShowPieChart] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchData();
        if (Array.isArray(result)) {
          setData(result);
        } else {
          console.error('Data is not an array:', result);
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    getData();
  }, []);

  const filteredData = data.filter(item => item.name && item.name.toLowerCase().includes(filter.toLowerCase()));

  // Define colors for each chart
  const barColors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  const lineColors = ['#FF0000', '#00FF00', '#0000FF', '#FF00FF'];
  const pieColors = ['#FF5733', '#FFC300', '#36A2EB', '#008080'];

  return (
    <div className="dashboard">
      <h1 className="dashboard-heading">GITHUB</h1>
      <div className="chart-controls">
        <input
          type="text"
          placeholder="Filter by name"
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="filter-input"
        />
        <div className="chart-toggle">
          <label>
            <input type="checkbox" checked={showBarChart} onChange={() => setShowBarChart(!showBarChart)} /> Bar Chart
          </label>
          <label>
            <input type="checkbox" checked={showLineChart} onChange={() => setShowLineChart(!showLineChart)} /> Line Chart
          </label>
          <label>
            <input type="checkbox" checked={showPieChart} onChange={() => setShowPieChart(!showPieChart)} /> Pie Chart
          </label>
        </div>
      </div>
      <div className="chart-container">
        {showBarChart && (
          <div className="chart">
            <h2 className="chart-heading">Bar Chart</h2>
            <BarChart
              width={400}
              height={300}
              data={filteredData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill={barColors[0]}>
                {filteredData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={barColors[index % barColors.length]} />
                ))}
              </Bar>
            </BarChart>
          </div>
        )}
        {showLineChart && (
          <div className="chart">
            <h2 className="chart-heading">Line Chart</h2>
            <LineChart
              width={400}
              height={300}
              data={filteredData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke={lineColors[1]} />
            </LineChart>
          </div>
        )}
        {showPieChart && (
          <div className="chart">
            <h2 className="chart-heading">Pie Chart</h2>
            <PieChart width={400} height={300}>
              <Pie
                data={filteredData}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {filteredData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
