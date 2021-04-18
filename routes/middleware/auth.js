const { verify } = require('../helpers/jwt');

const auth = (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        try {
            const user = verify(token);
            req.user = user;
        } catch (err) {
            res.redirect('/user/login');
            return;
        }
    }
    else if (req.path != '/user/login') {
        res.redirect('/user/login');
        return;
    }
    next();
}

module.exports = auth;