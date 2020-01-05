import React, { useEffect, useRef } from "react";
import ParticleVortexView from "../view/ParticleVortexView";
import { IParticleVortexProps } from "./IParticleVortexProps";
import { getActualParticleVortexValues } from "../../../service/properties-handler/PropertiesHandler";
import { drawParticleVortexOnCanvas } from "../../../service/painter/Painter";
import { createVortexes } from "../../../service/vortex-creator/VortexCreator";
import { createParticles } from "../../../service/particle-creator/ParticleCreator";
import { isNil } from "ramda";

export const ParticleVortex: React.FC<IParticleVortexProps> = ({
  particleNumber,
  particleLifeTime,
  particleTraceWidth,
  imageWidth,
  imageHeight,
  vortexNumber
}) => {
  const destinationCanvasRef = useRef<HTMLCanvasElement>(null);

  const actualValues = getActualParticleVortexValues(
    particleNumber,
    particleLifeTime,
    particleTraceWidth,
    imageWidth,
    imageHeight,
    vortexNumber
  );

  const particles = createParticles(
    actualValues.actualParticleNumber,
    imageWidth,
    imageHeight,
    actualValues.actualParticleLifeTime
  );
  const vortexes = createVortexes(vortexNumber, imageWidth, imageHeight);

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
