const Joi = require('joi');

const uploadSchema = Joi.object().keys({
    test_status: Joi.string().allow('Completed', 'Rejected').required(),
    formdata: Joi.object().required(),
});

module.exports = { uploadSchema }