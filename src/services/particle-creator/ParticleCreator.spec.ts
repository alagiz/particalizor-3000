import { isNil } from "ramda";
import { createParticle, createParticles, IParticle } from "./ParticleCreator";

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
    expect(particle.lifeTime).toBeGreaterThanOrEqual(0);
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
    expect(!isNil(particles[0].lifeTime)).toBeTruthy();
  });
});
