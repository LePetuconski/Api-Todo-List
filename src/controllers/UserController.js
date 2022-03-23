const User = require("../models/User");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class UserController{

    async register(req, res){
        const { nome, email, password} = req.body

        const salt = bcrypt.genSaltSync(10) 
        const hash = bcrypt.hashSync(password, salt) 

        try{
            const response = await User.create({ nome, email, password: hash })
            return res.status(200).json({ status: true, response })
        } catch (erro){
            return res.status(400).json({ status: false, erro:  'O e-mail já está em uso'})
        }
    }

    async login(req, res){
        const { email, password } = req.body

        const user = await User.findOne({ where: { email }}) 

        if (user != undefined) { //se o user ei
            const verificarSenha = bcrypt.compareSync(password, user.password) 
        
            if (verificarSenha){
                let token = jwt.sign({ email }, process.env.SECRET_TOKEN, {
                    expiresIn: '1day'
                })

                return res.status(200).json(token)
            }

            return res.status(400).json({ status: false, erro: 'Senha incorreta!'})
        }
       
        return res.status(400).json({ status: false, erro: 'Usuário e/ou senha incorreta'})
    }
    
    async edit(req, res){
        const { nome, email } = req.body
    
        try{
            const response = await User.update(
                { nome, email },
                { where: { id: req.params.id } }
            )

            return res.status(200).json({ status: true, response })
        } catch(erro){
            return res.status(400).json({ status: false, erro })
        }
    }

    async delete(req, res){
        try{
            const response = await User.destroy({ where: { id: req.params.id }})
            return res.status(200).json({ status: true, response })
        } catch (erro){
            return res.status(400).json({ status: false, erro })
        }
    }

    async user(req, res){
        const authToken = req.headers['authorization']

        if (authToken != undefined) {
            const bearer = authToken.split(' ')
            const token = bearer[1]

            try{

                let decoded = jwt.verify(token, process.env.SECRET_TOKEN)
                let user = await User.findOne({ attributes: ['id', 'nome', 'email'], where: { email: decoded.email }})
                return res.status(200).json(user)

            } catch (error){
                return res.status(400).json({ status: false, erro: 'Token inválido' })
            }
        } else
            return res.status(403).json({ status: false, erro: 'Você não está autorizado' })
    }

}

module.exports = new UserController 