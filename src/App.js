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
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=755d2152d181aa2d39f36ecc581b95bd`
      )
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
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    fetchWeatherData();
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
      <div className="location-display-container">
        {/* Display location information here */}
      </div>
    </div>
  );
};

export default App;
