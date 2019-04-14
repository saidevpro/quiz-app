var express = require('express'); 

var Router = express.Router(); 


Router.get('/categories', (req, res) => {
    return res.send({
        data: ['php','html','css','javascript']
    }); 
}); 


module.exports = Router; 