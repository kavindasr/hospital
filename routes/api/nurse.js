const router = require('express').Router();
const ApiError = require('../helpers/ApiError');
const { regSchema, updateSchema } = require('../validation/nurse');
const { registrationService, updateService } = require('../service/nurse');

// registration page
router.get('/register', (req, res, next) => {
    res.status(200).render('patientReg', {});
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
router.get('/home', accessControl([ ROLES['Nurse'].role_id ]), (req, res, next) => {
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
})

module.exports = router;
