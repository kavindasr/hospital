const router = require('express').Router();
const ApiError = require('../helpers/ApiError');
const { regSchema, updateSchema, checkupSchema } = require('../validation/nurse');
const { registrationService, updateService, checkupService } = require('../service/nurse');
const accessControl = require('../middleware/access');
const ROLES = require('../enums/role');

// registration page
router.get('/register', (req, res, next) => {
    res.status(200).render('nurse/patientReg', {});
});

// visit patient details page
router.get('/viewPatient', (req, res, next) => {
    res.status(200).render('nurse/viewPatient', {});
});


// Visit Checkup Page
router.get('/checkup', (req, res, next) => {
    res.status(200).render('nurse/checkup', {});
});

// home page
router.get('/home', (req, res, next) => {
    const user = req.user;
    res.render('nurse/home', user);
});


router.post('/register', async (req, res, next) => {
    try {
        const { value, error } = regSchema.validate(req.body);
        if (error) {
            next(ApiError.unprocessableEntity(error));
            return;
        }
        await registrationService(value);
        res.status(201).send('Patient registered');
    } catch (err) {
        next(err);
    }
})

router.put('/updatePatient/:nic', async (req, res, next) => {
    try{
        const { value, error } = updateSchema.validate(req.body);
        if (error) {
            next(ApiError.unprocessableEntity(error));
            return;
        }
        await updateService(req.params.nic, value);
        res.status(201).send('Updated succussfully');
    } catch(err) {
        next(err);
    }
});

router.post('/checkup', async (req, res, next) => {
    try {
        console.log(req.user.role.id)
        const { value, error } = checkupSchema.validate(req.body);
        value.visit_date = (new Date()).toISOString().substr(0,10);
        if (error) {
            next(ApiError.unprocessableEntity(error));
            return;
        }
        await checkupService(value, req.user.role.id);
        res.status(201).send('Checkup completed');
    } catch (err) {
        console.log(err);
        next(err);
    }
});

module.exports = router;
