module.exports = (sequelize, Sequelize) => {
    const Etuform = sequelize.define('etuform', {
      patientNic: {
        type: Sequelize.STRING(12),
        primaryKey: true,
      },
      visit_date: {
        type: Sequelize.DATE,
        allowNull: false,
        primaryKey: true,
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
      gcs: {
        type: Sequelize.STRING(1),
        allowNull: false,
      },
      userNic: {
        type: Sequelize.STRING(12),
        allowNull: false,
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
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
    });
  
    Etuform.associate = (models) => {
      models.etuform.belongsTo(models.patient, {foriegnKey: 'patientNic'});
      models.etuform.belongsTo(models.user, {foriegnKey: 'userNic'})
    }
    return Etuform;
  };