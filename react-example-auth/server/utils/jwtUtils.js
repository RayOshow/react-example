
const jwt = require('jsonwebtoken');
const secretKey = '123123123123123123123';

// Access Token을 검증하는 미들웨어
function verifyAccessToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Access Token이 필요합니다.' });
  }

  jwt.verify(token.replace('Bearer ', ''), secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: '유효하지 않은 Access Token입니다.' });
    }

    req.user = decoded;
    next();
  });
}

function generateAccessToken(user) {
  return jwt.sign(user, secretKey, { expiresIn: '15m' });
}

function refreshAccessToken(refreshToken) {
  return new Promise((resolve, reject) => {
    jwt.verify(refreshToken, secretKey, (err, decoded) => {
      if (err) {
        reject('유효하지 않은 리프레시 토큰입니다.');
      } else {
        const user = {
          id: decoded.id,
          username: decoded.username,
        };
        const accessToken = generateAccessToken(user);
        resolve(accessToken);
      }
    });
  });
}

function generateTokens(user) {
  const accessToken = jwt.sign(user, secretKey, { expiresIn: '15m' });
  const refreshToken = jwt.sign(user, secretKey, { expiresIn: '2d' });
  return { accessToken, refreshToken };
}

module.exports = {
  verifyAccessToken,
  generateAccessToken,
  refreshAccessToken,
  generateTokens,
};

