var express = require('express')
var router = express.Router();

router.get('/estimationsList', (req, res, next) => {
    res.render('estimation/estimationsList', {user: req.app.locals.user1});
});

router.get('/estimationsList/:id', (req, res, next) => {
    res.render('estimation/estimationDetail', {user: req.app.locals.user1});
});

module.exports = router;