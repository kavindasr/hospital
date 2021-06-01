const Joi = require('joi');

const uploadSchema = Joi.object().keys({
    test_status: Joi.string().allow('Completed', 'Rejected').required(),
    feedback: Joi.string(),
});

module.exports = { uploadSchema }