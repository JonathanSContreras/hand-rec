
'use client';

interface ControlsProps {
  onPredict: () => void;
  onClear: () => void;
  onUndo: () => void;
  strokeSize: number;
  onStrokeSizeChange: (size: number) => void;
  isInverted: boolean;
  onInvertChange: (inverted: boolean) => void;
  isPredicting: boolean;
}

export default function Controls({
  onPredict,
  onClear,
  onUndo,
  strokeSize,
  onStrokeSizeChange,
  isInverted,
  onInvertChange,
  isPredicting,
}: ControlsProps) {
  return (
    <div className="mt-4 space-y-4 p-4 bg-secondary rounded-lg shadow-md">
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={onPredict}
          disabled={isPredicting}
          className="p-3 text-lg bg-accent text-white rounded-lg shadow-md hover:bg-blue-600 disabled:bg-gray-700 disabled:cursor-not-allowed transition-all duration-200 font-semibold transform hover:scale-105"
        >
          Predict (P)
        </button>
        <button
          onClick={onClear}
          className="p-3 text-lg bg-gray-700 text-white rounded-lg shadow-md hover:bg-gray-600 transition-all duration-200 border border-gray-600 transform hover:scale-105"
        >
          Clear (C)
        </button>
        <button
          onClick={onUndo}
          className="p-3 text-lg bg-gray-700 text-white rounded-lg shadow-md hover:bg-gray-600 transition-all duration-200 border border-gray-600 transform hover:scale-105"
        >
          Undo (U)
        </button>
      </div>
      <div className="flex items-center gap-4">
        <label htmlFor="stroke-size" className="text-sm text-gray-300">Stroke Size</label>
        <input
          id="stroke-size"
          type="range"
          min="1"
          max="40"
          value={strokeSize}
          onChange={(e) => onStrokeSizeChange(Number(e.target.value))}
          className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-accent"
        />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-300">Invert Colors</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={isInverted}
            onChange={(e) => onInvertChange(e.target.checked)}
            className="sr-only peer"
            aria-label="Invert Colors"
          />
          <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-focus:ring-4 peer-focus:ring-accent dark:peer-focus:ring-blue-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-accent"></div>
        </label>
      </div>
    </div>
  );
}
