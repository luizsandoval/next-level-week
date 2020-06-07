import express from 'express';

const routes = express.Router();

import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

const pointsController = new PointsController();
const itemsController = new ItemsController();

routes
    .get('/items', itemsController.index);

routes
    .post('/points', pointsController.create)
    .get('/points', pointsController.index)
    .get('/points/:id', pointsController.show)

export default routes;