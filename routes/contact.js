const router = require('express').Router();
const { validate } = require('express-validation');
const { showemail, create } = require('../validations/contact');

const POST = require('../controllers/contact');

router.get('/', POST.all);
router.post('/', validate(create), POST.store);
router.post('/addFavorite', validate(showemail), POST.addToFavirote);
router.post('/removeFavorite', validate(showemail), POST.removeFavirote);
router.delete('/deleteContact', validate(showemail), POST.deleteContact);
router.post('/searchByName', POST.searchByName);
router.get('/favoriteContactList', POST.favoriteContactList);

module.exports = router;