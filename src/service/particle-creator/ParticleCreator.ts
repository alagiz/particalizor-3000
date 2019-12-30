import { range } from "ramda";
import {
  getRandomIntNumberInRange,
  getRandomNumberInRange
} from "../color-calculator/ColorCalculator";

export interface IParticle {
  x: number;
  y: number;
  saturation: string;
  light: string;
  TTL: number;
}

export const createParticle: (
  imageWidth: number,
  imageHeight: number,
  particleLifeTime: number
) => {
  saturation: string;
  light: string;
  x: number;
  y: number;
  TTL: number;
} = (imageWidth, imageHeight, particleLifeTime) => ({
  x: getRandomNumberInRange(0, imageWidth),
  y: getRandomNumberInRange(0, imageHeight),
  saturation: `${getRandomIntNumberInRange(60, 100)}%`,
  light: `${getRandomIntNumberInRange(40, 80)}%`,
  TTL: getRandomNumberInRange(particleLifeTime * 0.7, particleLifeTime * 1.4)
});

export const createParticles: (
  particleNumber: number,
  imageWidth: number,
  imageHeight: number,
  particleLifeTime: number
) => IParticle[] = (
  particleNumber,
  imageWidth,
  imageHeight,
  particleLifeTime
) =>
  range(0, particleNumber).map(() => {
    const particle = createParticle(imageWidth, imageHeight, particleLifeTime);

    particle.TTL = getRandomIntNumberInRange(0, particleLifeTime);

    return particle;
  });
