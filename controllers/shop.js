const Product = require('../models/product');
const Cart = require('../models/cart')

exports.getProducts = (req, res, next) => {
  Product.findAll().then((products) => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  });
};


exports.getProduct = (req,res,next)=>{
  const id = req.params.id;
  Product.findByPk(id).then((product)=>{

    res.render('shop/product-detail' , {
      product : product,
      pageTitle: product.title,
      path: '/products'
    })
  })

}

exports.getIndex = (req, res, next) => {
  Product.findAll().then((products) => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  });
};

exports.postCart =async(req, res, next) => {
  try{
  const id = req.body.productId;
  const cart = await req.user.getCart();
  let products = await cart.getProducts({where : {id : id }});
  let product;
  let qty =1;
  if(products.length > 0){
    product = products[0]
    qty = product.cartItem.quantity +1
  }else{

    product = await Product.findByPk(id);
  }
  await cart.addProduct(product , {through : {quantity : qty}});
  
  res.redirect('/')
  }catch(e){
    console.log(e)
    return res.redirect('/')
  }













  // Product.findByPk(id).then((product) =>{
  //   Cart.addProduct(id , product.price)
  // })
  // console.log(id)
  
};
exports.getCart = (req, res, next) => {
  req.user.getCart().then((cart)=>{
    console.log(cart.id)
    return cart.getProducts()

  }).then((products)=>{
    res.render('shop/cart', {
      path: '/cart',
      pageTitle: 'Your Cart',
      products : products
    })
  })
  .catch(e => console.log(e))

};
exports.deleteCart = async(req,res)=>{
  try{
  const id = req.body.productId;
  console.log(id)
  let cart = await req.user.getCart();
  let products = await cart.getProducts({where : {id : id}})
  let product = products[0]
  console.log(product)
  await product.cartItem.destroy()
  return res.redirect('/cart')
  }catch(e){
    console.log(e)
  }
}

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
