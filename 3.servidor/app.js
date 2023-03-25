//import express from 'express'
// npm install express
//const express = require('express')

const express = require ('express');
const ProductManager = require('./Product_Manager');

const app =  express();
const port = 8080;

const pm = new ProductManager('./Products.json')

app.get('/',(req, res) => {
    res.send("Servidor Con Express!!!");
})

app.get('/products', async (req, res) => {
    const products = await pm.getAll()
    const limit = req.query.limit;
    let respuesta = products

    if (limit && !isNaN(Number(limit))) {
        respuesta = products.slice(0, limit)
    }
    res.send(respuesta);
});

app.get('./products/:pid', async (req, res) => {
    const pid = req.params.pid;
    const data = await pm.getProductById(parseInt(pid));
    res.send(data);

})


app.listen(port,() => console.log(`Servicio Levantado en el Puerto ${port}`));

