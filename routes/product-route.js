const express   = require('express');
const router    = express.Router();
const Product   = require('../app/models/product');

//POST => http://localhost:3000/api/products
router.post('/', async (req, res) => {
    id = req.body.category;
    const { name, price, description } = req.body;
    const product = await Product.create({
        name,
        price,
        description,
        category:id
    });

    await product.save((error) => {
        if(error)
            res.status(500).json(
                {
                    message: "Error ao tentar salvar um novo produto " + error
                }
            );

        res.status(201).json({message: 'Produto inserido com sucesso'});
    });
});

//GET => http://localhost:3000/api/products
router.get('/', async (req, res) => {

    productByCategory = await Product.find().populate('category');
    res.status(200).json(productByCategory);
});

//GETByID => http://localhost:3000/api/products/ID
router.get('/:productId', async (req,res) => {
    const id = req.params.productId;
    const productByCategory = await Product.findById(id).populate('category');
    res.status(200).json(productByCategory);
});

//PUT => http://localhost:3000/api/products/ID
router.put('/:productId', async (req,res) => { 
    const product_id    = req.params.productId;

    await Product.findById(product_id, (err, product) => {
        if(err){
            res.status(500).json({
                message: "Erro ao tentar encontrar o produto; Id mal formado"
            });
        } else if(product == null) {
            res.status(400).json({
                message: "Produto não encontrado para o ID passado"
            });
        } else {
            product.name        = req.body.name;
            product.price       = req.body.price;
            product.description = req.body.description;
            product.category    = req.body.category;

            product.save( (error) => {
                if(error)
                    res.status(500).json(
                        {
                            message:"Erro ao tentar atualizar o produto " + error
                        }
                    );

                res.status(200).json({
                    message: "Produto atualizado com sucesso"
                });
            });
        }
    });
});

//DELETE => http://localhost:3000/api/products/ID
router.delete('/:productId', async (req,res) => { 
    try {
        await Product.findByIdAndRemove(req.params.productId);

        return res.status(200).json({
            message: "Produto deletado com sucesso!"
        });

    } catch (err) {
        return res.status(400).send({ error: 'Erro ao deletar o produto '});
    }
    
});

module.exports = router;