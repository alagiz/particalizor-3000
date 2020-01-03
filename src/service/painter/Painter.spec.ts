import { createNewImage, drawImageOnCanvas } from "./Painter";
import { IActualParticalizorPropertyValues } from "../properties-handler/PropertiesHandler";
import { direction } from "../direction-calculator/DirectionCalculator";

const getParametersForDrawOnCanvas = () => {
  const referenceCanvasRefCurrent = document.createElement("canvas");
  const destinationCanvasRefCurrent = document.createElement("canvas");
  const actualValues: IActualParticalizorPropertyValues = {
    actualDirectionChannel: direction.hue,
    actualHueChannel: direction.blue,
    actualParticleLifeTime: 500,
    actualParticleVelocity: 50,
    actualReverseDirection: false,
    actualReverseHue: false,
    actualParticleNumber: 50,
    actualParticleTraceWidth: 1
  };

  return {
    referenceCanvasRefCurrent: referenceCanvasRefCurrent,
    destinationCanvasRefCurrent: destinationCanvasRefCurrent,
    actualValues: actualValues
  };
};

describe("createNewImage works as expected", () => {
  it("creates new image", () => {
    const image = createNewImage(jest.fn());

    expect(image).toBeDefined();
  });
});

describe("drawImageOnCanvas works as expected", () => {
  it("doesn't crash if image source is invalid", () => {
    const image = new Image();

    const isImageSourceValid = false;
    const {
      referenceCanvasRefCurrent,
      destinationCanvasRefCurrent,
      actualValues
    } = getParametersForDrawOnCanvas();

    drawImageOnCanvas(
      image,
      isImageSourceValid,
      referenceCanvasRefCurrent,
      destinationCanvasRefCurrent,
      actualValues
    );

    expect(destinationCanvasRefCurrent.getContext("2d")).toBeDefined();
  });
  it("doesn't crash if image source is valid", () => {
    const image = new Image();

    image.height = 10;
    image.width = 10;

    const isImageSourceValid = true;
    const {
      referenceCanvasRefCurrent,
      destinationCanvasRefCurrent,
      actualValues
    } = getParametersForDrawOnCanvas();

    drawImageOnCanvas(
      image,
      isImageSourceValid,
      referenceCanvasRefCurrent,
      destinationCanvasRefCurrent,
      actualValues
    );

    expect(destinationCanvasRefCurrent.getContext("2d")).toBeDefined();
  });
});
