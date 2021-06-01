const { getDatabase } = require('../helpers/get_database');
const { Op } = require('sequelize');
const ApiError = require('../helpers/ApiError');

const requestService = async (body, file, request_id, dWoker) => {
    console.log(request_id);
    const database = await getDatabase();
    const request = await database.request.findOne({
        where: {
            id: request_id
        }
    });
    if (!request) throw ApiError.badRequest({message: 'Request not found'});

    request.test_status = body.test_status;
    request.dWokerId = dWoker.id;
    request.attach = file.path;
    request.feedback = body.feedback;

    await request.save();
}

module.exports = {
    requestService,
}