module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('user', {
      nic: {
        type: Sequelize.STRING(12),
        primaryKey: true,
      },
      user_name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      pswrd: {
        type: Sequelize.STRING(450),
        allowNull: false,
      },
      role_id: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
    });
  
    return User;
  };