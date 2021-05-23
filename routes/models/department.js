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
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
    });

    Department.associate = (models) => {
      models.department.hasMany(models.request, {onDelete: 'cascade', foreignKey: 'dept_id'});
      
    }
  
    return Department;
  };