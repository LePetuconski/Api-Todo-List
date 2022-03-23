const Sequelize = require('sequelize')
const conexao = require('../database')

const User = conexao.define('user', {

    nome: {
        type: Sequelize.STRING(100),
        allowNull: false
    },

    email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true 

    },

    password: {
        type: Sequelize.STRING(100),
        allowNull: false
    }
})

User.sync({ force: false })

module.exports = User