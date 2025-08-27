
import * as tf from '@tensorflow/tfjs';
import { Prediction } from './types';

let model: tf.LayersModel | null = null;
let loadingPromise: Promise<tf.LayersModel> | null = null;

const MODEL_URL = 'https://hpssjellis.github.io/beginner-tensorflowjs-examples-in-javascript/saved-models/mnist/convnet/my-mnist01.json';

async function loadModel(): Promise<tf.LayersModel> {
  if (model) {
    return model;
  }

  if (loadingPromise) {
    return loadingPromise;
  }

  loadingPromise = new Promise(async (resolve, reject) => {
    try {
      const loadedModel = await tf.loadLayersModel(MODEL_URL);
      model = loadedModel;
      resolve(loadedModel);
    } catch (error) {
      console.error('Error loading model:', error);
      reject(error);
    } finally {
      loadingPromise = null;
    }
  });

  return loadingPromise;
}

export async function predict(imageData: ImageData, isInverted: boolean): Promise<Prediction[]> {
  const model = await loadModel();

  const tensor = tf.tidy(() => {
    let img = tf.browser.fromPixels(imageData, 1).toFloat();
    // The model expects a black background and white foreground.
    // If the canvas is not inverted, we need to invert the colors.
    if (!isInverted) {
      img = tf.scalar(255).sub(img);
    }
    return img.div(tf.scalar(255.0)).expandDims();
  });

  const predictions = model.predict(tensor) as tf.Tensor;
  const probabilities = await predictions.data() as Float32Array;

  const result = Array.from(probabilities)
    .map((probability, i) => ({ label: i, probability }))
    .sort((a, b) => b.probability - a.probability);

  tf.dispose([tensor, predictions]);

  return result;
}

export function getModel() {
    return model;
}
