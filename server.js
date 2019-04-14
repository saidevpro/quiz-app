var express     = require('express'); 
var bodyParser  = require('body-parser'); 
var indexRoute  = require('./routes/index');
var apiRoute    = require('./routes/api'); 
var mongoose    = require('mongoose'); 
var config      = require('./config.server.json'); 

// Mongodb connection
mongoose.connect(config.mongo_uri, {useNewUrlParser: true}); 

// Express Server instance
const app = express(); 

// Express config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); 


// Create routes
app.use('/', indexRoute); 
app.use('/api', [apiRoute]); 
 
// 404's route manager
app.use((req, res, next) => {
    res.status(404).send("Page not found"); 
}); 


app.listen(config.development.port, _ => console.log('-- APP IS WORKING --')); 
