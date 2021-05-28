const Joi = require('joi');

const nicSchema = Joi.string().regex(/^[0-9]+$/).length(12).required();

module.exports = { nicSchema }