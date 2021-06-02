const router = require('express').Router();
const ApiError = require('../helpers/ApiError');
const { etuformSchema, etuCompletionSchema } = require('../validation/etu');
const { nicSchema } = require('../validation/department');
const { etuformService, finalReport, completeEtuForm, admittedPatients } = require('../service/etu');
const accessControl = require('../middleware/access');
const ROLES = require('../enums/role');

// home page
router.get('/home', (req, res, next) => {
    const user = req.user;
    res.render('etu/home', user);
});

// etu form
router.get('/etuform', (req, res, next) => {
    res.status(200).render('etu/etuform', {});
});

router.post('/etuform', async (req, res, next) => {
    try {
        const { value, error } = etuformSchema.validate(req.body);
        if (error) {
            next(ApiError.unprocessableEntity(error));
            return;
        }
        await etuformService(value, req.user.role.id);
        res.status(201).send('Form submitted');
    } catch (err) {
        console.log(err);
        next(err);
    }
});

router.get('/etufinalreport', (req, res, next) => {
    res.status(200).render('etu/etufinalreport', {});
});

router.get('/finalreport', async (req, res, next) => {
    try{
        const patientNic = req.query.patientNic;
        const visit_date = req.query.visit_date;
        const {value, error} = nicSchema.validate(patientNic);
        if (error) {
            next(ApiError.unprocessableEntity(error));
            return;
        } 
        const data = await finalReport(value, visit_date);
        res.status(200).render('etu/etufinalreport', {data});
        //res.status(200).send(data);
    }
    catch(err) {
        next(err);
    }
});

router.post('/completeEtuForm', async (req, res, next) => {
    try{
        const {value, error} = etuCompletionSchema.validate(req.body);
        if (error) {
            next(ApiError.unprocessableEntity(error));
            return;
        } 
        await completeEtuForm(value);
        res.status(200).send('Successfully completed');
    }
    catch(err){
        next(err);
    }
});

router.get('/admitted', async (req, res, next) => {
    try{
        const data = await admittedPatients();
        res.status(200).send(data);
    }
    catch(err) {
        next(err);
    }
});
module.exports = router;