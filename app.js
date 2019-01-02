const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

let app = express();

// log if in dev mode
if (app.get('env') === 'development') {
  var dev = true;
}

if (dev) {
  app.use(logger('dev'));
}

// create req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// call this function to create new ids
function generateId() {
  return ++idCounter;
}

// create a REST API for your users db, defined below:
let userDb = [
  {
      id: 0,
      name: 'Daniel Munoz',
      email: 'daniel@munoz.com',
      password: 'qwerty'
  }
];

// Task:
// clients should be able to create new users, get all users, get a single user,
// update a user (based on their id), and delete a user
// feel free to use any built-in functions (including ES6 functions)
// don't use any external libraries (no more require() statements)








// Exra: start adding data validation. don't insert values other
// than name/email/pw, reject creations if they don't have an email and pw, etc.

// handle error
app.use(function(err, req, res, next) {
  if (err) {
    next(err);
  } else {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
  }
});

// development error handler
if (dev) {
  app.use(function(err, req, res, next) {
      console.log(err);
      res.status(err.status || 500).send();
  });
}

// production error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500).send();
});

let server = app.listen(3000, function () {
  console.log('Listening at http://localhost:%s in %s mode', server.address().port, app.get('env'));
});
