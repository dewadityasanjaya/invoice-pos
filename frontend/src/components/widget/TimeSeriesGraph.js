import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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
    <div style={{width:'100%', height: 400}}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TimeSeriesGraph;
