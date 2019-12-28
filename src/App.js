import React from "react";
import MovingPicture from "./components/moving-picture/container/MovingPicture";
import testImage from "./testImage.png";

function App() {
  return (
    <MovingPicture
      imageSource={testImage}
      particleNumber={700}
      particleTraceWidth={2}
      particleLifeTime={7000}
      particleVelocity={1}
      directionChannel={"saturation"}
      hueChannel={"blue"}
    />
  );
}

export default App;
