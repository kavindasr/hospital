const { getDatabase } = require('../helpers/get_database');
const { Op } = require('sequelize');
const ApiError = require('../helpers/ApiError');

const requestService = async (body, file, nic, req_date, exam_by, dept_id) => {
    const database = await getDatabase();
    const request = await database.request.findOne({
        where: {
            [Op.and]: [
                {nic},
                {dept_id},
                {req_date},
            ]
        }
    });
    if (!request) throw ApiError.badRequest({message: 'Request not found'});

    request.test_status = body.test_status;
    request.exam_by = exam_by;
    request.attach = file.path;
    request.formdata = body.formdata;

    await request.save();
}

module.exports = {
    requestService,
}