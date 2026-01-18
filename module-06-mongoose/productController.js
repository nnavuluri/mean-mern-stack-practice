var express=require('express');
var router=express.Router();
var mongoose=require('mongoose');
var bodyParser=require('body-parser');
mongoose.connect('mongodb://localhost:27017/nagdb')
var productSchema=new mongoose.Schema({
    name:String,
    price:Number,
    product:String
});
var Product=mongoose.model('products',productSchema);
router.use(bodyParser.json());

router.get ('/',(req,res)=>{
    res.send("Welcome to Product API");
});

// fetch all products

router.get('/products',(req,res)=>{
    Product.find().then(products=>{
        res.send(products);
    })
})

// fetch single product

router.get('/products/:id',(req,res)=>{
    Product.findById(req.params.id).then(products=>{
        res.send(products);  
    }); 
});


// add new product
router.post('/addproduct',(req,res)=>{
    var newProduct=new Product(req.body);
    newProduct.save().then(newProduct=>{
        res.send(newProduct)
    }).catch(err=>{
console.log(err);
res.status(500).send("Error in saving product");
    });
});

// update product
router.put('/updateproduct/:id',(req,res)=>{
    var product={
        name:req.body.name,
        price:req.body.price,
        product:req.body.product
    };    

    Product.findByIdAndUpdate({_id:req.params.id}, {$set:product}).then(product=>{
        res.send("  Product updated successfully");
    }).catch(err=>{
        console.log(err);
        res.status(500).send("Error in updating product");
    });
});
// delete product
router.delete('/deleteproduct/:id',(req,res)=>{
    Product.findByIdAndDelete({_id:req.params.id}).then(product=>{    
        res.send(product);
    }).catch(err=>{
        console.log(err);
        res.status(500).send("Error in deleting product");
    });
});

module.exports=router;
