
export interface TimeServer {
  name: string;
  displayName: string;
  endpoint: string;
  description: string;
}

export interface Timezone {
  name: string;
  displayName: string;
  timezone: string;
  utcOffset: string;
}

export const timeServers: TimeServer[] = [
  { name: 'browser',     displayName: 'Browser Time',    endpoint: 'browser',                             description: 'Local system time' },
  { name: 'worldtimeapi', displayName: 'WorldTimeAPI',   endpoint: 'https://worldtimeapi.org/api/ip',     description: 'Open-source time API' },
  { name: 'google',      displayName: 'Google NTP',      endpoint: 'google',                              description: 'Google Public NTP (time.google.com)' },
  { name: 'cloudflare',  displayName: 'Cloudflare NTP',  endpoint: 'cloudflare',                          description: 'Cloudflare NTP (time.cloudflare.com)' },
];

export const timezones: Timezone[] = [
  { name: 'london', displayName: 'London', timezone: 'Europe/London',      utcOffset: 'UTC+0' },
  { name: 'berlin', displayName: 'Berlin', timezone: 'Europe/Berlin',      utcOffset: 'UTC+1' },
  { name: 'sydney', displayName: 'Sydney', timezone: 'Australia/Sydney',   utcOffset: 'UTC+11' },
];
