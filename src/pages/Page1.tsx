import { useState } from 'react';
import Clock from '../1-components-&-utilities/2-page-specific/1-page1/2-components/Component1';
//import AnalogClock from '../1-components-&-utilities/2-page-specific/1-page1/2-components/Component2';
import ReactClockComponent from '../1-components-&-utilities/2-page-specific/1-page1/2-components/Component3';


const Page1 = () => {
  const [showDigitalClock, setShowDigitalClock] = useState(true);
  const [showAnalogClock, setShowAnalogClock] = useState(true);

  return (
    <>

      <style>{`
        .custom-checkbox input[type='checkbox'] {
          appearance: none;
          -webkit-appearance: none;
          width: 1rem;
          height: 1rem;
          border: 2px solid #767a80;
          border-radius: 0.25rem;
          background-color: #2e2e2e;
          cursor: pointer;
          position: relative;
        }
        
        .custom-checkbox input[type='checkbox']:checked {
          background-color: #898f99;
        }
        
        .custom-checkbox input[type='checkbox']:checked::after {
          content: '✓';
          position: absolute;
          color: white;
          font-size: 0.75rem;
          top: 40%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        
        .custom-checkbox input[type='checkbox']:hover {
          background-color: #1f1f1f;
        }
        
        .custom-checkbox input[type='checkbox']:checked:hover {
          background-color: #6b7280;

        }

        
      `}</style>


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
        
        <div className="custom-checkbox flex flex-col gap-3">

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
    </>
  );
};

export default Page1;
