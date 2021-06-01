'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('request', 'formdata');
    await queryInterface.addColumn('request', 'feedback', {
      type: Sequelize.STRING(500),
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('request', 'formdata', {
      type: Sequelize.JSON,
    });
    await queryInterface.removeColumn('request', 'feedback');
  }
};
