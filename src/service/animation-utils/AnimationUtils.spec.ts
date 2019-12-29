import { moveParticles } from "./AnimationUtils";
import {
  createParticles,
  direction
} from "../particalizor-utils/ParticalizorUtils";
import { IActualParticalizorPropertyValues } from "../provided-values-handler/ProvidedValuesHandler";

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
    const particles = createParticles(1, 50, 50, 50);

    particles[0].TTL = -1;

    const particleX = particles[0].x;
    const particleY = particles[0].y;
    const particleTTL = particles[0].TTL;
    const particleLight = particles[0].light;
    const particleSaturation = particles[0].saturation;
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
    expect(particles[0].TTL).not.toBe(undefined);
    expect(particles[0].light).not.toBe(undefined);
    expect(particles[0].saturation).not.toBe(undefined);
    expect(particles[0].x).not.toBe(particleX);
    expect(particles[0].y).not.toBe(particleY);
    expect(particles[0].TTL).not.toBe(particleTTL);
    expect(particles[0].light).not.toBe(particleLight);
    expect(particles[0].saturation).not.toBe(particleSaturation);
  });
});
