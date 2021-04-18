const ApiError = require("../helpers/ApiError");

const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        next(ApiError.unauthorized({ message: 'Need to loggedin to access' }));
    }
}

module.exports = isLoggedIn;