//Importando os pacotes
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//Configurar o app para usar o bodyParser e transformar as requisições em json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Persistencia
const connectionString = "mongodb+srv://GeovaniRagazzi:13091994@cluster0.8klg9.mongodb.net/bdpos?retryWrites=true&w=majority";
mongoose.connect(connectionString, {useNewUrlParser:true, useUnifiedTopology: true, useFindAndModify: false});

//Definir porta onde o server responderá
const port = process.env.PORT || 3000;

//Definido as rotas
const router = express.Router();

const productRoute = require('./routes/product-route');

//Middleware
router.use(function(req, res, next) {
  console.log('Interceptação pelo middleware ok'); //LOG, Validações, Autenticações
  next();
});

router.get('/', (req, res) => res.send("rota teste ok"));

//Vincular a aplicação (app) com o motor de rotas do express
app.use('/api', router);

//rota para produtos
app.use('/api/produtos/', productRoute);

app.listen(port, () => {
  console.log(`Servidor execuando na porta ${port}`);
});