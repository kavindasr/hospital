const nurseRouter = require('./api/nurse');
const userRouter = require('./api/user');

const endPointHandler = (app) => {
  app.use('/user', userRouter);
  app.use('/nurse', nurseRouter);
  app.use('/common', commanRouter);
  app.use('/upload', uploadRouter);
  app.use('/etu', etuRouter);
}

module.exports = endPointHandler;
