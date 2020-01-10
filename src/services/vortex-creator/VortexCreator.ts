import { range } from "ramda";
import { getRandomNumberInRange } from "../color-calculator/ColorCalculator";

export interface IVortex {
  x: number;
  y: number;
  angularVelocityExponentCoefficient: number;
  angularVelocityMultiplyingCoefficient: number;
  radialVelocityCoefficient: number;
  rotationDirection: rotationDirection;
  radius: number;
}

export enum rotationDirection {
  clockwise = 1,
  counterclockwise = -1
}

export const getRandomRotationDirection = () =>
  getRandomNumberInRange(0, 1) > 0.5
    ? rotationDirection.clockwise
    : rotationDirection.counterclockwise;

export const createVortex: (
  imageWidth: number,
  imageHeight: number
) => {
  x: number;
  y: number;
  angularVelocityExponentCoefficient: number;
  angularVelocityMultiplyingCoefficient: number;
  radialVelocityCoefficient: number;
  rotationDirection: rotationDirection;
  radius: number;
} = (imageWidth, imageHeight) => ({
  x: getRandomNumberInRange(0, imageWidth),
  y: getRandomNumberInRange(0, imageHeight),
  angularVelocityExponentCoefficient: getRandomNumberInRange(7, 14) * 1000,
  angularVelocityMultiplyingCoefficient: getRandomNumberInRange(7, 14) / 1000,
  radialVelocityCoefficient: getRandomNumberInRange(1, 7) / 3000,
  rotationDirection: getRandomRotationDirection(),
  radius: getRandomNumberInRange(10, 300)
});

export const createVortexes: (
  vortexNumber: number,
  imageWidth: number,
  imageHeight: number
) => IVortex[] = (vortexNumber, imageWidth, imageHeight) =>
  range(0, vortexNumber).map(() => createVortex(imageWidth, imageHeight));
