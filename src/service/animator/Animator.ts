import { createParticle, IParticle } from "../particle-creator/ParticleCreator";
import { IActualParticalizorPropertyValues } from "../properties-handler/PropertiesHandler";
import { isNil, range } from "ramda";
import {
  direction,
  directionMap,
  hueMap
} from "../direction-calculator/DirectionCalculator";
import { rgbToHsl } from "../color-calculator/ColorCalculator";
import { IVortex } from "../vortex-creator/VortexCreator";

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

export const moveParticles: (
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

      if (particle.lifeTime <= 0) {
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

      --particle.lifeTime;

      drawOnCanvas(particle, previousPosition, hueNumber, destination2dContext);
    }
  });
};

export const moveVortexParticles: (
  particles: IParticle[],
  vortexes: IVortex[],
  actualValues: IActualParticalizorPropertyValues,
  destination2dContext: CanvasRenderingContext2D | null,
  imageWidth: number,
  imageHeight: number,
  hueShift: number
) => void = (
  particles,
  vortexes,
  actualValues,
  destination2dContext,
  imageWidth,
  imageHeight,
  hueShift
) => {
  const { actualParticleLifeTime } = actualValues;

  range(0, particles.length).forEach((particleNumber: number) => {
    if (!isNil(destination2dContext)) {
      let particle = particles[particleNumber];

      if (particle.lifeTime <= 0) {
        particle = createParticle(
          imageWidth,
          imageHeight,
          actualParticleLifeTime
        );

        particles[particleNumber] = particle;
      }

      const previousPosition = { x: particle.x, y: particle.y };

      vortexes.forEach(vortex => {
        const distanceFromPreviousParticleToVortexX =
          previousPosition.x - vortex.x;
        const distanceFromPreviousParticleToVortexY =
          previousPosition.y - vortex.y;
        const distanceFromPreviousParticleToVortex = Math.hypot(
          distanceFromPreviousParticleToVortexX,
          distanceFromPreviousParticleToVortexY
        );

        const angleSine =
          distanceFromPreviousParticleToVortexY /
          distanceFromPreviousParticleToVortex;
        const angleCosine =
          distanceFromPreviousParticleToVortexX /
          distanceFromPreviousParticleToVortex;

        const difference = distanceFromPreviousParticleToVortex - vortex.radius;
        const angularVelocity =
          vortex.angularVelocityMultiplyingCoefficient *
          Math.exp(
            (-difference * difference) /
              vortex.angularVelocityExponentCoefficient
          ) *
          vortex.rotationDirection;
        const radialVelocity = -difference * vortex.radialVelocityCoefficient;

        particle.x +=
          radialVelocity * angleCosine -
          angularVelocity * distanceFromPreviousParticleToVortex * angleSine;
        particle.y +=
          radialVelocity * angleSine +
          angularVelocity * distanceFromPreviousParticleToVortex * angleCosine;
      });

      --particle.lifeTime;

      const velocity = Math.hypot(
        previousPosition.x - particle.x,
        previousPosition.y - particle.y
      );
      const hue = (Math.min(velocity * 80, 200) + hueShift) % 360;

      drawOnCanvas(particle, previousPosition, hue, destination2dContext);
    }
  });
};
