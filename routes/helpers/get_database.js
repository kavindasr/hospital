const database = require('../models');

/**
 * Returns a database object
 * @category Helpers
 * @returns {Object} database
 */
const getDatabase = async () => {
  try {
    return await database;
  } catch (error) {
    console.log(`Database connection issue. ${error}`);
    throw error;
  }
};

module.exports = { getDatabase };
