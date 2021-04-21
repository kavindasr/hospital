const Joi = require('joi');

const etuformSchema = Joi.object().keys({
    nic: Joi.string().regex(/^[0-9]+$/).length(12).required(),
    allergies: Joi.string().max(200),
    observation: Joi.string().required(),
    pupils: Joi.string().max(20),
    so2: Joi.number(),
    gcs: Joi.string().length(1).allow('E','V','M').required(),
    test_depts: Joi.string(),
    severity: Joi.string().max(50),
    asgn_ward: Joi.string().max(50),
});

const test_deptSchema = Joi.array().items(Joi.object().keys({
    dept_id: Joi.number().allow(3,4,5,6).required(),
    test_type: Joi.string().required()
}));

module.exports = {
    etuformSchema,
    test_deptSchema,
}