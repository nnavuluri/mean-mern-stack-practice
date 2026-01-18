var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var productRouter = require('./productController'); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/productapi', productRouter); 

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
