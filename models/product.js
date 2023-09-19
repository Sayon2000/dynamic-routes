const fs = require('fs');
const path = require('path');
const Cart = require('./cart')

const p = path.join(
  path.dirname(require.main.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      return cb([]);
    } else {
      return cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id , title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    
    getProductsFromFile(products => {
      console.log(this.id !== null)
      if(this.id !== null){
        const updatedProducts = [...products];
        const index = products.findIndex(p => p.id === this.id)
        console.log(index)
        if(index != -1){
          updatedProducts[index] = this;
          fs.writeFile(p , JSON.stringify(updatedProducts) , (err)=>{
            if(err){
              console.log(err)
            }
          })
        }
      }else{
        this.id = Math.random().toString()
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), err => {
          console.log(err);
        });
      
      
      }

    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
  static findById(id , cb){
    getProductsFromFile((products) =>{
      const product = products.find(p => p.id === id)
      cb(product)
    })
  }
  static deleteProduct(id){
     getProductsFromFile(async(products)=>{

      const index = products.findIndex(p => p.id === id)
      let price;
      if(index !== -1){
        const updatedProducts = [...products];
        price = updatedProducts[index].price
        updatedProducts.splice(index ,1);
        fs.writeFile(p , JSON.stringify(updatedProducts) , (err)=>{
          if(err)
            console.log(err)
        })
        await Cart.removeProduct(id , price)
      }
    })

};
}
