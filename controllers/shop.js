const Product = require('../models/product');
const Cart = require('../models/cart')

exports.getProducts = (req, res, next) => {
  Product.fetchAll().then(([products]) => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  });
};


exports.getProduct = (req,res,next)=>{
  const id = req.params.id;
  Product.findById(id).then(([product])=>{

    res.render('shop/product-detail' , {
      product : product[0],
      pageTitle: product.title,
      path: '/products'
    })
  })

}

exports.getIndex = (req, res, next) => {
  Product.fetchAll().then(([products]) => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  });
};

exports.postCart = (req, res, next) => {
  const id = req.body.productId;
  Product.findById(id , (product) =>{
    Cart.addProduct(id , product.price)
  })
  console.log(id)
  
  res.redirect('/')
};
exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart'
  });
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
