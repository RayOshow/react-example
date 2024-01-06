const express = require('express');
const router = express.Router();

const jwtController = require('../controllers/authController');
const jwtUtils = require('../utils/jwtUtils');

// /jwt/login 경로에 대한 POST 요청 핸들러
router.post('/login', jwtController.login);

router.post('/validate',  jwtUtils.verifyAccessToken, (req, res) => {
  res.json({ message: 'OK'});
});

// /jwt/refresh 경로에 대한 POST 요청 핸들러
router.post('/refresh', async (req, res) => {
  try {
      await jwtController.refresh(req, res);
  } catch (error) {
      res.status(500).json({ message: '리프레시 작업 실패' });
  }
});

// /secure 경로에 대한 요청 핸들러
router.get('/secure', jwtUtils.verifyAccessToken, (req, res) => {
    // Access Token이 유효한 경우에만 실행되는 보호된 엔드포인트
    res.json({ message: '보호된 리소스에 접근했습니다.', user: req.user });
});


module.exports = router;