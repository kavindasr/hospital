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

    if (!file) throw ApiError.badRequest({message: 'File path not found'});
    console.log(typeof(file.path))
    const fn = file.path;

    const filePath = fn.substr(fn.search( /\/uploads/g))
    console.log(typeof(filePath))

    request.test_status = body.test_status;
    request.dWokerId = dWoker.id;
    request.attach =  filePath; 
    request.feedback = body.feedback;

    await request.save();
}

module.exports = {
    requestService,
}