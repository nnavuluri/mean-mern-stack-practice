var express = require('express');
var router=express.Router();

var products= [
  { id: 1, name: 'Laptop', price: 999.99 },
  { id: 2, name: 'Smartphone', price: 499.99 },
  { id: 3, name: 'Tablet', price: 299.99 }
];

var product =[  { id: 1, name: 'Laptop', price: 999.99 },
];

router.get('/', function (req, res) {
  res.send(' express is super tool and easy to develop apis ');

});

router.get('/products', function (req, res) {
  res.json(products);   });

router.get('/products/1', function (req, res) {
  res.json(product);   });  

  router.post('/products', function (req, res) {
    res.send(product);
  });

  router.put('/products', function (req, res) {
    res.send(product);
  });

  module.exports=router;
