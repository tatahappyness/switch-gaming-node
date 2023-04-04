const jwt = require('jsonwebtoken');
const APP_SECRET = 'FiRsT-GraphQL-ApP-NoDe';

function getTokenPayload(token) {
  return jwt.verify(token, APP_SECRET);
}

function getUser(req, authToken) {
  if (req) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.replace('Bearer ', '');
      if (!token) {
        console.log('No token found');
		return null;
      }
      const { user } = getTokenPayload(token);
      return user;
    }
  } else if (authToken) {
    const { user } = getTokenPayload(authToken);
    return user;
  }
  console.log('Not authenticated');
  return null;
}

module.exports = {
  APP_SECRET,
  getUser
};