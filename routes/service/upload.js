const { getDatabase } = require('../helpers/get_database');
const { Op } = require('sequelize');
const ApiError = require('../helpers/ApiError');

const requestService = async (body, file, patientNic, req_date, exam_by, dept_id) => {
    const database = await getDatabase();
    const request = await database.request.findOne({
        where: {
            [Op.and]: [
                {patientNic},
                {dept_id},
                {req_date},
            ]
        }
    });
    if (!request) throw ApiError.badRequest({message: 'Request not found'});

    request.test_status = body.test_status;
    request.userNic = exam_by;
    request.attach = file.path;
    request.formdata = body.formdata;

    await request.save();
}

module.exports = {
    requestService,
}