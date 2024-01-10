const express = require('express');
const app = express();
const port = 4000;

const cors = require('cors');
const morgan = require('morgan');

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

const { swaggerUi, specs } = require('./swagger/swagger');
const routerV1 = require('./routers/routerV1');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/api/v1', routerV1);
app.use('/', swaggerUi.serve, swaggerUi.setup(specs));

app.use((req, res, next) => {
  res.status(404).send('Not Found!');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({
    message: 'Server Error',
  });
});

app.listen(port, () => {
  console.log(`[RUN] S4 Project Server... | http://localhost:${port}`);
});
