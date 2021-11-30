const { Router } = require('express');
//
const tour = require('./tour');
const employee = require('./employee');
const auth = require('./auth');

const routes = Router();

routes.use('/employees', employee);
routes.use('/tours', tour);
routes.use('/login', auth);

module.exports = routes;
