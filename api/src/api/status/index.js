import { userGuard } from '../../guards/user.js';
const { GPIO } = require('gpio');

async function GET() {
  const powerBackPin = new GPIO(0, OUTPUT);

  return {
    statusCode: 200,
    body: {
      // Relay is normally closed, so HIGH means power backup is enabled
      isPowerBackupEnabled: powerBackPin.read() == HIGH,
      schedules: [], // TODO: Implement schedules
    },
  };
}

export async function StatusHTTP(req, res) {
  const guardRes = userGuard(req, res);
  if (guardRes) {
    return guardRes;
  }

  switch (req.method) {
    case 'GET':
      return await GET();
    default:
      return {
        statusCode: 405,
        body: 'Method Not Allowed',
      };
  }
}
