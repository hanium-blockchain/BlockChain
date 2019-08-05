var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('user/login');
});

router.get('/main', function(req, res, next) {
  const asset = {
    asset: 10000,
    token: 100
  }
  res.render('main', {user:req.app.locals.user1, asset:asset});
});

module.exports = router;
