const express = require('express');
const route = express.Router()

const services = require('../services/render');
const controller = require('../controller/controller');



/**
 *  @description 
 *  @method GET 
 */

route.get('/setting', services.setting)


// API
route.get('/api/Users', controller.find);
route.put('/api/Users/:id', controller.update);
route.post('/api/Users/news/:id', controller.newsget);


module.exports = route