const {getDatabase} = require('../helpers/get_database');
const { Op } = require("sequelize");

const getPatient = async (nic) => {
    const database = await getDatabase();
    const patient = await database.patient.findOne({
        where: { nic }
    });
    return patient;
}

const getCheckup = async (nic, visitDate) => {
    const database = await getDatabase();
    console.log(visitDate);
    const checkup = await database.checkup.findAll({
        where: {
            [Op.and]: [
                { nic },
                { visit_date: visitDate }
            ]
        }
    });
    return checkup;
}

module.exports = {
    getPatient,
    getCheckup
}