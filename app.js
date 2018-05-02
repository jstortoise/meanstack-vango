var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var passport = require('passport');
var flash    = require('connect-flash');
var session = require('express-session');

var configDB = require('./config/database');

mongoose.connect(configDB.url, { useMongoClient: true });
var conn = mongoose.connection;

require('./config/passport')(passport);

var customer = require('./routes/customer');
var chat = require('./routes/chat');
var admin = require('./routes/admin');
var supplier = require('./routes/supplier');

var UserModel = require('./model/user');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret:'dReservation',
  resave: true,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

global.appRoot = path.resolve(__dirname);

app.use('/', customer);
app.use('/chat', chat);
app.use('/admin', admin);
app.use('/supplier', supplier);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

conn.once('open', function ()
{
  UserModel.find({role:'superadmin'}).exec(function(err, data){
    if(data.length == 0){
      var admin = new UserModel();
      admin.role = 'superadmin';
      admin.status = 'active';
      admin.local.password = admin.generateHash("superadmin");
      admin.local.email = "superadmin@vango.com";
      admin.date = Date.now();
      admin.theme = '3';
      admin.save(function(err){
        if(err) process.exit(1);
      })
    }
  })
});

module.exports = app;
