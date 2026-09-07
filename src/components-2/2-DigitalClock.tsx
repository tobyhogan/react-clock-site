import { useState, useEffect } from 'react';
import type { TimeServer, Timezone } from '../config/clockData';


interface ClockProps { showClock: boolean; textSize?: number; selectedTimezone: Timezone; selectedServer: TimeServer; }


const Clock = ({ showClock, textSize = 7, selectedTimezone, selectedServer }: ClockProps) => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [serverTime, setServerTime] = useState<Date | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch time from selected server
  useEffect(() => {
    const fetchServerTime = async () => {
      if (selectedServer.endpoint === 'browser') {
        // For browser time, don't set serverTime so it uses currentTime which updates every second
        setServerTime(null); setError(null); return;

      }
      
      if (selectedServer.endpoint === 'google' || selectedServer.endpoint === 'cloudflare') {

        setServerTime(new Date()); setError(null); return;
      }

      setLoading(true); setError(null);
      
      try {
        const response = await fetch(selectedServer.endpoint);
        if (!response.ok) throw new Error('Failed to fetch time');
        
        const data = await response.json();
        const fetchedTime = new Date(data.datetime || data.utc_datetime);
        setServerTime(fetchedTime);
      } catch (err) { setError('Failed to fetch time from server'); setServerTime(new Date()); // Fallback to local time
      } finally { setLoading(false); }
    };

    fetchServerTime();
    const interval = setInterval(fetchServerTime, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, [selectedServer]);


  useEffect(() => { const interval = setInterval(() => { setCurrentTime(new Date()); }, 1000); return () => clearInterval(interval); 
  }, []);

  const formatTime = (date: Date, timezone: string) => {
    const formatter = new Intl.DateTimeFormat('en-GB', { timeZone: timezone, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
    return formatter.format(date);
  };

  const displayTime = formatTime(serverTime || currentTime, selectedTimezone.timezone);

  return (
    <div className="flex flex-col items-center justify-center gap-6 md:gap-8 w-full px-4">

      <div className="
        bg-white dark:bg-neutral-800 border-2 border-neutral-600 rounded-xl md:px-12 md:pt-8 md:pb-8 w-full max-w-[500px] pb-4"
      >

        <div className="text-center">
          {showClock && (
            <>
              <h2 className="text-2xl md:text-3xl font-semibold mb-2 dark:text-white"> {selectedTimezone.displayName} </h2>
              
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-4 md:mb-6">
                {selectedTimezone.utcOffset}
                {loading && <span className="ml-2">(Loading...)</span>}
              </p>

              <div className="text-center font-medium dark:text-white tabular-nums overflow-x-auto" style={{ fontSize: `${textSize}rem` }}>
                {displayTime}
              </div>

              {error && (
                <p className="text-xs md:text-sm text-red-500 mt-3 md:mt-4"> {error} - Showing local time </p>
              )}

              {selectedServer.endpoint !== 'browser' && (selectedServer.endpoint === 'google' || selectedServer.endpoint === 'cloudflare') && (
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-3 md:mt-4">
                  Note: NTP requires UDP protocol. Showing browser time.
                </p>
              )}
            </>
          )}
        </div>
      </div>

    </div>
  );
};

export default Clock; 




{/*

lines 26 & 27:

        // For NTP servers, use local time
        // (NTP protocol requires UDP which isn't available in browsers)


*/}