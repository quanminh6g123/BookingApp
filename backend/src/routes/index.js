const bookingRouter = require('./booking');
const feedbackRouter = require('./feedback');
const placeRouter = require('./place');
const userRouter = require('./user');
const wishlistRouter = require('./wishlist');
const siteRouter = require('./site');

function route(app) {
    app.use('/bookings', bookingRouter);
    app.use('/feedback', feedbackRouter);
    app.use('/places', placeRouter);
    app.use('/user', userRouter);
    app.use('/wishlist', wishlistRouter);
    app.use('/', siteRouter);
}

module.exports = route;
