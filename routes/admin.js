const express = require('express');
const router = express.Router();

const productController = require('../controllers/products');

router.get('/', productController.admin);

router.get('/products/:categoryId', productController.getProductsByCategory);

router.get('/add-category', productController.getAddCategory);

router.post('/add-category', productController.postAddCategory);

router.get('/edit/category/:categoryId', productController.getEditCategory);

router.post('/edit/category/:categoryId', productController.postEditCategory);

router.get('/delete/category/:categoryId', productController.deleteCategory);

router.get('/add-product', productController.getAddProduct);

router.post('/add-product', productController.postAddProduct);

router.get('/edit/product/:productId', productController.getEditProduct);

router.post('/edit/product/:productId', productController.postEditProduct);

router.get('/delete/product/:productId', productController.deleteProduct);

module.exports = router;