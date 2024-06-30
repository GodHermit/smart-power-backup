const { GPIO } = require('gpio');
const Buffer = require('buffer/').Buffer;
const { PicoCYW43 } = require('pico_cyw43');
const pico_cyw43 = new PicoCYW43();


async function GET() {
  const powerBackPin = new GPIO(0, OUTPUT);

  return {
    statusCode: 200,
    body: {
      // Relay is normally open, so LOW means power backup is enabled
      isPowerBackupEnabled: powerBackPin.read() == LOW,
      schedules: [], // TODO: Implement schedules
    }
  };
}

async function PUT(req) {
  return new Promise((resolve, reject) => {
    req.on('data', (chunk) => {
      console.log(`BODY: ${chunk}`);
      try {
        const jsonString = Buffer.from(chunk).toString('utf8');

        const parsedData = JSON.parse(jsonString);

        const powerBackPin = new GPIO(0, OUTPUT);

        console.log(parsedData);

        if (parsedData.isPowerBackupEnabled) {
          powerBackPin.write(LOW);
          pico_cyw43.putGpio(0, true); // turn-on LED
        } else {
          powerBackPin.write(HIGH);
          pico_cyw43.putGpio(0, false); // turn-off LED
        }

        resolve(
          {
            statusCode: 200,
            body: {
              isPowerBackupEnabled: powerBackPin.read() == LOW,
            }
          }
        )
      } catch (error) {
        reject(error)
      }
    });
  });
  // const body = JSON.parse(req.body || '{}');
  // console.log(body);
  // const powerBackPin = new GPIO(0, OUTPUT);

  // if ('isPowerBackupEnabled' in body) {
  //   // if (body.isPowerBackupEnabled){
  //   //   powerBackPin.write(LOW);
  //   // } else {
  //   //   powerBackPin.write(HIGH);
  //   // }
  // }

  return {
    statusCode: 200,
    body: {
      isPowerBackupEnabled: false,
    }
  };
}

export async function SettingsHTTP(req, res) {
  switch (req.method) {
    case 'GET':
      return await GET();
    case 'PUT':
      return await PUT(req);
    default:
      return {
        statusCode: 405,
        body: 'Method Not Allowed'
      };
  }
}
