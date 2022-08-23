const express = require('express');
const saleController = require('../controllers/saleController');
const saleValidation = require('../middlewares/saleValidation');

const saleRoute = express.Router();

saleRoute.get('/', saleController.getAll);
saleRoute.post('/', saleValidation.saleValidation, saleController.create);

module.exports = saleRoute;