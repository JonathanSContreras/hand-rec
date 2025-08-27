
const tf = require('@tensorflow/tfjs-node');

function createModel() {
  const model = tf.sequential();

  // First convolutional layer
  model.add(tf.layers.conv2d({
    inputShape: [28, 28, 1],
    filters: 32,
    kernelSize: 3,
    activation: 'relu',
  }));

  // Second convolutional layer
  model.add(tf.layers.conv2d({
    filters: 64,
    kernelSize: 3,
    activation: 'relu',
  }));

  // Max pooling layer
  model.add(tf.layers.maxPooling2d({ poolSize: [2, 2] }));

  // Dropout layer
  model.add(tf.layers.dropout({ rate: 0.25 }));

  // Flatten layer
  model.add(tf.layers.flatten());

  // Dense layer
  model.add(tf.layers.dense({ units: 128, activation: 'relu' }));

  // Dropout layer
  model.add(tf.layers.dropout({ rate: 0.5 }));

  // Output layer
  model.add(tf.layers.dense({ units: 10, activation: 'softmax' }));

  return model;
}

module.exports = createModel;
