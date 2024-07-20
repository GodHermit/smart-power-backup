const { APP_SETTINGS_KEY, initialSettings } = require('../configs/settings.js');
const { GPIO } = require('gpio');
const { PicoCYW43 } = require('pico_cyw43');
const pico_cyw43 = new PicoCYW43();

export const initializeSettings = async () => {
  const settings = storage.getItem(APP_SETTINGS_KEY);

  if (!settings) {
    console.log(
      'Settings not found, initializing with default settings:',
      initialSettings
    );
    storage.setItem(APP_SETTINGS_KEY, JSON.stringify(initialSettings));
    runSettings(initialSettings);
    return initialSettings;
  } else {
    console.log('Settings from storage:', settings);
    runSettings(JSON.parse(settings));
    return JSON.parse(settings);
  }
};

export const getSettings = () => {
  const settings = storage.getItem(APP_SETTINGS_KEY);
  return JSON.parse(settings);
};

export const setSettings = (settings) => {
  storage.setItem(APP_SETTINGS_KEY, JSON.stringify(settings));
  runSettings(settings);
  return getSettings();
};

export const runSettings = (settings) => {
  const powerBackPin = new GPIO(0, OUTPUT);

  if (settings.isPowerBackupEnabled) {
    powerBackPin.write(HIGH);
    pico_cyw43.putGpio(0, true); // turn-on LED
  } else {
    powerBackPin.write(LOW);
    pico_cyw43.putGpio(0, false); // turn-off LED
  }
};
