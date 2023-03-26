// --- imports packages ---
const express = require('express')
const productsRouter = express.Router()
// import File System
const { gestionProd } = require('../admins/ProductManager')

// Methods
productsRouter.get('/', async (req, res) => {
    const products = await gestionProd.getAll()
    const limit = req.query.limit
    let respuesta = products;

    if (limit && !isNaN(Number(limit))) {
        respuesta = products.slice(0, limit)
    }
    res.send(respuesta);
});

productsRouter.get('/:pid', async (req, res) => {
    const { pid } = req.params;
    const product = await gestionProd.getProductById(Number(pid))
    res.send(product);
});

productsRouter.post('/', async (req, res) => {

    const product = {
        title: String(req.query.title),
        description: String(req.query.description),
        code: String(req.query.code),
        price: Number(req.query.price),
        status: true,
        stock: Number(req.query.stock),
        category: String(req.query.category),
        thumbnail: [req.query.thumbnail]
    } 
    if (req.query.title === ''  || req.query.description === '' || req.query.code === '' || req.query.price === '' || req.query.stock === ''  || req.query.category === ''  ){
        res.send('Error no completaste un campo')
    }
    else{
        const response = await gestionProd.AddProduct(product)
        res.send(response);
    }


    
});

productsRouter.put('/:pid', async (req, res) => {
    productList = await gestionProd.getAll()

    const { pid } = req.params;
    const {title, description, code, price, status,  stock, category, thumbnail} = req.body;

    const result = productList.updateProduct(pid, {title, description, code, price, status,  stock, category, thumbnail});

    if(result.err){
        res.status(400).send(result)
    }else{
        res.status(200).send(result)
    }
})

productsRouter.delete('/:pid', (req, res) => {
    // deberá eliminar el producto con el pid indicado.
    const { pid } = req.params
    gestionProd.deleteById(Number(pid))
    res.status(200).send('product deleted')

})

// exports
module.exports = {
    productsRouter,
}