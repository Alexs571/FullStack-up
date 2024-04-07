const express = require('express');
const app = express();
const connectBD = require('./database')
require('dotenv').config();



connectBD();
const PORT = process.env.PORT ||8050 ;





// app.use(express.json());

// app.get('/productos',(req, res)=>{
//     res.json('H')
// });

app.listen(PORT, ()=>{
     console.log(`server levantado en puerto ${PORT}`)
 });



