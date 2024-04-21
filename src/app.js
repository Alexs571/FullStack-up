const express = require('express');
const app = express();
const morgan = require('morgan');
// const authRoutes = require("../src/routes/auth.routes");
const Router = require('../src/routes/auth.routes');
require('dotenv').config();
const PORT = process.env.PORT || 8050 ;

app.use(morgan('dev'));
app.use(express.json());
app.use('/api',Router);


app.listen(PORT, ()=>{
    console.log(`server levantado en puerto ${PORT}`)
});

module.exports = app;