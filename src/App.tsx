import { useState } from "react";
import "./App.css";
import Hero from "./components/Hero";
import WeddingBook from "./components/WeddingBook";

function App() {
  const [screen, setScreen] = useState("home");

  return (
    <>
      {screen === "home" && (
        <Hero onBegin={() => setScreen("welcome")} />
      )}

      {screen === "welcome" && (
  <WeddingBook />
)}
    </>
  );
}

export default App;