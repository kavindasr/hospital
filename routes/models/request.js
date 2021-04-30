module.exports = (sequelize, Sequelize) => {
    const Request = sequelize.define('request', {
      nic: {
        type: Sequelize.STRING(12),
        primaryKey: true,
      },
      dept_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      req_date: {
        type: Sequelize.DATE,
        allowNull: false,
        primaryKey: true,
      },
      req_by: {
        type: Sequelize.STRING(12),
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
        defaultValue: "Pending"
      },
      exam_by: {
        type: Sequelize.STRING(12),
      },
      formdata: {
        type: Sequelize.JSON,
      },
      attach: {
        type: Sequelize.STRING(200),
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
    });
  
    return Request;
  };