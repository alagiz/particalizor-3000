export const rgbToHsl = (red: number, green: number, blue: number) => {
  red /= 255;
  green /= 255;
  blue /= 255;

  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const light = (max + min) / 2;
  let hue = (max + min) / 2;
  let saturation = (max + min) / 2;

  if (max === min) {
    hue = saturation = 0;
  } else {
    const difference = max - min;

    saturation =
      light > 0.5 ? difference / (2 - max - min) : difference / (max + min);

    switch (max) {
      case red:
        hue = (green - blue) / difference + (green < blue ? 6 : 0);

        break;
      case green:
        hue = (blue - red) / difference + 2;

        break;
      case blue:
        hue = (red - green) / difference + 4;

        break;
      default:
        hue = 1;

        break;
    }

    hue /= 6;
  }

  return [hue, saturation, light];
};
