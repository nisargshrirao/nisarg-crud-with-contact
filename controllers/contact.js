
const contact = require('../models/contact');

/**
 * Get all posts
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.all = async (req, res, next) => {
  try {
    const contactData = await contact.find({isDeleted:false}).select("firstName lastName userName email -_id")   
   if (contactData.length >0 ){
     return res.sendJson(200, contactData);
   } else {
    return res.sendJson(200, {msg:'No contact available'});  
   }
  } catch (error) { next(error); }
}

/**
 * Get post by given id
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.addToFavirote = async (req, res, next) => {
  try {
    const email = req.body.email;
    await contact.findOneAndUpdate({email: email}, {$set:{isFavorite:true}});
    return res.sendJson(200,{mesage:'Contact Add to Favirote'});
  } catch (error) { next(error); }
}


exports.removeFavirote = async (req, res, next) => {
  try {
    const email = req.body.email;
    await contact.findOneAndUpdate({email: email}, {$set:{isFavorite: false}});
    return res.sendJson(200,{mesage:'Contact Remove From Favirote'});
  } catch (error) { next(error); }
}

exports.deleteContact = async (req, res, next) => {
  try {
    const email = req.body.email;
   const result= await contact.findOneAndUpdate({email: email}, {$set:{isDeleted: true}});
   return res.sendJson(200,{mesage:'Contact Deleted'});
  } catch (error) { next(error); }
}


exports.searchByName = async (req, res, next) => {
  try {
    const search = req.body.search;    
    const data = await contact.find({
      "$expr": {
        "$regexMatch": {
          "input": { "$concat": ["$firstName", " ", "$lastName"] },
          "regex": search,  //Your text search here
          "options": "i"
        }
      },isDeleted :false
    }).select("firstName lastName userName email -_id")
    return res.sendJson(200,{ contacts : data});
  } catch (error) { next(error); }
}

exports.favoriteContactList = async (req, res, next) => {
  try {
   const favoriteContactListdata = await contact.find({isFavorite: true});
   if (favoriteContactListdata.length > 0) {
    return res.sendJson(200,{favoriteContactListdata});
   } else {
     return res.sendJson(200,{mesage:'There is no contact in Favirote'});
   }
  } catch (error) { next(error); }
}


exports.store = async (req, res, next) => {
  try {
    const payload = req.body;
    const post = await contact.create(payload);
    return res.sendJson(200, removeFields(post.toObject()));
  } catch (error) { 

    next(error); }
}

