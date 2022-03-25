const Joi = require('joi');
const APIError = require('../utils/APIError');
const JoiObjectId = require('../utils/joi-objectid')(Joi);

const Contact = require('../models/contact');

exports.showemail = {
  body: Joi.object({
    email    : Joi.string().email({ tlds: { allow: false } }) 
  })
};


exports.create = {
  body: Joi.object({
    firstName  : Joi.string().required(),
    lastName   : Joi.string().required().trim().replace(/\s\s+/g, ' '),
    userName   : Joi.string().required(),
    email      : Joi.string().email({ tlds: { allow: false } })  
  })
}


exports.isExists = async (req, res, next) => {
  try {
    const email =  req.body.email;
    const record = await Contact.findOne({email:email, isDeleted: false});
    if(!record) throw new APIError({status: 200, message: `Email Already Exit present`});    
    if(JSON.stringify(record.user) !== JSON.stringify(user._id) && user.role.name === 'user'){
      throw new APIError({status: 403, message: ""});
    }
    next();
  }
  catch(err) {next( err);}
}