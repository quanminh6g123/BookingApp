require("dotenv").config()
const express = require("express");
const app = express();
const cors = require("cors")
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const User = require("./models/User.js");
const Place = require("./models/Place.js");
const Booking = require("./models/Booking.js");
const Feedback = require("./models/Feedback.js")
const Wishlist = require("./models/Wishlist.js")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'awuichaiuwchasasdwd123';

app.use(cookieParser())
app.use(express.json())
app.use('/uploads', express.static(__dirname + "\\uploads\\"))
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));

const URL = 'mongodb+srv://admin:admin123@booking.wku5jbx.mongodb.net/';

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});

app.get('/test', (req, res) => {
    res.json('ok')
})

// register user 
app.post('/register', async (req, res) => {
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
});

// login user
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const userDoc = await User.findOne({ email });
    if (userDoc) {
        const checkPass = bcrypt.compareSync(password, userDoc.password);
        if (checkPass) {
            jwt.sign({ email: userDoc.email, id: userDoc._id }, jwtSecret, {}, (err, token) => {
                if (err) {
                    throw err;
                }
                res.cookie('token', token).json(userDoc);
            })
        }
        else {
            res.status(422).json("Pass NOT OK");
        }
    } else {
        res.status(422).json('Not found account');
    }
})

// Get login information (email)
app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, {}, (err, user) => {
            if (err) {
                throw err;
            }
            res.json(user)
        })
    } else res.json(null)
})

// Get all details information of user
app.get('/user', (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, user) => {
            if (err) {
                throw err;
            }
            const { email } = user
            const userDoc = await User.find({ email: email })
            res.json(userDoc)
        })
    } else res.json(null)
})

// Log out
app.post('/logout', (req, res) => {
    res.cookie('token', '').json(true);
});

// Upload a place
app.post('/places', (req, res) => {
    const { token } = req.cookies;
    const {
        title, address, addedPhotos, description,
        perks, extraInfo, checkIn, checkOut, maxGuests, price
    } = req.body;

    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) {
            throw err;
        }
        const placeDoc = await Place.create({
            owner: userData.id,
            title, address, photos: addedPhotos, description,
            perks, extraInfo, checkIn, checkOut, maxGuests, price
        })
        res.json(placeDoc)
    })
});

// Update a place
app.put('/places', async (req, res) => {
    const { token } = req.cookies;
    const {
        id, title, address, addedPhotos, description,
        perks, extraInfo, checkIn, checkOut, maxGuests, price
    } = req.body;
    const placeDoc = await Place.findById(id);
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) {
            throw err;
        }
        if (userData.id === placeDoc.owner.toString()) {
            placeDoc.set({
                title, address, photos: addedPhotos, description,
                perks, extraInfo, checkIn, checkOut, maxGuests, price
            });
            await placeDoc.save();
        }
        res.json("ok")
    })
});

// Get all places
app.get("/places", async (req, res) => {
    res.json(await Place.find())
})

// Get places uploaded by user
app.get('/user-places', (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) {
            throw err;
        }
        const { id } = userData;
        res.json(await Place.find({ owner: id }));
    })
})

// Get place by id
app.get('/places/:id', async (req, res) => {
    const { id } = req.params
    res.json(await Place.findById(id));
})

// Delete place by id
app.delete('/places/:id', async (req, res) => {
    const { id } = req.params
    await Place.findByIdAndDelete(id)
    await Booking.deleteMany({ place: id })
    res.json("Success");
})

// Query to find place
app.get('/places/find/:query', async (req, res) => {
    const { query } = req.params
    const places = await Place.find({ $or: [{ address: { $regex: query, $options: 'i' } }, { title: { $regex: query, $options: 'i' } }] });
    res.json(places)
})

// Upload new booking
app.post('/bookings', async (req, res) => {
    const { token } = req.cookies;
    const {
        place, checkIn, checkOut, numberOfGuests, name, phone, price,
    } = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) {
            throw err;
        }
        Booking.create({
            place, checkIn, checkOut, numberOfGuests, name, phone, price,
            user: userData.id,
        }).then((doc) => {
            res.json(doc);
        }).catch((err) => {
            throw err;
        });
    })
});

// Get bookings by user
app.get('/bookings', async (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) {
            throw err;
        }
        res.json(await Booking.find({ user: userData.id }).populate('place'));
    })
});

app.get('/booking-manager', async (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) {
            throw err;
        }
        const ownerId = userData.id;
        const places = await Place.find({ owner: ownerId });
        const placeIds = places.map(place => place._id);
        res.json(await Booking.find({
            place: {
                $in: placeIds
            }
        }).populate('place').populate('user'))
    })
});

// Delete booking
app.delete('/bookings/:id', async (req, res) => {
    const { token } = req.cookies;
    const { id } = req.params
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) {
            throw err;
        }
        res.json(await Booking.deleteOne({ user: userData.id, _id: id }));
    })
})

app.post('/feedback', async (req, res) => {
    const { token } = req.cookies;
    const { place, comment, rate } = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) {
            throw err;
        }
        const feedbackDoc = await Feedback.findOne({ place: place });
        if (feedbackDoc) {
            const updatedFeedbackDoc = await Feedback.findOneAndUpdate(
                { place: place },
                {
                    $push: {
                        feedback: {
                            user: userData.id,
                            comment,
                            rate,
                            date: new Date(),
                        },
                    }
                },
            );
            const feedbackCount = updatedFeedbackDoc.feedback.length;
            const newRating = (updatedFeedbackDoc.rating * feedbackCount + rate) / (feedbackCount + 1);
            updatedFeedbackDoc.rating = newRating;
            await updatedFeedbackDoc.save();
            res.json(updatedFeedbackDoc);
        } else {
            const newFeedbackDoc = await Feedback.create({
                place: place,
                rating: rate,
                feedback: {
                    user: userData.id,
                    comment,
                    rate,
                    date: new Date(),
                },
            });
            res.json(newFeedbackDoc);
        }
    });
});


app.get('/feedback/:id', async (req, res) => {
    const { id } = req.params
    res.json(await Feedback.find({ place: id }).populate('place').populate('feedback.user'));
})

app.get('/top-feedback/', async (req, res) => {
    res.json(await Feedback.find().populate('place').populate('feedback.user').sort({ rating: -1 }).limit(5));
})

app.post('/wishlist', async (req, res) => {
    const { token } = req.cookies;
    const { place } = req.body
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) {
                throw err;
            }
            const wishlist = await Wishlist.findOne({ owner: userData.id })
            if (wishlist) {
                res.json(await Wishlist.findOneAndUpdate({ owner: userData.id }, {
                    $push: {
                        wishlist: {
                            place: place
                        },
                    }
                }))
            } else {
                res.json(await Wishlist.create({
                    owner: userData.id,
                    wishlist: {
                        place: place
                    }
                }))
            }
        })
    } else res.json(null)
})

app.get("/wishlist", async (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) {
                throw err;
            }
            res.json(await Wishlist.find({ owner: userData.id }).populate('wishlist.place'))
        })
    } else res.json(null)
})

app.put("/wishlist", async (req, res) => {
    const { token } = req.cookies;
    const { place } = req.body
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) {
            throw err;
        }
        res.json(await Wishlist.findOneAndUpdate({ owner: userData.id }, {
            $pull: {
                wishlist: {
                    place: place
                },
            }
        }))
    })
})

module.exports = app;
