const Joi = require('joi');

const regSchema = Joi.object().keys({
    nic: Joi.string().regex(/^[0-9]+$/).length(12).required(),
    title: Joi.string().allow('Mrs', 'Miss', 'Mr').required(),
    name: Joi.string().max(20).required(),
    adrs: Joi.string().max(100).required(),
    gdn_name: Joi.string().max(20).required(),
    gdn_adrs: Joi.string().max(100),
    contact_no: Joi.string().regex(/^[0-9]+$/).length(10).required(),
    age: Joi.number().integer().required(),
    gender: Joi.string().allow('M', 'F').required(),
    marital_status: Joi.string().allow('M', 'S').required(),
});

const updateSchema = Joi.object().keys({
    title: Joi.string().allow('Mrs', 'Miss', 'Mr'),
    name: Joi.string().max(20),
    adrs: Joi.string().max(100),
    gdn_name: Joi.string().max(20),
    gdn_adrs: Joi.string().max(100),
    contact_no: Joi.string().regex(/^[0-9]+$/).length(10),
    age: Joi.number().integer(),
    gender: Joi.string().allow('M', 'F'),
    marital_status: Joi.string().allow('M', 'S'),
});

const checkupSchema = Joi.object().keys({
    nic: Joi.string().regex(/^[0-9]+$/).length(12).required(),
    visit_date: Joi.date().required(),
    temp: Joi.number().required(),
    pulse_rate: Joi.number().required(),
    resp_rate: Joi.number(),
    bp: Joi.string().max(10).required(),
    weight: Joi.number().required(),
    height: Joi.number().required(),
    bmi: Joi.number(),
    urine: Joi.string().max(10),
});

module.exports = { regSchema, updateSchema, checkupSchema }
