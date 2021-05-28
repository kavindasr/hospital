const { getDatabase } = require('../helpers/get_database');
const ApiError = require('../helpers/ApiError');

const viewReqsService = async (departmentId, patientNic) => {
    const database = await getDatabase();
    //console.log(database);
    const requests = await database.request.findAll({
        where: {
            patientNic,
            departmentId
        },
        include: [{model: database.patient}, {model: database.etuform}],
    });

    return requests;
}

module.exports = {
    viewReqsService,
}