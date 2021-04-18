const {getDatabase} = require('../helpers/get_database');

const getPatient = async (nic) => {
    const database = await getDatabase();
    const patient = await database.patient.findOne({
        where: { nic }
    });
    return patient;
}

module.exports = {
    getPatient
}