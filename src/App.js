import WeatherComponent from "./components/Weather";
import sunny from "./static/sunny.jpg";
import afternoon from "./static/afternoon.jpg";
import evening from "./static/evening.jpg";

function background() {
  const localHours = new Date().getHours();

  if (localHours < 16) {
    return sunny;
  } else if (localHours < 19) {
    return afternoon;
  } else {
    return evening;
  }
}

function App() {
  const bg = background();
  return (
    <div
      className="App"
      style={{
        height: "100vh",
        width: "100vw",
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundColor: "transparent",
      }}
    >
      <WeatherComponent></WeatherComponent>
    </div>
  );
}

export default App;
