const Wishlist = require('../models/Wishlist');
const jwt = require('jsonwebtoken');
const jwtSecret = 'awuichaiuwchasasdwd123';
const { multipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');

class WishlistController {
    //[POST] /wishlist
    async wishlist(req, res) {
        const { token } = req.cookies;
        const { place } = req.body;
        if (token) {
            jwt.verify(token, jwtSecret, {}, async (err, userData) => {
                if (err) {
                    throw err;
                }
                const wishlist = await Wishlist.findOne({ owner: userData.id });
                if (wishlist) {
                    res.json(
                        await Wishlist.findOneAndUpdate(
                            { owner: userData.id },
                            {
                                $push: {
                                    wishlist: {
                                        place: place,
                                    },
                                },
                            },
                        ),
                    );
                } else {
                    res.json(
                        await Wishlist.create({
                            owner: userData.id,
                            wishlist: {
                                place: place,
                            },
                        }),
                    );
                }
            });
        } else res.json(null);
    }

    //[Get] /wishlist
    async getWishlist(req, res) {
        const { token } = req.cookies;
        if (token) {
            jwt.verify(token, jwtSecret, {}, async (err, userData) => {
                if (err) {
                    throw err;
                }
                res.json(
                    await Wishlist.find({ owner: userData.id }).populate(
                        'wishlist.place',
                    ),
                );
            });
        } else res.json(null);
    }

    //[Get] /wishlist
    async putWishlist(req, res) {
        const { token } = req.cookies;
        const { place } = req.body;
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) {
                throw err;
            }
            res.json(
                await Wishlist.findOneAndUpdate(
                    { owner: userData.id },
                    {
                        $pull: {
                            wishlist: {
                                place: place,
                            },
                        },
                    },
                ),
            );
        });
    }
}

module.exports = new WishlistController();
