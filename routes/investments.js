var express = require('express')
var router = express.Router();

router.get('/investmentsList', (req, res, next) => {
    res.render('investment/investmentsList', {user: req.app.locals.user1});
});

router.get('/investmentsList/:id', (req, res, next) => {
    res.render('investment/investmentDetail', {user: req.app.locals.user1});
});

module.exports = router;