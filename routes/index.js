const {Router} = require('express')
//
const person = require('./person')
const auth = require('./auth')

const routes = Router();

routes.use('/persons', person);
routes.use('/login', auth);

module.exports = routes;
