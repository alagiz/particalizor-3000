import { createRef } from "react";
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import MovingPictureView from "./MovingPictureView";

describe("MovingPictureView", () => {
  it("renders destination and reference canvases", () => {
    const { container } = render(
      <MovingPictureView
        referenceCanvasRef={createRef<HTMLCanvasElement>()}
        destinationCanvasRef={createRef<HTMLCanvasElement>()}
      />,
    );

    expect(
      container.querySelector(".particalizor-3000-destination-canvas"),
    ).toBeInTheDocument();
    expect(container.querySelector("#referenceCanvas")).toBeInTheDocument();
  });
});
