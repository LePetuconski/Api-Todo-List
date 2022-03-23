const Sequelize = require('sequelize')
const Category = require('./Category')
const conexao = require('../database')

const Task = conexao.define('tasks', {
    
    title: {
        type: Sequelize.STRING(120),
        allowNull: false
    },

    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },

    status: {
        type: Sequelize.ENUM('Pending', 'Done'), 
        defaultValue: 'Pending',
        allowNull: false
    },

    date: {
        type: Sequelize.DATE,
        allowNull: true
    },

    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }

})

Category.hasMany(Task, {
    foreignKey:{
        name: 'categoryId',
        allowNull: true
    }
})

Task.belongsTo(Category, {as: 'category'})

Task.sync({ force: false })

module.exports = Task