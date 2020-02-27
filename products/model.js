module.exports = {
    all,
    add,
    remove
}

const db = require('../data/db-config');

function all (){
    return db('products');
}

function add(product){
    return db('products').insert(product);
}

function remove(id){
    return db('products').where({id}).del();
}