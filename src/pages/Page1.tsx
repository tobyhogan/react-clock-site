import { useState } from 'react';
import Clock from '../1-components-&-utilities/2-page-specific/1-page1/2-components/Component1';
//import AnalogClock from '../1-components-&-utilities/2-page-specific/1-page1/2-components/Component2';
import ReactClockComponent from '../1-components-&-utilities/2-page-specific/1-page1/2-components/Component3';


const Page1 = () => {
  const [showDigitalClock, setShowDigitalClock] = useState(true);
  const [showAnalogClock, setShowAnalogClock] = useState(true);

  return (
    <div className="flex mt-16 w-min mx-auto">


      <div className="w-64 bg-white dark:bg-neutral-800 border-2 border-neutral-300 dark:border-neutral-600 rounded-lg p-16 my-auto invisible">
        {/* Empty panel */}
      </div>

      {/* Center Content - Clocks */}
      <div className="flex-col mx-8">
        <ReactClockComponent showClock={showAnalogClock} />

        <div className='mt-12' ></div>

        <Clock showClock={showDigitalClock} />
      </div>

      {/* Right Panel - Checkboxes */}
      <div className="w-64 bg-white dark:bg-neutral-800 border-2 border-neutral-300 dark:border-neutral-600 rounded-lg p-4 my-auto">

        <h3 className="text-lg font-semibold mb-4 dark:text-white">Controls</h3>
        
        <div className="

          flex flex-col gap-3
          [&_input[type='checkbox']]:accent-gray-400 [&_input[type='checkbox']]:w-4
          [&_input[type='checkbox']]:h-4 [&_input[type='checkbox']]:cursor-pointer

        ">

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showAnalogClock}
              onChange={(e) => setShowAnalogClock(e.target.checked)}
            />
            <span className="text-sm font-medium dark:text-white">Show Analog Clock</span>
          </label>
          
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showDigitalClock}
              onChange={(e) => setShowDigitalClock(e.target.checked)}
            />
            <span className="text-sm font-medium dark:text-white">Show Digital Clock</span>
          </label>
        </div>
      </div>


    {/*

      <AnalogClock />

    */}






    </div>
  );
};

export default Page1;
