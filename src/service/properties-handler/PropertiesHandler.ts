import { isNil } from "ramda";
import { direction } from "../direction-calculator/DirectionCalculator";

export interface IActualParticalizorPropertyValues {
  actualParticleNumber: number;
  actualParticleLifeTime: number;
  actualParticleVelocity: number;
  actualDirectionChannel: direction;
  actualReverseDirection: boolean;
  actualHueChannel: direction;
  actualReverseHue: boolean;
  actualParticleTraceWidth: number;
}

export interface IActualParticalizorVortexPropertyValues {
  actualParticleNumber: number;
  actualParticleLifeTime: number;
  actualParticleTraceWidth: number;
  actualImageWidth: number;
  actualImageHeight: number;
  actualVortexNumber: number;
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

export interface IParticalizorVortexSettingNames {
  particleLifeTime: number;
  particleTraceWidth: number;
  particleNumber: number;
  imageWidth: number;
  imageHeight: number;
  vortexNumber: number;
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

export enum particalizorVortexSettingNames {
  particleLifeTime = "particleLifeTime",
  particleTraceWidth = "particleTraceWidth",
  particleNumber = "particleNumber",
  imageWidth = "imageWidth",
  imageHeight = "imageHeight",
  vortexNumber = "vortexNumber"
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

export const defaultParticalizorVortexValues: IParticalizorVortexSettingNames = {
  particleLifeTime: 700,
  particleTraceWidth: 1,
  particleNumber: 7000,
  imageHeight: 400,
  imageWidth: 400,
  vortexNumber: 7
};

export const isProvidedValueReasonable = (
  settingName: particalizorSettingNames,
  providedSettingValue: any
) => {
  if (isNil(providedSettingValue)) {
    return false;
  }

  if (
    [
      particalizorSettingNames.directionChannel,
      particalizorSettingNames.hueChannel
    ].includes(settingName)
  ) {
    return !isNil(direction[providedSettingValue as direction]);
  }

  if (
    [
      particalizorSettingNames.hueReverse,
      particalizorSettingNames.directionReverse
    ].includes(settingName)
  ) {
    return typeof providedSettingValue === "boolean";
  }

  return typeof providedSettingValue === "number" && providedSettingValue > 0;
};

export const isProvidedVortexValueReasonable = (
  settingName: particalizorVortexSettingNames,
  providedSettingValue: any
) => {
  if (isNil(providedSettingValue)) {
    return false;
  }

  return typeof providedSettingValue === "number" && providedSettingValue > 0;
};

export const getReasonableValue = (
  settingName: particalizorSettingNames,
  providedSettingValue: any
) =>
  isProvidedValueReasonable(settingName, providedSettingValue)
    ? providedSettingValue
    : defaultParticalizorValues[settingName];

export const getReasonableVortexValue = (
  settingName: particalizorVortexSettingNames,
  providedSettingValue: any
) =>
  isProvidedVortexValueReasonable(settingName, providedSettingValue)
    ? providedSettingValue
    : defaultParticalizorVortexValues[settingName];

export const getActualValues: (
  particleNumber: number | null | undefined,
  particleLifeTime: number | null | undefined,
  particleVelocity: number | null | undefined,
  directionChannel: string | null | undefined,
  directionReverse: boolean | null | undefined,
  hueChannel: string | null | undefined,
  hueReverse: boolean | null | undefined,
  particleTraceWidth: number | null | undefined
) => IActualParticalizorPropertyValues = (
  particleNumber,
  particleLifeTime,
  particleVelocity,
  directionChannel,
  directionReverse,
  hueChannel,
  hueReverse,
  particleTraceWidth
) => {
  const actualParticleLifeTime = getReasonableValue(
    particalizorSettingNames.particleLifeTime,
    particleLifeTime
  );
  const actualParticleVelocity = getReasonableValue(
    particalizorSettingNames.particleVelocity,
    particleVelocity
  );
  const actualDirectionChannel: direction = getReasonableValue(
    particalizorSettingNames.directionChannel,
    directionChannel
  );
  const actualDirectionReverse = getReasonableValue(
    particalizorSettingNames.directionReverse,
    directionReverse
  );
  const actualHueChannel: direction = getReasonableValue(
    particalizorSettingNames.hueChannel,
    hueChannel
  );
  const actualHueReverse = getReasonableValue(
    particalizorSettingNames.hueReverse,
    hueReverse
  );
  const actualTraceWidth = getReasonableValue(
    particalizorSettingNames.particleTraceWidth,
    particleTraceWidth
  );
  const actualParticleNumber = getReasonableValue(
    particalizorSettingNames.particleNumber,
    particleNumber
  );

  return {
    actualDirectionChannel: actualDirectionChannel,
    actualReverseDirection: actualDirectionReverse,
    actualHueChannel: actualHueChannel,
    actualReverseHue: actualHueReverse,
    actualParticleLifeTime: actualParticleLifeTime,
    actualParticleNumber: actualParticleNumber,
    actualParticleVelocity: actualParticleVelocity,
    actualParticleTraceWidth: actualTraceWidth
  };
};

export const getActualParticleVortexValues: (
  particleNumber: number | null | undefined,
  particleLifeTime: number | null | undefined,
  particleTraceWidth: number | null | undefined,
  imageWidth: number | null | undefined,
  imageHeight: number | null | undefined,
  vortexNumber: number | null | undefined
) => IActualParticalizorVortexPropertyValues = (
  particleNumber,
  particleLifeTime,
  particleTraceWidth,
  imageWidth,
  imageHeight,
  vortexNumber
) => {
  const actualParticleLifeTime = getReasonableVortexValue(
    particalizorVortexSettingNames.particleLifeTime,
    particleLifeTime
  );
  const actualTraceWidth = getReasonableVortexValue(
    particalizorVortexSettingNames.particleTraceWidth,
    particleTraceWidth
  );
  const actualParticleNumber = getReasonableVortexValue(
    particalizorVortexSettingNames.particleNumber,
    particleNumber
  );
  const actualImageWidth = getReasonableVortexValue(
    particalizorVortexSettingNames.imageWidth,
    imageWidth
  );
  const actualImageHeight = getReasonableVortexValue(
    particalizorVortexSettingNames.imageHeight,
    imageHeight
  );
  const actualVortexNumber = getReasonableVortexValue(
    particalizorVortexSettingNames.vortexNumber,
    vortexNumber
  );

  return {
    actualParticleLifeTime: actualParticleLifeTime,
    actualParticleNumber: actualParticleNumber,
    actualParticleTraceWidth: actualTraceWidth,
    actualImageWidth: actualImageWidth,
    actualImageHeight: actualImageHeight,
    actualVortexNumber: actualVortexNumber
  };
};
