module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('user', {
      nic: {
        type: Sequelize.STRING(12),
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING(450),
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
    
    User.associate = (models) => {
      User.hasOne(models.doctor);
      User.hasOne(models.nurse);
      User.hasOne(models.dWoker);
    }
    return User;
  };