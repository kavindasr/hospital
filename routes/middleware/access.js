const ApiError = require('../helpers/ApiError');

const accessControl = (accessLvl) => {
    return (req, res, next) => {
        if ( accessLvl == req.user.role_id) {
            next();
        }
        else {
            next(ApiError.unauthorized);
        }
}}

module.exports = accessControl;