# MNIST Digit Recognizer

A single-page React application built with Next.js that recognizes hand-drawn digits (0–9) using a pre-trained MNIST model with TensorFlow.js. The entire application runs in the browser.

## Features

- **Real-time digit recognition:** Draw a digit and get instant predictions.
- **Client-side inference:** No server backend required for ML inference.
- **Interactive UI:** Controls for clearing, undoing, and adjusting stroke size.
- **Dark Mode:** Themed for your viewing pleasure.
- **Responsive:** Works on desktop and mobile.

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TensorFlow.js](https://www.tensorflow.org/js)

## Prerequisites

- [Node.js](https://nodejs.org/en/) (v18.x or later)
- [npm](https://www.npmjs.com/)

## Getting Started

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd number-rec
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Run the development server:**

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts a production server.
- `npm run lint`: Lints the codebase.

## Model

The model is a pre-trained Convolutional Neural Network (CNN) for MNIST digit classification, provided by the TensorFlow.js examples.

- **Provenance:** The model is from the [tfjs-examples repository](https://github.com/tensorflow/tfjs-examples/tree/master/mnist-core).
- **License:** The model is licensed under the [Apache License 2.0](https://github.com/tensorflow/tfjs-examples/blob/master/LICENSE).

### Swapping the Model

To use a different model, place your `model.json` and weight files in the `public/model` directory and update the `MODEL_URL` constant in `src/lib/inference.ts`.

## Accuracy Tips

For best results:

- Draw the digit in the center of the canvas.
- Use a reasonably thick stroke.
- Make the digit fill a large portion of the canvas.

## Deployment

This application is ready to be deployed on [Vercel](https://vercel.com/). Simply connect your Git repository to Vercel and it will be deployed automatically.