const { jwtDecode } = require('jwt-decode');
const { users } = require('../configs/user.js');

export const isJWTValid = (token) => {
  const decoded = jwtDecode(token);

  if (decoded) {
    // Check if user does not exist
    if (
      !decoded.sub ||
      !users.find(
        (user) => user.id === decoded.sub && user.username === decoded.username
      )
    ) {
      return false;
    }

    return true;
  }

  return false;
};
