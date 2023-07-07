const { default: mongoose } = require('mongoose');
const slug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');
const MongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;
const WishList = new Schema(
    {
        owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        wishlist: [
            {
                place: { type: mongoose.Schema.Types.ObjectId, ref: 'Place' },
            },
        ],
        slug: { type: String, slug: 'name', unique: true },
    },
    {
        timestamps: true,
    },
);

//add plugin
mongoose.plugin(slug);
WishList.plugin(MongooseDelete, { deletedAt: true, overrideMethods: 'all' });
module.exports = mongoose.model('WishList', WishList);
