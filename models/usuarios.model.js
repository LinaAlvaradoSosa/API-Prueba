const mongoose = require('mongoose')

const usuarioModel = mongoose.Schema ({
    nombre: {
        type: String,
        require: true
    },
    correo: {
        type: String,
        require: true
    },
    contraseña: {
        type: String,
        require: true
    }

},{
    versionKey: false 
})

module.exports = mongoose.model("usuario", usuarioModel)
/*
"nombre":"Lina Alvarado",
"correo":"lina.alvarado@gmail.com",
"contraseña":"linaAlva"
*/