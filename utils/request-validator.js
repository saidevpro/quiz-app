const Validator = require('validatorjs');

module.exports = {
  createAndUpdateQuiz(req) {
    const { categories, question, description, responses, correct_response } = req.body;

    const validation = new Validator(
      {
        categories,
        question,
        description,
        correct_response,
        responses
      },
      {
        categories: 'required|array',
        question: 'required|string',
        description: 'required|string',
        responses: 'required|array',
        correct_response: 'required'
      }
    );

    return new Promise((resolve, reject) => {
      if (validation.fails()) {
        const errorsMessage = Object.values(validation.errors.all());
        const error = new Error(errorsMessage.join(', '));

        reject(error);

        return;
      }
      resolve();
    });
  }
};
