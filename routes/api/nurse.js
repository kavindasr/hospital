const router = require('express').Router();
const ApiError = require('../helpers/ApiError');
const { regSchema } = require('../validation/nurse');
const { registrationService } = require('../service/nurse');

// registration page
router.get('/register', (req, res, next) => {
    res.status(200).send('done');
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
module.exports = router;
