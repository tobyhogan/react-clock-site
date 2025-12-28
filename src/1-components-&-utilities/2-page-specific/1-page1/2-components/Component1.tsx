import { useState, useEffect } from 'react';

interface TimeServer {
  name: string;
  displayName: string;
  endpoint: string;
  description: string;
}

interface Timezone {
  name: string;
  displayName: string;
  timezone: string;
  utcOffset: string;
}

const timeServers: TimeServer[] = [
  { 
    name: 'browser', 
    displayName: 'Browser Time',
    endpoint: 'browser',
    description: 'Local system time'
  },
  { 
    name: 'worldtimeapi', 
    displayName: 'WorldTimeAPI',
    endpoint: 'https://worldtimeapi.org/api/ip',
    description: 'Open-source time API'
  },
  { 
    name: 'google', 
    displayName: 'Google NTP',
    endpoint: 'google',
    description: 'Google Public NTP (time.google.com)'
  },
  { 
    name: 'cloudflare', 
    displayName: 'Cloudflare NTP',
    endpoint: 'cloudflare',
    description: 'Cloudflare NTP (time.cloudflare.com)'
  },
];

const timezones: Timezone[] = [
  { 
    name: 'london', 
    displayName: 'London',
    timezone: 'Europe/London',
    utcOffset: 'UTC+0'
  },
  { 
    name: 'berlin', 
    displayName: 'Berlin',
    timezone: 'Europe/Berlin',
    utcOffset: 'UTC+1'
  },
  { 
    name: 'sydney', 
    displayName: 'Sydney',
    timezone: 'Australia/Sydney',
    utcOffset: 'UTC+11'
  },
];

const Clock = () => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [selectedServer, setSelectedServer] = useState<TimeServer>(timeServers[0]);
  const [selectedTimezone, setSelectedTimezone] = useState<Timezone>(timezones[0]);
  const [serverTime, setServerTime] = useState<Date | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch time from selected server
  useEffect(() => {
    const fetchServerTime = async () => {
      if (selectedServer.endpoint === 'browser') {
        // For browser time, don't set serverTime so it uses currentTime which updates every second
        setServerTime(null);
        setError(null);
        return;
      }
      
      if (selectedServer.endpoint === 'google' || selectedServer.endpoint === 'cloudflare') {
        // For NTP servers, use local time
        // (NTP protocol requires UDP which isn't available in browsers)
        setServerTime(new Date());
        setError(null);
        return;
      }

      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(selectedServer.endpoint);
        if (!response.ok) throw new Error('Failed to fetch time');
        
        const data = await response.json();
        const fetchedTime = new Date(data.datetime || data.utc_datetime);
        setServerTime(fetchedTime);
      } catch (err) {
        setError('Failed to fetch time from server');
        setServerTime(new Date()); // Fallback to local time
      } finally {
        setLoading(false);
      }
    };

    fetchServerTime();
    const interval = setInterval(fetchServerTime, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, [selectedServer]);

  // Update display time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (date: Date, timezone: string) => {
    const formatter = new Intl.DateTimeFormat('en-GB', {
      timeZone: timezone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
    return formatter.format(date);
  };

  const displayTime = formatTime(serverTime || currentTime, selectedTimezone.timezone);

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      {/* Raised Clock Widget */}
      <div className="bg-white dark:bg-neutral-800 border-2 border-neutral-600 rounded-2xl p-12 min-w-[400px] pt-12 pb-16">

        <div className="text-center">

          <h2 className="text-3xl font-semibold mb-2 dark:text-white">
            {selectedTimezone.displayName}
          </h2>
          
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            {selectedTimezone.utcOffset}
            {loading && <span className="ml-2">(Loading...)</span>}
          </p>

          <div className="text-center text-7xl font-medium dark:text-white tabular-nums">
            {displayTime}
          </div>

          {error && (
            <p className="text-sm text-red-500 mt-4">
              {error} - Showing local time
            </p>
          )}

          {selectedServer.endpoint !== 'browser' && (selectedServer.endpoint === 'google' || selectedServer.endpoint === 'cloudflare') && (
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-4">
              Note: NTP requires UDP protocol. Showing browser time.
            </p>
          )}

        </div>
      </div>

      {/* Controls Section */}
      <div className="flex flex-col items-center gap-6">
        {/* Timezone Dropdown */}
        <div className="flex flex-col items-center gap-2">
          <label htmlFor="timezone-select" className="text-sm font-medium dark:text-white">
            City / Timezone:
          </label>
          <select
            id="timezone-select"
            value={selectedTimezone.name}
            onChange={(e) => {
              const tz = timezones.find((t) => t.name === e.target.value);
              if (tz) setSelectedTimezone(tz);
            }}
            className="px-6 py-3 rounded-lg font-medium bg-neutral-100 dark:bg-neutral-700 dark:text-white border border-neutral-300 dark:border-neutral-600 focus:outline-none focus:ring-2 focus:ring-neutral-500 dark:focus:ring-neutral-400 cursor-pointer min-w-[250px]"
          >
            {timezones.map((tz) => (
              <option key={tz.name} value={tz.name}>
                {tz.displayName} ({tz.utcOffset})
              </option>
            ))}
          </select>
          
          <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1 text-center max-w-[250px]">
            Display time in this timezone
          </p>
        </div>

        {/* Time Server Dropdown */}
        <div className="flex flex-col items-center gap-2">
          <label htmlFor="server-select" className="text-sm font-medium dark:text-white">
            Time Server:
          </label>
          <select
            id="server-select"
            value={selectedServer.name}
            onChange={(e) => {
              const server = timeServers.find((s) => s.name === e.target.value);
              if (server) setSelectedServer(server);
            }}
            className="px-6 py-3 rounded-lg font-medium bg-neutral-100 dark:bg-neutral-700 dark:text-white border border-neutral-300 dark:border-neutral-600 focus:outline-none focus:ring-2 focus:ring-neutral-500 dark:focus:ring-neutral-400 cursor-pointer min-w-[250px]"
          >
            {timeServers.map((server) => (
              <option key={server.name} value={server.name}>
                {server.displayName}
              </option>
            ))}
          </select>
          
          <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1 text-center max-w-[250px]">
            {selectedServer.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Clock;
