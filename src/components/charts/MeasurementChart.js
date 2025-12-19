// charts/MeasurementChart.js
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
  BarElement, // Optional: if you want bar charts
  Filler // Optional: for area fill
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  Filler
);

const MeasurementChart = ({ data, title, measurementType }) => {
  if (!data || data.length === 0) {
    return <p>No data available for chart.</p>;
  }

  // Get unit from first data point
  const unit = data[0]?.unit || '';

  // Format data for Chart.js
  const chartData = {
    labels: data.map(item => item.date),
    datasets: [
      {
        label: `${title} (${unit})`,
        data: data.map(item => item.value),
        borderColor: getColorForMeasurement(measurementType),
        backgroundColor: getBackgroundColor(measurementType),
        borderWidth: 3,
        pointRadius: 6,
        pointHoverRadius: 10,
        fill: true,
        tension: 0.3, // Smooth curve
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 16,
          weight: 'bold'
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.parsed.y} ${unit}`;
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
          font: {
            size: 14,
            weight: 'bold'
          }
        },
        grid: {
          display: false
        }
      },
      y: {
        title: {
          display: true,
          text: `Value (${unit})`,
          font: {
            size: 14,
            weight: 'bold'
          }
        },
        beginAtZero: false,
        grid: {
          color: 'rgba(0,0,0,0.05)'
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'nearest'
    }
  };

  return (
    <div style={{ width: '100%', height: '400px', marginBottom: '30px' }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

// Helper function for colors
const getColorForMeasurement = (type) => {
  const colors = {
    bodyWeight: 'rgb(54, 162, 235)',
    backSquatPB: 'rgb(255, 99, 132)',
    powerCleanPB: 'rgb(75, 192, 192)',
    benchPressPB: 'rgb(255, 159, 64)',
    deadliftPB: 'rgb(153, 102, 255)',
    // Add more as needed
  };
  return colors[type] || 'rgb(54, 162, 235)';
};

// Helper for background color with transparency
const getBackgroundColor = (type) => {
  const colors = {
    bodyWeight: 'rgba(54, 162, 235, 0.1)',
    backSquatPB: 'rgba(255, 99, 132, 0.1)',
    powerCleanPB: 'rgba(75, 192, 192, 0.1)',
    benchPressPB: 'rgba(255, 159, 64, 0.1)',
    deadliftPB: 'rgba(153, 102, 255, 0.1)',
  };
  return colors[type] || 'rgba(54, 162, 235, 0.1)';
};

export default MeasurementChart;