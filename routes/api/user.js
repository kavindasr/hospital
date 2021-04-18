const router = require('express').Router();
const ApiError = require('../helpers/ApiError');
const { loginSchema, userRegSchema } = require('../validation/user');
const timer = require('../config').token_exp;
const { userRegistrationService,
        loginService,
 } = require('../service/user')

router.get('/login', (req, res, next) => {
    res.render('Signin', {title: 'Hospital'});
});
router.post('/login', async (req, res, next) => {
    try {
        const { value, error } = loginSchema.validate(req.body);
        if (error) {
            next(ApiError.unprocessableEntity(error));
            return;
        }
        const { token, user, page } = await loginService(value);
        res.cookie('token', token, { maxAge: timer, httpOnly: true });
        res.status(302);
        res.render(page, user);
    } catch (err) {
        next(err);
    }
});
 
// User Registration page
router.get('/userRegistration', (req, res, next) => {
    res.render('Signup', {});
});

router.post('/userRegistration', async (req, res, next) => {
    try{
        const { value, error } = userRegSchema.validate(req.body);
        if (error) {
            console.log(error);
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