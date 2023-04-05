// imports packages
const express = require('express')
const cartsRouter = express.Router()

const { gestionCart } = require('../admins/CartManager')




// Methods
cartsRouter.post('/', async (req, res) => {
    const path =   [ {
        "products": [
            {
                "id": 3,
                "quantity": 3
            },
            {
                "id": 1,
                "quantity": 2
            }
        ]
    },
    {
        "products": [
            {
                "id": 8,
                "quantity": 3
            },
            {
                "id": 2,
                "quantity": 2
            }
        ]
    }]


    const response = await gestionCart.createCart(path)
    res.send(response);
});



cartsRouter.get('/:cid', async (req, res) => {
    const cid = req.params.cid
    const carts = await gestionCart.getCarts()
    let cart = carts.find((c) => c.id === Number(cid))
    if (cart) {
        res.status(200).send(cart.products)
    }
    console.error('Error: cart not found with that cid')
});

cartsRouter.post('/:cid/product/:pid', async (req, res) => {
    const cid = req.params.cid
    const pid = req.params.pid
    // agregar el producto al carrito
       
    let cart = await gestionCart.getCartById(Number(cid))
    let product = await gestionProd.getProductById(Number(pid))

    const productAdd = {
        id: product.id,
        quantity: 1
    }
    // console.log('este es el producto', product)
    // agregar if que controle que no se pueda agregar mas del stock del producto
    gestionCart.addToCart(cart, productAdd)

    // cart.products.push(Number(pid))
    res.status(200).send('product added to cart')
});


// exports
module.exports = {
    cartsRouter,
}

