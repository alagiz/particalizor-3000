import MovingPicture from "./components/moving-picture/container/MovingPicture";
import {ParticleVortex} from "./components/particle-vortex/container/ParticleVortex";
import React from "react";
import ReactDOM from "react-dom";

ReactDOM.render(<ParticleVortex/>, document.getElementById("root"));

export { MovingPicture, ParticleVortex };
