const router = require('express').Router();
const ApiError = require('../helpers/ApiError');
const { etuformSchema } = require('../validation/etu');
const { etuformService } = require('../service/etu');
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

module.exports = router;