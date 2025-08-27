
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
    <div className="mt-4 space-y-4">
      <div className="grid grid-cols-3 gap-2">
        <button onClick={onPredict} disabled={isPredicting} className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400">Predict (P)</button>
        <button onClick={onClear} className="p-2 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600">Clear (C)</button>
        <button onClick={onUndo} className="p-2 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600">Undo (U)</button>
      </div>
      <div className="flex items-center gap-4">
        <label htmlFor="stroke-size" className="text-sm">Stroke Size</label>
        <input
          id="stroke-size"
          type="range"
          min="1"
          max="40"
          value={strokeSize}
          onChange={(e) => onStrokeSizeChange(Number(e.target.value))}
          className="w-full"
        />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm">Invert Colors</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" checked={isInverted} onChange={(e) => onInvertChange(e.target.checked)} className="sr-only peer" />
          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        </label>
      </div>
    </div>
  );
}
