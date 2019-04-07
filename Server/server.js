var express = require('express'); 
var bodyParser = require('body-parser'); 

const app = express(); 

app.get('/', (Request, Response) => {
    return Response.send("Hello! Welcome to my quiz app"); 
}) ;


app.listen(8000, _ => console.log('-- APP IS WORKING --')); 
