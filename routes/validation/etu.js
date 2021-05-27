const Joi = require('joi');

const etuformSchema = Joi.object().keys({
    patientNic: Joi.string().regex(/^[0-9]+$/).length(12).required(),
    allergies: Joi.string().max(200),
    observation: Joi.array().required(),
    pupils: Joi.string().max(20),
    eye: Joi.number(),
    verbal: Joi.number(),
    motor: Joi.number(),
    so2: Joi.number(),
    test_depts: Joi.array(),
    severity: Joi.string().max(50),
    asgn_ward: Joi.string().max(50),
    special_note: Joi.string().max(200),
    status: Joi.string().max(50),
});

const test_deptSchema = Joi.array().items(Joi.object().keys({
    departmentId: Joi.number().required(),
    test_type: Joi.string().required(),
}));

module.exports = {
    etuformSchema,
    test_deptSchema,
}