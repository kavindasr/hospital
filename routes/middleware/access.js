const ApiError = require('../helpers/ApiError');

const accessControl = (accessLvl) => {
    return (req, res, next) => {
        if (accessLvl.includes(req.user.role_id)) {
            next();
        }
        else {
            next(ApiError.unauthorized({ message: 'Can not access the source' }));
        }
}}

module.exports = accessControl;