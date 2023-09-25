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
  req.user.getProducts({where : {id : id }})
  .then((product) =>{
    if(!product)
      return res.redirect('/')
    
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing :  editMode,
      formsCSS: true,
      productCSS: true,
      activeAddProduct: true,
      product : product[0]
    });
  })

};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null , title, imageUrl, description, price);
  req.user.createProduct({
    title : title,
    price : price,
    imageUrl : imageUrl,
    description : description
  
  }).then(({dataValues})=>{
    console.log(dataValues.id)
    res.redirect('/admin/products')
  }).catch(e =>{
    console.log(e)
  })
};
exports.postEditProduct = (req, res, next) => {

  const id = req.body.id;
  console.log(id)
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  Product.findByPk(id).then(product =>{
    product.title = title,
    product.price = price,
    product.imageUrl = imageUrl,
    product.description = description
    return product.save()
  })
  .then(()=>{

    res.redirect('/admin/products');
  })
  .catch(e => console.log(e))
};

exports.getProducts = (req, res, next) => {
  req.user.getProducts()
  .then((products)=>{
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });    
    
     
   
};

exports.postDeleteProduct = (req,res)=>{
  console.log(req.params.id)
  Product.destroy({where : {id : req.params.id}}).then(()=>{
    res.redirect('/admin/products')

  })
    
}
