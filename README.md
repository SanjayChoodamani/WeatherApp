# Weather Monitoring System 🌤️

A real-time weather monitoring application built with MERN stack that tracks weather conditions across major Indian cities. The system provides real-time updates, daily summaries, and temperature alerts.

## 🌟 Features

- Real-time weather data monitoring for 6 major Indian cities
- Temperature conversion from Kelvin to Celsius
- Daily weather summaries with aggregates
- Configurable temperature threshold alerts
- Interactive weather data visualization
- Data persistence using localStorage
- 5-minute interval updates

## 📋 Prerequisites

Before you begin, ensure you have installed:
- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)
- Git

You'll also need:
- OpenWeatherMap API key (get it from [OpenWeatherMap](https://openweathermap.org/api))

## 🏗️ Project Structure

```
weather-monitoring/
├── backend/
│   ├── server.js
│   ├── package.json
│   └── node_modules/
└── frontend/
    ├── src/
    │   ├── app/
    │   └── components/
    ├── package.json
    └── node_modules/
```

## 🚀 Installation Steps

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd weather-monitoring
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm init -y
npm install express cors axios dotenv nodemon

# Start the server
npm run dev
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install 

# Start the development server
npm run dev
```

## ⚙️ Configuration

### Backend Configuration

1. Create a `.env` file in the backend directory:
```env
API_KEY=your_api_key_here
PORT=5000
```

2. Update the cities list in `server.js` if needed:
```javascript
const CITIES = [
    { name: 'Delhi', id: 1273294 },
    { name: 'Mumbai', id: 1275339 },
    { name: 'Chennai', id: 1264527 },
    { name: 'Bangalore', id: 1277333 },
    { name: 'Kolkata', id: 1275004 },
    { name: 'Hyderabad', id: 1269843 }
];
```

### Frontend Configuration

1. Configure the API endpoint in the frontend application:
```javascript
const API_URL = 'http://localhost:5000/api';
```

2. Adjust temperature thresholds in the WeatherDashboard component:
```javascript
const [thresholds, setThresholds] = useState({
    maxTemp: 35,
    minTemp: 10
});
```

## 🏃‍♂️ Running the Application

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. In a new terminal, start the frontend development server:
```bash
cd frontend
npm run dev
```

3. Access the application at: `http://localhost:5173`


## 🔌 API Endpoints

### Weather Data
- GET `/api/weather` - Fetch current weather data for all cities
- GET `/api/summary/:date` - Get daily summary for a specific date

## 💾 Data Storage

The application uses localStorage for data persistence. Data is stored in the following format:

```javascript
{
  weatherHistory: [
    {
      timestamp: "2024-10-19T10:00:00.000Z",
      data: [
        {
          city: "Delhi",
          temp: 25.6,
          feels_like: 26.2,
          main: "Clear",
          // ...
        },
        // ... other cities
      ]
    }
  ]
}
```

## 🔧 Troubleshooting

Common issues and solutions:

1. **API Key Invalid**
   - Verify your OpenWeatherMap API key
   - Check if the key is properly set in the .env file

2. **CORS Issues**
   - Ensure the backend CORS configuration matches your frontend domain
   - Check if the backend server is running on the correct port

3. **Data Not Updating**
   - Verify the 5-minute interval is working correctly
   - Check browser console for any errors
   - Clear localStorage if data becomes corrupted



