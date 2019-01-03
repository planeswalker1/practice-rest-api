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

let idCounter = 0;
// call this function to 'create' new ids
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


// =================================================
// methods to create, read, update and delete users
// =================================================


// get a specific user
userDb.getUserById = function (id, callback) {
  // id = Number(id);
  console.log('userDb.getUserById ran', 'userDb length: ' + userDb.length, 'id: ' + id, 'typeof id: ' + typeof id);

  // check for errors
  if (id > (userDb.length - 1) || isNaN(id)) {
    console.log('stop trying to be slick');
    let err = new Error();
    err.status = 404;
    err.message = 'User does not exist';
    return callback(null, err);
  }

  // match and return user
  for (let i = 0; i < userDb.length; i++) {
    console.log('current iteration of user: ' + JSON.stringify(userDb[i]));
    if (userDb[i].id === id) {
      console.log('matched');
      return callback(userDb[i], null);
    }
  }
}

// add a user to db
userDb.insertUser = function (user, callback) {
  console.log('userDb.insertUser ran');
  console.log('user to be added: ' + JSON.stringify(user));
  console.log('typeof user.name: ' + typeof user.name, 'typeof user.email: ' + user.email, 'typeof user.password: ' +  user.password);

  // check if data is correct type
  if (typeof user.name !== 'string') {
    console.log('user name not found');
    let err = new Error();
    err.status = 400;
    err.message = 'Missing name, user not created';
    return callback(err);
  }

  if (typeof user.email !== 'string') {
    console.log('user email not found');
    let err = new Error();
    err.status = 400;
    err.message = 'Missing email, user not created';
    return callback(err);
  }

  if (typeof user.password !== 'string') {
    console.log('user password not found');
    let err = new Error();
    err.status = 400;
    err.message = 'Missing password, user not created';
    return callback(err);
  }

  // add user to db
  userDb.push(user);

  return callback();
}

// update a user
userDb.updateUser = function (req, id, callback) {
  console.log('userDb.updateUser ran');
  // error checking
  if (id > (userDb.length - 1)) {
    console.log('stop trying to be slick');
    let err = new Error();
    err.status = 404;
    err.message = 'User does not exist';
    return callback(err);
  }

  // match and update user
  for (let i = 0; i < userDb.length; i++) {
    if (userDb[i].id === id) {
      console.log('update request matched');
      console.log('req name: ' + req.body.name, typeof req.body.name);
      console.log('req email: ' + req.body.email, typeof req.body.email);
      console.log('req password: ' + req.body.password, typeof req.body.password);

      // check if data is correct type
      if (typeof req.body.name !== 'string' && typeof req.body.name !== 'undefined') {
        console.log('user name not a string');
        let err = new Error();
        err.status = 400;
        err.message = 'name not a string, user not updated';
        return callback(err);
      }

      if (typeof req.body.email !== 'string' && typeof req.body.email !== 'undefined') {
        console.log('user email not a string');
        let err = new Error();
        err.status = 400;
        err.message = 'email not a string, user not updated';
        return callback(err);
      }

      if (typeof req.body.password !== 'string' && typeof req.body.password !== 'undefined') {
        console.log('user password not a string');
        let err = new Error();
        err.status = 400;
        err.message = 'password not a string, user not updated';
        return callback(err);
      }

      // update user
      userDb[i] = {
        name: req.body.name || userDb[i].name,
        email: req.body.email || userDb[i].email,
        password: req.body.password || userDb[i].password,
      }
      return callback(null);
    }
  }

}

// delete a user
userDb.deleteUser = function (id, callback) {
  // id = Number(id);
  // error checking
  if (id > (userDb.length - 1) || isNaN(id)) {
    console.log('stop trying to be slick');
    let err = new Error();
    err.status(400);
    err.message('User does not exist');
    return callback(err);
  }

  // match and delete user
  for (let i = 0; i < userDb.length; i++) {
    if (userDb[i].id === id) {
      userDb.splice(userDb[i], 1);
      return callback(null);
    }
  }
}

// Task:
// clients should be able to create new users, get all users, get a single user,
// update a user (based on their id), and delete a user
// feel free to use any built-in functions (including ES6 functions)
// don't use any external libraries (no more require() statements)

// Exra:
//  start adding data validation. don't insert values other
// than name/email/pw, reject creations if they don't have an email and pw, etc.

// ===========================
//        ROUTES
// ===========================

// create a user
app.post('/users', function (req, res, next) {
  let newUser = {
    id: generateId(),
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  };
  console.log('post request hit');
  console.log('new user to be created in post request: ' + JSON.stringify(newUser));

  userDb.insertUser(newUser, function (err) {
    if (err) {
      next(err);
    } else {
      res.send('It worked, created a new user');
    }
  });
});

// get all users
app.get('/users', function (req, res) {
  console.log('gif whole db');
  res.json(userDb);
});

// get a single user
app.get('/users/:id', function (req, res, next) {
  userDb.getUserById(Number(req.params.id), function (user, err) {
    console.log('callback of getUserById ran');
    console.log('found user: ' + JSON.stringify(user));
    console.log('error: ' + err);

    if (user) {
      return res.json(user);
    } else {
      return next(err);
    }
  });
});

// update a user
app.put('/users/:id', function (req, res, next) {
  userDb.updateUser(req, Number(req.params.id), function (err) {
    if (err) {
      next(err);
    } else {
      res.send('user updated');
    }
  });
});

// delete a user
app.delete('/users/:id', function (req, res, next) {
  userDb.deleteUser(Number(req.params.id), function (err) {
    if (err) {
      next(err);
    } else {
      res.send('user deleted');
    }
  })
});

// ==============
// error handlers
// ==============

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
      res.status(err.status || 500).send(err.message || 'whoops something crashed go back to /users');
  });
}

// production error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500).send();
});

// ============
// local server
// ============

let server = app.listen(3000, function () {
  console.log('Listening at http://localhost:%s in %s mode', server.address().port, app.get('env'));
});
