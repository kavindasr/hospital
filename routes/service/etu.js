const { Op } = require("sequelize");
const { getDatabase } = require('../helpers/get_database');
const ApiError = require('../helpers/ApiError');
const { test_deptSchema } = require('../validation/etu')
const {getEtuform, getCheckup} = require('./comman')
// const build_test_depts = (arr) => {
//     const test_depts = [];
//     var obj = {};
//     arr.forEach((val, ind) => {
//         if (ind%2 ==0) {
//             obj = {
//                 dept_id: val
//             }
//         }
//         else {
//             obj.test_type = val;
//             test_depts.push(obj);
//         }
//     });
//     return test_depts;
// }

const etuformService = async (body, etu_doc) => {
    const database = await getDatabase();
    body.visit_date = (new Date()).toISOString().substr(0,10);
    body.doctorId = etu_doc;
    const patient = await database.patient.findOne({
        where: { nic: body.patientNic}
    });
    if (!patient) throw ApiError.badRequest({message: 'Register user first'});

    var test_depts = body.test_depts // build_test_depts(body.test_depts);
    const testtypes = [];
    test_depts.forEach(dept => {
        let departmenttype = dept.split(/[",/']/)
        testtypes.push({departmentId : departmenttype[1], test_type: departmenttype[3]}) 
    })
    console.log(testtypes)
    const { value, error } = test_deptSchema.validate(testtypes);
    if (error) throw ApiError.unprocessableEntity(error);
    test_depts = value;
    
    const form = await database.etuform.create(body);

    const requests = [];
    test_depts.forEach(dept => {
        const reqeust = {
            patientNic: body.patientNic,
            departmentId: dept.departmentId,
            req_date: body.visit_date,
            req_by: body.userNic,
            test_type: dept.test_type,
            special_note: body.special_note,
            etuformId: form.id,
        }
        requests.push(reqeust);
    });
    try{
        await database.request.bulkCreate(requests);
    }
    catch(err) {
        await form.distroy();
        throw ApiError.serverError({message: err.message});
    }
    
    return;
}

const finalReport = async (patientNic, visit_date) => {
    const database = await getDatabase();
    const patient = await database.patient.findOne({
        where: { nic: patientNic}
    });
    if (!patient) throw ApiError.badRequest({message: 'Register user first'});

    const etuform = await getEtuform(patientNic, visit_date);
    const checkup = await getCheckup(patientNic, visit_date);
    const requests = await database.request.findAll({
        where: {
            etuformId: etuform.id
        }
    });
    var etuObj = etuform.dataValues;
    const reqObj = [];
    requests.forEach(req => {
        reqObj.push(req.dataValues)
    })
    etuObj.checkup = checkup.dataValues;
    etuObj.requests = reqObj;
    return etuObj;
}

module.exports = {
    etuformService,
    finalReport,
}