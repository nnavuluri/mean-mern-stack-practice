//import express from 'express';
var express=require('express');
var app=express();
var cors=require('cors');

import properties from './config/properties'
import db from './config/db'
import productsRoutes from './products/product.routes'

db();

var bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));     
app.use(bodyParser.json());
app.use(cors());


var productsRouter=express.Router();
productRoutes(productsRouter)
app.use('/productapi',productsRouter);

app.listen(properties.PORT,(err)=>{
    if(err)console.log(err);
    else console.log(`Server is running on port ${properties.PORT}`);
})
