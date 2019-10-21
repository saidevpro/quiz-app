var dotenv = require('dotenv');
var bcrypt = require('bcrypt');
var JWT = require('jsonwebtoken');
var RequestError = require('./error/requesterror').default;

const { ENCRYPT_SALT_ROUND, HASH_ALGORITHM, TOKEN_SECRET_KEY, TOKEN_LIFETIME } = process.env;

export const API_USER_LOGIN_REGEX = /^\/login/i;
export const API_USER_REGISTER_REGEX = /^\/register/i;

exports.hashPassword = password => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(Number(ENCRYPT_SALT_ROUND)));
};

exports.comparePassword = (data, hash) => {
  return bcrypt.compareSync(data, hash);
};

exports.createUserToken = user => {
  return JWT.sign(
    {
      exp: Math.floor(Date.now() / 1000) + Number(TOKEN_LIFETIME)
    },
    TOKEN_SECRET_KEY,
    { algorithm: HASH_ALGORITHM || 'HS256' }
  );
};

exports.checkTokenMiddleware = (req, res, next) => {
  if (API_USER_LOGIN_REGEX.test(req.path) || API_USER_REGISTER_REGEX.test(req.path)) {
    return next();
  }

  if (!req.get('Authorization')) {
    const type = 'invalid_request',
      description = 'the request is missing a required parameter',
      error = new RequestError(description, 400);

    res.set(
      'WWW-Authenticate',
      `Bearer realm=${req.get('host')}, error=${type}, description=${description}`
    );
    return next(error);
  }

  const token = req.get('Authorization').split(' ')[1];
  JWT.verify(token, TOKEN_SECRET_KEY, (err, decoded) => {
    if (err) {
      const type = 'invalid_token',
        description = 'the token is not valid.',
        error = new RequestError(err.message || description, 401);

      res.set(
        'WWW-Authenticate',
        `Bearer realm=${req.get('host')}, error=${type}, description=${description}`
      );
      return next(error);
    }
    next();
  });
};

exports.checkTokenMiddlewareWithRedirectBehavior = redirectPath => (req, res, next) => {
  if (/(login|register)$/i.test(req.path)) {
    return next();
  }

  if (!req.get('Authorization')) {
    const type = 'invalid_request',
      description = 'the request is missing a required parameter';

    res.set(
      'WWW-Authenticate',
      `Bearer realm=${req.get('host')}, error=${type}, description=${description}`
    );
    return res.redirect(redirectPath);
  }

  const token = req.get('Authorization').split(' ')[1];
  JWT.verify(token, TOKEN_SECRET_KEY, (err, decoded) => {
    if (err) {
      const type = 'invalid_token',
        description = 'the token is not valid.';

      res.set(
        'WWW-Authenticate',
        `Bearer realm=${req.get('host')}, error=${type}, description=${description}`
      );
      return res.redirect(redirectPath);
    }
    next();
  });
};
