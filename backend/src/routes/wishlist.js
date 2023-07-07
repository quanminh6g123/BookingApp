const express = require('express');
const router = express.Router();

const WishlistController = require('../app/controllers/WishlistController');

router.get('/', WishlistController.getWishlist);
router.put('/', WishlistController.putWishlist);
router.post('/', WishlistController.wishlist);

module.exports = router;
