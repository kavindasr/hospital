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
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
    });
    
    User.associate = (models) => {
      models.user.hasMany(models.request, {onDelete: 'cascade', foreignKey: 'userNic'});
      models.user.hasMany(models.etuform, {onDelete: 'cascade', foreignKey: 'userNic'});
      models.user.hasMany(models.checkup, {onDelete: 'cascade', foreignKey: 'userNic'});
    }
    return User;
  };