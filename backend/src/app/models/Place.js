const { default: mongoose } = require('mongoose');
const slug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');
const MongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;
const Place = new Schema(
    {
        owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        title: String,
        address: String,
        photos: [String],
        description: String,
        perks: [String],
        extraInfo: String,
        checkIn: Number,
        checkOut: Number,
        maxGuests: Number,
        price: Number,
        slug: { type: String, slug: 'name', unique: true },
    },
    {
        timestamps: true,
    },
);

//add plugin
mongoose.plugin(slug);
Place.plugin(MongooseDelete, { deletedAt: true, overrideMethods: 'all' });

module.exports = mongoose.model('Place', Place);
