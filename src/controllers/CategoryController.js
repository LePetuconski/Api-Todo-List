const Category = require('../models/Category')

class CategoryController{
    async get (req, res){
        const response = await Category.findAll({ where: { userId: req.params.id } } , { order: [['id', 'DESC']], raw: true })
       
        if( response == null) {
            return res.status(404).json({ status: false, erro: 'Category não encontrado'})
        }

        return res.status(200).json({ status: true, response })
    }
    async create(req, res){
        const { title, userId } = req.body 
    
        try{
            const response = await Category.create({ title, userId })
            return res.status(200).json({ status: true, response }) 
        } catch (erro){
            return res.status(400).json({ status:false, erro }) 
        }
    }
    async edit(req, res){
        const { title } = req.body
    
        try{
            const response = await Category.update(
                { title },
                { where: { id: req.params.id } }
            )

            return res.status(200).json({ status: true, response })
        } catch(erro){
            return res.status(400).json({ status: false, erro })
        }
    }
    async delete(req, res){
        try{
            const response = await Category.destroy({ where: { id: req.params.id }})
            return res.status(200).json({ status: true, response })
        } catch (erro){
            return res.status(400).json({ status: false, erro })
        }
    }
    
}

module.exports = new CategoryController