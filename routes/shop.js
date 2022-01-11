const express = require('express');
const router = express.Router();

const shopController = require('../controllers/shop');

router.get('/', shopController.getCategories);

router.get('/product/:productId', shopController.getProductById);

router.get('/products/:categoryId', shopController.getProductsByCategory);

module.exports = router;