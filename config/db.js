const mongoose = require("mongoose")
require("dotenv").config()

const connectDB = async () =>{
    try {
        let mongoURI = process.env.DB_MONGO
        await mongoose.connect(mongoURI)
        console.log("Usted esta conectado a la base de datos");
        
    } catch (error) {
        console.log(error);
        console.log("Error al conectarse a la base de datos")
    }
}

module.exports = connectDB