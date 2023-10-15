import { useEffect, useState } from "react";

const App = () => {
  const [temperature, setTemperature] = useState(0);
  const [temperatureColor, setTemperatureColor] = useState("cold");
  const [location, setLocation] = useState({
    lat: null,
    lon: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getLocation = async () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => {
        setError(error.message);
      }
    );
  };

  const fetchWeatherData = () => {
    if (location.lat && location.lon) {
      fetchWeatherWithRateLimit();
    }
  };

  const fetchWeatherWithRateLimit = () => {
    const API_KEY = "cf9cac72d0483b52ae13472b097f8ecc";
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${API_KEY}`;

    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        const convertedToC = Math.round(data.main.temp - 273.15);
        setTemperature(convertedToC);
        if (convertedToC < 20) {
          setTemperatureColor("cold");
        } else if (convertedToC > 30) {
          setTemperatureColor("hot");
        } else {
          setTemperatureColor("medium");
        }
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to fetch weather data.");
        setLoading(false);
      });
  };

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    const delay = 1000 / 60; // Delay between API calls (60 calls per minute)
    const timer = setInterval(fetchWeatherData, delay);

    return () => {
      clearInterval(timer);
    };
  }, [location]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="app-container">
      <div className="temperature-display-container">
        <div className={`temperature-display ${temperatureColor}`}>
          {temperature}&#176;C
        </div>
      </div>
    </div>
  );
};

export default App;
