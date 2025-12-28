import { useState } from 'react';
import Clock from '../1-components-&-utilities/2-page-specific/1-page1/2-components/Component1';
//import AnalogClock from '../1-components-&-utilities/2-page-specific/1-page1/2-components/Component2';
import ReactClockComponent from '../1-components-&-utilities/2-page-specific/1-page1/2-components/Component3';


const Page1 = () => {
  const [showDigitalClock, setShowDigitalClock] = useState(true);
  const [showAnalogClock, setShowAnalogClock] = useState(true);

  return (
    <div className="container mx-auto px-4 py-8">

      {/* Checkboxes */}
      <div className="flex justify-center gap-6 mb-8">
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

      <ReactClockComponent showClock={showAnalogClock} />

      <div className='mt-12' ></div>

      <Clock showClock={showDigitalClock} />
      

      {/*

        <AnalogClock />

      */}






    </div>
  );
};

export default Page1;
