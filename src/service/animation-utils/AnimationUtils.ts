import {
  createParticle,
  direction,
  directionMap,
  hueMap,
  IParticle
} from "../particalizor-utils/ParticalizorUtils";
import { IActualParticalizorPropertyValues } from "../provided-values-handler/ProvidedValuesHandler";
import { isNil, range } from "ramda";
import { rgbToHsl } from "../color-utils/ColorUtils";

export const moveParticle: (
  particles: IParticle[],
  srcData: Uint8ClampedArray,
  actualValues: IActualParticalizorPropertyValues,
  destination2dContext: CanvasRenderingContext2D | null,
  img: HTMLImageElement
) => void = (particles, srcData, actualValues, destination2dContext, img) => {
  const imageWidth = img.width;
  const imageHeight = img.height;
  const {
    actualDirectionChannel,
    actualHueChannel,
    actualParticleLifeTime,
    actualParticleVelocity,
    actualReverseDirection,
    actualReverseHue
  } = actualValues;
  const getDirection = directionMap[actualDirectionChannel];
  const getHue = hueMap[actualHueChannel];

  range(0, particles.length).forEach((particleNumber: number) => {
    if (!isNil(destination2dContext)) {
      let particle = particles[particleNumber];

      if (particle.TTL <= 0) {
        particle = createParticle(
          imageWidth,
          imageHeight,
          actualParticleLifeTime
        );

        particles[particleNumber] = particle;
      }

      let particleXInt = Math.floor(particle.x);
      let particleYInt = Math.floor(particle.y);

      if (
        particleXInt < 0 ||
        particleXInt >= imageWidth ||
        particleYInt < 0 ||
        particleYInt >= imageHeight
      ) {
        particle = createParticle(
          imageWidth,
          imageHeight,
          actualParticleLifeTime
        );
        particles[particleNumber] = particle;
        particleXInt = Math.floor(particle.x);
        particleYInt = Math.floor(particle.y);
      }

      let offset = (particleYInt * imageWidth + particleXInt) * 4;

      const red = srcData[offset++];
      const green = srcData[offset++];
      const blue = srcData[offset];
      const [hue, saturation, light] = rgbToHsl(red, green, blue);

      const directionMapValues = {
        [direction.red]: red,
        [direction.green]: green,
        [direction.blue]: blue,
        [direction.hue]: hue,
        [direction.saturation]: saturation,
        [direction.light]: light
      };

      const directionNumber = getDirection(
        directionMapValues[actualDirectionChannel],
        actualReverseDirection
      );
      const hueNumber = getHue(
        directionMapValues[actualHueChannel],
        actualReverseHue
      );

      const previousPosition = { x: particle.x, y: particle.y };

      particle.x += Math.cos(directionNumber) * actualParticleVelocity;
      particle.y += Math.sin(directionNumber) * actualParticleVelocity;

      --particle.TTL;

      drawOnCanvas(particle, previousPosition, hueNumber, destination2dContext);
    }
  });
};

const drawOnCanvas = (
  particle: IParticle,
  previousPosition: { x: any; y: any },
  hueNumber: number,
  destination2dContext: CanvasRenderingContext2D | null
) => {
  if (!isNil(destination2dContext)) {
    destination2dContext.beginPath();
    destination2dContext.moveTo(previousPosition.x, previousPosition.y);
    destination2dContext.lineTo(particle.x, particle.y);
    destination2dContext.strokeStyle = `hsl(${hueNumber},${particle.saturation},${particle.light})`;
    destination2dContext.stroke();
  }
};
