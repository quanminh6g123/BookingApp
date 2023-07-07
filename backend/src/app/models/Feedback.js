const { default: mongoose } = require('mongoose');
const slug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');
const MongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;
const Feedback = new Schema(
    {
        place: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Place',
        },
        rating: Number,
        feedback: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: 'User',
                },
                date: { type: Date, required: true },
                comment: { type: String, required: true },
                rate: Number,
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
Feedback.plugin(MongooseDelete, { deletedAt: true, overrideMethods: 'all' });

module.exports = mongoose.model('Feedback', Feedback);
