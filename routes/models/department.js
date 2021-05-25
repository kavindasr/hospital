module.exports = (sequelize, Sequelize) => {
    const Department = sequelize.define('department', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });

    Department.associate = (models) => {
      Department.hasOne(models.dWoker, {
        foreignKey: {
          allowNull: false
        }
      });
      Department.hasMany(models.request);
    }
  
    return Department;
  };