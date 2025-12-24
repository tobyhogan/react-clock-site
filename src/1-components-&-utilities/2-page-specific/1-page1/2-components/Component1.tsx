import { useState, useEffect } from 'react';

interface TimeServer {
  name: string;
  displayName: string;
  endpoint?: string;
  timezone?: string;
  description: string;
  type: 'api' | 'timezone';
}

const timeServers: TimeServer[] = [
  // Cities/Timezones
  { 
    name: 'london', 
    displayName: 'London',
    timezone: 'Europe/London',
    description: 'UTC+0',
    type: 'timezone'
  },
  { 
    name: 'berlin', 
    displayName: 'Berlin',
    timezone: 'Europe/Berlin',
    description: 'UTC+1',
    type: 'timezone'
  },
  { 
    name: 'sydney', 
    displayName: 'Sydney',
    timezone: 'Australia/Sydney',
    description: 'UTC+11',
    type: 'timezone'
  },
  // Time Server APIs
  { 
    name: 'worldtimeapi', 
    displayName: 'WorldTimeAPI',
    endpoint: 'https://worldtimeapi.org/api/ip',
    description: 'Open-source time API',
    type: 'api'
  },
  { 
    name: 'google', 
    displayName: 'Google NTP',
    endpoint: 'google',
    description: 'Google Public NTP (time.google.com)',
    type: 'api'
  },
  { 
    name: 'cloudflare', 
    displayName: 'Cloudflare NTP',
    endpoint: 'cloudflare',
    description: 'Cloudflare NTP (time.cloudflare.com)',
    type: 'api'
  },
];

const Clock = () => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [selectedServer, setSelectedServer] = useState<TimeServer>(timeServers[0]);
  const [serverTime, setServerTime] = useState<Date | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch time from selected server (for API types only)
  useEffect(() => {
    const fetchServerTime = async () => {
      // For timezone type, we don't need to fetch anything
      if (selectedServer.type === 'timezone') {
        setServerTime(null);
        setError(null);
        setLoading(false);
        return;
      }

      if (selectedServer.endpoint === 'google' || selectedServer.endpoint === 'cloudflare') {
        // For NTP servers, we'll use local time with a note
        // (NTP protocol requires UDP which isn't available in browsers)
        setServerTime(new Date());
        setError(null);
        return;
      }

      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(selectedServer.endpoint!);
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

  const formatTime = (date: Date, timezone?: string) => {
    const formatter = new Intl.DateTimeFormat('en-GB', {
      timeZone: timezone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
    return formatter.format(date);
  };

  const displayTime = selectedServer.type === 'timezone' 
    ? formatTime(currentTime, selectedServer.timezone)
    : formatTime(serverTime || currentTime);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8">
      {/* Raised Clock Widget */}
      <div className="bg-white dark:bg-gray-800 border-2 border-gray-600 rounded-2xl p-12 min-w-[400px] pt-12 pb-16">

        <div className="text-center">

          <h2 className="text-3xl font-semibold mb-2 dark:text-white">
            {selectedServer.displayName}
          </h2>
          
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            {selectedServer.description}
            {loading && <span className="ml-2">(Loading...)</span>}
          </p>

          <div className="text-center text-7xl font-medium dark:text-white">
            {displayTime}
          </div>

          {error && selectedServer.type === 'api' && (
            <p className="text-sm text-red-500 mt-4">
              {error} - Showing local time
            </p>
          )}

          {selectedServer.type === 'api' && (selectedServer.endpoint === 'google' || selectedServer.endpoint === 'cloudflare') && (
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-4">
              Note: NTP requires UDP protocol. Showing browser time.
            </p>
          )}

        </div>
      </div>

      {/* Time Server Dropdown */}
      <div className="flex flex-col items-center gap-2">
        <label htmlFor="server-select" className="text-sm font-medium dark:text-white">
          Select Time Server:
        </label>
        <select
          id="server-select"
          value={selectedServer.name}
          onChange={(e) => {
            const server = timeServers.find((s) => s.name === e.target.value);
            if (server) setSelectedServer(server);
          }}
          className="px-6 py-3 rounded-lg font-medium bg-gray-100 dark:bg-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer min-w-[300px]"
        >
          {timeServers.map((server) => (
            <option key={server.name} value={server.name}>
              {server.displayName}
            </option>
          ))}
        </select>
        
        <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 text-center max-w-[300px]">
          Current server: <span className="font-semibold">{selectedServer.displayName}</span>
        </p>
      </div>
    </div>
  );
};

export default Clock;
