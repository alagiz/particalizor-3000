import {
  defaultParticalizorValues,
  defaultParticalizorVortexValues,
  getActualParticleVortexValues,
  getActualValues,
  getReasonableValue,
  particalizorSettingNames,
  particalizorVortexSettingNames
} from "./PropertiesHandler";
import { direction } from "../direction-calculator/DirectionCalculator";

describe("getReasonableValue works as expected", () => {
  it("returns default for particleNumber if provided value is not more than 0", () => {
    const particleNumber = -2;

    const actualParticleNumber = getReasonableValue(
      particalizorSettingNames.particleNumber,
      particleNumber
    );

    expect(actualParticleNumber).toBe(
      defaultParticalizorValues[particalizorSettingNames.particleNumber]
    );
  });
  it("returns default for particleNumber if provided value is not a number", () => {
    const particleNumber = "2";

    const actualParticleNumber = getReasonableValue(
      particalizorSettingNames.particleNumber,
      particleNumber
    );

    expect(actualParticleNumber).toBe(
      defaultParticalizorValues[particalizorSettingNames.particleNumber]
    );
  });
  it("returns provided value for particleNumber if provided value is an acceptable number", () => {
    const particleNumber = 2;

    const actualParticleNumber = getReasonableValue(
      particalizorSettingNames.particleNumber,
      particleNumber
    );

    expect(actualParticleNumber).toBe(particleNumber);
  });
});

describe("getActualValues works as expected", () => {
  it("returns correct actual values when correct values are passed in", () => {
    const particleNumber = 700;
    const particleTraceWidth = 2;
    const particleLifeTime = 7000;
    const particleVelocity = 1;
    const directionChannel = "saturation";
    const hueChannel = "blue";
    const directionReverse = false;

    const {
      actualDirectionChannel,
      actualReverseDirection,
      actualHueChannel,
      actualReverseHue,
      actualParticleLifeTime,
      actualParticleNumber,
      actualParticleTraceWidth,
      actualParticleVelocity
    } = getActualValues(
      particleNumber,
      particleLifeTime,
      particleVelocity,
      directionChannel,
      directionReverse,
      hueChannel,
      null,
      particleTraceWidth
    );

    expect(actualParticleNumber).toBe(particleNumber);
    expect(actualDirectionChannel).toBe(direction.saturation);
    expect(actualReverseDirection).toBe(false);
    expect(actualHueChannel).toBe(direction.blue);
    expect(actualReverseHue).toBe(false);
    expect(actualParticleLifeTime).toBe(particleLifeTime);
    expect(actualParticleTraceWidth).toBe(particleTraceWidth);
    expect(actualParticleVelocity).toBe(particleVelocity);
  });
  it("returns correct actual values when incorrect values are passed in", () => {
    const particleNumber = -700;
    const particleTraceWidth = -2;
    const particleLifeTime = -7000;
    const particleVelocity = -1;
    const directionChannel = "satura";
    const hueChannel = "bluewee";

    const {
      actualDirectionChannel,
      actualReverseDirection,
      actualHueChannel,
      actualReverseHue,
      actualParticleLifeTime,
      actualParticleNumber,
      actualParticleTraceWidth,
      actualParticleVelocity
    } = getActualValues(
      particleNumber,
      particleLifeTime,
      particleVelocity,
      directionChannel,
      null,
      hueChannel,
      null,
      particleTraceWidth
    );

    expect(actualParticleNumber).toBe(
      defaultParticalizorValues[particalizorSettingNames.particleNumber]
    );
    expect(actualDirectionChannel).toBe(
      defaultParticalizorValues[particalizorSettingNames.directionChannel]
    );
    expect(actualReverseDirection).toBe(
      defaultParticalizorValues[particalizorSettingNames.directionReverse]
    );
    expect(actualHueChannel).toBe(
      defaultParticalizorValues[particalizorSettingNames.hueChannel]
    );
    expect(actualReverseHue).toBe(
      defaultParticalizorValues[particalizorSettingNames.hueReverse]
    );
    expect(actualParticleLifeTime).toBe(
      defaultParticalizorValues[particalizorSettingNames.particleLifeTime]
    );
    expect(actualParticleTraceWidth).toBe(
      defaultParticalizorValues[particalizorSettingNames.particleTraceWidth]
    );
    expect(actualParticleVelocity).toBe(
      defaultParticalizorValues[particalizorSettingNames.particleVelocity]
    );
  });
  it("returns correct actual values when mix of correct and incorrect values are passed in", () => {
    const particleNumber = -700;
    const particleTraceWidth = 2;
    const particleLifeTime = 7000;
    const particleVelocity = -1;
    const directionChannel = "saturation";
    const hueChannel = "bluewe";

    const {
      actualDirectionChannel,
      actualReverseDirection,
      actualHueChannel,
      actualReverseHue,
      actualParticleLifeTime,
      actualParticleNumber,
      actualParticleTraceWidth,
      actualParticleVelocity
    } = getActualValues(
      particleNumber,
      particleLifeTime,
      particleVelocity,
      directionChannel,
      null,
      hueChannel,
      null,
      particleTraceWidth
    );

    expect(actualParticleNumber).toBe(
      defaultParticalizorValues[particalizorSettingNames.particleNumber]
    );
    expect(actualReverseDirection).toBe(
      defaultParticalizorValues[particalizorSettingNames.directionReverse]
    );
    expect(actualHueChannel).toBe(
      defaultParticalizorValues[particalizorSettingNames.hueChannel]
    );
    expect(actualReverseHue).toBe(
      defaultParticalizorValues[particalizorSettingNames.hueReverse]
    );
    expect(actualParticleVelocity).toBe(
      defaultParticalizorValues[particalizorSettingNames.particleVelocity]
    );
    expect(actualParticleLifeTime).toBe(particleLifeTime);
    expect(actualParticleTraceWidth).toBe(particleTraceWidth);
    expect(actualDirectionChannel).toBe(direction.saturation);
  });
});

describe("getActualVortexValues works as expected", () => {
  it("returns correct actual vortex values when correct values are passed in", () => {
    const particleNumber = 700;
    const particleTraceWidth = 2;
    const particleLifeTime = 7000;
    const imageWidth = 1;
    const imageHeight = 1;
    const vortexNumber = 1;
    const backgroundColor = "green";

    const {
      actualParticleLifeTime,
      actualParticleNumber,
      actualParticleTraceWidth,
      actualVortexNumber,
      actualImageHeight,
      actualImageWidth,
      actualBackgroundColor
    } = getActualParticleVortexValues(
      particleNumber,
      particleLifeTime,
      particleTraceWidth,
      imageWidth,
      imageHeight,
      vortexNumber,
      backgroundColor
    );

    expect(actualParticleNumber).toBe(particleNumber);
    expect(actualParticleLifeTime).toBe(particleLifeTime);
    expect(actualParticleTraceWidth).toBe(particleTraceWidth);
    expect(actualVortexNumber).toBe(vortexNumber);
    expect(actualImageHeight).toBe(imageHeight);
    expect(actualImageWidth).toBe(imageWidth);
    expect(actualBackgroundColor).toBe(backgroundColor);
  });
  it("returns correct actual vortex values when incorrect values are passed in", () => {
    const particleNumber = -700;
    const particleTraceWidth = -2;
    const particleLifeTime = -7000;
    const imageWidth = -1;
    const imageHeight = -1;
    const vortexNumber = -1;
    const backgroundColor = "greeen";

    const {
      actualParticleLifeTime,
      actualParticleNumber,
      actualParticleTraceWidth,
      actualVortexNumber,
      actualImageHeight,
      actualImageWidth,
      actualBackgroundColor
    } = getActualParticleVortexValues(
      particleNumber,
      particleLifeTime,
      particleTraceWidth,
      imageWidth,
      imageHeight,
      vortexNumber,
      backgroundColor
    );

    expect(actualParticleLifeTime).toBe(
      defaultParticalizorVortexValues[
        particalizorVortexSettingNames.particleLifeTime
      ]
    );
    expect(actualVortexNumber).toBe(
      defaultParticalizorVortexValues[
        particalizorVortexSettingNames.vortexNumber
      ]
    );
    expect(actualImageHeight).toBe(
      defaultParticalizorVortexValues[
        particalizorVortexSettingNames.imageHeight
      ]
    );
    expect(actualImageWidth).toBe(
      defaultParticalizorVortexValues[particalizorVortexSettingNames.imageWidth]
    );
    expect(actualParticleTraceWidth).toBe(
      defaultParticalizorVortexValues[
        particalizorVortexSettingNames.particleTraceWidth
      ]
    );
    expect(actualParticleNumber).toBe(
      defaultParticalizorVortexValues[
        particalizorVortexSettingNames.particleNumber
      ]
    );
    expect(actualBackgroundColor).toBe(
      defaultParticalizorVortexValues[
        particalizorVortexSettingNames.backgroundColor
      ]
    );
  });
  it("returns correct actual vortex values when mix of correct and incorrect values are passed in", () => {
    const particleNumber = -700;
    const particleTraceWidth = 2;
    const particleLifeTime = 7000;
    const imageWidth = -1;
    const imageHeight = -1;
    const vortexNumber = 1;
    const backgroundColor = "green";

    const {
      actualParticleLifeTime,
      actualParticleNumber,
      actualParticleTraceWidth,
      actualVortexNumber,
      actualImageHeight,
      actualImageWidth,
      actualBackgroundColor
    } = getActualParticleVortexValues(
      particleNumber,
      particleLifeTime,
      particleTraceWidth,
      imageWidth,
      imageHeight,
      vortexNumber,
      backgroundColor
    );

    expect(actualParticleNumber).toBe(
      defaultParticalizorVortexValues[
        particalizorVortexSettingNames.particleNumber
      ]
    );
    expect(actualParticleLifeTime).toBe(particleLifeTime);
    expect(actualParticleTraceWidth).toBe(particleTraceWidth);
    expect(actualVortexNumber).toBe(vortexNumber);
    expect(actualImageHeight).toBe(
      defaultParticalizorVortexValues[
        particalizorVortexSettingNames.imageHeight
      ]
    );
    expect(actualImageWidth).toBe(
      defaultParticalizorVortexValues[particalizorVortexSettingNames.imageWidth]
    );
    expect(actualBackgroundColor).toBe(backgroundColor);
  });
});
