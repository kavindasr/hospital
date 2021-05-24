const {getDatabase} = require('../helpers/get_database');
const { Op } = require("sequelize");

const getPatient = async (nic) => {
    const database = await getDatabase();
    const patient = await database.patient.findOne({
        where: { nic }
    });
    return patient;
}

const getCheckup = async (patientNic, visitDate) => {
    const database = await getDatabase();
    const checkup = await database.checkup.findOne({
        where: {
            [Op.and]: [
                { patientNic },
                { visit_date: visitDate }
            ]
        },
        include: [{model: database.user, attributes: ['nic', 'user_name', 'role_id']}],
    });
    return checkup;
}

const getEtuform = async (patientNic, visitDate) => {
    const database = await getDatabase();
    const form = await database.etuform.findOne({
        where: {
            [Op.and]: [
                { patientNic },
                { visit_date: visitDate }
            ]
        },
        include: [{model: database.user, attributes: ['nic', 'user_name', 'role_id']}],
    });
    return form;
}

module.exports = {
    getPatient,
    getCheckup,
    getEtuform,
}