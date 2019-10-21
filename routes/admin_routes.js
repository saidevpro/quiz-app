const express = require('express');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const { StaticRouter } = require('react-router-dom');
const passport = require('passport');
const { AdminApp } = require('../src/app');
const AuthRoutes = require('./auth_routes');
const { checkTokenMiddlewareWithRedirectBehavior } = require('../utils/auth');
const { BACKEND_PATH } = require('../utils/constant');
const Router = express.Router();

// Router.use(()

function AuthMiddleware(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.redirect('/admin/login');
  }

  return next();
}

Router.use([AuthRoutes]);

Router.get('/login', (req, res) => {
  const app = ReactDOMServer.renderToString(
    <StaticRouter location={req.originalUrl}>
      <AdminApp />
    </StaticRouter>
  );

  res.render('index.pug', {
    app,
    isAdmin: true
  });
});

Router.use(AuthMiddleware, (req, res) => {
  const app = ReactDOMServer.renderToString(
    <StaticRouter location={req.originalUrl}>
      <AdminApp />
    </StaticRouter>
  );

  res.render('index.pug', {
    app,
    isAdmin: true
  });
});

module.exports = Router;
