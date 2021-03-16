var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var usersRouter = require('./routes/users');
var hospitalRouter = require('./routes/hospitalDate');
var authRouter = require('./routes/auth');
var authTicket = require('./routes/ticket');
const session = require('express-session')

var app = express();

app.use(cookieParser())
app.use(
  session({
    secret: 'fj8erf84hr8fu8r449tru94',   // <-- random secret
    resave: false,
    saveUninitialized: false
  })
)

require('./db')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use('/hospital', hospitalRouter);
app.use('/auth', authRouter)
app.use('/ticket', authTicket)


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
