const router = require('express').Router();
const { getPatient } = require('../service/comman');

router.get('/patient/:nic', async (req, res, next) => {
    const patient = await getPatient(req.params.nic);
    res.status(200).json(patient);
});

module.exports = router;