module.exports = (sequelize, Sequelize) => {
    const DWoker = sequelize.define('dWoker', {
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
    DWoker.associate = (models) => {
        DWoker.belongsTo(models.user);
        DWoker.belongsTo(models.department);
    }

    return DWoker;

}