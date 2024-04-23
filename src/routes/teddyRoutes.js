const express = require('express');
const router = express.Router();
const validateToken = require('../middleweares/validateToken')
const teddyController = require('../controllers/teddyControllers');

// Rutas para operaciones CRUD con los teddies
router.post('/teddies', teddyController.createTeddy);

router.get('/teddies/:userId', teddyController.getAllTeddies);

router.get('/teddies/:userId/:teddyId',validateToken.authRequired , teddyController.getTeddyById);

router.put('/teddies/:userId/:teddyId', validateToken.authRequired ,teddyController.updateTeddyById);

router.delete('/teddies/:userId/:teddyId', validateToken.authRequired , teddyController.deleteTeddyById);


module.exports = router;
