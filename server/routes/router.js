const express = require('express');
const route = express.Router()
const { ensureAuth, ensureGuest } = require('../../middleware/auth')
const services = require('../services/render');
const controller = require('../controller/controller');

/**
 *  @description Root Route
 *  @method GET /
 */
route.get('/', ensureGuest ,services.homeRoutes);

/**
 *  @description complaint register
 *  @method GET / complaint
 */
route.get('/register',ensureAuth , services.register);

/**
 *  @description add complaints
 *  @method GET /add-complaint
 */
route.get('/add-complaint', services.add_complaint)

/**
 *  @description for update complaint
 *  @method GET /update-complaint
 */
route.get('/update-complaint', services.update_complaint)


// API
route.post('/api/complaints', controller.create);
route.get('/api/complaints', controller.find);
route.put('/api/complaints/:id', controller.update);
route.delete('/api/complaints/:id', controller.delete);


module.exports = route