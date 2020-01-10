import React from "react";
import { mount } from "enzyme";
import MovingPicture from "./MovingPicture";
import MovingPictureView from "../view/MovingPictureView";

describe("Given a MovingPicture", () => {
  describe("when rendering", () => {
    it("should render MovingPictureView", () => {
      const component = mount(<MovingPicture imageSource={""} />);

      expect(component.find(MovingPictureView).length).toBe(1);
    });
  });
});
