import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from 'chart.js';
//first chart component i used, now im using MeasurementChart.js because of the more general approach

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

const WeightChart = ({ weightData }) => {
  const data = {
    labels: weightData.map((d) => d.measuredAt),
    datasets: [
      {
        data: weightData.map((d) => d.weight),
        borderColor: 'blue',
      },
    ],
  };

  return <Line data={data} />;
};

export default WeightChart;
