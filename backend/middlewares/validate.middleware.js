const Joi = require('joi');

const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.details.map(detail => detail.message)
      });
    }
    
    next();
  };
};

// Validation schemas
const schemas = {
  register: Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
  }),
  
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }),
  
  createRoom: Joi.object({
    name: Joi.string().min(1).max(50).required(),
    description: Joi.string().max(200).optional(),
    maxMembers: Joi.number().min(2).max(50).optional()
  }),
  
  joinRoom: Joi.object({
    code: Joi.string().length(6).required()
  })
};

module.exports = { validate, schemas };