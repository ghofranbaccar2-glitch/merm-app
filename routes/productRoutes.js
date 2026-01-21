const express= require('express');
const router= express.Router();
const productControllers= require('../controllers/productControllers');
const isAuth = require('../middlewares/isAuth');
//test route to verify productRoutes is working
router.get('/test', (req, res)=>{
     res.send('product route is working !')
})

// POST request to create a new product
router.post('/create', isAuth , productControllers.createProduct);
// GET request to fetch all products
router.get('/all',  isAuth ,productControllers.getAllProducts);
// GET request to fetch a product by ID
router.get('/:id', isAuth, productControllers.getProductById);
//Put route to update a product by ID 
router.put('/update/:id', isAuth, productControllers.updateProductById);   
//delete route to delete a product by ID
router.delete('/delete/:id', isAuth, productControllers.deleteProductById);
module.exports = router;