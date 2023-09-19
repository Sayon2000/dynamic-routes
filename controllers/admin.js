const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
    editing : ""
  });
};
exports.getEditProduct = (req, res, next) => {
  const id = req.params.id;
  const editMode = req.query.edit;
  if(!editMode){
    return res.redirect('/')
  }

  Product.findById(id , (product) =>{
    if(!product)
      return res.redirect('/')
    
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing :  editMode,
      formsCSS: true,
      productCSS: true,
      activeAddProduct: true,
      product : product
    });
  })

};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null , title, imageUrl, description, price);
  product.save();
  res.redirect('/');
};
exports.postEditProduct = (req, res, next) => {

  const id = req.body.id;
  console.log(id)
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(id , title, imageUrl, description, price);
  product.save();
  res.redirect('/admin/products');
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
};

exports.postDeleteProduct = (req,res)=>{
  console.log(req.params.id)
  Product.deleteProduct(req.params.id)
    
  res.redirect('/admin/products')
}
