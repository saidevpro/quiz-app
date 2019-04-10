var Validator = require('validatorjs'); 

module.exports = {
    createAndUpdateQuiz (req) {
        const {
            question,
            categories,
            response,
            responses,
        } = req.body ;

        const validation = new Validator({
            question,
            categories,
            responses,
            response, 
        }, {
            question: 'required|string',
            categories: 'required|array',
            response: 'required',
            responses: 'required|array',
        }); 

        return new Promise((resolve, reject) => {
            if (validation.fails()) {
                let errorsMessage = Object.values(validation.errors.all()); 
                let error = new Error (errorsMessage.join(', ')); 

                reject(error); 

                return ; 
            }
            return resolve(); 
        }); 
    }
};