import React from "react";
import { mount, shallow } from "enzyme";
import MovingPicture from "./MovingPicture";
import MovingPictureView from "../view/MovingPictureView";

describe("Given a MovingPicture", () => {
  describe("when rendering", () => {
    it("should match snapshot", () => {
      const component = shallow(<MovingPicture imageSource={""} />);

      expect(component).toMatchSnapshot();
    });
    it("should render MovingPictureView", () => {
      const component = mount(<MovingPicture imageSource={""} />);

      expect(component.find(MovingPictureView).length).toBe(1);
    });
  });
});
