const express = require('express');
const Router = express.Router();

const authControllers = require('../controllers/auth.controllers');




Router.post('/register', authControllers.register)
Router.get('/login',authControllers.login)

module.exports = Router;