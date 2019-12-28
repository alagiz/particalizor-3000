import { range } from "ramda";

export interface IDirectionHueMap {
  [key: string]: (number: number, inverted: boolean) => number;

  red: (colorAmount: number, inverted: boolean) => number;
  green: (colorAmount: number, inverted: boolean) => number;
  blue: (colorAmount: number, inverted: boolean) => number;
  hue: (hsl: number, inverted: boolean) => number;
  saturation: (hsl: number, inverted: boolean) => number;
  light: (hsl: number, inverted: boolean) => number;
}

export interface IParticle {
  x: number;
  y: number;
  saturation: string;
  light: string;
  TTL: number;
}

export interface IParticalizorSettingNames {
  particleLifeTime: number;
  particleVelocity: number;
  directionChannel: direction;
  directionReverse: boolean;
  hueChannel: direction;
  hueReverse: boolean;
  particleTraceWidth: number;
  particleNumber: number;
}

export enum direction {
  red = "red",
  green = "green",
  blue = "blue",
  hue = "hue",
  saturation = "saturation",
  light = "light"
}

export enum particalizorSettingNames {
  particleLifeTime = "particleLifeTime",
  particleVelocity = "particleVelocity",
  directionChannel = "directionChannel",
  directionReverse = "directionReverse",
  hueChannel = "hueChannel",
  hueReverse = "hueReverse",
  particleTraceWidth = "particleTraceWidth",
  particleNumber = "particleNumber"
}

export const defaultParticalizorValues: IParticalizorSettingNames = {
  particleLifeTime: 700,
  particleVelocity: 1,
  directionChannel: direction.hue,
  directionReverse: false,
  hueChannel: direction.blue,
  hueReverse: false,
  particleTraceWidth: 1,
  particleNumber: 7000
};

export const binaryDegreeCoefficient = (Math.PI * 2) / 256;

export const getDirectionColor: (
  colorAmount: number,
  inverted: boolean
) => number = (colorAmount: number, inverted: boolean) =>
  inverted
    ? -colorAmount * binaryDegreeCoefficient
    : colorAmount * binaryDegreeCoefficient;

export const getDirectionHSL: (hsl: number, inverted: boolean) => number = (
  hsl: number,
  inverted: boolean
) => (inverted ? -hsl * Math.PI * 2 : hsl * Math.PI * 2);

export const getHueColor: (colorAmount: number, inverted: boolean) => number = (
  colorAmount: number,
  inverted: boolean
) => (inverted ? 360 - (colorAmount / 255) * 360 : (colorAmount / 255) * 360);

export const getHueHSL: (hsl: number, inverted: boolean) => number = (
  hsl: number,
  inverted: boolean
) => (inverted ? 360 - hsl * 360 : hsl * 360);

export const directionMap: IDirectionHueMap = {
  red: getDirectionColor,
  green: getDirectionColor,
  blue: getDirectionColor,
  hue: getDirectionHSL,
  saturation: getDirectionHSL,
  light: getDirectionHSL
};

export const hueMap: IDirectionHueMap = {
  red: getHueColor,
  green: getHueColor,
  blue: getHueColor,
  hue: getHueHSL,
  saturation: getHueHSL,
  light: getHueHSL
};

export const getRandomNumberInRange = (min: number, max: number) =>
  min + (max - min) * Math.random();
export const getRandomIntNumberInRange = (min: number, max: number) =>
  Math.floor(getRandomNumberInRange(min, max));

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
