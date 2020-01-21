const { Router } = require('express');
const DevController = require('./controllers/DevController');
const SearchConstroller = require('./controllers/SearchController');

const routes = Router();

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);
routes.put('/devs/:id', DevController.update)
routes.delete('/devs/:id/:secretkey', DevController.destroy)

routes.get('/search', SearchConstroller.index);

module.exports = routes;