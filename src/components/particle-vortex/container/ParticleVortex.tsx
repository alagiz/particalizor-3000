import React, { useEffect, useRef } from "react";
import ParticleVortexView from "../view/ParticleVortexView";
import { IParticleVortexProps } from "./IParticleVortexProps";
import { getActualParticleVortexValues } from "../../../services/properties-handler/PropertiesHandler";
import {
  clearCanvas,
  drawParticleVortexOnCanvas
} from "../../../services/painter/Painter";
import { createVortexes } from "../../../services/vortex-creator/VortexCreator";
import { createParticles } from "../../../services/particle-creator/ParticleCreator";
import { isNil } from "ramda";

export const ParticleVortex: React.FC<IParticleVortexProps> = ({
  particleNumber,
  particleLifeTime,
  particleTraceWidth,
  imageWidth,
  imageHeight,
  vortexNumber,
  backgroundColor
}) => {
  const destinationCanvasRef = useRef<HTMLCanvasElement>(null);

  const actualValues = getActualParticleVortexValues(
    particleNumber,
    particleLifeTime,
    particleTraceWidth,
    imageWidth,
    imageHeight,
    vortexNumber,
    backgroundColor
  );

  const particles = createParticles(
    actualValues.actualParticleNumber,
    actualValues.actualImageWidth,
    actualValues.actualImageHeight,
    actualValues.actualParticleLifeTime
  );
  const vortexes = createVortexes(
    actualValues.actualVortexNumber,
    actualValues.actualImageWidth,
    actualValues.actualImageHeight
  );

  let animationRequestId: number | null = 0;

  const getAnimationRequestId = () => animationRequestId;
  const setAnimationRequestId = (requestId: number | null) => {
    animationRequestId = requestId;
  };

  useEffect(() => {
    if (!isNil(destinationCanvasRef.current)) {
      drawParticleVortexOnCanvas(
        particles,
        vortexes,
        actualValues,
        destinationCanvasRef.current,
        setAnimationRequestId,
        getAnimationRequestId
      );
    }
  });

  useEffect(() => {
    return () => {
      setAnimationRequestId(null);

      clearCanvas(destinationCanvasRef);
    };
  }, [destinationCanvasRef]);

  return (
    <ParticleVortexView
      key={Math.random()}
      destinationCanvasRef={destinationCanvasRef}
    />
  );
};

export default ParticleVortex;
