const ApiError = require('../helpers/ApiError');
const { getDatabase } = require('../helpers/get_database');

const registrationService = async (body) => {
    const database = await getDatabase();
    const patient = await database.patient.findOne({
        where: { nic: body.nic}
    });
    if (patient) throw ApiError.unauthorized({ message: 'User already exist' });
    await database.patient.create(body);
}

const updateService = async (nic, body) => {
    const database = await getDatabase();
    const patient = await database.patient.findOne({
        where: { nic }
    });
    if (!patient) throw ApiError.badRequest({ message: 'Invaild NIC' });
    Object.keys(body).forEach(element => {
        patient[element] = body[element];
    });
    await patient.save();
}

const checkupService = async (body, nurse_nic) => {
    const database = await getDatabase();
    const patient = await database.patient.findOne({
        where: { nic: body.patientNic}
    });
    if (!patient) throw ApiError.badRequest({message: 'Register user first'});

    body.nurse_nic = nurse_nic;
    await database.checkup.create(body);
}

module.exports = {
    registrationService,
    updateService,
    checkupService,
}