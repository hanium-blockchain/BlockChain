var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login/login');
});

router.get('/main', function(req, res, next) {
  res.render('main', {user:req.app.locals.user1});
});

module.exports = router;
