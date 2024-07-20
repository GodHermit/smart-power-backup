const { PicoCYW43WIFI } = require('pico_cyw43');
const picoWifi = new PicoCYW43WIFI();

/**
 * Access Point options
 * @default
 * {
 *   ssid: 'smart_power_backup',
 *   password: '99999999',
 *   gateway: '192.168.0.1',
 *   subnet_mask: '255.255.0.0'
 * }
 */
export const apOptions = {
  ssid: process.env.ACCESS_POINT_SSID || 'smart_power_backup',
  password: process.env.ACCESS_POINT_PASSWORD || '99999999',
  gateway: process.env.ACCESS_POINT_GATEWAY || '192.168.0.1',
  subnet_mask: '255.255.0.0',
};

/**
 * Initializes the Wi-Fi Access Point
 * @returns {Promise<void>}
 */
export const initializeAccessPoint = async () => {
  console.log(`Initializing WIFI Access Point (${apOptions.ssid})...`);
  return await new Promise((res, rej) => {
    picoWifi.wifiApMode(apOptions, (err) => {
      if (err) {
        console.error(err);
        rej(err);
        return;
      }

      console.log(`Access Point (${apOptions.ssid}) initialized`);
      console.log(`Gateway: ${apOptions.gateway}`);
      res();
    });
  });
};
