const fs = require('fs')
const path = require('path')

const fileName = path.join(path.dirname(require.main.filename) , 'data' , 'cart.json')

module.exports = class Cart{
    static addProduct(id,price){
        let cart = {product : [] , totalPrice : 0};
        fs.readFile(fileName , (err , data)=>{
            if(!err){
                cart = JSON.parse(data)
            }
            const index = cart.product.findIndex(p => p.id === id);
            const existingProduct = cart.product[index];
            let updatedProduct ;
            if(existingProduct){
                updatedProduct = {...existingProduct};
                updatedProduct.qty = existingProduct.qty + 1;
                cart.product = [...cart.product];
                cart.product[index] = updatedProduct;
            }else{
                updatedProduct = {id : id , qty : 1};
                cart.product = [...cart.product , updatedProduct]
            }
            cart.totalPrice = cart.totalPrice + +price;
            fs.writeFile(fileName , JSON.stringify(cart) , (err)=>{
                if(err)
                    console.log(err)
            })


        })
    }
}