const nurseRouter = require('./api/nurse');
const userRouter = require('./api/user');

const endPointHandler = (app) => {
  app.use('/user', userRouter);
  app.use('/api/nurse', nurseRouter);

}

module.exports = endPointHandler;
