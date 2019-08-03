var express = require('express')
var router = express.Router();

router.get('/signin', (req, res, next) => {
    res.render('signin');
});

router.get('/join', (req, res, next) => {
  res.render('join');
})

router.get('/mypage', (req, res, next) => {
  const user = {
    id: 'sjfsilf',
    name: 'kim djk',
    email: 'asldkfja@naver.com',
    phone: '010-8888-8888',
    evaluator: true,
  }
  res.render('mypage', { user: user });
})

// router.get('/', function(req, res, next) {
//   const user = {
//     id: 'asdfa',
//     name: 'asdkjfa',
//     email: 'asldkfja',
//     phone: 'asdfasd',
//     evaluator: true,
//   }
//   res.render('index', { user: user });
// });






router.post('/signin/1', (req, res, next) =>  {
    req.app.locals.userid = "1";
    req.app.locals.username = "등록자";
    req.flash('success', 'Welcome, 등록자!');
    res.redirect('back')
});

router.post('/signin/2', (req, res, next) =>  {
    req.app.locals.userid = "2";
    req.app.locals.username = "평가자";
    req.flash('success', 'Welcome, 평가자!');
    res.redirect('back')
});

router.post('/signin/3', (req, res, next) =>  {
  req.app.locals.userid = "3";
  req.app.locals.username = "플랫폼";
  req.flash('success', 'Welcome, 플랫폼!');
  res.redirect('back')
});

router.post('/signin/4', (req, res, next) =>  {
  req.app.locals.userid = "4";
  req.app.locals.username = "투자자";
  req.flash('success', 'Welcome, 투자자!');
  res.redirect('back')
});

router.get('/signout', (req, res) => {
    req.app.locals.userid = null;
    req.app.locals.username = null;
    req.flash('success', 'Successfully signed out');
    res.redirect('/')
})

module.exports = router;