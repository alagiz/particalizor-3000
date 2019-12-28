import React from "react";
import { Styled } from "../styled";
import { IMovingPictureViewProps } from "./IMovingPictureViewProps";

const MovingPictureView: React.FC<IMovingPictureViewProps> = ({
  destinationCanvasRef,
  referenceCanvasRef
}) => {
  return (
    <>
      <Styled.DestinationCanvas>
        <canvas ref={destinationCanvasRef} className="dest-canvas" />
      </Styled.DestinationCanvas>
      <Styled.RefCanvas>
        <canvas id="referenceCanvas" ref={referenceCanvasRef} />
      </Styled.RefCanvas>
    </>
  );
};

export default MovingPictureView;
