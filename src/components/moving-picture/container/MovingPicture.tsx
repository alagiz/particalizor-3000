import React, { useEffect, useRef } from "react";
import MovingPictureView from "../view/MovingPictureView";
import { IMovingPictureProps } from "./IMovingPictureProps";
import { getActualValues } from "../../../services/properties-handler/PropertiesHandler";
import {
  clearCanvas,
  createImageElement
} from "../../../services/painter/Painter";

export const MovingPicture: React.FC<IMovingPictureProps> = ({
  particleNumber,
  particleLifeTime,
  particleVelocity,
  directionChannel,
  reverseDirection,
  hueChannel,
  reverseHue,
  particleTraceWidth,
  imageSource
}) => {
  const destinationCanvasRef = useRef<HTMLCanvasElement>(null);
  const referenceCanvasRef = useRef<HTMLCanvasElement>(null);

  const actualValues = getActualValues(
    particleNumber,
    particleLifeTime,
    particleVelocity,
    directionChannel,
    reverseDirection,
    hueChannel,
    reverseHue,
    particleTraceWidth
  );

  let animationRequestId: number | null = 0;

  const getAnimationRequestId = () => animationRequestId;
  const setAnimationRequestId = (requestId: number | null) =>
    (animationRequestId = requestId);

  useEffect(() =>
    createImageElement(
      referenceCanvasRef.current,
      destinationCanvasRef.current,
      actualValues,
      imageSource,
      setAnimationRequestId,
      getAnimationRequestId
    )
  );

  useEffect(() => {
    return () => {
      setAnimationRequestId(null);

      clearCanvas(destinationCanvasRef);
    };
  }, [destinationCanvasRef]);

  return (
    <MovingPictureView
      key={Math.random()}
      destinationCanvasRef={destinationCanvasRef}
      referenceCanvasRef={referenceCanvasRef}
    />
  );
};

export default MovingPicture;
