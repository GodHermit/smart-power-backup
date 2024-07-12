const Buffer = require('buffer/').Buffer;
const sign = require('jwt-encode');
const { jwtDecode } = require('jwt-decode');
const { isJWTValid } = require('../../utils/users.js');
const { removeFields } = require('../../utils/index.js');
const { users } = require('../../configs/user.js');
const { JWT_SECRET } = require('../../configs/jwt.js');
const { decode } = require('base-64');
global.atob = decode;

async function GET(req) {
  try {
    const headers = req.headers;
    if (!headers.authorization) {
      return {
        statusCode: 401,
        body: 'Unauthorized',
      };
    }

    const token = headers.authorization.split(' ')[1];

    if (!token) {
      return {
        statusCode: 401,
        body: 'Unauthorized',
      };
    }

    const decoded = jwtDecode(token);
    const user = users.find((user) => user.id === decoded.sub);

    if (!decoded || !user || !isJWTValid(token)) {
      return {
        statusCode: 401,
        body: 'Unauthorized',
      };
    }

    return {
      statusCode: 200,
      body: removeFields(user, ['password']),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 401,
      body: 'Unauthorized',
    };
  }
}

async function POST(req) {
  return new Promise((resolve, reject) => {
    req.on('data', (chunk) => {
      console.log(`BODY: ${chunk}`);
      try {
        const jsonString = Buffer.from(chunk).toString('utf8');
        const body = JSON.parse(jsonString);

        const { username, password } = body;

        if (!username || !password) {
          resolve({
            statusCode: 400,
            body: 'Bad Request',
          });
        }

        const user = users.find(
          (user) => user.username === username && user.password === password
        );

        if (!user) {
          resolve({
            statusCode: 400,
            body: 'Bad Request',
          });
        }

        const data = {
          sub: user.id,
          username: user.username,
          iat: Date.now(),
        };
        const jwt = sign(data, JWT_SECRET);

        resolve({
          statusCode: 200,
          body: {
            token: jwt,
          },
        });
      } catch (error) {
        if (
          error instanceof Error &&
          error.message === 'SyntaxError: Invalid JSON format.'
        ) {
          reject({
            statusCode: 400,
            body: 'Bad Request',
          });
        }
        reject(error);
      }
    });
  });
}

export async function UserHTTP(req, res) {
  switch (req.method) {
    case 'GET':
      return await GET(req);
    case 'POST':
      return await POST(req);
    default:
      return {
        statusCode: 405,
        body: 'Method Not Allowed',
      };
  }
}
