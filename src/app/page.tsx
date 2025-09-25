
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';
import Controls from '@/components/Controls';
import Results from '@/components/Results';
import { Prediction } from '@/lib/types';
import { preprocess } from '@/lib/preprocess';
import { predict as runPrediction, getModel } from '@/lib/inference';

const DrawingCanvas = dynamic(() => import('@/components/DrawingCanvas'), { ssr: false });

export default function HomePage() {
  const [strokeSize, setStrokeSize] = useState(20);
  const [isInverted, setIsInverted] = useState(false);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [inferenceTime, setInferenceTime] = useState<number | null>(null);
  const [isPredicting, setIsPredicting] = useState(false);
  const [clearCounter, setClearCounter] = useState(0);
  const [undoCounter, setUndoCounter] = useState(0);
  const [modelError, setModelError] = useState<Error | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  const handleDraw = (canvas: HTMLCanvasElement) => {
    canvasRef.current = canvas;
    updatePreview();
  };

  const updatePreview = () => {
    if (!canvasRef.current || !previewCanvasRef.current) return;
    const processedData = preprocess(canvasRef.current);
    const previewCtx = previewCanvasRef.current.getContext('2d');
    if (previewCtx) {
      previewCtx.putImageData(processedData, 0, 0);
    }
  };

  const predict = useCallback(async () => {
    if (!canvasRef.current) return;

    setIsPredicting(true);
    setPredictions([]);
    setInferenceTime(null);
    setModelError(null);

    try {
      const startTime = performance.now();
      const processedData = preprocess(canvasRef.current);
      const results = await runPrediction(processedData, isInverted);
      const endTime = performance.now();

      setPredictions(results);
      setInferenceTime(endTime - startTime);
    } catch (error) {
      console.error('Prediction failed:', error);
      setModelError(error as Error);
    } finally {
      setIsPredicting(false);
    }
  }, [isInverted]);

  const clear = () => {
    setClearCounter(c => c + 1);
    setPredictions([]);
    setInferenceTime(null);
  };

  const undo = () => {
    setUndoCounter(c => c + 1);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'p') predict();
      if (e.key.toLowerCase() === 'c') clear();
      if (e.key.toLowerCase() === 'u') undo();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [predict]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 bg-primary">
      <h1 className="text-5xl font-bold text-center mb-8 font-orbitron">Digit Recognizer</h1>
      <div className="flex flex-col sm:flex-row gap-8">
        <div className="flex flex-col items-center">
          <DrawingCanvas
            width={384}
            height={384}
            strokeSize={strokeSize}
            isInverted={isInverted}
            onDraw={handleDraw}
            clearCounter={clearCounter}
            undoCounter={undoCounter}
          />
          <Controls
            onPredict={predict}
            onClear={clear}
            onUndo={undo}
            strokeSize={strokeSize}
            onStrokeSizeChange={setStrokeSize}
            isInverted={isInverted}
            onInvertChange={setIsInverted}
            isPredicting={isPredicting}
          />
        </div>
        <div className="flex flex-col items-center">
          <h3 className="text-2xl font-semibold mb-4 font-orbitron">Prediction</h3>
          <div className="w-72 h-72 bg-secondary rounded-lg flex items-center justify-center">
            <canvas
              ref={previewCanvasRef}
              width={28}
              height={28}
              className="border border-gray-600 rounded-md w-56 h-56 image-pixelated"
            />
          </div>
          {modelError && (
            <div className="mt-4 text-center text-red-500">
              <p>Failed to load model. Please try again.</p>
              <button onClick={predict} className="mt-2 p-2 bg-red-500 text-white rounded-md">Retry</button>
            </div>
          )}
          <Results predictions={predictions} inferenceTime={inferenceTime} isLoading={isPredicting && !getModel()} />
        </div>
      </div>
    </main>
  );
}
