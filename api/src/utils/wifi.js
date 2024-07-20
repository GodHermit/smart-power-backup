const { WiFi } = require('wifi');
const wifi = new WiFi();

/**
 * Returns a random port number
 * @returns {Promise<number>} A random port number
 */
export function getRandomPort() {
  const randomPort = Math.floor(Math.random() * 1000) + 1;

  return randomPort;
}

/**
 *
 * @param {string} ssid
 * @param {string} password
 */
export async function connectToWifi(ssid, password) {
  console.log('Connecting to WiFi....');
  return new Promise((res, rej) => {
    wifi.connect({ ssid, password }, (err) => {
      if (err) {
        console.error(err);
        rej(err);
      } else {
        res();
      }
    });
  });
}
