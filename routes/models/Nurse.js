module.exports = (sequelize, Sequelize) => {
    const Nurse = sequelize.define('nurse', {
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
    Nurse.associate = (models) => {
        Nurse.belongsTo(models.user);
        Nurse.hasMany(models.checkup, {
            foreignKey: {
              allowNull: false
            }
        });
    }

    return Nurse;

}