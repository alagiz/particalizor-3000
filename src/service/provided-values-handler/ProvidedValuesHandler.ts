import {
  defaultParticalizorValues,
  direction,
  particalizorSettingNames
} from "../particalizor-utils/ParticalizorUtils";
import { isNil } from "ramda";

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

export const getReasonableValue = (
  settingName: particalizorSettingNames,
  providedSettingValue: any
) =>
  isProvidedValueReasonable(settingName, providedSettingValue)
    ? providedSettingValue
    : defaultParticalizorValues[settingName];

export const getActualValues: (
  particleNumber: number | null | undefined,
  particleLifeTime: number | null | undefined,
  particleVelocity: number | null | undefined,
  directionChannel: "string" | null | undefined,
  directionReverse: boolean | null | undefined,
  hueChannel: "string" | null | undefined,
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
