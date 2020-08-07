var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var session = require('express-session');
var cors = require('cors');
var dotenv = require('dotenv');
dotenv.config();
var dburl = process.env.MONGOLAB_URI;

var app = express();

mongoose.connect(dburl,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex:true,
  useFindAndModify: false
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json({ extended:false }));
app.use(express.urlencoded({ extended: false }));
app.use(session({secret:'SuperSuper10!',cookie:{}}) )
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', require('./routes/index'));
app.use('/greet', require('./routes/greet'),);
app.use('/project', require('./routes/project'));
app.use('/resume',require('./routes/resume'));

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
