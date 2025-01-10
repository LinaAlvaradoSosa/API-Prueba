const usuarioModel = require('../models/usuarios.model')
const jwt = require ("jsonwebtoken")
require("dotenv").config()

exports.usuarios = async (req,res) =>{
    try {
        let dataUsuario = await usuariosModel.find()
        res.json(dataUsuario)
    } catch (error) {
        console.log (error)
        console.log({error:"Ha ocurrido un error comunicate con el admi"})   
    }
}
exports.usuario = async (req,res) => {
    try {
        const id = req.params.id 
        if (id.length === 24) {
            const user = await usuarioModel.findOne({_id: id})
            if(!user) res.send('no se encontró el usuario')
            res.status(200).json({ok:true, user})  
        } else { 
            res.send("Id invalida")
        }
    } catch (error) {
    console.log(error)
    res.status(500).send({error: "ha ocurrido algo comunicate con el admin"}) 
    }  
}
exports.agregarUsuario = async(req, res) => {
    try {
        let usuario = req.body
        let correo = usuario.correo
        let buscarUsuario = await usuarioModel.findOne({correo: correo})
        if (!buscarUsuario) { 
            let nuevoUsuario = new usuarioModel(usuario)
            await nuevoUsuario.save()
            res.json(nuevoUsuario)
        } else {
            res.send ({error: "Utilice otros datos que no esten en uso"})    
        }        
    } catch (error) {
        console.log(error);
        res.send({error: "ha ocurrido algo comunicate con el admin"})  
    }
}
exports.login = async (req,res) => {
    try {
        let infoUser = req.body
        let usuario = await usuarioModel.findOne({correo:infoUser.correo})
        if(usuario) {
            let contraseña = infoUser.contraseña
            if(usuario.contraseña === contraseña) {
                let payload = {
                    id: usuario._id,
                    correo: usuario.correo
                }
                let SECRET_KEY_JWT= process.env.SECRET_KEY_JWT
                let token = jwt.sign(payload, SECRET_KEY_JWT, {expiresIn:"24h"})
                res.status(200).json({token:token, id:usuario._id})
            } else {
                res.status(400).send({msj:"credenciales incalidas"})
            }
        } else {
            res.status(400).send ({msj:"credenciales invalidas"})
        }
   
    } catch (error) {
        console.log(error)
        res.status(500).send({error: "Ha ocurrido algo comunicate con el admin"})    
    }
}