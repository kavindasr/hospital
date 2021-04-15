const router = require('express').Router();
const ApiError = require('../helpers/ApiError');
const { loginSchema, userRegSchema } = require('../validation/user');
const { userRegistrationService,
        loginService,
 } = require('../service/user')

router.get('/login', (req, res, next) => {
    res.render('index', {title: 'Hospital'});
});
router.post('/login', async (req, res, next) => {
    try {
        const { value, error } = loginSchema.validate(req.body);
        if (error) {
            next(ApiError.unprocessableEntity(error));
            return;
        }
        const { token, user, page } = await loginService(value);
        res.status(200).send()
    } catch (err) {
        next(err);
    }
});
 
// User Registration page
router.get('/userRegistration', (req, res, next) => {
    res.render('index', {});
});

router.post('/userRegistration', async (req, res, next) => {
    try{
        const { value, error } = userRegSchema.validate(req.body);
        if (error) {
            next(ApiError.unprocessableEntity(error));
            return;
        }
        await userRegistrationService(value);
        res.status(201).send('User created');
    } catch (err) {
        next(err)
    }
});

module.exports = router;