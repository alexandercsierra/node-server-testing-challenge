const express = require('express');
const helmet = require('helmet');
const server = express();
const productsRouter = require('./products/router')

server.use(helmet());
server.use(express.json());

server.use('/products', productsRouter);

server.get('/', (req, res)=>{
    res.status(200).json({message: 'welcome to the server'})
})

module.exports = server;