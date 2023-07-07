const User = require('../models/User');
const Place = require('../models/Place');
const Feedback = require('../models/Feedback');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'awuichaiuwchasasdwd123';
const { multipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');

class SiteController {
    /* //[Get] /news
    index(req, res, next) {
        Place.find({})
            .then((courses) => {
                res.render('home', {
                    courses: multipleMongooseToObject(courses),
                });
            })
            .catch((err) => {
                res.status(400).json({ error: 'Error' });
                console.log(err);
            });
    } */

    //[POST] /register
    async register(req, res) {
        const { firstName, lastName, email, password } = req.body;
        try {
            const userDoc = await User.create({
                firstName,
                lastName,
                email,
                password: bcrypt.hashSync(password, bcryptSalt),
            });
            res.json(userDoc);
        } catch (e) {
            res.status(422).json(e);
        }
    }

    //[POST] /login
    async login(req, res) {
        const { email, password } = req.body;
        const userDoc = await User.findOne({ email });
        if (userDoc) {
            const checkPass = bcrypt.compareSync(password, userDoc.password);
            if (checkPass) {
                jwt.sign(
                    { email: userDoc.email, id: userDoc._id },
                    jwtSecret,
                    {},
                    (err, token) => {
                        if (err) {
                            throw err;
                        }
                        res.cookie('token', token).json(userDoc);
                    },
                );
            } else {
                res.status(422).json('Pass NOT OK');
            }
        } else {
            res.status(422).json('Not found account');
        }
    }

    //[GET] /profile
    profile(req, res) {
        const { token } = req.cookies;
        if (token) {
            jwt.verify(token, jwtSecret, {}, (err, user) => {
                if (err) {
                    throw err;
                }
                res.json(user);
            });
        } else res.json(null);
    }

    //[GET] /user
    user(req, res) {
        const { token } = req.cookies;
        if (token) {
            jwt.verify(token, jwtSecret, {}, async (err, user) => {
                if (err) {
                    throw err;
                }
                const { email } = user;
                const userDoc = await User.find({ email: email });
                res.json(userDoc);
            });
        } else res.json(null);
    }

    //[POST] /logout
    logout(req, res) {
        res.cookie('token', '').json(true);
    }

    //[GET] /user-places
    userplaces(req, res) {
        const { token } = req.cookies;
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) {
                throw err;
            }
            const { id } = userData;
            res.json(await Place.find({ owner: id }));
        });
    }

    //[GET] /topfeedback
    async topfeedback(req, res) {
        res.json(
            await Feedback.find()
                .populate('place')
                .populate('feedback.user')
                .sort({ rating: -1 })
                .limit(5),
        );
    }
}

module.exports = new SiteController();
