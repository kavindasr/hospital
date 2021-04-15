const router = require('express').Router();
const ApiError = require('../helpers/ApiError');
const { regSchema } = require('../validation/nurse');

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
    } catch (err) {
        next(err);
    }
})
module.exports = router;
