// server.js
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const dotenv = require('dotenv');

dotenv.config();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// OpenWeatherMap configuration
const API_KEY = process.env.API_KEY;
const CITIES = [
    { name: 'Delhi', id: 1273294 },
    { name: 'Mumbai', id: 1275339 },
    { name: 'Chennai', id: 1264527 },
    { name: 'Bangalore', id: 1277333 },
    { name: 'Kolkata', id: 1275004 },
    { name: 'Hyderabad', id: 1269843 }
];

// Convert Kelvin to Celsius
const kelvinToCelsius = (kelvin) => kelvin - 273.15;

// Get weather data for a city
async function getWeatherData(cityId) {
    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${API_KEY}`
        );
        
        const data = response.data;
        return {
            city: data.name,
            main: data.weather[0].main,
            temp: kelvinToCelsius(data.main.temp),
            feels_like: kelvinToCelsius(data.main.feels_like),
            dt: data.dt,
            humidity: data.main.humidity,
            wind_speed: data.wind.speed
        };
    } catch (error) {
        console.error(`Error fetching weather data for city ${cityId}:`, error);
        return null;
    }
}

// Get weather for all cities
app.get('/api/weather', async (req, res) => {
    try {
        const weatherPromises = CITIES.map(city => getWeatherData(city.id));
        const weatherData = await Promise.all(weatherPromises);
        res.json(weatherData.filter(data => data !== null));
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

// Get daily summary for a specific date
app.get('/api/summary/:date', (req, res) => {
    const date = req.params.date;
    // In a real application, this would fetch from a database
    // For this example, we'll return mock data
    const mockSummary = {
        date,
        averageTemp: 25,
        maxTemp: 30,
        minTemp: 20,
        dominantWeather: 'Clear'
    };
    res.json(mockSummary);
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});