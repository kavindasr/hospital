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

// ECG home page
router.get('/ecg_home', (req, res, next) => {
    const user = req.user;
    res.render('departments/ecg_home', user);
});

// Micro Biology home page
router.get('/biology_dept_home', (req, res, next) => {
    const user = req.user;
    res.render('departments/biology_home', user);
});

// Radiology home page
router.get('/radiology_dept_home', (req, res, next) => {
    const user = req.user;
    res.render('departments/radiology_home', user);
});

// Chemical and Pathaologgy home page
router.get('/chem_dept_home', (req, res, next) => {
    const user = req.user;
    res.render('departments/chemical_home', user);
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
        const data = await viewReqsService(req.user.role.departmentId, value);
        res.status(200).render('departments/request', {data});   
    } catch (err) {
        if (err instanceof ApiError){
            res.status(422).render('departments/request', {err});
        }
    }
});


module.exports = router;