import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import MovingPicture from "./MovingPicture";

describe("MovingPicture", () => {
  it("renders without crashing and mounts the destination canvas", () => {
    const { container } = render(<MovingPicture imageSource="" />);

    expect(
      container.querySelector(".particalizor-3000-destination-canvas"),
    ).toBeInTheDocument();
  });
});
