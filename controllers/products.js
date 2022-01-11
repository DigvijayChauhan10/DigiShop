const Product = require('../models/product');

const Category = require('../models/category');

// /admin=> GET
exports.admin = (req, res, next) => {
    Category.find().
    then(categories => {
            res.render('admin/admin', {
                cats: categories,
                docTitle: 'Admin',
                path: '/admin'
            });
        })
        .catch(err => {
            console.log(err);
        });

};
// ADMIN/PRODUTS =>GET get products by category
exports.getProductsByCategory = (req, res, next) => {
        const catId = req.params.categoryId;
        Product.find({ categoryId: catId })
            .then(products => {
                res.render('admin/products', {
                    prods: products,
                    docTitle: 'Products',
                    path: '/products'
                })
            })
            .catch(err => {
                console.log(err);
            });
    }
    // Add Category=>GET 
exports.getAddCategory = (req, res, next) => {
    res.render('admin/add-category', {
        docTitle: 'Add Category',
        path: '/admin/add-category'
    });
};
// Add Category=>POST
exports.postAddCategory = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const des = req.body.des;

    const category = new Category({
        title: title,
        imageUrl: imageUrl,
        description: des
    });

    category.save()
        .then(result => {
            console.log("Category add sucessfully.");
            res.redirect('/admin');
        })
        .catch(err => {
            console.log(err);
        })
};
// Edit Category=>GET
exports.getEditCategory = (req, res, next) => {
    const catId = req.params.categoryId;
    Category.findById(catId)
        .then(category => {
            res.render('admin/edit-category', {
                category: category,
                docTitle: 'Edit Details',
                path: '/admin/edit',
                edit: 'true'
            });
        })
        .catch(err => console.log(err));
};

// Edit Category =>POST
exports.postEditCategory = (req, res, next) => {
    const catId = req.body.categoryId;
    const updatetitle = req.body.title;
    const updateimageUrl = req.body.imageUrl;
    const updatedes = req.body.des;

    Category.findById(catId)
        .then(category => {
            category.title = updatetitle;
            category.imageUrl = updateimageUrl;
            category.description = updatedes;
            return category.save();
        })
        .then(result => {
            console.log("Category Update Sucessfully.");
            res.redirect('/admin');
        })
        .catch(err => console.log(err))
};
// DELETE CATEGORY BY ID
exports.deleteCategory = (req, res, next) => {
    const catId = req.params.categoryId;
    Category.findByIdAndRemove(catId)
        .then(result => {
            console.log("Category Delete Sucessfully");
            res.redirect('/admin');
        })
        .catch(err => console.log(err))
};

// Add Product=> GET
exports.getAddProduct = (req, res, next) => {
    Category.find().
    then(categories => {
            res.render('admin/add-product', {
                docTitle: 'Add Product',
                categories: categories,
                path: '/admin/add-product'
            });
        })
        .catch(err => {
            console.log(err);
        });

};
// Add Product=> POST
exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const price = req.body.price;
    const quntity = req.body.quntity;
    const categoryId = req.body.categoryId;
    const imageUrl = req.body.imageUrl;
    const des = req.body.des;

    const product = new Product({
        title: title,
        price: price,
        quntity: quntity,
        imageUrl: imageUrl,
        categoryId: categoryId,
        description: des
    });

    product.save()
        .then(result => {
            console.log('Product save Sucessfully.');
            res.redirect('/admin');
        })
        .catch(err => {
            console.log(err);
        });
};

// Edit Product=> GET

exports.getEditProduct = async(req, res, next) => {
        const proId = req.params.productId;

        const categories = await Category.find();
        Product.findById(proId)
            .then(product => {
                res.render('admin/edit-product', {
                    product: product,
                    cats: categories,
                    docTitle: 'Edit Details',
                    path: '/admin/edit',
                    edit: 'true'
                });
            })
            .catch(err => console.log(err));
    }
    // Edit Product=> POST
exports.postEditProduct = (req, res, next) => {
        const proId = req.body.productId;
        const updatetitle = req.body.title;
        const updateimageUrl = req.body.imageUrl;
        const updatePrice = req.body.price;
        const updatedes = req.body.des;
        const updatequntity = req.body.quntity;
        const updatecategoryid = req.body.categoryId;

        Product.findById(proId)
            .then(product => {
                product.title = updatetitle;
                product.price = updatePrice;
                product.imageUrl = updateimageUrl;
                product.description = updatedes;
                product.categoryId = updatecategoryid;
                product.quntity = updatequntity;
                return product.save();
            })
            .then(result => {
                console.log("Product Update Sucessfully.");
                res.redirect('/admin');
            })
            .catch(err => console.log(err))
    }
    // DELETE Product BY ID

exports.deleteProduct = (req, res, next) => {
    const proId = req.params.productId;
    Product.findByIdAndRemove(proId)
        .then(result => {
            console.log("Product Delete Sucessfully");
            res.redirect('/admin');
        })
        .catch(err => console.log(err))
}