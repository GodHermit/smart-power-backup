const { startServer } = require('./utils/server.js');
const { initializeSettings, getSettings } = require('./utils/settings.js');
const { initializeAccessPoint } = require('./utils/ap.js');
const { PicoCYW43 } = require('pico_cyw43');
const pico_cyw43 = new PicoCYW43();

async function main() {
  let ledBlink;
  try {
    await initializeSettings();

    ledBlink = setInterval(() => {
      if (pico_cyw43.getGpio(0)) {
        pico_cyw43.putGpio(0, false);
      } else {
        pico_cyw43.putGpio(0, true);
      }
    }, 200);

    await initializeAccessPoint();
    await startServer();

  } catch (error) {
    console.log(error);
  } finally {
    const settings = getSettings();
    pico_cyw43.putGpio(0, settings.isPowerBackupEnabled);
    clearInterval(ledBlink);
  }
}

main();
