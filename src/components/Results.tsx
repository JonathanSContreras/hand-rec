
'use client';

import { Prediction } from '@/lib/types';

interface ResultsProps {
  predictions: Prediction[];
  inferenceTime: number | null;
  isLoading: boolean;
}

export default function Results({ predictions, inferenceTime, isLoading }: ResultsProps) {
  if (isLoading) {
    return <div className="mt-4 text-center">Loading model and predicting...</div>;
  }

  if (predictions.length === 0) {
    return <div className="mt-4 text-center">Draw a digit and click "Predict".</div>;
  }

  const topPrediction = predictions[0];

  return (
    <div className="mt-4" aria-live="polite">
      <h2 className="text-2xl font-bold text-center">
        It's a {topPrediction.label}
      </h2>
      <p className="text-center text-sm text-gray-500 dark:text-gray-400">
        Confidence: {(topPrediction.probability * 100).toFixed(2)}%
      </p>

      <div className="mt-4 space-y-2">
        {predictions.slice(0, 3).map(({ label, probability }) => (
          <div key={label} className="flex items-center gap-2">
            <div className="w-4 font-bold">{label}</div>
            <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700">
              <div
                className="bg-blue-600 h-4 rounded-full"
                style={{ width: `${probability * 100}%` }}
              ></div>
            </div>
            <div className="w-12 text-right text-sm">{(probability * 100).toFixed(1)}%</div>
          </div>
        ))}
      </div>

      {inferenceTime !== null && (
        <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-4">
          Inference time: {inferenceTime.toFixed(2)} ms
        </p>
      )}
    </div>
  );
}
