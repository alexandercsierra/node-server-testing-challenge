const router = require('express').Router();
const Products = require('./model');

router.get('/', (req,res)=>{
    Products.all()
        .then(products=>res.status(200).json(products))
        .catch(err=>{
            console.log(err);
            res.status(500).json({message:'server error'});
        })
})

router.post('/', (req,res)=>{
    Products.add(req.body)
        .then(products=>res.status(201).json(products))
        .catch(err=>{
            console.log(err);
            res.status(500).json({message:'server error'});
        })
})

router.delete('/:id', (req,res)=>{
    Products.remove(req.params.id)
        .then(product=>
            product? res.status(200).json(product): res.status(404).json({message: 'product with that id does not exist'}))
        .catch(err=>{
            console.log(err);
            res.status(500).json({message:'server error'});
        })
})

module.exports=router;