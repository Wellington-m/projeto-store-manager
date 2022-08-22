const Joi = require('joi');
const productModel = require('../models/productModel');

const schemaSale = Joi.array().items(Joi.object({
  productId: Joi.number().strict().required().messages({
    'any.required': '"productId" is required',
    'number.empty': '"productId" is required',
  }),
  quantity: Joi.number().strict().min(1).required()
    .messages({
      'any.required': '"quantity" is required',
      'number.empty': '"quantity" is required',
      'number.min': '"quantity" must be greater than or equal to 1',
    }),
}));

// const schemaSale = Joi.object({
//   productId: Joi.number().strict().required().messages({
//     'any.required': '"productId" is required',
//     'number.empty': '"productId" is required',
//   }),
//   quantity: Joi.number().strict().min(1).required()
//     .messages({
//       'any.required': '"quantity" is required',
//       'number.empty': '"quantity" is required',
//       'number.min': '"quantity" must be greater than or equal to 1',
//   }),
// });

const stausCode = (error) => {
  const errorType = error.details[0].type;
  if (errorType === 'number.empty' || errorType === 'any.required') {
    return 400;
  }
  return 422;
};

const saleValidation = async (req, res, next) => { 
  const products = req.body;

  const { error } = schemaSale.validate(products);
  if (error) return res.status(stausCode(error)).json({ message: error.details[0].message });

  const productExist = await Promise.all(
    products
      .map((product) => productModel.getById(product.productId)),
  );

  for (let i = 0; i < productExist.length; i += 1) {
    if (!(productExist[i])) {
      return res.status(404).json({ message: 'Product not found' });
    }
  }
  
  next();
};

module.exports = { saleValidation };