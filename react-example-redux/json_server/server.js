const jsonServer = require('json-server');

const server = jsonServer.create();
const router = jsonServer.router('json_server/db.json');

const middlewares = jsonServer.defaults();  // 기본 미들웨어 가져오기 (CORS 포함)

server.use(middlewares);  // 기본 미들웨어 사용
server.use(router);  // json-server의 라우터 사용

server.listen(5001, () => {
  console.log('JSON Server is running on http://localhost:5001');
});