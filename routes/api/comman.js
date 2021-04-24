const router = require('express').Router();
const { getPatient, getCheckup, getEtuform } = require('../service/comman');

router.get('/patient', async (req, res, next) => {
    try {
        const patient = await getPatient(req.query.nic);
        res.status(200).render('nurse/viewPatient', {patient});
    } catch (err) {
        next(err);
    }
    
});

router.get('/checkup/:nic/:visitDate', async (req, res, next) => {
    try {
        const checkup = await getCheckup(req.params.nic, req.params.visitDate); 
        res.status(200).json(checkup);
    } catch (err) {
        next(err);
    }
});

router.get('/etuform/:nic/:visitDate', async (req, res, next) => {
    try {
        const etuform = await getEtuform(req.params.nic, req.params.visitDate);
        res.status(200).json(etuform);
    } catch (err) {
        next(err);
    }
});

module.exports = router;