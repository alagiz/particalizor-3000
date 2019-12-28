import { isNil } from "ramda";
import {
  binaryDegreeCoefficient,
  createParticle,
  createParticles,
  getDirectionColor,
  getDirectionHSL,
  getHueColor,
  getHueHSL,
  getRandomIntNumberInRange,
  getRandomNumberInRange,
  IParticle
} from "./ParticalizorUtils";

describe("getRandomNumberInRange works as expected", () => {
  it("returns random number large or equal than provided min and less or equal than provided max", () => {
    const min = 0;
    const max = 12;

    const randomNumberInRange = getRandomNumberInRange(min, max);

    expect(randomNumberInRange).toBeLessThanOrEqual(max);
    expect(randomNumberInRange).toBeGreaterThanOrEqual(min);
  });
});

describe("getRandomIntNumberInRange works as expected", () => {
  it("returns random int number large or equal than provided min and less or equal than provided max", () => {
    const min = 0;
    const max = 12;

    const randomNumberInRange = getRandomIntNumberInRange(min, max);

    expect(randomNumberInRange).toBe(Math.floor(randomNumberInRange));
  });
});

describe("createParticle works as expected", () => {
  it("creates and returns a particle", () => {
    const imageWidth = 0;
    const imageHeight = 50;
    const particleLifeTime = 100;

    const particle: IParticle = createParticle(
      imageWidth,
      imageHeight,
      particleLifeTime
    );

    expect(particle.x).toBeGreaterThanOrEqual(0);
    expect(particle.x).toBeGreaterThanOrEqual(0);
    expect(particle.TTL).toBeGreaterThanOrEqual(0);
  });
});

describe("createParticles works as expected", () => {
  it("creates and returns an array of particles", () => {
    const particleNumber = 100;
    const image: HTMLImageElement = new Image();
    const particleLifeTime = 100;

    const particles: IParticle[] = createParticles(
      particleNumber,
      image.width,
      image.height,
      particleLifeTime
    );

    expect(particles.length).toBe(100);
    expect(!isNil(particles[0].x)).toBeTruthy();
    expect(!isNil(particles[0].y)).toBeTruthy();
    expect(!isNil(particles[0].saturation)).toBeTruthy();
    expect(!isNil(particles[0].light)).toBeTruthy();
    expect(!isNil(particles[0].TTL)).toBeTruthy();
  });
});

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
