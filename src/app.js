const express = require('express');
const app = express();
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const teddyRoutes = require('./routes/teddyRoutes');
const Router = require('./routes/auth.routes');
const { obtenerModelosPopulares } = require('./libs/consulta');
require('dotenv').config();
const PORT = process.env.PORT || 8050 ;

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use('/api',Router);
app.use('/api', teddyRoutes);

app.get('/api/modelos-populares', async (req, res) => {
    try {
        const resultados = await obtenerModelosPopulares();
        res.json(resultados);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener modelos populares' });
    }
});

app.listen(PORT, ()=>{
    console.log(`server levantado en puerto ${PORT}`)
});

module.exports = app;