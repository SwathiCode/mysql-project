const express = require('express');
const bodyParser = require('body-parser');
const productRoutes = require('./productsRoutes');
const categoriesRoutes = require('./categoriesRoutes');
const countryRoutes = require('./CountriesRoutes');
const orderRoutes = require('./OrdersRoutes');
const  orderitemsRoutes = require('./OrderitemsRoutes');
const  userRoutes = require('./userRoutes');
const app = express();
const port = 5000;
const cors=require('cors');
// Middleware

app.use(cors("*"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/products', productRoutes);
app.use('/categories', categoriesRoutes);
app.use('/countries', countryRoutes);
app.use('/orders', orderRoutes);
app.use('/orderitems', orderitemsRoutes);
app.use('/user', userRoutes);



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
