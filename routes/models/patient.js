module.exports = (sequelize, Sequelize) => {
    const Patient = sequelize.define('patient', {
      nic: {
        type: Sequelize.STRING(12),
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING(4),
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      adrs: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      gdn_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      gdn_adrs: {
        type: Sequelize.STRING(100),
      },
      contact_no: {
        type: Sequelize.STRING(10), //This is char(10) in database
        allowNull: false,
      },
      age: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      gender: {
        type: Sequelize.STRING(1),
        allowNull: false,
      },
      marital_status: {
        type: Sequelize.STRING(1),
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
    });
    
    Patient.associate = (models) => {
      models.patient.hasMany(models.request, {onDelete: 'cascade', foriegnKey: 'nic'});
    }
    return Patient;
  };