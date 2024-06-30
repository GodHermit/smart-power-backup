const { connectToWifi } = require('./utils/wifi.js');
const { startServer } = require('./utils/server.js');

async function main() {
  try {
    // TODO: Move SSID and password to environment variables or a configuration file
    // This is just for testing purposes (not a real SSID or password)
    await connectToWifi('testAP', '99999999');

    await startServer();
  } catch (error) {
    console.log(error)
  }
}


main();
