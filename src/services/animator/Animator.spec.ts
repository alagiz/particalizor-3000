import { moveParticles } from "./Animator";
import { createParticles } from "../particle-creator/ParticleCreator";
import { IActualParticalizorPropertyValues } from "../properties-handler/PropertiesHandler";
import { direction } from "../direction-calculator/DirectionCalculator";

describe("moveParticle works as expected", () => {
  it("changes a particle properties", () => {
    const actualValues: IActualParticalizorPropertyValues = {
      actualDirectionChannel: direction.hue,
      actualHueChannel: direction.blue,
      actualParticleLifeTime: 500,
      actualParticleVelocity: 50,
      actualReverseDirection: false,
      actualReverseHue: false,
      actualParticleNumber: 50,
      actualParticleTraceWidth: 1
    };
    const particles = createParticles(2, 50, 50, 50);

    particles[0].lifeTime = -1;
    particles[1].lifeTime = 1;

    const srcData: Uint8ClampedArray = new Uint8ClampedArray([17, -45.3]);
    const image = new Image();
    const destination2dContext = document
      .createElement("canvas")
      .getContext("2d");

    moveParticles(
      particles,
      srcData,
      actualValues,
      destination2dContext,
      image
    );

    expect(particles[0].x).not.toBe(undefined);
    expect(particles[0].y).not.toBe(undefined);
    expect(particles[0].lifeTime).not.toBe(undefined);
    expect(particles[0].light).not.toBe(undefined);
    expect(particles[0].saturation).not.toBe(undefined);
    expect(particles[1].x).not.toBe(undefined);
    expect(particles[1].y).not.toBe(undefined);
    expect(particles[1].lifeTime).not.toBe(undefined);
    expect(particles[1].light).not.toBe(undefined);
    expect(particles[1].saturation).not.toBe(undefined);
  });
});
