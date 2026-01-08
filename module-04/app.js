var express = require('express');
var app = express();


var productRouter = require('./productController');
app.use('/productapi', productRouter);

app.listen(3000, ()=>
 {
  console.log('app listening on port 3000');
}); 