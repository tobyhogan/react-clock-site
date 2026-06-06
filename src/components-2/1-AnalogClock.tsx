import { useEffect, useState } from 'react';
import Clock from 'react-clock';

// if you remove the line below, the styling for the clock breaks

import 'react-clock/dist/Clock.css';

interface ReactClockComponentProps {
  showClock: boolean;
  size?: number;
}

const ReactClockComponent = ({ showClock, size = 200 }: ReactClockComponentProps) => {
  const [value, setValue] = useState(new Date());
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  
  // Calculate responsive size
  const getResponsiveSize = () => {
    const maxWidth = windowWidth < 768 ? windowWidth * 0.7 : size;
    return Math.min(size, maxWidth);
  };

  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  

  return (

    <div className="flex flex-col items-center justify-center w-full  rounded-lg">

      <div className="bg-neutral-100 dark:bg-neutral-800 p-4 md:p-6 rounded-lg max-w-full border-2 border-neutral-600"> 
        
          {showClock && (
            <div className="bg-white rounded-full p-2 inline-flex items-center justify-center" style={{ maxWidth: '100%' }}>
              <Clock 
                value={value} 
                size={getResponsiveSize()} 
                renderNumbers={true}
                hourHandWidth={4}
                minuteHandWidth={3}
                secondHandWidth={3}
              />
            </div>
  

  )}</div></div>);
};

export default ReactClockComponent;



/*
  <h2 className="text-lg font-semibold mb-3 dark:text-white text-center">React Clock Package</h2>

  */