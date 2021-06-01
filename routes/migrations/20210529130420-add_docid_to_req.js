'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('request', 'doctorId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'doctor',
        key: 'id'
      },
        Update: 'CASCADE',
        onDelete: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('request', 'doctorId');
  }
};
