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


router.get('/signout', (req, res) => {
  req.app.locals.userid = null;
  req.app.locals.username = null;
  req.flash('success', 'Successfully signed out');
  res.redirect('/')
})

router.post('/login', (req, res) => {
  const user = {
    id: '1',
    pwd: '1'
  }

  var id = req.body.id
  var pwd = req.body.pwd
  console.log(req.body.autoLogin)

  if (id == user.id) {
    if (pwd == user.pwd) {
      req.flash('success', 'login successfully');
      res.render('main', {user:user})
    } else {
      console.log('비밀번호가 틀렸습니다')
      res.redirect('back');
    }
  } else {
    console.log('아이디가 틀렸습니다')
    res.redirect('back');
  }

  // connection.connect(function(err) {
  //   if(err){
  //     console.log(err);
  //     console.log('connection error!!!!!');
  //   }
  //   console.log('success!!!!!')
  //   var sql = 'select * from user where id = ? and pwd = ?;';
  //   var params = [req.body.id, req.body.pwd];
  //   connection.query(sql, params, function(err, result){
  //     if(err){
  //       console.log(err);
  //       console.log('data selelct error!!!!!');
  //       return;
  //     }
  //     console.log('login success!!!');
  //     console.log(result);
  //     req.flash('success', 'login successfully');
  //     res.render('main');
  //   })
  // });

});

router.post('/users/requestjoin', (req, res, next) => {
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
    var sql = "INSERT INTO users(user_id, pw, name, email, phone) VALUES (?, ?, ?, ?, ?);"
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

module.exports = router;