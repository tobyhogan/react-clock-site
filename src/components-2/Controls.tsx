
const Controls = () => {



  return (

      <div className="flex flex-col items-center gap-4 md:gap-6 w-full max-w-[500px] px-4">
        {/* Timezone Dropdown */}
        <div className="flex flex-col items-center gap-2 w-full">
          <label htmlFor="timezone-select" className="text-sm md:text-base font-medium dark:text-white">
            City / Timezone:
          </label>
          <select
            id="timezone-select"
            value={selectedTimezone.name}
            onChange={(e) => {
              const tz = timezones.find((t) => t.name === e.target.value);
              if (tz) setSelectedTimezone(tz);
            }}
            className="px-4 md:px-6 py-3 rounded-lg font-medium bg-neutral-100 dark:bg-neutral-700 dark:text-white border border-neutral-300 dark:border-neutral-600 focus:outline-none focus:ring-2 focus:ring-neutral-500 dark:focus:ring-neutral-400 cursor-pointer w-full touch-manipulation"
          >
            {timezones.map((tz) => (
              <option key={tz.name} value={tz.name}>
                {tz.displayName} ({tz.utcOffset})
              </option>
            ))}
          </select>
          
          <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1 text-center max-w-full">
            Display time in this timezone
          </p>
        </div>

        {/* Time Server Dropdown */}
        <div className="flex flex-col items-center gap-2 w-full">
          <label htmlFor="server-select" className="text-sm md:text-base font-medium dark:text-white">
            Time Server:
          </label>
          <select
            id="server-select"
            value={selectedServer.name}
            onChange={(e) => {
              const server = timeServers.find((s) => s.name === e.target.value);
              if (server) setSelectedServer(server);
            }}
            className="px-4 md:px-6 py-3 rounded-lg font-medium bg-neutral-100 dark:bg-neutral-700 dark:text-white border border-neutral-300 dark:border-neutral-600 focus:outline-none focus:ring-2 focus:ring-neutral-500 dark:focus:ring-neutral-400 cursor-pointer w-full touch-manipulation"
          >
            {timeServers.map((server) => (
              <option key={server.name} value={server.name}>
                {server.displayName}
              </option>
            ))}
          </select>
          
          <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1 text-center max-w-full">
            {selectedServer.description}
          </p>
        </div>
      </div>



  )

  

  
}

export default Controls



