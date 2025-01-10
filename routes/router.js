const express = require('express')
const router = express.Router()
const usuariosController = require('../controllers/usuarios.controller')
const { verificacionDeToken } = require('../middleware/jwt')


router.get('/usuarios/', usuariosController.usuarios)
router.get('/usuario/:id', usuariosController.usuario)
router.post('/nuevoUsuario', usuariosController.agregarUsuario)
router.post('/login', usuariosController.login)





module.exports = router