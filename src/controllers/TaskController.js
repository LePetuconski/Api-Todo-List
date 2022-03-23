const Task = require('../models/Task')
const Category = require('../models/Category')

const sequelize = require('sequelize')

class TaskController {
    async get(req, res){

        const response = await Task.findAll({ where: { userId: req.params.id }, order: [['date', 'DESC']], raw: true, include:[{ model: Category, as: 'category', where: { id: sequelize.literal('tasks.categoryId')} }] })
       
        if( response == null) {
            return res.status(404).json({ status: false, erro: 'Task não encontrado'})
        }

        return res.status(200).json({ status: true, response })
    }
    async create(req, res){

        const { title, content, date, userId, categoryId } = req.body 
    
        try{
            const response = await Task.create({ title, content, date, userId, categoryId })
            return res.status(200).json({ status: true, response }) 
        } catch (erro){
            return res.status(400).json({ status:false, erro }) 
        }
    }

    async edit(req, res){

        const { title, content, status, date, categoryId } = req.body
    
        try{
            const response = await Task.update(
                { title, content, status, date, categoryId },
                { where: { id: req.params.id } }
            )

            return res.status(200).json({ status: true, response })
        } catch(erro){
            return res.status(400).json({ status: false, erro })
        }
    }

    async delete(req, res){
        
        try{
            const response = await Task.destroy({ where: { id: req.params.id }})
            return res.status(200).json({ status: true, response })
        } catch (erro){
            return res.status(400).json({ status: false, erro })
        }
    }

    async status(req, res){
        const { id, status } = req.body
        try {

            const response = await Task.update({ status }, { where: { id } })
            return res.status(200).json({ status: true, response })

        } catch (erro){
            return res.status(400).json({ status: false, erro })
        }
    }

    async search(req, res){

        const query = String(req.query.q).toLowerCase()

        try {

            const response = await Task.findAll({ where: { title: sequelize.where(sequelize.fn('LOWER', sequelize.col('tasks.title')), 'LIKE', '%' + query + '%')}})

            return res.status(200).json({ status: true, response })

        } catch (erro){

        }

    }
}

module.exports = new TaskController()