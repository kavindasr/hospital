module.exports = (sequelize, Sequelize) => {
    const Etuform = sequelize.define('etuform', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      visit_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      allergies: {
        type: Sequelize.STRING(100),
      },
      observation: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      pupils: {
        type: Sequelize.STRING(20),
      },
      so2: {
        type: Sequelize.DECIMAL(6,3),
      },
      g: {
        type: Sequelize.STRING(1),
      },
      c: {
        type: Sequelize.STRING(1),
      },
      s: {
        type: Sequelize.STRING(1),
      },
      test_depts: {
        type: Sequelize.JSON,
      },
      severity: {
        type: Sequelize.STRING(50),
      },
      asgn_ward: {
        type: Sequelize.STRING(12),
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
  
    Etuform.associate = (models) => {
      Etuform.belongsTo(models.patient);
      Etuform.belongsTo(models.doctor);
    }
    return Etuform;
  };