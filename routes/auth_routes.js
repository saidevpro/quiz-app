const express = require('express');
const dotenv = require('dotenv');
const User = require('../models/user');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const {
  API_USER_LOGIN_REGEX,
  API_USER_REGISTER_REGEX,
  createUserToken,
  hashPassword,
  comparePassword
} = require('../utils/auth');
const { validateUserLoginData, validateUserRegisterData } = require('../utils/validation');

const Router = express.Router();

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    function(username, password, done) {
      User.findOne({ email: username }, function(err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!comparePassword(password, user.password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    }
  )
);

// Middleware validate login data
Router.post(API_USER_LOGIN_REGEX, async (req, res, next) => {
  const validator = validateUserLoginData(req.body);

  if (validator.fails()) {
    const errorsMessage = Object.values(validator.errors.all());
    const error = new Error(errorsMessage.join(', '));

    return next(error);
  }

  next();
});
Router.post(API_USER_LOGIN_REGEX, function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect('/admin/login');
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      return res.redirect('/admin/quizzes');
    });
  })(req, res, next);
});

// Login handler
// Router.post(API_USER_LOGIN_REGEX, async (req, res, next) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email }).exec();
//   const isCorrectPassword = comparePassword(password, user.password);

//   if (!isCorrectPassword) {
//     return next(new Error('The email or the password is wrong'));
//   }

//   const token = createUserToken(user);

//   const { username } = user;

//   return res.json({
//     username,
//     email,
//     token,
//     auth: true
//   });
// });

// Middleware validate register data
Router.use(API_USER_REGISTER_REGEX, async (req, res, next) => {
  // Validate user input data
  const validator = validateUserRegisterData(req.body);
  if (validator.fails()) {
    const errorsMessage = Object.values(validator.errors.all());
    const error = new Error(errorsMessage.join(', '));

    return next(error);
  }

  // Check if email is already exist
  const count = await User.countDocuments({ email: req.body.email }).exec();
  if (count) {
    return next(new Error('The email is already exist.'));
  }

  next();
});

// Register user handler
Router.post(API_USER_REGISTER_REGEX, (req, res) => {
  const { username, email, password } = req.body;

  var passwordHash = hashPassword(password);

  const newUser = new User({
    username,
    email,
    password: passwordHash
  });

  newUser
    .save()
    .then(user => {
      const token = createUserToken(user);

      return res.json({
        username,
        email,
        token,
        auth: true
      });
    })
    .catch(error => {
      res.status(500).send({
        error: true,
        message: 'Sorry! something goes wrong'
      });
    });
});

Router.use((err, req, res, next) => {
  res.status(403).send({
    error: true,
    message: err.message
  });
});

module.exports = Router;
