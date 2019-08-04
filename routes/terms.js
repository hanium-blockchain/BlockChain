var express = require('express')
var router = express.Router();

router.get('/personal', (req, res, next) => {
    res.render('terms/PersonalInformationProcessingPolicy');
});

router.get('/conditions', (req, res, next) => {
    res.render('terms/TermsAndConditions');
});

module.exports = router;