const nurseRouter = require('./api/nurse');
const userRouter = require('./api/user');
const commanRouter = require('./api/comman');
const uploadRouter = require('./api/upload');
const etuRouter = require('./api/etu');

const endPointHandler = (app) => {
  app.use('/user', userRouter);
  app.use('/nurse', nurseRouter);
  app.use('/common', commanRouter);
  app.use('/upload', uploadRouter);
  app.use('/etu', etuRouter);
}

module.exports = endPointHandler;
