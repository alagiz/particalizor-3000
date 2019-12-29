import React from "react";
import { shallow } from "enzyme";
import MovingPictureView from "./MovingPictureView";

describe("Given MovingPictureView", () => {
  describe("when rendering", () => {
    it("should have MovingPictureView matching snapshot", () => {
      const component = shallow(
        <MovingPictureView
          referenceCanvasRef={null}
          destinationCanvasRef={null}
        />
      );

      expect(component).toMatchSnapshot();
    });
  });
});
