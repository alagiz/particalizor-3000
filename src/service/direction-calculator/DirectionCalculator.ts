export interface IDirectionHueMap {
  [key: string]: (number: number, inverted: boolean) => number;

  red: (colorAmount: number, inverted: boolean) => number;
  green: (colorAmount: number, inverted: boolean) => number;
  blue: (colorAmount: number, inverted: boolean) => number;
  hue: (hsl: number, inverted: boolean) => number;
  saturation: (hsl: number, inverted: boolean) => number;
  light: (hsl: number, inverted: boolean) => number;
}

export enum direction {
  red = "red",
  green = "green",
  blue = "blue",
  hue = "hue",
  saturation = "saturation",
  light = "light"
}

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
