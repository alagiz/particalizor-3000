import React from "react";
import { Styled } from "../styled";
import { IParticleVortexViewProps } from "./IParticleVortexViewProps";

const ParticleVortexView: React.FC<IParticleVortexViewProps> = ({
  destinationCanvasRef
}) => {
  return (
    <Styled.DestinationCanvas>
      <canvas ref={destinationCanvasRef} />
    </Styled.DestinationCanvas>
  );
};

export default ParticleVortexView;
