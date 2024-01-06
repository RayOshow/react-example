const express = require('express');
const app = express();
const cors = require('cors');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const port = 5001; // 서버가 실행될 포트 번호

const corsOptions = {
  exposedHeaders: ['accessToken', 'refreshToken'],
};

app.use(cors(corsOptions));
// app.use(cors());

const authRouter = require('./routers/authRouter');

app.use('/auth', authRouter);

// 루트 경로에 대한 요청 핸들러
app.get('/', (req, res) => {
  res.send('안녕하세요! 테스트 서버에 오신 것을 환영합니다.');
});

// 서버 시작
app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
