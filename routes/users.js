var express = require('express')
var router = express.Router();

var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'testDB',
});

function validateForm(form){
  var id = form.id || "";
  var password = form.password || "";
  var name = form.name || "";
  var email = form.email || "";
  var phone = form.phone || "";

  if(!id){ return 'ID is required';}
  if(!password){ return 'password is required';}
  if(!name) { return 'name is required'; }
  if(!email) { return 'email is required'; }
  if(!phone) { return 'phone is required'; }

  return null;
}

router.get('/signin', (req, res, next) => {
    res.render('signin');
});

router.get('/join', (req, res, next) => {
  res.render('join');
});

router.post('/', (req, res, next) => {
  var err = validateForm(req.body);
  if(err){
    req.flash('danger', err);
    return res.redirect('back');
  }

  /*
  connection.connect();

  connection.query('SELECT * FROM user', function(error, results, fields){
    if(error){
      console.log(error);
      console.log('error!!!!!');
      req.flash('danger', 'DB connection error');
      return res.redirect('back');
    }
    console.log('success!!!');
    console.log(results);
  });
  connection.end();
  */

  connection.connect(function(err) {
    if(err){
      console.log(err);
      console.log('connection error!!!!!');
    }
    console.log('success!!!!!')
    var sql = "INSERT INTO user VALUES (?, ?, ?, ?, ?, true);"
    var params = [req.body.id, req.body.password, req.body.name, req.body.email, req.body.phone];
    connection.query(sql, params, function(err, result){
      if(err){
        console.log(err);
        console.log('data insert error!!!!!');
        return;
      }
      console.log('insert success!!!');
      console.log(result.affectedRows);
    })
  });

  req.flash('success', 'Registered successfully');
  res.redirect('back');


});

router.get('/mypage', (req, res, next) => {
  const user = {
    id: 'sjfsilf',
    name: 'kim djk',
    email: 'asldkfja@naver.com',
    phone: '010-88778-8888',
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