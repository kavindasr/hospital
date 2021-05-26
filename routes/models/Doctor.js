module.exports = (sequelize, Sequelize) => {
    const Doctor = sequelize.define('doctor', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
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
    Doctor.associate = (models) => {
        Doctor.belongsTo(models.user);
        Doctor.hasMany(models.etuform, {
            foreignKey: {
              allowNull: false
            }
        });
    }

    return Doctor;

}