module.exports = (sequelize, Sequelize) => {

    const Request = sequelize.define('request', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      req_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      test_type: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      special_note: {
        type: Sequelize.STRING(250),
      },
      test_status: {
        type: Sequelize.STRING(10),
        defaultValue: "Pending",
        values: ['Pending', 'Completed','Rejected'],
      },
      formdata: {
        type: Sequelize.JSON,
      },
      attach: {
        type: Sequelize.STRING(200),
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
        allowNull: true,
      },
      patientNic: {
        type: Sequelize.STRING(12),
        allowNull: true,
      },
      etuformId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    });
  
    Request.associate = (models) => {
      Request.belongsTo(models.patient);
      Request.belongsTo(models.department);
      Request.belongsTo(models.etuform);
      Request.belongsTo(models.dWoker);
      Request.belongsTo(models.doctor);
    }
    return Request;
  };