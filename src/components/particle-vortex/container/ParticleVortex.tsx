import React, { useEffect, useRef } from "react";
import ParticleVortexView from "../view/ParticleVortexView";
import { IParticleVortexProps } from "./IParticleVortexProps";
import { getActualValues } from "../../../service/properties-handler/PropertiesHandler";
import { drawParticleVortexOnCanvas } from "../../../service/painter/Painter";
import { createVortexes } from "../../../service/vortex-creator/VortexCreator";
import { createParticles } from "../../../service/particle-creator/ParticleCreator";
import { isNil } from "ramda";

export const ParticleVortex: React.FC<IParticleVortexProps> = ({
  particleNumber,
  particleLifeTime,
  particleVelocity,
  particleTraceWidth,
  imageWidth,
  imageHeight,
  vortexNumber
}) => {
  const destinationCanvasRef = useRef<HTMLCanvasElement>(null);

  const actualValues = getActualValues(
    particleNumber,
    particleLifeTime,
    particleVelocity,
    null,
    null,
    null,
    null,
    particleTraceWidth
  );

  const particles = createParticles(
    actualValues.actualParticleNumber,
    imageWidth,
    imageHeight,
    actualValues.actualParticleLifeTime
  );
  const vortexes = createVortexes(vortexNumber, imageWidth, imageHeight);

  vortexes.map(vortex => console.log(vortex.x, vortex.y));

  useEffect(() => {
    if (!isNil(destinationCanvasRef.current)) {
      drawParticleVortexOnCanvas(
        particles,
        vortexes,
        actualValues,
        destinationCanvasRef.current,
        imageWidth,
        imageHeight
      );
    }
  });

  return <ParticleVortexView destinationCanvasRef={destinationCanvasRef} />;
};

export default ParticleVortex;
