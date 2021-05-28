module.exports = (sequelize, Sequelize) => {
    const Checkup = sequelize.define('checkup', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      visit_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      temp: {
        type: Sequelize.DECIMAL(6,3),
        allowNull: false,
      },
      pulse_rate: {
        type: Sequelize.DECIMAL(10,7),
        allowNull: false,
      },
      resp_rate: {
        type: Sequelize.DECIMAL(4,2),
      },
      bp: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      weight: {
        type: Sequelize.DECIMAL(6,3),
        allowNull: false,
      },
      height: {
        type: Sequelize.DECIMAL(6,3),
        allowNull: false,
      },
      bmi: {
        type: Sequelize.DECIMAL(3,1),
      },
      urine: {
        type: Sequelize.STRING(10),
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      patientNic: {
        type: Sequelize.STRING(12),
        allowNull: true,
      },
      nurseId: {
        type: Sequelize.INTEGER,
      },
    });
  
    Checkup.associate = (models) => {
      Checkup.belongsTo(models.patient);
      Checkup.belongsTo(models.nurse);
    }
    return Checkup;
  };