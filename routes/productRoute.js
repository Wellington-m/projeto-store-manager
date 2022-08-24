const express = require('express');
const productController = require('../controllers/productController');
const validate = require('../middlewares/validations');

const productRoute = express.Router();

productRoute.get('/', productController.getAll);

productRoute.get('/:id', productController.getById);

productRoute.put('/:id', validate.productValidade, productController.update);

productRoute.post('/', validate.productValidade, productController.create);

module.exports = productRoute;