const swaggerUi = require('swagger-ui-express');
const swaggereJsdoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'API Docs',
      description: '아래의 API를 참고해서 과제를 진행해주세요.',
    },
    servers: [
      {
        url: '/', // 요청 URL
      },
    ],
  },
  apis: ['./routers/*.js'], //Swagger 파일 연동
};
const specs = swaggereJsdoc(options);

module.exports = { swaggerUi, specs };
