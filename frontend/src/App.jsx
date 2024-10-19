// App.js
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Alert, AlertTitle } from '@/components/ui/alert';

const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [thresholds, setThresholds] = useState({
    maxTemp: 35,
    minTemp: 10
  });

  // Fetch weather data every 5 minutes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/weather');
        const data = await response.json();
        
        // Store in localStorage
        const timestamp = new Date().toISOString();
        const storedData = JSON.parse(localStorage.getItem('weatherHistory') || '[]');
        storedData.push({ timestamp, data });
        localStorage.setItem('weatherHistory', JSON.stringify(storedData));
        
        setWeatherData(data);
        checkAlerts(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 300000); // 5 minutes
    return () => clearInterval(interval);
  }, []);

  // Check for temperature alerts
  const checkAlerts = (data) => {
    const newAlerts = data.reduce((acc, city) => {
      if (city.temp > thresholds.maxTemp) {
        acc.push({
          id: Date.now(),
          type: 'warning',
          message: `High temperature alert in ${city.city}: ${city.temp.toFixed(1)}°C`
        });
      }
      if (city.temp < thresholds.minTemp) {
        acc.push({
          id: Date.now(),
          type: 'warning',
          message: `Low temperature alert in ${city.city}: ${city.temp.toFixed(1)}°C`
        });
      }
      return acc;
    }, []);

    setAlerts(prev => [...prev, ...newAlerts]);
  };

  // Calculate daily summary
  const calculateDailySummary = () => {
    const storedData = JSON.parse(localStorage.getItem('weatherHistory') || '[]');
    const today = new Date().toISOString().split('T')[0];
    const todayData = storedData.filter(entry => 
      entry.timestamp.startsWith(today)
    );

    if (todayData.length === 0) return null;

    const allTemps = todayData.flatMap(entry => 
      entry.data.map(city => city.temp)
    );

    return {
      averageTemp: allTemps.reduce((a, b) => a + b, 0) / allTemps.length,
      maxTemp: Math.max(...allTemps),
      minTemp: Math.min(...allTemps),
      date: today
    };
  };

  const dailySummary = calculateDailySummary();

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Weather Monitoring Dashboard</h1>
      
      {/* Current Weather */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {weatherData.map(city => (
          <div key={city.city} className="p-4 border rounded-lg shadow">
            <h2 className="text-xl font-semibold">{city.city}</h2>
            <p className="text-2xl">{city.temp.toFixed(1)}°C</p>
            <p>Feels like: {city.feels_like.toFixed(1)}°C</p>
            <p>Condition: {city.main}</p>
          </div>
        ))}
      </div>

      {/* Daily Summary */}
      {dailySummary && (
        <div className="mb-8 p-4 border rounded-lg">
          <h2 className="text-xl font-bold mb-4">Daily Summary</h2>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="font-semibold">Average Temperature</p>
              <p>{dailySummary.averageTemp.toFixed(1)}°C</p>
            </div>
            <div>
              <p className="font-semibold">Maximum Temperature</p>
              <p>{dailySummary.maxTemp.toFixed(1)}°C</p>
            </div>
            <div>
              <p className="font-semibold">Minimum Temperature</p>
              <p>{dailySummary.minTemp.toFixed(1)}°C</p>
            </div>
          </div>
        </div>
      )}

      {/* Temperature Chart */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Temperature Trends</h2>
        <LineChart width={800} height={400} data={weatherData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="city" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="temp" stroke="#8884d8" name="Temperature" />
          <Line type="monotone" dataKey="feels_like" stroke="#82ca9d" name="Feels Like" />
        </LineChart>
      </div>

      {/* Alerts */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold mb-4">Alerts</h2>
        {alerts.map(alert => (
          <Alert key={alert.id} variant="destructive">
            <AlertTitle>{alert.message}</AlertTitle>
          </Alert>
        ))}
      </div>
    </div>
  );
};

export default WeatherDashboard;