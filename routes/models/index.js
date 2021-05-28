const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const sequelize = require('../helpers/sequelize-singleton');

const basename = path.basename(__filename);

/**
 * Creates database connection and returns the object
 * @async
 * @returns {Object} db database object
 */
const initializeDatabase = async () => {
  const db = {};
  // import all model schemas
  fs.readdirSync(__dirname)
    .filter(
      (file) => file.indexOf('.') !== 0
        && file !== basename
        && file.slice(-3) === '.js'
        && file[0] !== '_',
    )
    .forEach((file) => {
      const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
      db[model.name] = model;
    });

  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  try {
    // Connect to database
    await sequelize.authenticate();
  } catch (err) {
    console.log('Unable to connect to the database or create schema: ', err);
    throw err;
  }
  console.log('Database connection has been established successfully.');
  // sequelize.sync({force: true});
  db.sequelize = sequelize;
  db.Sequelize = Sequelize;

  return db;
};
module.exports = initializeDatabase();
