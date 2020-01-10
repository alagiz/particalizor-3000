import {
  binaryDegreeCoefficient,
  getDirectionColor,
  getDirectionHSL,
  getHueColor,
  getHueHSL
} from "./DirectionCalculator";

describe("getDirectionColor works as expected", () => {
  it("returns correct directionValue if inverted is false", () => {
    const colorAmount = 100;
    const inverted = false;

    const directionValue: number = getDirectionColor(colorAmount, inverted);

    expect(directionValue).toBe(binaryDegreeCoefficient * colorAmount);
  });
  it("returns correct directionValue if inverted is true", () => {
    const colorAmount = 100;
    const inverted = true;

    const directionValue: number = getDirectionColor(colorAmount, inverted);

    expect(directionValue).toBe(-binaryDegreeCoefficient * colorAmount);
  });
});

describe("hueColor works as expected", () => {
  it("returns correct hueValue if inverted is false", () => {
    const colorAmount = 255;
    const inverted = false;

    const hueValue: number = getHueColor(colorAmount, inverted);

    expect(hueValue).toBe((colorAmount / 255) * 360);
  });
  it("returns correct hueValue if inverted is true", () => {
    const colorAmount = 255;
    const inverted = true;

    const hueValue: number = getHueColor(colorAmount, inverted);

    expect(hueValue).toBe(360 - (colorAmount / 255) * 360);
  });
});

describe("getDirectionHSL works as expected", () => {
  it("returns correct directionHSLValue if inverted is false", () => {
    const hsl = 255;
    const inverted = false;

    const hueValue: number = getDirectionHSL(hsl, inverted);

    expect(hueValue).toBe(hsl * Math.PI * 2);
  });
  it("returns correct directionHSLValue if inverted is true", () => {
    const hsl = 255;
    const inverted = true;

    const hueValue: number = getDirectionHSL(hsl, inverted);

    expect(hueValue).toBe(-hsl * Math.PI * 2);
  });
});

describe("getHueHSL works as expected", () => {
  it("returns correct hueHSLValue if inverted is false", () => {
    const hsl = 255;
    const inverted = false;

    const hueValue: number = getHueHSL(hsl, inverted);

    expect(hueValue).toBe(hsl * 360);
  });
  it("returns correct hueHSLValue if inverted is true", () => {
    const hsl = 255;
    const inverted = true;

    const hueValue: number = getHueHSL(hsl, inverted);

    expect(hueValue).toBe(360 - hsl * 360);
  });
});
