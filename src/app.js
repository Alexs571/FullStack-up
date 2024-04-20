const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 8050 ;


app.listen(PORT, ()=>{
    console.log(`server levantado en puerto ${PORT}`)
});

module.exports = app;