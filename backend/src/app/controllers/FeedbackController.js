const Feedback = require('../models/Feedback');
const jwt = require('jsonwebtoken');
const jwtSecret = 'awuichaiuwchasasdwd123';
const { multipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');
const { NULL } = require('node-sass');

class FeedbackController {
    //[POST] /feedback
    async postFeedback(req, res) {
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
                        },
                    },
                );
                const feedbackCount = updatedFeedbackDoc.feedback.length;
                const newRating =
                    (updatedFeedbackDoc.rating * feedbackCount + rate) /
                    (feedbackCount + 1);
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
    }

    async getFeedback(req, res) {
        const { id } = req.params;
        res.json(
            await Feedback.find({ place: id })
                .populate('place')
                .populate('feedback.user'),
        );
    }
}

module.exports = new FeedbackController();
