import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

const createCanvasContextStub = () =>
  new Proxy(
    {
      getImageData: () => ({ data: new Uint8ClampedArray(4) }),
    } as Record<string, unknown>,
    {
      get: (target, prop) => {
        if (prop in target) return target[prop as string];
        return vi.fn();
      },
      set: (target, prop, value) => {
        target[prop as string] = value;
        return true;
      },
    },
  );

HTMLCanvasElement.prototype.getContext = vi.fn(
  () => createCanvasContextStub(),
) as unknown as HTMLCanvasElement["getContext"];

window.requestAnimationFrame = vi.fn(() => 0);
window.cancelAnimationFrame = vi.fn();
