var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var index = require('./routes/index');
var Post = require('./models/post');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

mongoose.connect('mongodb://localhost/crud');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

app.post('/create', function(req, res) {
  var post = {
    title: req.body.title,
    body: req.body.body
  };

  var newPost = new Post(post);
  newPost.save();

  res.redirect('/read');

});

app.post('/update', function(req, res) {
  var post = {
    title: req.body.title,
    body: req.body.body
  };

  Post.findById(req.body.id, function(err, doc) {
    if (err) {
      console.log(err);
    } else {
      doc.title = req.body.title;
      doc.body = req.body.body;
      doc.save();
    }

  });

  res.redirect('/read');

});

app.get('/read', function(req, res) {
  Post.find().then(function(doc) {
    res.send(doc);
  });
});

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

module.exports = app;
