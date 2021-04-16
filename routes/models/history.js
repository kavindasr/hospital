module.exports = (sequelize, Sequelize) => {
    const History = sequelize.define('history', {
      nic: {
        type: Sequelize.STRING(12),
        primaryKey: true,
      },
      dept_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      visit_date: {
        type: Sequelize.DATE,
        allowNull: false,
        primaryKey: true,
      },
      report: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      examined_by: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      smry: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
    });
  
    return History;
  };