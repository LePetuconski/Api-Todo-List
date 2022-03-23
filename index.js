const express = require('express') 
const conexao = require('./src/database')
const router = require('./src/routes')
const cors = require('cors')
const app = express()

require('./src/models/Task') 
require('./src/models/User')
require('./src/models/Category')

require('dotenv').config()

app.use(express.json()) 
app.use(cors()) 
app.use('/', router) 

conexao.authenticate()
    .then(() => console.log('Banco de dados conectado'))
    .catch((err) => console.error(`Ocorreu um erro: ${err}`))

app.listen(8080, (erro) => {
    if (erro) {
        console.log(erro)
    }
    console.log('API iniciada com sucuesso!')
})