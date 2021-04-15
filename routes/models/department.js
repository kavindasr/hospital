module.exports = (sequelize, Sequelize) => {
    const Department = sequelize.define('department', {
      dept_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      dept_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      
    });
  
    return Department;
  };