'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.renameColumn('etuform', 'g','eye');
    await queryInterface.renameColumn('etuform', 'c','verbal');
    await queryInterface.renameColumn('etuform', 's','motor');
    await queryInterface.changeColumn('etuform', 'eye', {
      type: Sequelize.INTEGER,
    });
    await queryInterface.changeColumn('etuform', 'verbal', {
      type: Sequelize.INTEGER,
    });
    await queryInterface.changeColumn('etuform', 'motor', {
      type: Sequelize.INTEGER,
    });
    await queryInterface.addColumn('etuform', 'status', {
      type: Sequelize.STRING(10),
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.renameColumn('etuform','eye', 'g');
    await queryInterface.renameColumn('etuform','verbal', 'c');
    await queryInterface.renameColumn('etuform','motor', 's');
    await queryInterface.renameColumn('etuform', 'status');
  }
};
