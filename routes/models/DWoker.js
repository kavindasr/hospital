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
        departmentId: {
            type: Sequelize.INTEGER,
        },
        userNic: {
            type: Sequelize.STRING(12),
            allowNull: true,
        },
    });
    DWoker.associate = (models) => {
        DWoker.belongsTo(models.user);
        DWoker.belongsTo(models.department);
        DWoker.hasMany(models.request);
    }

    return DWoker;

}