import { useEffect, useState } from 'react';
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';

const ReactClockComponent = () => {
  const [value, setValue] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="bg-neutral-100 dark:bg-neutral-800 p-6 rounded-lg">
        <h2 className="text-lg font-semibold mb-3 dark:text-white text-center">React Clock Package</h2>
        <div className="flex justify-center">
          <div className="bg-white rounded-full p-2 inline-block">
            <Clock value={value} size={200} renderNumbers={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReactClockComponent;
