const productModel = require("../models/productModel");

// Controller function to create a new product
exports.createProduct = async (req, res) => {
    try {
        const { name, price, description, imageUrl, instock } = req.body;

        const newProduct = new productModel({
            name,
            price,
            description,
            imageUrl,
            instock,
            user: req.user._id  // Assuming req.user is set after authentication
        });
        const savedProduct = await newProduct.save();
        res.status(201).json({ message: 'Product created successfully', product: savedProduct });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
        console.log("Server Error:", error)
    }
};

// Controller function to get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await productModel.find({user: req.user._id}); // Fetch products for the authenticated user
        res.status(200).json({products});
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
        console.log("Server Error:", error)
    }
};

// Controller function to get a product by ID
exports.getProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await productModel.findById({ _id: productId, user: req.user._id });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({product});
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
        console.log("Server Error:", error)
    }
};
// Controller to update a product by ID
exports.updateProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const updates = req.body;
        const updatedProduct = await productModel.findByIdAndUpdate({ _id: productId, user: req.user._id }, updates, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
        console.log("Server Error:", error)
    }
};
// Controller to delete a product by ID
exports.deleteProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const deletedProduct = await productModel.findByIdAndDelete({ _id: productId, user: req.user._id });
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully', product: deletedProduct });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
        console.log("Server Error:", error)
    }
};