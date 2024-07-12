const { connectToWifi } = require('./utils/wifi.js');
const { startServer } = require('./utils/server.js');
const { initializeSettings } = require('./utils/settings.js');

async function main() {
  try {
    await initializeSettings();

    if (!process.env.WIFI_SSID || !process.env.WIFI_PASSWORD) {
      throw new Error(
        'Please provide a WIFI_SSID and WIFI_PASSWORD in your environment variables'
      );
    }

    await connectToWifi(process.env.WIFI_SSID, process.env.WIFI_PASSWORD);

    await startServer();
  } catch (error) {
    console.log(error);
  }
}

main();
