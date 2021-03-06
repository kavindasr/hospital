const Joi = require('joi');

const uploadSchema = Joi.object().keys({
    reqId:Joi.number().required(),
    test_status: Joi.string().allow('Completed', 'Rejected'),
    feedback: Joi.string().allow(''),
});

module.exports = { uploadSchema }