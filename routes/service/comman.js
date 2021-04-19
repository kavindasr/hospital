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
    const checkup = await database.checkup.findOne({
        where: {
            [Op.and]: [
                { nic },
                { visit_date: visitDate }
            ]
        }
    });
    return checkup;
}

const getEtuform = async (nic, visitDate) => {
    const database = await getDatabase();
    const form = await database.etuform.findOne({
        where: {
            [Op.and]: [
                { nic },
                { visit_date: visitDate }
            ]
        }
    });
    return form;
}

module.exports = {
    getPatient,
    getCheckup,
    getEtuform,
}