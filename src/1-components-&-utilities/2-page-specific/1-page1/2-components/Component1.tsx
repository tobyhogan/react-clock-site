import { useState, useEffect } from 'react';

interface TimeServer {
  name: string;
  city: string;
  timezone: string;
}

const timeServers: TimeServer[] = [
  { name: 'London', city: 'London', timezone: 'Europe/London' },
  { name: 'Berlin', city: 'Berlin', timezone: 'Europe/Berlin' },
  { name: 'Sydney', city: 'Sydney', timezone: 'Australia/Sydney' },
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
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2 dark:text-white">
          {selectedServer.city}
        </h2>
        <div className="text-7xl font-bold font-mono dark:text-white">
          {displayTime}
        </div>
      </div>

      <div className="flex gap-4">
        {timeServers.map((server) => (
          <button
            key={server.name}
            onClick={() => setSelectedServer(server)}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              selectedServer.name === server.name
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {server.city}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Clock;
