const router = require('express').Router();
const { getPatient, getCheckup } = require('../service/comman');

router.get('/patient/:nic', async (req, res, next) => {
    try {
        const patient = await getPatient(req.params.nic);
        res.status(200).json(patient);
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

module.exports = router;