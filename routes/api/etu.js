const router = require('express').Router();
const ApiError = require('../helpers/ApiError');
const { etuformSchema, etuCompletionSchema } = require('../validation/etu');
const { nicSchema } = require('../validation/department');
const { etuformService, finalReport, completeEtuForm, admittedPatients } = require('../service/etu');
const accessControl = require('../middleware/access');
const ROLES = require('../enums/role');
const { query } = require('express');
const e = require('express');

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
        let arg1 = (typeof(req.body.observation));
        let arg2 = (typeof(req.body.test_depts));
        if (arg1!="object"){
            console.log("hiiii")
            req.body.observation=[req.body.observation]
        }
        if (arg2!="object"){
            req.body.test_depts=[req.body.test_depts]
        }
        const { value, error } = etuformSchema.validate(req.body);
        if (error) {
            res.status(422).render('etu/etuform', {error});
            return;
        }
        await etuformService(req.body, req.user.role.id);
        var success = {message:"Form submitted"}
        res.status(200).render('etu/etuform', {success});  
    } catch (err) {
        if (err instanceof ApiError){
            res.status(422).render('etu/etuform', {err});
        }
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
            res.status(422).render('etu/etufinalreport', {error});
            return;
        } 
        const data = await finalReport(value, visit_date);

        console.log(data.severity)
        // data.severity=seviority
        // console.log(data.severity)

        res.status(200).render('etu/etufinalreport', {data});
        //res.status(200).send(data);
    }
    catch(err) {
        if (err instanceof ApiError){
            res.status(422).render('etu/etufinalreport', {err});
        }
    }
});

+router.post('/dischargeEtuForm', async (req, res, next) => {
    try{   
        const body = {
            id : req.query.id,
            asgn_ward : "CCunit",
            status : "Discharged"
        }   
        const {value, error} = etuCompletionSchema.validate(body);
        if (error) {
            res.status(422).render('etu/etufinalreport', {error});
            return;
        } 
        await completeEtuForm(value);
        res.status(200).send('Successfully completed');
    }
    catch(err){
        if (err instanceof ApiError){
            res.status(422).render('etu/etufinalreport', {err});
        }
    }
});

router.post('/admitEtuForm', async (req, res, next) => {
    try{        
        const body = {
            id : req.query.id,
            asgn_ward : "CCunit",
            status : "Admitted"
        }  
        const {value, error} = etuCompletionSchema.validate(body);
        if (error) {
            res.status(422).render('etu/etufinalreport', {error});
            return;
        } 
        await completeEtuForm(value);
        res.status(200).send('Successfully completed');
    }
    catch(err){
        if (err instanceof ApiError){
            res.status(422).render('etu/etufinalreport', {err});
        }
    }
});

router.get('/ccUnit', async (req, res, next) => {
    try{
        const data = await admittedPatients();
        res.status(200).render('etu/ccUnit', {data});
    }
    catch(err){
        if (err instanceof ApiError){
            res.status(422).render('etu/ccUnit', {err});
        }
    }
});

module.exports = router;