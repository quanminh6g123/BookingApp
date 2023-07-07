const Place = require('../models/Place');
const Booking = require('../models/Booking')
const Wishlist = require('../models/Wishlist')
const jwt = require('jsonwebtoken');
const jwtSecret = 'awuichaiuwchasasdwd123';
const { multipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');

class PlaceController {
    //[POST] /places
    async uploadPlace(req, res) {
        const { token } = req.cookies;
        const {
            title,
            address,
            addedPhotos,
            description,
            perks,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests,
            price,
        } = req.body;

        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) {
                throw err;
            }
            const placeDoc = await Place.create({
                owner: userData.id,
                title,
                address,
                photos: addedPhotos,
                description,
                perks,
                extraInfo,
                checkIn,
                checkOut,
                maxGuests,
                price,
            });
            res.json(placeDoc);
        });
    }

    //[PUT] /places
    async updatePlace(req, res) {
        const { token } = req.cookies;
        const {
            id,
            title,
            address,
            addedPhotos,
            description,
            perks,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests,
            price,
        } = req.body;
        const placeDoc = await Place.findById(id);
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) {
                throw err;
            }
            if (userData.id === placeDoc.owner.toString()) {
                placeDoc.set({
                    title,
                    address,
                    photos: addedPhotos,
                    description,
                    perks,
                    extraInfo,
                    checkIn,
                    checkOut,
                    maxGuests,
                    price,
                });
                await placeDoc.save();
            }
            res.json('ok');
        });
    }

    //[GET] /places
    async getAllPlaces(req, res) {
        res.json(await Place.find());
    }

    //[GET] /places/:id
    async getPlaceID(req, res) {
        const { id } = req.params;
        res.json(await Place.findById(id));
    }

    //[DELETE] /places/:id
    async deletePlace(req, res) {
        const { id } = req.params;
        await Place.findByIdAndDelete(id);
        await Wishlist.updateMany({ 'wishlist.place': id }, { $pull: { wishlist: { place: id } } });
        await Booking.deleteMany({ place: id });
        res.json('Success');
    }

    //[GET] /places/find/:query
    async queryPlace(req, res) {
        const { query } = req.params;
        const places = await Place.find({
            $or: [
                { address: { $regex: query, $options: 'i' } },
                { title: { $regex: query, $options: 'i' } },
            ],
        });
        res.json(places);
    }
}

module.exports = new PlaceController();
