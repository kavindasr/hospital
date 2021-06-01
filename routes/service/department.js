const { getDatabase } = require('../helpers/get_database');
const ApiError = require('../helpers/ApiError');
const { Op } = require("sequelize");

const viewReqsService = async (departmentId, patientNic) => {
    const database = await getDatabase();
    const patient = await database.patient.findOne({
        where: { nic: body.patientNic}
    });
    if (!patient) throw ApiError.notfound({message: 'Patient not found'});

    const requests = await database.request.findAll({
        where: {
            [Op.and]: [
                { patientNic },
                { departmentId },
                { test_status: "Pending"}
            ]
        },
        include: [{model: database.patient}, {model: database.doctor}],
    });

    if(requests.length == 0) throw ApiError.notfound({message: 'No requests found'});
    
    return requests;
}

module.exports = {
    viewReqsService,
}