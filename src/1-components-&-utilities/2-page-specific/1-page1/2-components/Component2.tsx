import { useEffect, useState } from 'react';

const AnalogClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  // Calculate angles for analog clock
  const secondsAngle = (seconds / 60) * 360;
  const minutesAngle = ((minutes + seconds / 60) / 60) * 360;
  const hoursAngle = ((hours % 12 + minutes / 60) / 12) * 360;

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="bg-neutral-100 dark:bg-neutral-800 p-6 rounded-lg">
        <h2 className="text-lg font-semibold mb-3 dark:text-white text-center">Analog Clock</h2>
          <svg width="200" height="200" viewBox="0 0 200 200" className="mx-auto">
            {/* Clock face */}
            <circle cx="100" cy="100" r="95" fill="white" stroke="black" strokeWidth="2" />
            
            {/* Hour markers */}
            {[...Array(12)].map((_, i) => {
              const angle = (i * 30 - 90) * (Math.PI / 180);
              const x1 = 100 + 85 * Math.cos(angle);
              const y1 = 100 + 85 * Math.sin(angle);
              const x2 = 100 + 75 * Math.cos(angle);
              const y2 = 100 + 75 * Math.sin(angle);
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="black"
                  strokeWidth="2"
                />
              );
            })}

            {/* Hour numbers */}
            {[...Array(12)].map((_, i) => {
              const hour = i === 0 ? 12 : i;
              const angle = (i * 30 - 90) * (Math.PI / 180);
              const x = 100 + 65 * Math.cos(angle);
              const y = 100 + 65 * Math.sin(angle);
              return (
                <text
                  key={`num-${i}`}
                  x={x}
                  y={y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="16"
                  fontWeight="bold"
                  fill="black"
                >
                  {hour}
                </text>
              );
            })}

            {/* Hour hand */}
            <line
              x1="100"
              y1="100"
              x2={100 + 40 * Math.sin((hoursAngle * Math.PI) / 180)}
              y2={100 - 40 * Math.cos((hoursAngle * Math.PI) / 180)}
              stroke="black"
              strokeWidth="6"
              strokeLinecap="round"
            />

            {/* Minute hand */}
            <line
              x1="100"
              y1="100"
              x2={100 + 60 * Math.sin((minutesAngle * Math.PI) / 180)}
              y2={100 - 60 * Math.cos((minutesAngle * Math.PI) / 180)}
              stroke="black"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Second hand */}
            <line
              x1="100"
              y1="100"
              x2={100 + 70 * Math.sin((secondsAngle * Math.PI) / 180)}
              y2={100 - 70 * Math.cos((secondsAngle * Math.PI) / 180)}
              stroke="red"
              strokeWidth="2"
              strokeLinecap="round"
            />

            {/* Center dot */}
            <circle cx="100" cy="100" r="5" fill="black" />
          </svg>
        </div>
    </div>
  );
};

export default AnalogClock;
