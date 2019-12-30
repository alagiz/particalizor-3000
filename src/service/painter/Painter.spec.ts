import { createNewImage } from "./Painter";

describe("createNewImage works as expected", () => {
  it("creates new image", () => {
    const image = createNewImage(jest.fn());

    expect(image).toBeDefined();
  });
});
