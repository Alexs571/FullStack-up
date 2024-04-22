const express = require('express');
const Router = express.Router();
const validateToken = require('../middleweares/validateToken')
const authControllers = require('../controllers/auth.controllers');




Router.post('/register', authControllers.register)

Router.post('/login',authControllers.login)

Router.post('/logout',authControllers.logout)

Router.get('/profile',validateToken.authRequired ,authControllers.profile)

module.exports = Router;