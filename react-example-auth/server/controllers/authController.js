// controllers/jwtController.js

const jwt = require('jsonwebtoken');
const secretKey = '123123123123123123123';
const jwtUtils = require('../utils/jwtUtils'); 

// 로그인 컨트롤러
function login(req, res) {

  // 
  const { userId, password } = req.body;

  const user = {
    id: "1",
    userId: 'abc',
    password: '1234'
  };

  if ((user.userId !== userId) || (user.password !== password) ) {
    return res.status(401).json({ message: '사용자 이름이나 비번이 잘못되었습니다.' });
  }

  const { accessToken, refreshToken } = jwtUtils.generateTokens(user);

  res.header('accessToken',  accessToken);
  res.header('refreshToken', refreshToken);
  res.json();
}

// 액세스 토큰 재발급 컨트롤러
async function refresh(req, res) {

  const { refreshToken} = req.body;
  if (!refreshToken) {
    return res.status(400).json({ message: '리프레시 토큰이 필요합니다.' });
  }

  try {
    const newAccessToken = await jwtUtils.refreshAccessToken(refreshToken);

    res.header('accessToken', newAccessToken);
    res.json();
  } catch (error) {
    res.status(401).json({ message: error });
  }
}

module.exports = {
  login,
  refresh

};
