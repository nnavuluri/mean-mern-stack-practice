var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var employeeRouter = require('./employeeController'); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/employeeapi', employeeRouter); 
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
