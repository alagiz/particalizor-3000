import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ParticleVortex from "./ParticleVortex";

describe("ParticleVortex", () => {
  it("renders without crashing and mounts the destination canvas", () => {
    const { container } = render(
      <ParticleVortex imageWidth={100} imageHeight={100} vortexNumber={1} />,
    );

    expect(
      container.querySelector(".particalizor-3000-destination-canvas"),
    ).toBeInTheDocument();
  });
});
