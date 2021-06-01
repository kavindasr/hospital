const Joi = require('joi');

const uploadSchema = Joi.object().keys({
    reqId:Joi.number().required(),
    test_status: Joi.string().allow('Completed', 'Rejected').required(),
    feedback: Joi.string(),
});

module.exports = { uploadSchema }