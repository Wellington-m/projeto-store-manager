const Joi = require('joi');

const schemaProduct = Joi.object({
  name: Joi.string().min(5).required().messages({
    'any.required': '"name" is required',
    'string.empty': '"name" is required',
    'string.min': '"name" length must be at least 5 characters long',
  }),
});

const stausCode = (error) => {
  const errorType = error.details[0].type;
  if (errorType === 'string.empty' || errorType === 'any.required') {
    return 400;
  }
  return 422;
};

const productValidade = (req, res, next) => { 
  const values = req.body;

  const { error } = schemaProduct.validate(values);

  if (error) return res.status(stausCode(error)).json({ message: error.details[0].message });

  next();
};

module.exports = { productValidade };