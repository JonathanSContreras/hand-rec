
'use client';

import { useRef, useEffect, useState } from 'react';

interface DrawingCanvasProps {
  width: number;
  height: number;
  strokeSize: number;
  isInverted: boolean;
  onDraw: (canvas: HTMLCanvasElement) => void;
  clearCounter: number;
  undoCounter: number;
}

type Point = { x: number; y: number };

export default function DrawingCanvas({
  width,
  height,
  strokeSize,
  isInverted,
  onDraw,
  clearCounter,
  undoCounter,
}: DrawingCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [strokes, setStrokes] = useState<Point[][]>([]);
  const [currentStroke, setCurrentStroke] = useState<Point[]>([]);

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = isInverted ? 'black' : 'white';
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = isInverted ? 'white' : 'black';
    ctx.lineWidth = strokeSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    [...strokes, currentStroke].forEach(stroke => {
      if (stroke.length === 0) return;
      ctx.beginPath();
      ctx.moveTo(stroke[0].x, stroke[0].y);
      stroke.forEach(point => ctx.lineTo(point.x, point.y));
      ctx.stroke();
    });
  };

  useEffect(() => {
    draw();
    if (canvasRef.current) {
        onDraw(canvasRef.current);
    }
  }, [strokes, currentStroke, isInverted, strokeSize]);

  useEffect(() => {
    setStrokes([]);
    setCurrentStroke([]);
  }, [clearCounter]);

  useEffect(() => {
    if (strokes.length > 0) {
      setStrokes(strokes.slice(0, -1));
    }
  }, [undoCounter]);

  const getPoint = (e: React.MouseEvent | React.TouchEvent): Point => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    if ('touches' in e.nativeEvent) {
      return { 
        x: e.nativeEvent.touches[0].clientX - rect.left,
        y: e.nativeEvent.touches[0].clientY - rect.top
      };
    }
    return { 
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY
    };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    setCurrentStroke([getPoint(e)]);
  };

  const continueDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    setCurrentStroke(prev => [...prev, getPoint(e)]);
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    if (currentStroke.length > 0) {
      setStrokes(prev => [...prev, currentStroke]);
    }
    setCurrentStroke([]);
  };

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      onMouseDown={startDrawing}
      onMouseMove={continueDrawing}
      onMouseUp={stopDrawing}
      onMouseLeave={stopDrawing}
      onTouchStart={startDrawing}
      onTouchMove={continueDrawing}
      onTouchEnd={stopDrawing}
      className="touch-none border border-gray-300 dark:border-gray-600 rounded-md"
    />
  );
}
