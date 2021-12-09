# particalizor-3000

react library capable of particalizing images; particalize your image right away!

[![build status][build badge]][BUILD_URL]
[![coverage status][coverage badge]][COVERAGE_URL]
[![codacy quality status][quality badge]][QUALITY_URL]
[![npm version][npm version badge]][NPM_VERSION_URL]
[![license][license badge]][LICENSE_URL]
[![npm downloads][npm downloads badge]][NPM_DOWNLOADS_URL]

## installation
```
yarn add particalizor-3000
```
## live demo
* available here => http://artem-alagizov.com/particalizor-3000-showcase
* [relaxator](https://github.com/ArtemAlagizov/relaxator) is based on **particalizor-3000** and available here => [http://artem-alagizov.com/relaxator](http://www.artem-alagizov.com/relaxator)
* github repo for the live demo app => [particalizor-showcase](https://github.com/ArtemAlagizov/particalizor-showcase)

## components
*  [**moving picture**](https://github.com/ArtemAlagizov/particalizor-3000/wiki/moving-picture): particalizes provided image
*  [**particle vortex**](https://github.com/ArtemAlagizov/particalizor-3000/wiki/particle-vortex): creates randomized particalized image with vortexes

## moving picture

|  original                      | particalized-3000                      | 
|:------------------------------:|:--------------------------------------:|
|![testImage](https://raw.githubusercontent.com/ArtemAlagizov/images-for-repos/master/particalizor-test-image.png)|![particalizedImage](https://raw.githubusercontent.com/ArtemAlagizov/images-for-repos/master/particalizor-image-particalized.gif)|

<details><summary>moving picture api</summary>
  
### description
particalizes provided image
  
**settings used to create the example image above**

```tsx
import React from "react";
import { MovingPicture } from "particalizor-3000";
import testImage from "./testImage.png";

export const MovingPictureApp: React.FC<IMovingPictureAppProps> = ({}) => {
  return (
    <MovingPicture
      imageSource={testImage}
      particleNumber={700}
      particleTraceWidth={2}
      particleLifeTime={7000}
      particleVelocity={1.3}
      directionChannel={"saturation"}
      hueChannel={"blue"}
    />
  );
}
```

### api

| property          |type|required|default|acceptable values|description  |
| ----------------- |------|---|---------|--------|--------------------------------------------------------------------------|
| imageSource       |string|yes| --      | valid image source|  source of the image,<br>either imported image (.png, .jpg),<br>either base64 representation (i.e.  "data:image/jpeg;base64,/9j/4A..") |
| particleNumber    |number|no | 7000    |  > 0 | number of particles                                    |
| particleTraceWidth|number|no | 1       |  > 0|width of a particle trace, essentially [canvas lineWidth](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineWidth)                    |
| particleLifeTime  |number|no | 700     | > 0| lifetime of a particle                                   |
| particleVelocity  |number|no | 1       | > 0| velocity of particles                                    |
| directionChannel  |string|no | "hue"   | "red","green",<br>"blue","hue",<br>"saturation","light" | enum of {"red","green","blue",<br>"hue","saturation","light"}|
| hueChannel        |string|no | "blue"  | "red","green"<br>,"blue","hue",<br>"saturation","light" | enum of {"red","green","blue",<br>"hue","saturation","light"}|
| reverseDirection  |boolean|no| false   | true,false | reverse direction                                |
| reverseHue        |boolean|no| false   | true,false | reverse hue                                      |
| randomizeSettings*|boolean|no| false   | true,false | randomize properties that are not passed in      |

\* not available yet

**property value falls back to default if provided proprety value is not acceptable**  
  
### example usage
```tsx
import React from "react";
import { MovingPicture } from "particalizor-3000";
import testImage from "./testImage.png";

export const MovingPictureApp: React.FC<IMovingPictureAppProps> = ({}) => {
  return (
    <MovingPicture
      imageSource={testImage}
    />
  );
}
```
or 
```js
import React from "react";
import "./App.css";
import { MovingPicture } from "particalizor-3000";
import testImage from "./testImage.png";

function App() {
  return <MovingPicture imageSource={testImage} />;
}

export default App; 
```
</details>

---

## particle vortex

|  particalized-3000             | 
|:------------------------------:|
|![particalizedImage](https://raw.githubusercontent.com/ArtemAlagizov/images-for-repos/master/particalizor-art-vortex.gif)|
|![particalizedImage](https://raw.githubusercontent.com/ArtemAlagizov/images-for-repos/master/particalizor-another-vortex.gif)|

<details><summary>particle vortex api</summary>

### description
creates randomized particalized image with vortexes

**settings used to create first example image above**
```tsx
import React from "react";
import { ParticleVortex } from "particalizor-3000";

export const ParticleVortexApp: React.FC<IParticleVortexAppProps> = ({}) => {
  return (
    <ParticleVortex
      imageWidth={840}
      imageHeight={384}
      vortexNumber={3}
      particleTraceWidth={600}
      particleNumber={30}
      particleLifeTime={1100}
    />
  );
}
```
**settings used to create second example image above**
```tsx
import React from "react";
import { ParticleVortex } from "particalizor-3000";

export const ParticleVortexApp: React.FC<IParticleVortexAppProps> = ({}) => {
  return (
    <ParticleVortex
      imageWidth={840}
      imageHeight={384}
      vortexNumber={7}
      particleTraceWidth={2}
      particleNumber={2400}
      particleLifeTime={100}
    />
  );
}
```

### api

| property          |type|required|default|acceptable values|description                                     |
| ----------------- |------|---|---------|--------|----------------------------------------------------------|
| vortexNumber      |number|no | 7       |  > 0 | number of vortexes                                         |
| imageWidth        |number|no | 400     |  > 0 | width of the resulting image                               |
| imageHeight       |number|no | 400     |  > 0 | height of the resulting image                              |
| particleNumber    |number|no | 7000    |  > 0 | number of particles                                        |
| particleTraceWidth|number|no | 1       |  > 0|width of a particle trace, essentially [canvas lineWidth](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineWidth)                        |
| particleLifeTime  |number|no | 700     | > 0| lifetime of a particle                                       |
| backgroundColor   |string|no | "#777"  | valid color string| background color, ie "red", "#333", "#333333" |
| randomizeSettings*|boolean|no| false   | true,false | randomize properties that are not passed in          |

\* not available yet

**property value falls back to default if provided proprety value is not acceptable**  
  
### example usage
```tsx
import React from "react";
import { ParticleVortex } from "particalizor-3000";

export const ParticleVortexApp: React.FC<IParticleVortexAppProps> = ({}) => {
  return (
    <ParticleVortex
      imageWidth={840}
      imageHeight={384}
      vortexNumber={7}
    />
  );
}
```
or 
```js
import React from "react";
import "./App.css";
import { ParticleVortex } from "particalizor-3000";
import testImage from "./testImage.png";

function App() {
  return <ParticleVortex imageWidth={840} imageHeight={384}/>;
}

export default App; 
```
</details>

---

## license

[MIT License](LICENSE)

[LICENSE_URL]: https://github.com/ArtemAlagizov/particalizor-3000/blob/master/LICENSE
[license badge]: https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square&color=blue
[BUILD_URL]: https://travis-ci.org/ArtemAlagizov/particalizor-3000
[build badge]: https://img.shields.io/travis/ArtemAlagizov/particalizor-3000/master?style=flat-square
[COVERAGE_URL]: https://coveralls.io/github/ArtemAlagizov/particalizor-3000?branch=master
[coverage badge]: https://img.shields.io/coveralls/github/ArtemAlagizov/particalizor-3000.svg?style=flat-square&color=brightgreen
[QUALITY_URL]: https://www.codacy.com/gh/ArtemAlagizov/particalizor-3000
[quality badge]: https://img.shields.io/codacy/grade/2d206da3e6d74d09b0d0de19932b6d98?style=flat-square
[NPM_VERSION_URL]: https://www.npmjs.com/package/particalizor-3000
[npm version badge]: https://img.shields.io/npm/v/particalizor-3000?style=flat-square&color=blue 
[NPM_DOWNLOADS_URL]: https://www.npmjs.com/package/particalizor-3000
[npm downloads badge]: https://img.shields.io/npm/dy/particalizor-3000?style=flat-square&color=blue 
