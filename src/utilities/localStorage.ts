// localStorage utility functions for persisting clock settings

export interface ClockSettings {
  showDigitalClock: boolean;
  showAnalogClock: boolean;
  analogClockSize: number;
  digitalClockSize: number;
}

const CLOCK_SETTINGS_KEY = 'clockSettings';

export const saveClockSettings = (settings: ClockSettings): void => {
  try {
    localStorage.setItem(CLOCK_SETTINGS_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error('Error saving clock settings to localStorage:', error);
  }
};

export const loadClockSettings = (): ClockSettings | null => {
  try {
    const savedSettings = localStorage.getItem(CLOCK_SETTINGS_KEY);
    if (savedSettings) {
      return JSON.parse(savedSettings);
    }
  } catch (error) {
    console.error('Error loading clock settings from localStorage:', error);
  }
  return null;
};

export const clearClockSettings = (): void => {
  try {
    localStorage.removeItem(CLOCK_SETTINGS_KEY);
  } catch (error) {
    console.error('Error clearing clock settings from localStorage:', error);
  }
};
