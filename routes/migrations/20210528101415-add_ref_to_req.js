'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('request','dWokerId', 
    {
      type: Sequelize.INTEGER,
      references: {
        model: 'dWoker',
        key: 'id'
      },
        Update: 'CASCADE',
        onDelete: 'CASCADE',
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('request','dWokerId');
  }
};
