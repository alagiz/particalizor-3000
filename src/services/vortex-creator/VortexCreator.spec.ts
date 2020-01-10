import { isNil } from "ramda";
import { createVortex, createVortexes, IVortex } from "./VortexCreator";

describe("createVortex works as expected", () => {
  it("creates and returns a vortex", () => {
    const imageWidth = 0;
    const imageHeight = 50;

    const vortex: IVortex = createVortex(imageWidth, imageHeight);

    expect(vortex.x).toBeGreaterThanOrEqual(0);
    expect(vortex.x).toBeGreaterThanOrEqual(0);
    expect(vortex.radius).toBeGreaterThanOrEqual(0);
  });
});

describe("createVortexes works as expected", () => {
  it("creates and returns an array of vortexes", () => {
    const vortexNumber = 10;
    const imageWidth = 0;
    const imageHeight = 50;

    const vortexes: IVortex[] = createVortexes(
      vortexNumber,
      imageWidth,
      imageHeight
    );

    const vortex = vortexes[0];

    expect(vortexes.length).toBe(10);

    expect(!isNil(vortex.x)).toBeTruthy();
    expect(!isNil(vortex.y)).toBeTruthy();
    expect(!isNil(vortex.rotationDirection)).toBeTruthy();
    expect(!isNil(vortex.radialVelocityCoefficient)).toBeTruthy();
    expect(!isNil(vortex.angularVelocityExponentCoefficient)).toBeTruthy();
    expect(!isNil(vortex.radius)).toBeTruthy();
    expect(!isNil(vortex.angularVelocityMultiplyingCoefficient)).toBeTruthy();
  });
});
