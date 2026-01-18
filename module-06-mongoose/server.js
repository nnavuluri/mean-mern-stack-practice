var express=require('express');
var app=express();

var bodyParser=require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

var productRouter=require('./productController');
app.use('/productapi',productRouter);

app.listen(3000,(err)=>{
    if(err)console.log(err);
    console.log("Server is running on port 3000");
});
