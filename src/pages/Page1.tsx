import { useState } from 'react';
import Clock from '../1-components-&-utilities/2-page-specific/1-page1/2-components/Component1';
//import AnalogClock from '../1-components-&-utilities/2-page-specific/1-page1/2-components/Component2';
import ReactClockComponent from '../1-components-&-utilities/2-page-specific/1-page1/2-components/Component3';


const Page1 = () => {
  const [showDigitalClock, setShowDigitalClock] = useState(true);
  const [showAnalogClock, setShowAnalogClock] = useState(true);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex gap-8">
        {/* Left Panel - Empty for now */}

        
        <div className="w-64 bg-white dark:bg-neutral-800 border-2 border-neutral-300 dark:border-neutral-600 rounded-lg p-4">
          {/* Empty panel */}
        </div>

        {/* Center Content - Clocks */}
        <div className="flex-1">
          <ReactClockComponent showClock={showAnalogClock} />

          <div className='mt-12' ></div>

          <Clock showClock={showDigitalClock} />
        </div>

        {/* Right Panel - Checkboxes */}
        <div className="w-64 bg-white dark:bg-neutral-800 border-2 border-neutral-300 dark:border-neutral-600 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4 dark:text-white">Controls</h3>
          
          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showAnalogClock}
                onChange={(e) => setShowAnalogClock(e.target.checked)}
                className="w-4 h-4 cursor-pointer"
              />
              <span className="text-sm font-medium dark:text-white">Show Analog Clock</span>
            </label>
            
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showDigitalClock}
                onChange={(e) => setShowDigitalClock(e.target.checked)}
                className="w-4 h-4 cursor-pointer"
              />
              <span className="text-sm font-medium dark:text-white">Show Digital Clock</span>
            </label>
          </div>
        </div>
      </div>
      

      {/*

        <AnalogClock />

      */}






    </div>
  );
};

export default Page1;
