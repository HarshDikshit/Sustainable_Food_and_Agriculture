import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AirQualityApp = () => {
  const [airQualityData, setAirQualityData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAirQualityData = async () => {
      try {
        const response = await fetch('/api/air-quality');
        if (!response.ok) {
          throw new Error('Failed to fetch air quality data');
        }
        const data = await response.json();
        setAirQualityData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchAirQualityData();
  }, []);

  if (loading) return <div>Loading air quality data...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="air-quality-app px-10 flex flex-col w-full">
      <h1 className='m-auto text-3xl font-bold'>Air Quality Information</h1>
      
      {airQualityData && (
        <>
          <div className="current-air-quality text-lg font-semibold">
            <h1 className='text-2xl font-bold'>Current Air Quality:</h1>
            <p>Time: {new Date(airQualityData.current.time).toLocaleString()}</p>
            <p>PM10: {airQualityData.current.pm10} µg/m³</p>
            <p>PM2.5: {airQualityData.current.pm2_5} µg/m³</p>
            <p>Carbon Monoxide: {airQualityData.current.carbon_monoxide} µg/m³</p>
            <p>UV Index: {airQualityData.current.uv_index}</p>
            <p>UV Index (Clear Sky): {airQualityData.current.uv_index_clear_sky}</p>
            <p>Location: Kanpur</p>
          </div>

          <div className="hourly-forecast">
            <h2 className='text-2xl font-bold my-5'>Hourly Forecast</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={airQualityData.hourly.time.map((time, index) => ({
                time: new Date(time).toLocaleTimeString(),
                pm10: airQualityData.hourly.pm10[index],
                pm2_5: airQualityData.hourly.pm2_5[index],
                uv_index: airQualityData.hourly.uv_index[index],
              }))}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="pm10" stroke="#8884d8" name="PM10 (µg/m³)" />
                <Line yAxisId="left" type="monotone" dataKey="pm2_5" stroke="#82ca9d" name="PM2.5 (µg/m³)" />
                <Line yAxisId="right" type="monotone" dataKey="uv_index" stroke="#ffc658" name="UV Index" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
};

export default AirQualityApp;