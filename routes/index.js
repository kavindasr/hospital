const nurseRouter = require('./api/nurse');
const userRouter = require('./api/user');
const commanRouter = require('./api/comman');
const uploadRouter = require('./api/upload');

const endPointHandler = (app) => {
  app.use('/user', userRouter);
  app.use('/nurse', nurseRouter);
  app.use('/comman', commanRouter);
  app.use('/upload', uploadRouter);
}

module.exports = endPointHandler;
