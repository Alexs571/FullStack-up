import {Router} from 'express'
// import {register, login} from '../controllers/auth.controllers.js'
const authControllers = require('../controllers/auth.controllers');


const router = Router()

router.post('/register', authControllers.register)
router.get('/login',authControllers.login)

