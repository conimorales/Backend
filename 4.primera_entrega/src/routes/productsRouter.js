// --- imports packages ---
const express = require('express')
const productsRouter = express.Router()
// import File System
const { gestionProd } = require('../fileSystem/ProductManager')

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
        title: req.body.title,
        description: req.body.description,
        code: String(req.body.code),
        price: Number(req.body.price),
        status: true,
        stock: Number(req.body.stock),
        category: req.body.category,
        thumbnail: [req.body.thumbnail]
    }

    await gestionProd.AddProduct(product)
    res.send("product added");
});

productsRouter.put('/:pid', async (req, res) => {
    // deberá tomar un producto y actualizarlo por los campos enviados desde body. NUNCA se debe actualizar o eliminar el id al momento de hacer dicha actualización.
    const { pid } = req.params;
    const productUpdated = {
        title: req.body.title,
        description: req.body.description,
        code: String(req.body.code),
        price: Number(req.body.price),
        status: true,
        stock: Number(req.body.stock),
        category: req.body.category,
        thumbnail: [req.body.thumbnail] //opcional
    }
    gestionProd.updateFile(Number(pid), productUpdated)

    res.send('product updated');
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