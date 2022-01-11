const express = require('express');
const app = express();

const mongoose = require('mongoose');

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: 'false' }));

app.set('view engine', 'ejs');
app.set('views', 'views');

const shopRoutes = require('./routes/shop');
const adminRoutes = require('./routes/admin');

const errorController = require('./controllers/errors');

app.use('/', shopRoutes);
app.use('/admin', adminRoutes);
app.use(errorController.pageNotFound);


mongoose.
connect('//Add your connection string')
    .then(result => {
        console.log("Server is running on 3000");
        app.listen(3000);
    })
    .catch(err => console.log(err));