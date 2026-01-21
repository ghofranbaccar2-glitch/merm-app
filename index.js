const express = require('express');
require('dotenv').config();
const connectDB = require('./db/connectDB');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT

// conect to MongoDB
connectDB();

// Middleware to parse JSON requests
//app.use (express .json ()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 

// Routes

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

app.listen(port, (err) =>{ 
    err
        ? console.log("error in server setup")
        : console.log(`Server running on port ${port}`)
})