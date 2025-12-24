import { useState, useEffect } from 'react';

interface TimeServer {
  name: string;
  city: string;
  timezone: string;
  utcOffset: string;
}

const timeServers: TimeServer[] = [
  { name: 'London', city: 'London', timezone: 'Europe/London', utcOffset: 'UTC+0' },
  { name: 'Berlin', city: 'Berlin', timezone: 'Europe/Berlin', utcOffset: 'UTC+1' },
  { name: 'Sydney', city: 'Sydney', timezone: 'Australia/Sydney', utcOffset: 'UTC+11' },
];

const Clock = () => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [selectedServer, setSelectedServer] = useState<TimeServer>(timeServers[0]);

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

  const displayTime = formatTime(currentTime, selectedServer.timezone);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8">
      {/* Raised Clock Widget */}
      <div className="bg-white dark:bg-gray-800 border-2 border-gray-600 rounded-2xl p-12 min-w-[400px] pt-12 pb-16">

        <div className="text-center">

          <h2 className="text-3xl font-semibold mb-6 dark:text-white">
            {selectedServer.city}
          </h2>


          <div className="text-center text-7xl font-medium dark:text-white">
            {displayTime}
          </div>


        </div>
      </div>

      {/* Location Dropdown */}
      <div className="flex flex-col items-center gap-2">
        <label htmlFor="timezone-select" className="text-sm font-medium dark:text-white">
          Select Location:
        </label>
        <select
          id="timezone-select"
          value={selectedServer.name}
          onChange={(e) => {
            const server = timeServers.find((s) => s.name === e.target.value);
            if (server) setSelectedServer(server);
          }}
          className="px-6 py-3 rounded-lg font-medium bg-gray-100 dark:bg-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer min-w-[300px]"
        >
          {timeServers.map((server) => (
            <option key={server.name} value={server.name}>
              {server.city} ({server.utcOffset})
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Clock;
