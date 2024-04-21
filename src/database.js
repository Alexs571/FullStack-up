
// const { MongoClient, ServerApiVersion } = require('mongodb');
// require('dotenv').config();
// const uri = process.env.MONGODB_URI;

// const client = new MongoClient(uri, {
//     serverApi: {
//       version: ServerApiVersion.v1,
//       strict: true,
//       deprecationErrors: true,
//     }
//   });
//   async function run() {
//     try {
//       // Connect the client to the server	(optional starting in v4.7)
//       await client.connect();
//       // Send a ping to confirm a successful connection
//       await client.db("admin").command({ ping: 1 });
//       console.log("Pinged your deployment. You successfully connected to MongoDB!");
//     } finally {
//       // Ensures that the client will close when you finish/error
//       await client.close();
//     }
//   }
// module.exports = run;
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