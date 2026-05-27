import { createRef } from "react";
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ParticleVortexView from "./ParticleVortexView";

describe("ParticleVortexView", () => {
  it("renders the destination canvas", () => {
    const { container } = render(
      <ParticleVortexView
        destinationCanvasRef={createRef<HTMLCanvasElement>()}
      />,
    );

    expect(
      container.querySelector(".particalizor-3000-destination-canvas"),
    ).toBeInTheDocument();
  });
});
