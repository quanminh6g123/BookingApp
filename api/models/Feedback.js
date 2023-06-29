const mongoose = require("mongoose");
const { Schema } = mongoose;
const feedbackSchema = new mongoose.Schema({
   place: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Place" },
   rating: Number,
   feedback: [{
      user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
      date: { type: Date, required: true },
      comment: { type: String, required: true },
      rate: Number,
   }]
});

const FeedbackModel = mongoose.model("Feedback", feedbackSchema);

module.exports = FeedbackModel;
