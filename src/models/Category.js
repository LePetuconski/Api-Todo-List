const Sequelize = require('sequelize')
const conexao = require('../database')

const Category = conexao.define('categories', {
    title:{
        type: Sequelize.STRING(15),
        allowNull: false
    },

    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

Category.sync({ force: false })

module.exports = Category