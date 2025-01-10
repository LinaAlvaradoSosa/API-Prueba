const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.verificacionDeToken = async (req, res, next)=>{
    try {
        let SECRET_KEY_JWT = process.env.SECRET_KEY_JWT
        let token = req.headers.authorization
        token = token.split(' ')[1]
        jwt.verify(token,SECRET_KEY_JWT, (error, decode)=>{
            if (error) {
                res.status(400).send({error:"Token invalido"})
            } else {
                req.usuario = decode
                next()
            }
        }) 
    } catch (error) {
    console.log(error);
    res.status(500).send ({error: "ha ocurrido un error comunicate con el admi"})

    }
}
