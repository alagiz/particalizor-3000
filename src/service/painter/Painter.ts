import { isNil, range } from "ramda";
import { createParticles } from "../particle-creator/ParticleCreator";
import { moveParticles } from "../animator/Animator";
import { IActualParticalizorPropertyValues } from "../properties-handler/PropertiesHandler";
import errorImage from "../../assets/onErrorImage.png";

let requestID: number;

const cancelAllRequestAnimationFrames = (requestId: number) => {
  if (!isNil(requestId)) {
    range(0, requestId).map(stackRequestId =>
      window.cancelAnimationFrame(stackRequestId)
    );
  }
};

export const drawImageOnCanvas = (
  image: HTMLImageElement,
  isImageSourceValid: boolean,
  referenceCanvasRefCurrent: HTMLCanvasElement | null,
  destinationCanvasRefCurrent: HTMLCanvasElement | null,
  actualValues: IActualParticalizorPropertyValues
) => {
  cancelAllRequestAnimationFrames(requestID);

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

          requestID = window.requestAnimationFrame(animate);
        };

        animate();
      } else {
        destination2dContext.drawImage(image, 0, 0, imageWidth, imageHeight);
      }
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
  actualValues: IActualParticalizorPropertyValues
) =>
  drawImageOnCanvas(
    image,
    isImageSourceValid,
    referenceCanvasRefCurrent,
    destinationCanvasRefCurrent,
    actualValues
  );

export const onErrorImage = (
  image: HTMLImageElement,
  isImageSourceValid: boolean,
  referenceCanvasRefCurrent: HTMLCanvasElement | null,
  destinationCanvasRefCurrent: HTMLCanvasElement | null,
  actualValues: IActualParticalizorPropertyValues
) => {
  image = createNewImage(() =>
    onLoadImage(
      image,
      isImageSourceValid,
      referenceCanvasRefCurrent,
      destinationCanvasRefCurrent,
      actualValues
    )
  );

  image.src = errorImage;

  drawImageOnCanvas(
    image,
    false,
    referenceCanvasRefCurrent,
    destinationCanvasRefCurrent,
    actualValues
  );
};

export const createImageElement: (
  referenceCanvasRefCurrent: HTMLCanvasElement | null,
  destinationCanvasRefCurrent: HTMLCanvasElement | null,
  actualValues: IActualParticalizorPropertyValues,
  imageSource: string
) => void = (
  referenceCanvasRefCurrent,
  destinationCanvasRefCurrent,
  actualValues,
  imageSource
) => {
  const image = createNewImage(() =>
    onLoadImage(
      image,
      true,
      referenceCanvasRefCurrent,
      destinationCanvasRefCurrent,
      actualValues
    )
  );

  image.onerror = () =>
    onErrorImage(
      image,
      false,
      referenceCanvasRefCurrent,
      destinationCanvasRefCurrent,
      actualValues
    );

  image.src = imageSource;
};
