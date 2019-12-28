import { createNewImage } from "./ImageUtils";

describe("createNewImage works as expected", () => {
  it("creates new image", () => {
    const image = createNewImage(jest.fn());

    expect(image).toBeDefined();
  });
});
