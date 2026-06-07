import React from 'react';
import { DEFAULT_ANALOG_CLOCK_SIZE, DEFAULT_DIGITAL_CLOCK_SIZE } from '../config/defaults';

interface ControlsProps {
  showAnalogClock: boolean;
  setShowAnalogClock: React.Dispatch<React.SetStateAction<boolean>>;
  showDigitalClock: boolean;
  setShowDigitalClock: React.Dispatch<React.SetStateAction<boolean>>;
  analogClockSize: number;
  setAnalogClockSize: React.Dispatch<React.SetStateAction<number>>;
  digitalClockSize: number;
  setDigitalClockSize: React.Dispatch<React.SetStateAction<number>>;
}

const Controls = ({
  showAnalogClock, setShowAnalogClock,
  showDigitalClock, setShowDigitalClock,
  analogClockSize, setAnalogClockSize,
  digitalClockSize, setDigitalClockSize,
}: ControlsProps) => {
  return (
    <>
      <style>{`
        .custom-checkbox input[type='checkbox'] {
          appearance: none;
          -webkit-appearance: none;
          width: 1.25rem;
          height: 1.25rem;
          min-width: 1.25rem;
          min-height: 1.25rem;
          border: 2px solid #767a80;
          border-radius: 0.25rem;
          background-color: #2e2e2e;
          cursor: pointer;
          position: relative;
          flex-shrink: 0;
        }

        @media (min-width: 768px) {
          .custom-checkbox input[type='checkbox'] {
            width: 1rem;
            height: 1rem;
            min-width: 1rem;
            min-height: 1rem;
          }
        }

        .custom-checkbox input[type='checkbox']:checked {
          background-color: #898f99;
        }

        .custom-checkbox input[type='checkbox']:checked::after {
          content: '✓';
          position: absolute;
          color: white;
          font-size: 0.875rem;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .custom-checkbox input[type='checkbox']:hover {
          background-color: #1f1f1f;
        }

        .custom-checkbox input[type='checkbox']:checked:hover {
          background-color: #898f99;
        }
      `}</style>

      <div className="w-full max-w-md lg:w-64 bg-white dark:bg-neutral-800 border-2 border-neutral-300 dark:border-neutral-600 rounded-lg p-4 md:p-6">

        <h3 className="text-lg md:text-xl font-semibold mb-4 dark:text-white">Controls</h3>

        <div className="custom-checkbox flex flex-col gap-4 md:gap-5">

          {/* Analog Clock Controls */}
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-3 cursor-pointer min-h-[44px]">
              <input
                type="checkbox"
                checked={showAnalogClock}
                onChange={(e) => setShowAnalogClock(e.target.checked)}
                className="flex-shrink-0"
              />
              <span className="text-sm md:text-base font-medium dark:text-white">Show Analog Clock</span>
            </label>

            <div className="ml-6 md:ml-7 flex flex-col gap-2">
              <span className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400">Size: {analogClockSize}%</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setAnalogClockSize(prev => Math.max(50, prev - 10))}
                  className="flex-1 sm:flex-none px-3 md:px-4 py-2 md:py-1 text-sm md:text-base bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 dark:text-white rounded transition-colors touch-manipulation"
                  title="Decrease size"
                >−</button>
                <button
                  onClick={() => setAnalogClockSize(DEFAULT_ANALOG_CLOCK_SIZE)}
                  className="flex-1 sm:flex-none px-3 md:px-4 py-2 md:py-1 text-sm md:text-base bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 dark:text-white rounded transition-colors touch-manipulation"
                  title="Reset to default"
                >Reset</button>
                <button
                  onClick={() => setAnalogClockSize(prev => Math.min(200, prev + 10))}
                  className="flex-1 sm:flex-none px-3 md:px-4 py-2 md:py-1 text-sm md:text-base bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 dark:text-white rounded transition-colors touch-manipulation"
                  title="Increase size"
                >+</button>
              </div>
              <div className="flex gap-2 mt-1">
                <button
                  onClick={() => setAnalogClockSize(210)}
                  className="flex-1 px-3 md:px-4 py-2 md:py-1 text-sm md:text-base bg-neutral-300 dark:bg-neutral-600 hover:bg-neutral-400 dark:hover:bg-neutral-500 dark:text-white rounded transition-colors touch-manipulation"
                  title="Set to 210%"
                >210%</button>
              </div>
            </div>
          </div>

          {/* Digital Clock Controls */}
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-3 cursor-pointer min-h-[44px]">
              <input
                type="checkbox"
                checked={showDigitalClock}
                onChange={(e) => setShowDigitalClock(e.target.checked)}
                className="flex-shrink-0"
              />
              <span className="text-sm md:text-base font-medium dark:text-white">Show Digital Clock</span>
            </label>

            <div className="ml-6 md:ml-7 flex flex-col gap-2">
              <span className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400">Size: {digitalClockSize}%</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setDigitalClockSize(prev => Math.max(20, prev - 10))}
                  className="flex-1 sm:flex-none px-3 md:px-4 py-2 md:py-1 text-sm md:text-base bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 dark:text-white rounded transition-colors touch-manipulation"
                  title="Decrease size"
                >−</button>
                <button
                  onClick={() => setDigitalClockSize(DEFAULT_DIGITAL_CLOCK_SIZE)}
                  className="flex-1 sm:flex-none px-3 md:px-4 py-2 md:py-1 text-sm md:text-base bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 dark:text-white rounded transition-colors touch-manipulation"
                  title="Reset to default"
                >Reset</button>
                <button
                  onClick={() => setDigitalClockSize(prev => Math.min(200, prev + 10))}
                  className="flex-1 sm:flex-none px-3 md:px-4 py-2 md:py-1 text-sm md:text-base bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 dark:text-white rounded transition-colors touch-manipulation"
                  title="Increase size"
                >+</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Controls;




