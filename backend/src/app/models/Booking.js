const { default: mongoose } = require('mongoose');
const slug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');
const MongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;
const Booking = new Schema(
    {
        place: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Place',
        },
        user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
        checkIn: { type: Date, required: true },
        checkOut: { type: Date, required: true },
        name: { type: String, required: true },
        phone: { type: String, required: true },
        price: Number,
        slug: { type: String, slug: 'name', unique: true },
    },
    {
        timestamps: true,
    },
);

//add plugin
mongoose.plugin(slug);
Booking.plugin(MongooseDelete, { deletedAt: true, overrideMethods: 'all' });

module.exports = mongoose.model('Booking', Booking);
