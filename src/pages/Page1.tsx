import { useState, useEffect } from 'react';

import Clock from 'react-clock/src/Clock.js';
//import AnalogClock from '../1-components-&-utilities/2-page-specific/1-page1/2-components/Component2';
import ReactClockComponent from '../components/area-2/2-components/Component3';

import { 
  DEFAULT_SHOW_DIGITAL_CLOCK, 
  DEFAULT_SHOW_ANALOG_CLOCK, 
  DEFAULT_ANALOG_CLOCK_SIZE, 
  DEFAULT_DIGITAL_CLOCK_SIZE 
} from '../config/defaults';

import { saveClockSettings, loadClockSettings } from '../utilities/localStorage';


const Page1 = () => {
  // Initialize state from localStorage or use defaults
  const initializeSettings = () => {
    const savedSettings = loadClockSettings();
    return {
      showDigitalClock: savedSettings?.showDigitalClock ?? DEFAULT_SHOW_DIGITAL_CLOCK,
      showAnalogClock: savedSettings?.showAnalogClock ?? DEFAULT_SHOW_ANALOG_CLOCK,
      analogClockSize: savedSettings?.analogClockSize ?? DEFAULT_ANALOG_CLOCK_SIZE,
      digitalClockSize: savedSettings?.digitalClockSize ?? DEFAULT_DIGITAL_CLOCK_SIZE,
    };
  };

  const settings = initializeSettings();
  const [showDigitalClock, setShowDigitalClock] = useState(settings.showDigitalClock);
  const [showAnalogClock, setShowAnalogClock] = useState(settings.showAnalogClock);
  const [analogClockSize, setAnalogClockSize] = useState(settings.analogClockSize); // Percentage
  const [digitalClockSize, setDigitalClockSize] = useState(settings.digitalClockSize); // Percentage

  // Save to localStorage whenever settings change
  useEffect(() => {
    saveClockSettings({
      showDigitalClock,
      showAnalogClock,
      analogClockSize,
      digitalClockSize,
    });
  }, [showDigitalClock, showAnalogClock, analogClockSize, digitalClockSize]);

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


    <div className="container mx-auto px-4 py-6 md:py-8">
      {/* Mobile-first layout: Stack vertically on mobile, horizontal on large screens */}
      <div className="flex flex-col lg:flex-row lg:justify-center items-center gap-6 lg:gap-8">

        {/* Left spacer - hidden on mobile, visible on large screens */}
        <div className="hidden lg:block w-64 bg-white dark:bg-neutral-800 border-2 border-neutral-300 dark:border-neutral-600 rounded-lg p-16 invisible">
          {/* Empty panel */}
        </div>

        {/* Center Content - Clocks */}
        <div className="flex flex-col items-center gap-8 md:gap-12 w-full lg:w-auto">
          <div className="w-full flex justify-center overflow-x-auto">
            <ReactClockComponent showClock={showAnalogClock} size={analogClockSize * 2} />
          </div>

          <div className="w-full flex justify-center">
            <Clock showClock={showDigitalClock} textSize={digitalClockSize * 0.07} />
          </div>
        </div>

        {/* Controls Panel - Full width on mobile, sidebar on large screens */}
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
                >
                  −
                </button>
                <button
                  onClick={() => setAnalogClockSize(DEFAULT_ANALOG_CLOCK_SIZE)}
                  className="flex-1 sm:flex-none px-3 md:px-4 py-2 md:py-1 text-sm md:text-base bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 dark:text-white rounded transition-colors touch-manipulation"
                  title="Reset to default"
                >
                  Reset
                </button>
                <button
                  onClick={() => setAnalogClockSize(prev => Math.min(200, prev + 10))}
                  className="flex-1 sm:flex-none px-3 md:px-4 py-2 md:py-1 text-sm md:text-base bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 dark:text-white rounded transition-colors touch-manipulation"
                  title="Increase size"
                >
                  +
                </button>
              </div>
              <div className="flex gap-2 mt-1">
                <button
                  onClick={() => setAnalogClockSize(210)}
                  className="flex-1 px-3 md:px-4 py-2 md:py-1 text-sm md:text-base bg-neutral-300 dark:bg-neutral-600 hover:bg-neutral-400 dark:hover:bg-neutral-500 dark:text-white rounded transition-colors touch-manipulation"
                  title="Set to 2100%"
                >
                  210%
                </button>
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
                >
                  −
                </button>
                <button
                  onClick={() => setDigitalClockSize(DEFAULT_DIGITAL_CLOCK_SIZE)}
                  className="flex-1 sm:flex-none px-3 md:px-4 py-2 md:py-1 text-sm md:text-base bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 dark:text-white rounded transition-colors touch-manipulation"
                  title="Reset to default"
                >
                  Reset
                </button>
                <button
                  onClick={() => setDigitalClockSize(prev => Math.min(200, prev + 10))}
                  className="flex-1 sm:flex-none px-3 md:px-4 py-2 md:py-1 text-sm md:text-base bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 dark:text-white rounded transition-colors touch-manipulation"
                  title="Increase size"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      </div>
    </div>


    {/*

      <AnalogClock />

    */}

    </>
  );
};

export default Page1;
