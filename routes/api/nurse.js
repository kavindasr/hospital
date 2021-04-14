const router = require('express').Router();



router.get('/register', (req, res, next) => {
    res.status(200).send('done');
});

module.exports = router;
