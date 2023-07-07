const Booking = require('../models/Booking');
const jwt = require('jsonwebtoken');
const jwtSecret = 'awuichaiuwchasasdwd123';
const { multipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');

class BookingController {
    //[POST] /booking
    async show(req, res) {
        const { token } = req.cookies;
        const { place, checkIn, checkOut, numberOfGuests, name, phone, price } =
            req.body;
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) {
                throw err;
            }
            Booking.create({
                place,
                checkIn,
                checkOut,
                numberOfGuests,
                name,
                phone,
                price,
                user: userData.id,
            })
                .then((doc) => {
                    res.json(doc);
                })
                .catch((err) => {
                    throw err;
                });
        });
    }

    //[Get] /booking
    async getBookings(req, res) {
        const { token } = req.cookies;
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) {
                throw err;
            }
            res.json(
                await Booking.find({ user: userData.id }).populate('place'),
            );
        });
    }

    //[DELETE] /booking/:id
    async deleteID(req, res) {
        const { token } = req.cookies;
        const { id } = req.params;
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) {
                throw err;
            }
            res.json(await Booking.deleteOne({ user: userData.id, _id: id }));
        });
    }

    /* //[Get] /course/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then((course) =>
                res.render('courses/edit', {
                    course: mongooseToObject(course),
                }),
            )
            .catch(next);
    }

    //[PUT] /course/:id
    update(req, res, next) {
        Course.updateOne({ _id: req.params.id }, req.body)
            .then((course) => res.redirect('/me/stored/courses'))
            .catch(next);
    }

    //[Delete] /course/:id
    destroy(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }

    //[Delete] /course/:id/force
    forceDestroy(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }

    //[Patch] /course/:id/restore
    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    } */
}

module.exports = new BookingController();
