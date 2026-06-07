import { useState, useEffect } from 'react';

import ReactClockComponent from '../components-2/1-AnalogClock.tsx';
import Clock from '../components-2/2-DigitalClock.tsx';
import Controls from '../components-2/Controls.tsx';
import TimezoneSelector from '../components-2/TimezoneSelector.tsx';

import { DEFAULT_SHOW_DIGITAL_CLOCK, DEFAULT_SHOW_ANALOG_CLOCK, DEFAULT_ANALOG_CLOCK_SIZE, DEFAULT_DIGITAL_CLOCK_SIZE } from '../config/defaults';
import { timezones, timeServers } from '../config/clockData';
import type { Timezone, TimeServer } from '../config/clockData';
import { saveClockSettings, loadClockSettings } from '../utilities/localStorage';


const Page1 = () => {
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
  const [analogClockSize, setAnalogClockSize] = useState(settings.analogClockSize);
  const [digitalClockSize, setDigitalClockSize] = useState(settings.digitalClockSize);
  const [selectedTimezone, setSelectedTimezone] = useState<Timezone>(timezones[0]);
  const [selectedServer, setSelectedServer] = useState<TimeServer>(timeServers[0]);

  useEffect(() => {
    saveClockSettings({ showDigitalClock, showAnalogClock, analogClockSize, digitalClockSize });
  }, [showDigitalClock, showAnalogClock, analogClockSize, digitalClockSize]);

  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      <div className="flex flex-col lg:flex-row lg:justify-center items-center gap-6 lg:gap-8">

        {/* Left spacer - invisible placeholder to balance the controls sidebar */}
        <div className="hidden lg:block w-64 bg-white dark:bg-neutral-800 border-2 border-neutral-300 dark:border-neutral-600 rounded-lg p-16 invisible" />

        {/* Center column: clocks + timezone selector */}
        <div className="flex flex-col items-center gap-8 md:gap-12 w-full lg:w-auto">
          <div className="w-full flex justify-center overflow-x-auto">
            <ReactClockComponent showClock={showAnalogClock} size={analogClockSize * 2} />
          </div>
          <div className="w-full flex justify-center">
            <Clock
              showClock={showDigitalClock}
              textSize={digitalClockSize * 0.07}
              selectedTimezone={selectedTimezone}
              selectedServer={selectedServer}
            />
          </div>
          <TimezoneSelector
            selectedTimezone={selectedTimezone}
            setSelectedTimezone={setSelectedTimezone}
            selectedServer={selectedServer}
            setSelectedServer={setSelectedServer}
          />
        </div>

        {/* Right sidebar: clock visibility + size controls */}
        <Controls
          showAnalogClock={showAnalogClock}
          setShowAnalogClock={setShowAnalogClock}
          showDigitalClock={showDigitalClock}
          setShowDigitalClock={setShowDigitalClock}
          analogClockSize={analogClockSize}
          setAnalogClockSize={setAnalogClockSize}
          digitalClockSize={digitalClockSize}
          setDigitalClockSize={setDigitalClockSize}
        />

      </div>
    </div>
  );
};

export default Page1;
