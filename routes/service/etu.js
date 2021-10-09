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
            doctorId: etu_doc,
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
    let data=etuObj
    let resprate = 0
    let pilserate = 0
    let sat = 0
    let sgs = 0
    let bpval = 0

    //resprate
    if (data.checkup.resp_rate<8){
        resprate=10
    } else if (data.checkup.resp_rate<11){
        resprate=7
    } else if (data.checkup.resp_rate<20) {
        resprate=1
    } else if (data.checkup.resp_rate<39) {
        resprate=5
    } else if (data.checkup.resp_rate<60) {
        resprate=8
    } else {
        resprate=9
    }

    //sat
    if (data.so2<60){
        sat=10
    } else if (data.so2<80){
        sat=9
    } else if (data.so2<90) {
        sat=8
    } else if (data.so2<95) {
        sat=5
    } else if (data.so2<100) {
        sat=1
    } else {
        sat=9
    }

    //sbp
    if (data.checkup.resp_rate<70){
        bpval=10
    } else if (data.checkup.bp<90){
        bpval=8
    } else if (data.checkup.bp<150) {
        bpval=1
    } else {
        bpval=6
    }

    //pulse
    if (data.checkup.pulse_rate<40){
        pilserate=10
    } else if (data.checkup.pulse_rate<50){
        pilserate=8
    } else if (data.checkup.pulse_rate<60) {
        pilserate=6
    } else if (data.checkup.pulse_rate<100) {
        pilserate=1
    } else if (data.checkup.pulse_rate<150) {
        pilserate=7
    }else if (data.checkup.pulse_rate<180) {
        pilserate=8
    } else {
        pilserate=10
    }

    // gcs
    if ((data.eye + data.verbal +data.motor)<8){
        sgs=10
    } else if ((data.eye + data.verbal +data.motor)<12){
        sgs=9
    } else if ((data.eye + data.verbal +data.motor)<14) {
        sgs=5
    } else if ((data.eye + data.verbal +data.motor)==15) {
        sgs=1
    }

    resprate , bpval , pilserate, sat, sgs
    let seviority = (resprate+bpval+pilserate+sat+sgs)*2
    console.log(data)
    console.log(data.severity)
    console.log(seviority)
    data.severity=seviority;
    return data;
}

const completeEtuForm = async ({id, status, asgn_ward}) => {
    const database = await getDatabase();
    const etuform = await database.etuform.findOne({
        where: { id }
    });
    if(!etuform) throw ApiError.notfound({message: 'Etu form not found'});

    etuform.status = status;
    etuform.asgn_ward = asgn_ward;
    await etuform.save();
}

const admittedPatients = async () => {
    const database = await getDatabase();
    const etuforms = await database.etuform.findAll({
        where: {
            status: 'Admitted'
        }
    })
    return etuforms;
}

module.exports = {
    etuformService,
    finalReport,
    completeEtuForm,
    admittedPatients,
}