import React from "react";
import { mount, shallow } from "enzyme";
import ParticleVortex from "./ParticleVortex";
import ParticleVortexView from "../view/ParticleVortexView";

describe("Given a ParticleVortex", () => {
  describe("when rendering", () => {
    it("should match snapshot", () => {
      const component = shallow(
        <ParticleVortex imageWidth={100} imageHeight={100} vortexNumber={1} />
      );

      expect(component).toMatchSnapshot();
    });
    it("should render ParticleVortexView", () => {
      const component = mount(
        <ParticleVortex imageWidth={100} imageHeight={100} vortexNumber={1} />
      );

      expect(component.find(ParticleVortexView).length).toBe(1);
    });
  });
});
