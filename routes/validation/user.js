const Joi = require('joi');

const loginSchema = Joi.object().keys({
    nic: Joi.string().length(12).pattern(/^[0-9]+$/).required(),
    pswrd: Joi.string().min(6).required(),
});

const userRegSchema = Joi.object().keys({
    nic: Joi.string().length(12).pattern(/^[0-9]+$/).required(),
    user_name: Joi.string().max(40).required(),
    pswrd: Joi.string().min(6).required(),
    role_id: Joi.number().required(),
});

module.exports = { loginSchema, userRegSchema }