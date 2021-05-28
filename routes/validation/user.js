const Joi = require('joi');

const loginSchema = Joi.object().keys({
    nic: Joi.string().length(12).pattern(/^[0-9]+$/).required(),
    password: Joi.string().min(6).required(),
});

const userRegSchema = Joi.object().keys({
    nic: Joi.string().length(12).pattern(/^[0-9]+$/).required(),
    name: Joi.string().max(40).required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('doctor', 'nurse', 'dWoker').required(),
    departmentId: Joi.number().integer(),
});

module.exports = { loginSchema, userRegSchema }