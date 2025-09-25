
'use client';

import { Prediction } from '@/lib/types';

interface ResultsProps {
  predictions: Prediction[];
  inferenceTime: number | null;
  isLoading: boolean;
}

export default function Results({ predictions, inferenceTime, isLoading }: ResultsProps) {
  if (isLoading) {
    return <div className="mt-4 text-center text-gray-300">Loading model and predicting...</div>;
  }

  if (predictions.length === 0) {
    return <div className="mt-4 text-center text-gray-300">Draw a digit and click &quot;Predict&quot;.</div>;
  }

  const topPrediction = predictions[0];

  return (
    <div className="mt-4 p-4 bg-secondary rounded-lg shadow-md w-full" aria-live="polite">
      <h2 className="text-3xl font-bold text-center text-accent font-orbitron">
        It&apos;s a {topPrediction.label}
      </h2>
      <p className="text-center text-sm text-gray-400 mt-1">
        Confidence: {(topPrediction.probability * 100).toFixed(2)}%
      </p>

      <div className="mt-4 space-y-2">
        {predictions.slice(0, 5).map(({ label, probability }) => (
          <div key={label} className="flex items-center gap-2">
            <div className="w-6 font-bold text-lg text-gray-300">{label}</div>
            <div className="w-full bg-gray-700 rounded-full h-5">
              <div
                className="bg-accent h-5 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${probability * 100}%` }}
              ></div>
            </div>
            <div className="w-16 text-right text-sm text-gray-300">{(probability * 100).toFixed(1)}%</div>
          </div>
        ))}
      </div>

      {inferenceTime !== null && (
        <p className="text-center text-xs text-gray-500 mt-4">
          Inference time: {inferenceTime.toFixed(2)} ms
        </p>
      )}
    </div>
  );
}
