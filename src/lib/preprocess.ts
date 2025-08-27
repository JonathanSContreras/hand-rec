
import * as tf from '@tensorflow/tfjs';

const TARGET_DIM = 28;
const TARGET_CENTER_DIM = 20;

export function preprocess(canvas: HTMLCanvasElement): ImageData {
  const context = canvas.getContext('2d');
  if (!context) {
    throw new Error('Could not get canvas context');
  }

  const inputImage = context.getImageData(0, 0, canvas.width, canvas.height);
  const { data, width, height } = inputImage;

  // Get bounding box
  let minX = width, minY = height, maxX = -1, maxY = -1;
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      const alpha = data[(i * width + j) * 4 + 3];
      if (alpha > 0) {
        if (j < minX) minX = j;
        if (j > maxX) maxX = j;
        if (i < minY) minY = i;
        if (i > maxY) maxY = i;
      }
    }
  }

  if (maxX === -1) { // Blank canvas
    return new ImageData(new Uint8ClampedArray(TARGET_DIM * TARGET_DIM * 4), TARGET_DIM, TARGET_DIM);
  }

  // Crop and scale
  const boxWidth = maxX - minX;
  const boxHeight = maxY - minY;
  const side = Math.max(boxWidth, boxHeight);
  const scaledSide = side * (TARGET_CENTER_DIM / side);

  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = scaledSide;
  tempCanvas.height = scaledSide;
  const tempCtx = tempCanvas.getContext('2d')!;

  tempCtx.drawImage(canvas, minX, minY, boxWidth, boxHeight, 0, 0, scaledSide, scaledSide);

  // Center on 28x28 canvas
  const finalCanvas = document.createElement('canvas');
  finalCanvas.width = TARGET_DIM;
  finalCanvas.height = TARGET_DIM;
  const finalCtx = finalCanvas.getContext('2d')!;

  const offsetX = (TARGET_DIM - scaledSide) / 2;
  const offsetY = (TARGET_DIM - scaledSide) / 2;

  finalCtx.drawImage(tempCanvas, offsetX, offsetY);

  return finalCtx.getImageData(0, 0, TARGET_DIM, TARGET_DIM);
}
