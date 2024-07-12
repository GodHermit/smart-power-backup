const { jwtDecode } = require('jwt-decode');
const { users } = require('../configs/user.js');
const { isJWTValid } = require('../utils/users.js');

export const userGuard = (req, res) => {
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
};
