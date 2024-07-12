import { userGuard } from '../../guards/user.js';

const Buffer = require('buffer/').Buffer;
const { getSettings, setSettings } = require('../../utils/settings.js');

async function GET() {
  const settings = getSettings();

  return {
    statusCode: 200,
    body: settings,
  };
}

async function PUT(req) {
  return new Promise((resolve, reject) => {
    req.on('data', (chunk) => {
      console.log(`BODY: ${chunk}`);
      try {
        const jsonString = Buffer.from(chunk).toString('utf8');
        const parsedData = JSON.parse(jsonString);

        console.log(parsedData);

        const newSettings = setSettings(parsedData);

        console.log('newSettings', newSettings);

        resolve({
          statusCode: 200,
          body: newSettings,
        });
      } catch (error) {
        reject(error);
      }
    });
  });
}

export async function SettingsHTTP(req, res) {
  const guardRes = userGuard(req, res);
  if (guardRes) {
    return guardRes;
  }

  switch (req.method) {
    case 'GET':
      return await GET();
    case 'PUT':
      return await PUT(req);
    default:
      return {
        statusCode: 405,
        body: 'Method Not Allowed',
      };
  }
}
