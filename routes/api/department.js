const router = require('express').Router();
const ApiError = require('../helpers/ApiError');
const { nicSchema } = require('../validation/department');
const { viewReqsService } = require('../service/department');
const { getPatient } = require('../service/comman');


// bld bank home page
router.get('/bldbank_home', (req, res, next) => {
    const user = req.user;
    res.render('departments/bldbank_home', user);
});

// requests page
router.get('/request', (req, res, next) => {
    const user = req.user;
    res.render('departments/request', user);
});

router.get('/viewReqs', async (req, res, next) => {
    try {
        const patientNic = req.query.nic;
        const {value, error} = nicSchema.validate(patientNic);
        if (error) {
            res.status(422).render('departments/request', {error});
            return;
        } 
        const patient = await getPatient(patientNic);
        if (patient === null){
            const err = {message:"Patient Not Found"}
            res.status(404).render('departments/request', {err});
        } else {
            const requests = await viewReqsService(req.user.role.departmentId, value);
            if (requests.length === 0 ){
                const data = {patient,
                    problem:{
                        message:"No Requests Found"}
                    } 
                res.status(404).render('departments/request', {data});
            } else {
                const data = {patient,requests} 
                res.status(200).render('departments/request', {data});
            }
        }
       
    } catch (err) {
        console.log(err);
        next(err);
    }
});


module.exports = router;