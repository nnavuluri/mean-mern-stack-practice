const axios = require('axios');

const API_URL = 'http://localhost:3000/productapi/products';

function getAllProducts() {
    axios.get(API_URL)
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error(error);
        });
}

function getProductById(id) {
    axios.get(`${API_URL}/${id}`)
        .then(response => {
            console.log(`Product ${id}:`, response.data);
        })
        .catch(error => {
            console.error(`Error fetching product ${id}:`, error);
        });
}
function saveProduct() {
    var newProduct = {
        name: 'New Product',
        price: 29.99,
        product: 'A brand new product'
    };
     axios.post('http://localhost:3000/productapi/addproduct', newProduct)
        .then(response => {
            console.log(response.data);
        }).catch(error => {
            console.error('Error saving product:', error);
        });
}
getAllProducts();
getProductById('6967e6f5f0436b0a0553cfc2');
saveProduct();


//How does Axios differ from the native Fetch API in JavaScript when handling responses?

//Correct! Axios automatically parses JSON responses.
// Why is this the first step?
// Because installing Axios only adds it to your project’s node_modules.
// To actually use it in your JavaScript code, you must load the library into your file.
// Only then can you start calling:

// axios.get()
// axios.post()
// axios.create()


// 3) Response object shape
// Axios response:
// {  data,      // parsed body 
//  status,         // number (e.g., 200)  statusText,     // e.g., "OK"  headers,        // plain object  
// config,         // the axios request config 
//  request         // the underlying request}``Show more lines


// Fetch response (native Response):

// Properties: ok, status, statusText, headers (Headers object), url, redirected, type, etc.
// Methods: json(), text(), blob(), formData(), arrayBuffer(), clone(), body (ReadableStream).

// Takeaway: Axios gives a convenient, already-parsed data and plain headers; Fetch gives a lower-level Response you operate on.