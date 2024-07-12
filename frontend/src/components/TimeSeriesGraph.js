import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Jan', revenue: 400 },
  { name: 'Feb', revenue: 300 },
  { name: 'Mar', revenue: 200 },
  { name: 'Apr', revenue: 278 },
  { name: 'May', revenue: 189 },
  { name: 'Jun', revenue: 239 },
  { name: 'Jul', revenue: 349 },
  { name: 'Aug', revenue: 200 },
  { name: 'Sep', revenue: 278 },
  { name: 'Oct', revenue: 189 },
  { name: 'Nov', revenue: 239 },
  { name: 'Dec', revenue: 349 },
];

function TimeSeriesGraph() {
  return (
    <LineChart width={600} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
    </LineChart>
  );
}

export default TimeSeriesGraph;
