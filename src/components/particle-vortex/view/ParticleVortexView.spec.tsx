import React from "react";
import { shallow } from "enzyme";
import ParticleVortexView from "./ParticleVortexView";

describe("Given ParticleVortexView", () => {
  describe("when rendering", () => {
    it("should have ParticleVortexView matching snapshot", () => {
      const component = shallow(
        <ParticleVortexView destinationCanvasRef={null} />
      );

      expect(component).toMatchSnapshot();
    });
  });
});
