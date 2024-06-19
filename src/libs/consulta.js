// pedir el ranking 
const TuModelo = require('../models/teddy.model');
async function obtenerModelosPopulares() {
    try {
        const resultados = await TuModelo.aggregate([
            { $group: { _id: { type: '$type', color: '$color', accessories: '$accessories' }, count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 3 }
        ]);

        return resultados;
    } catch (error) {
        throw new Error('Error al obtener modelos populares: ' + error.message);
    }
}

module.exports = { obtenerModelosPopulares };
