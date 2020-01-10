import { isNil } from "ramda";
import {
  createParticles,
  IParticle
} from "../particle-creator/ParticleCreator";
import { moveParticles, moveVortexParticles } from "../animator/Animator";
import {
  IActualParticalizorPropertyValues,
  IActualParticalizorVortexPropertyValues
} from "../properties-handler/PropertiesHandler";
import errorImage from "../../assets/onErrorImage.png";
import { IVortex } from "../vortex-creator/VortexCreator";
import { getRandomIntNumberInRange } from "../color-calculator/ColorCalculator";
import { RefObject } from "react";

export const drawImageOnCanvas = (
  image: HTMLImageElement,
  isImageSourceValid: boolean,
  referenceCanvasRefCurrent: HTMLCanvasElement | null,
  destinationCanvasRefCurrent: HTMLCanvasElement | null,
  actualValues: IActualParticalizorPropertyValues,
  setAnimationRequestId: (requestId: number | null) => void,
  getAnimationRequestId: () => number | null
) => {
  if (
    !isNil(referenceCanvasRefCurrent) &&
    !isNil(destinationCanvasRefCurrent)
  ) {
    const imageWidth = image.width;
    const imageHeight = image.height;
    const {
      actualParticleNumber,
      actualParticleLifeTime,
      actualParticleTraceWidth
    } = actualValues;

    referenceCanvasRefCurrent.height = imageHeight;
    referenceCanvasRefCurrent.width = imageWidth;
    destinationCanvasRefCurrent.height = imageHeight;
    destinationCanvasRefCurrent.width = imageWidth;

    const source2dContext = referenceCanvasRefCurrent.getContext("2d");
    const destination2dContext = destinationCanvasRefCurrent.getContext("2d");

    if (!isNil(source2dContext) && !isNil(destination2dContext)) {
      if (isImageSourceValid) {
        source2dContext.drawImage(image, 0, 0, imageWidth, imageHeight);

        destination2dContext.fillStyle = "#343a40";
        destination2dContext.fillRect(0, 0, imageWidth, imageHeight);

        destination2dContext.lineWidth = actualParticleTraceWidth;
        destination2dContext.imageSmoothingEnabled = false;

        const srcData: Uint8ClampedArray = source2dContext.getImageData(
          0,
          0,
          imageWidth,
          imageHeight
        ).data;

        const particles = createParticles(
          actualParticleNumber,
          image.width,
          image.height,
          actualParticleLifeTime
        );

        const animate = () => {
          moveParticles(
            particles,
            srcData,
            actualValues,
            destination2dContext,
            image
          );

          if (!isNil(getAnimationRequestId())) {
            setAnimationRequestId(window.requestAnimationFrame(animate));
          }
        };

        animate();
      } else {
        destination2dContext.drawImage(image, 0, 0, imageWidth, imageHeight);
      }
    }
  }
};

export const drawParticleVortexOnCanvas = (
  particles: IParticle[],
  vortexes: IVortex[],
  actualValues: IActualParticalizorVortexPropertyValues,
  destinationCanvasRefCurrent: HTMLCanvasElement | null,
  setAnimationRequestId: (requestId: number | null) => void,
  getAnimationRequestId: () => number | null
) => {
  if (!isNil(destinationCanvasRefCurrent)) {
    const {
      actualParticleNumber,
      actualParticleLifeTime,
      actualParticleTraceWidth,
      actualImageHeight,
      actualImageWidth,
      actualBackgroundColor
    } = actualValues;

    destinationCanvasRefCurrent.height = actualImageHeight;
    destinationCanvasRefCurrent.width = actualImageWidth;

    const destination2dContext = destinationCanvasRefCurrent.getContext("2d");

    if (!isNil(destination2dContext)) {
      destination2dContext.fillStyle = actualBackgroundColor;
      destination2dContext.fillRect(0, 0, actualImageWidth, actualImageHeight);

      destination2dContext.lineWidth = actualParticleTraceWidth;
      destination2dContext.imageSmoothingEnabled = false;

      const particles = createParticles(
        actualParticleNumber,
        actualImageWidth,
        actualImageHeight,
        actualParticleLifeTime
      );

      const hueShift = getRandomIntNumberInRange(0, 360);

      const animate = () => {
        moveVortexParticles(
          particles,
          vortexes,
          actualValues,
          destination2dContext,
          hueShift
        );

        if (!isNil(getAnimationRequestId())) {
          setAnimationRequestId(window.requestAnimationFrame(animate));
        }
      };

      animate();
    }
  }
};

export const createNewImage: (
  onLoadImage: () => void
) => HTMLImageElement = onLoadImage => {
  const image = new Image();

  image.crossOrigin = "anonymous";
  image.onload = () => onLoadImage();

  return image;
};

export const onLoadImage = (
  image: HTMLImageElement,
  isImageSourceValid: boolean,
  referenceCanvasRefCurrent: HTMLCanvasElement | null,
  destinationCanvasRefCurrent: HTMLCanvasElement | null,
  actualValues: IActualParticalizorPropertyValues,
  setAnimationRequestId: (requestId: number | null) => void,
  getAnimationRequestId: () => number | null
) =>
  drawImageOnCanvas(
    image,
    isImageSourceValid,
    referenceCanvasRefCurrent,
    destinationCanvasRefCurrent,
    actualValues,
    setAnimationRequestId,
    getAnimationRequestId
  );

export const onErrorImage = (
  image: HTMLImageElement,
  isImageSourceValid: boolean,
  referenceCanvasRefCurrent: HTMLCanvasElement | null,
  destinationCanvasRefCurrent: HTMLCanvasElement | null,
  actualValues: IActualParticalizorPropertyValues,
  setAnimationRequestId: (requestId: number | null) => void,
  getAnimationRequestId: () => number | null
) => {
  image = createNewImage(() =>
    onLoadImage(
      image,
      isImageSourceValid,
      referenceCanvasRefCurrent,
      destinationCanvasRefCurrent,
      actualValues,
      setAnimationRequestId,
      getAnimationRequestId
    )
  );

  image.src = errorImage;

  drawImageOnCanvas(
    image,
    false,
    referenceCanvasRefCurrent,
    destinationCanvasRefCurrent,
    actualValues,
    setAnimationRequestId,
    getAnimationRequestId
  );
};

export const createImageElement: (
  referenceCanvasRefCurrent: HTMLCanvasElement | null,
  destinationCanvasRefCurrent: HTMLCanvasElement | null,
  actualValues: IActualParticalizorPropertyValues,
  imageSource: string,
  setAnimationRequestId: (requestId: number | null) => void,
  getAnimationRequestId: () => number | null
) => void = (
  referenceCanvasRefCurrent,
  destinationCanvasRefCurrent,
  actualValues,
  imageSource,
  setAnimationRequestId,
  getAnimationRequestId
) => {
  const image = createNewImage(() =>
    onLoadImage(
      image,
      true,
      referenceCanvasRefCurrent,
      destinationCanvasRefCurrent,
      actualValues,
      setAnimationRequestId,
      getAnimationRequestId
    )
  );

  image.onerror = () =>
    onErrorImage(
      image,
      false,
      referenceCanvasRefCurrent,
      destinationCanvasRefCurrent,
      actualValues,
      setAnimationRequestId,
      getAnimationRequestId
    );

  image.src = imageSource;
};

export const clearCanvas = (canvasRef: RefObject<HTMLCanvasElement>) => {
  if (!isNil(canvasRef) && !isNil(canvasRef.current)) {
    const twoDContext = canvasRef.current.getContext("2d");

    if (!isNil(twoDContext)) {
      twoDContext.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
    }
  }
};
