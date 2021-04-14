const router = require('express').Router();

router.get('/login', (req, res, next) => {
    res.render('index', {title: 'Hospital'});
});

module.exports = router;