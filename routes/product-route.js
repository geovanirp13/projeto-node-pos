const express = require('express');
const router = express.Router();
const Produto = require('../app/models/product');
const mongoose = require('mongoose');

//Rotas para Produto
router.post('/', function (req, res){
    const produto = new Produto();
    produto.nome = req.body.nome;
    produto.preco = req.body.preco;
    produto.descricao = req.body.descricao;

    produto.save(function(error){
      if(error)
          res.send("Erro ao tentar salvar um novo produto ", error);
      
      res.status(201).json({message: 'produto inserido com sucesso'});
  });
});

module.exports = router;