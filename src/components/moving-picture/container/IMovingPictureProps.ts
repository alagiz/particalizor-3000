export interface IMovingPictureProps {
  particleNumber?: number | null;
  particleLifeTime?: number | null;
  particleVelocity?: number | null;
  directionChannel?: string | null;
  reverseDirection?: boolean | null;
  hueChannel?: string | null;
  reverseHue?: boolean | null;
  particleTraceWidth?: number | null;
  imageSource: string;
}
