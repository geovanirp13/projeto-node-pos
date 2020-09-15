const express = require('express');
const router = express.Router();
const Category = require('../app/models/category');

//POST => http://localhost:3000/api/categories
router.post('/', async (req, res) => {
    const { name, description } = req.body;
    const category = await Category.create({
        name,
        description
    });

    await category.save((error) => {
        if(error)
            res.status(500).json(
                {
                    message: "Erro ao cadastrar uma categoria" + error
                }
            );

        res.status(201).json({message: 'Categoria cadastrada com sucesso'});
    });
});

//GET => http://localhost:3000/api/categories
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find();

        return res.status(200).send({ categories });

    } catch (err) {
        return res.status(400).send({ error: 'Erro ao carregar as Categorias '});
    }
});

//GETByID => http://localhost:3000/api/categories/ID
router.get('/:categoryId', async (req,res) => {
    try {
        const category = await Category.findById(req.params.categoryId);

        return res.status(200).send({ category });

    } catch (err) {
        return res.status(400).send({ error: 'Erro ao carregar a Categoria '});
    }
});

//PUT => http://localhost:3000/api/categories/ID
router.put('/:categoryId', async (req,res) => { 
    const category_id    = req.params.categoryId;

    await Category.findById(category_id, (err, category) => {
        if(err){
            res.status(500).json({
                message: "Erro ao tentar encontrar a categoria; Id mal formado"
            });
        } else if(category == null) {
            res.status(400).json({
                message: "Categoria não encontrada para o ID passado"
            });
        } else {
            category.name        = req.body.name;
            category.description = req.body.description;

            category.save( (error) => {
                if(error)
                    res.status(500).json(
                        {
                            message:"Erro ao tentar atualizar a categoria " + error
                        }
                    );

                res.status(200).json({
                    message: "Categoria atualizada com sucesso"
                });
            });
        }
    });
});

//DELETE => http://localhost:3000/api/categories/ID
router.delete('/:categoryId', async (req,res) => { 
    try {
        await Category.findByIdAndRemove(req.params.categoryId);

        return res.status(200).json({
            message: "Categoria deletada com sucesso!"
        });

    } catch (err) {
        return res.status(400).send({ error: 'Erro ao deletar a Categoria '});
    }
});

module.exports = router;