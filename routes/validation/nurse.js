const Joi = require('joi');

const regSchema = Joi.object().keys({
    nic: Joi.string().regex(/^[0-9]+$/).length(12).required(),
    title: Joi.string().allow('Mrs', 'Miss', 'Mr').required(),
    name: Joi.string().max(20).required(),
    adrs: Joi.string().max(100).required(),
    gdn_name: Joi.string().max(20),
    gdn_adrs: Joi.string().max(100),
    contact_no: Joi.string().regex(/^[0-9]+$/).length(10),
    age: Joi.number().integer().required(),
    gender: Joi.string().allow('M', 'F').required(),
    marital_status: Joi.string().allow('M', 'S').required(),
    reg_date: Joi.date().required(),
});

module.exports = { regSchema }
