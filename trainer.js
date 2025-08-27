// Usage: node trainer.js --epochs 5 --model_save_path trained_model


const tf = require('@tensorflow/tfjs-node');
const argparse = require('argparse');
const data = require('./data.js');
const createModel = require('./new_model');

async function run(epochs, batchSize, modelSavePath) {
  await data.load();
  const trainData = data.nextTrainBatch(55000);
  const trainImages = trainData.xs.reshape([55000, 28, 28, 1]);
  const trainLabels = trainData.labels;
  const model = createModel();

  model.compile({
    optimizer: 'adam',
    loss: 'categoricalCrossentropy',
    metrics: ['accuracy'],
  });
  model.summary();

  const validationSplit = 0.15;

  // Train the model with labeled images
    await model.fit(trainImages, trainLabels, {
    epochs,
    callbacks: {
      onEpochEnd: (epoch, logs) => {
        console.log(`Epoch ${epoch + 1} of ${epochs} complete.`);
        if (logs) {
          console.log(`  Loss: ${logs.loss.toFixed(4)}, Accuracy: ${logs.acc.toFixed(4)}`);
        }
      }
    }
  });

  // Evaluate the trained model with a labeled test dataset
  const {xs: testImages, labels: testLabels} = data.getTestData();
  const evalOutput = model.evaluate(testImages, testLabels);

  console.log(`\nEvaluation result:\n` + `  Loss = ${evalOutput[0].dataSync()[0].toFixed(3)}; `+ `Accuracy = ${evalOutput[1].dataSync()[0].toFixed(3)}`);

  // Save the trained  model to disk
  if (modelSavePath != null) {
    await model.save(`file://${modelSavePath}`);
    console.log(`Saved model to path: ${modelSavePath}`);
  }
}

const parser = new argparse.ArgumentParser({
  description: 'TensorFlow.js-Node MNIST Example.',
  addHelp: true
});

parser.addArgument('--epochs', {
  type: 'int',
  defaultValue: 20,
  help: 'Number of epochs to train the model for.'
});

parser.addArgument('--batch_size', {
  type: 'int',
  defaultValue: 128,
  help: 'Batch size to be used during model training.'
})

parser.addArgument('--model_save_path', {
  type: 'string',
  help: 'Path to which the model will be saved after training.'
});
const args = parser.parseArgs();

run(args.epochs, args.batch_size, args.model_save_path);
