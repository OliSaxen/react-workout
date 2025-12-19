// Profile.js - With generic chart function
import React from 'react';
import { useParams } from 'react-router-dom';
import jsonFile from '../../assets/workout.json';
import MeasurementChart from '../charts/MeasurementChart'; // Renamed from WeightChart

const Profile = () => {
  const { userId } = useParams();

  const user = jsonFile.users.find((u) => u.userId === userId);

  if (!user) {
    return <div>User not found</div>;
  }

  const username = user.profile.username;

  // Function to create chart data for any measurement type
  const createChartData = (measurementType) => {
    const measurementData = user.measurements[measurementType] || [];

    if (!measurementData.length) {
      console.log(`No data found for ${measurementType}`);
      return null;
    }

    return measurementData.map((record) => ({
      date: record.measuredAt,
      value: parseFloat(record.weight),
      unit: record.unit,
    }));
  };

  // Function to create a chart component
  const createChart = (measurementType, title) => {
    const chartData = createChartData(measurementType);

    if (!chartData) {
      return <p>No {title} measurements available.</p>;
    }

    return (
      <div key={measurementType} style={{ marginBottom: '40px' }}>
        <h3>
          {title} for {username}
        </h3>
        <MeasurementChart
          data={chartData}
          title={title}
          measurementType={measurementType}
        />

        <table style={{ marginTop: '20px', width: '100%' }}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Value</th>
              <th>Unit</th>
            </tr>
          </thead>
          <tbody>
            {chartData.map((record, index) => (
              <tr key={index}>
                <td>{record.date}</td>
                <td>{record.value}</td>
                <td>{record.unit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // List of all available measurements
  const availableMeasurements = [
    { key: 'bodyWeight', title: 'Body Weight' },
    { key: 'backSquatPB', title: 'Back Squat PB' },
    { key: 'powerCleanPB', title: 'Power Clean PB' },
    // Add more measurement types here as needed
  ];

  return (
    <div>
      <h2>Performance Charts for {username}</h2>

      {availableMeasurements.map((measurement) =>
        createChart(measurement.key, measurement.title)
      )}
    </div>
  );
};

export default Profile;
