var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');
var session = require('express-session');
var flash    = require('connect-flash');
var methodOverride = require('method-override');
var flash = require('connect-flash');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var estimationsRouter = require('./routes/estimations');
var investmentsRouter = require('./routes/investments');
var registersRouter = require('./routes/registers');
var termsRouter = require('./routes/terms');

var app = express();

app.locals.user1  = {
  id: '1',
  pwd: '1',
  name: 'leean',
  evaluator: true
}
app.locals.user2 = {
  id: '2',
  pwd: '2',
  name: 'lili',
  evaluator: false
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(methodOverride('_method', {methods: ['POST', 'GET']}));

// app.use(sassMiddleware({
//   src: path.join(__dirname, 'public'),
//   dest: path.join(__dirname, 'public'),
//   indentedSyntax: true, // true = .sass and false = .scss
//   sourceMap: true
// }));

app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'long-long-long-secret-string-1313513tefgwdsvbjkvasd'
}));

app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.locals.flashMessages = req.flash();
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/estimations', estimationsRouter);
app.use('/investments', investmentsRouter);
app.use('/registers', registersRouter);
app.use('/terms',termsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
