const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');

router.post('/register', siteController.register);
router.post('/login', siteController.login);
router.get('/profile', siteController.profile);
router.get('/user', siteController.user);
router.post('/logout', siteController.logout);
router.get('/user-places', siteController.userplaces);
router.get('/top-feedback', siteController.topfeedback);
//router.get('/', siteController.index);

module.exports = router;
