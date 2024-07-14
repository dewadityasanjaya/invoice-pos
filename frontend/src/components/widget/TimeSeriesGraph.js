import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const TimeSeriesGraph = ({ label, data }) => {
  const chartData = {
    labels: label,
    datasets: [
      {
        label: 'Revenue',
        data: data,
        fill: false,
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1,
      }
    ],
  };

  const maxValue = Math.max(...data);
  const maxDataValue = maxValue + maxValue * 0.1;

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        max: maxDataValue,
        type: 'linear',
      },
    },
  };

  return (
      <Line data={chartData} options={options} />
  );
};

export default TimeSeriesGraph;
