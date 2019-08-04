var express = require('express')
var router = express.Router();


router.get('/registerDetail', (req, res, next) => {
    res.render('register/registerDetail', {user: req.app.locals.user1});
});

module.exports = router;