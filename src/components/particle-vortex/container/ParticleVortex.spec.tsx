import React from "react";
import { mount } from "enzyme";
import ParticleVortex from "./ParticleVortex";
import ParticleVortexView from "../view/ParticleVortexView";

describe("Given a ParticleVortex", () => {
  describe("when rendering", () => {
    it("should render ParticleVortexView", () => {
      const component = mount(
        <ParticleVortex imageWidth={100} imageHeight={100} vortexNumber={1} />
      );

      expect(component.find(ParticleVortexView).length).toBe(1);
    });
  });
});
