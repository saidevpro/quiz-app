const Validator = require('validatorjs');

const PASSWORD_MIN_SIZE = 4;

exports.validateQuizData = data => {
  const { categories, question, body, response_description, responses, correct_response } = data;

  return new Validator(
    { categories, question, body, response_description, responses, correct_response },
    {
      categories: 'required|array',
      question: 'required|string',
      body: 'required|string',
      response_description: 'required|string',
      responses: 'required|array',
      correct_response: 'required'
    }
  );
};

exports.validateUserLoginData = data => {
  const { email, password, remember } = data;

  return new Validator(
    { email, password, remember },
    { email: 'required|email', password: `required|min:${PASSWORD_MIN_SIZE}`, remember: 'boolean' }
  );
};

exports.validateUserRegisterData = data => {
  const { username, email, password, password_confirmation, remember } = data;

  return new Validator(
    { username, email, password, password_confirmation, remember },
    {
      username: 'required|min:4',
      email: 'required|email',
      password: `required|min:${PASSWORD_MIN_SIZE}|confirmed`,
      remember: 'boolean'
    }
  );
};
