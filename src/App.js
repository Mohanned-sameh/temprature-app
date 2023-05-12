import { useState } from "react";
const App = () => {
  const [temperature, setTemperature] = useState(10);
  const [temperatureColor, setTemperatureColor] = useState("cold");
  const increaseTemperature = () => {
    if (temperature >= 30) {
      return;
    }
    const newTemperature = temperature + 1;
    setTemperature(newTemperature);
    if (newTemperature >= 15) {
      setTemperatureColor("hot");
    }
  };
  const decreaseTemperature = () => {
    if (temperature === 0) {
      return;
    }
    const newTemperature = temperature - 1;
    setTemperature(newTemperature);
    if (newTemperature < 15) {
      setTemperatureColor("cold");
    }
  };

  return (
    <div className="app-container">
      <div className="temperature-display-container">
        <div className={`temperature-display ${temperatureColor}`}>
          {temperature}&#176;C
        </div>
      </div>
      <div className="button-container">
        <button onClick={increaseTemperature}>+</button>
        <button onClick={decreaseTemperature}>-</button>
      </div>
    </div>
  );
};

export default App;
