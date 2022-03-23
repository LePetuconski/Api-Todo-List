const Sequelize = require('sequelize')
const conexao = new Sequelize({
    dialect: 'sqlite',
    storage: './src/database/db.sqlite'
})

module.exports = conexao