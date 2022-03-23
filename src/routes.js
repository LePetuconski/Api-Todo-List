const router = require('express').Router()

const TaskController = require('./controllers/TaskController')
const UserController = require('./controllers/UserController')
const CategoryController = require('./controllers/CategoryController')

router.get('/task/:id', TaskController.get)
router.post('/task', TaskController.create)
router.put('/task/:id', TaskController.edit) 
router.delete('/task/:id', TaskController.delete)

router.get('/search', TaskController.search)

router.post('/status', TaskController.status)

router.post('/registro', UserController.register)
router.post('/login', UserController.login)
router.put('/usuario/:id', UserController.edit)
router.delete('/usuario/:id', UserController.delete)
router.get('/user', UserController.user)

router.get('/category/:id', CategoryController.get)
router.post('/category', CategoryController.create)
router.put('/category/:id', CategoryController.edit) 
router.delete('/category/:id', CategoryController.delete)

module.exports = router
