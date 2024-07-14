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
import zoomPlugin from 'chartjs-plugin-zoom';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin
);

const TimeSeriesGraph = ({ label, data, status, error }) => {
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
    transitions: {
      zoom: {
        animation: {
          duration: 500,
          easing: 'easeOutCubic'
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        max: maxDataValue,
        type: 'linear',
      },
    },
    plugins: {
      zoom: {
        pan: {
          enabled: true,
          mode: 'x',
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true
          },
          mode: 'x',
          limits: {
            y: {min: 0, max: maxDataValue},
          }
        },
      },
    },
  };

  return (
    <div>
      {status === 'loading' && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <Line data={chartData} options={options} />
    </div>
  );
};

export default TimeSeriesGraph;
