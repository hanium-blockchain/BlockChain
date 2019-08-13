var express = require('express')
var router = express.Router();

var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '0000',
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
  res.render('user/join');
});
router.get('/mypage_ch', (req, res, next) => {
  const user = {
    id: 'sjfsilf',
    name: 'kim djk',
    email: 'asldkfja@naver.com',
    phone: '010-88778-8888',
    evaluator: true,
  }
  res.render('user/mypage_ch', { user: user });
})

router.get('/mypage', (req, res, next) => {
  const user = {
    id: 'sjfsilf',
    name: 'kim djk',
    email: 'asldkfja@naver.com',
    phone: '010-88778-8888',
    evaluator: true,
  }
  res.render('user/mypage', { user: user });
})


router.get('/logout', (req, res) => {
  req.flash('success', 'Successfully signed out');
  res.redirect('/')
})

router.post('/login', (req, res) => {
  const user = {
    id: '1',
    pwd: '1',
    name: 'leean',
    evaluator: true
  }
  const user_ = {
    id: '2',
    pwd: '2',
    name: 'lili',
    evaluator: false
  }

  // var id = req.body.id
  // var pwd = req.body.pwd
  // console.log(req.body.autoLogin)

  // if (id == '1' | id == '2') {
  //   if (pwd == '1') {
  //     req.flash('success', 'login successfully');
  //     res.redirect('/main')
  //   } else if (pwd == '2') {
  //     req.flash('success', 'login successfully');
  //     res.redirect('/main');
  //     // res.render('main', {user:user_})
  //   } else {
  //     console.log('비밀번호가 틀렸습니다')
  //     res.redirect('back');
  //   }
  // } else {
  //   console.log('아이디가 틀렸습니다')
  //   res.redirect('back');
  // }

  connection.connect(function(err) {
    if(err){
      console.log(err);
      console.log('connection error!!!!!');
    }
    console.log('success!!!!!')
    var sql = 'select * from users where user_id = ? and pw = ?;';
    var params = [req.body.id, req.body.pwd];
    connection.query(sql, params, function(err, result){
      if(err){
        console.log(err);
        console.log('data selelct error!!!!!');
        return;
      }
      console.log('login success!!!');
      console.log(result);
      req.flash('success', 'login successfully');
      res.redirect('/main');
    })
  });

});

router.post('/users/requestjoin', (req, res, next) => {
  var err = validateForm(req.body);
  if(err){
    req.flash('danger', err);
    return res.redirect('back');
  }
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