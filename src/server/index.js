const express = require('express');
const bodyParser = require('body-parser');

const sourceRouter = require('./routes/source');
const dataRouter = require('./routes/data');

const app = express();

app.use(express.static('dist'));
app.use(bodyParser.text()); // http request body를 파싱하는 미들웨어, 미들웨어는 추후 express 스프린트에서 학습 예정

// 라우팅에 대한 간단한 설명은 런코 참조, 자세한 내용은 추후 express 스프린트에서 진행 예정
app.use('/api/source', sourceRouter);
app.use('/api/data', dataRouter);

app.listen(8080, () => console.log('Listening on port 8080!'));

module.exports = app;
