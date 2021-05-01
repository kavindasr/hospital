const { getDatabase } = require('../helpers/get_database');
const ApiError = require('../helpers/ApiError');

const viewReqsService = async (userRole, nic) => {
    const database = await getDatabase();
    //console.log(database);
    const requests = await database.request.findAll({
        include: [{model: database.patient}],
    });
    console.log(requests);
    return 'requests';
}

module.exports = {
    viewReqsService,
}