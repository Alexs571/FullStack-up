
const mongoose = require('mongoose');
require('dotenv').config();
const uri = process.env.MONGODB_URI;

async function run() {
  try {
    // Conectarse a la base de datos
    await mongoose.connect(uri);
    console.log("Connected to MongoDB using Mongoose!");

    // Esperar a que la conexión se abra
    await new Promise((resolve) => {
      mongoose.connection.once('open', resolve);
    });

    // Puedes realizar operaciones con la base de datos aquí

  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  } finally {
    // Cerrar la conexión con la base de datos
    await mongoose.connection.close();
  }
}

module.exports = run;