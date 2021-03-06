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
        userNic: {
            type: Sequelize.STRING(12),
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
        Doctor.hasMany(models.request);
    }

    return Doctor;

}