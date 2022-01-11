const Product = require("../models/product");

const Category = require("../models/category");

exports.getCategories = async (req, res, next) => {
  const categories = await Category.find();

  Product.find()
    .then((products) => {
      res.render("shop/home", {
        prods: products,
        cats: categories,
        docTitle: "Welcome User",
        path: "/",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProductById = (req, res, next) => {
  const proId = req.params.productId;

  Product.findById(proId)
    .then((product) => {
      res.render("shop/product", {
        product: product,
        docTitle: "Product Details",
        path: "/product/",
      });
    })
    .catch((err) => console.log(err));
};

exports.getProductsByCategory = async (req, res, next) => {

  const catId = req.params.categoryId;
  const category = await Category.findById(catId);
  const categoryTitle=category.title;
  Product.find({ categoryId: catId })
    .then((products) => {
      res.render("shop/products", {
        prods: products,
        categoryName: categoryTitle,
        docTitle: "Products Related To Category",
        path: "/products",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
