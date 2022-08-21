const express = require('express');
const saleController = require('../controllers/saleController');

const saleRoute = express.Router();

saleRoute.post('/', saleController.create);

module.exports = saleRoute;