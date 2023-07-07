const express = require('express');
const router = express.Router();

const feedbackController = require('../app/controllers/FeedbackController');

//router.post('/places', feedbackController.uploadPlace);
//router.put('/places', feedbackController.updatePlace);
//router.get('/places', feedbackController.getAllPlaces);
//router.get('/places/:id', feedbackController.getPlaceID);
//router.delete('/places/:id', feedbackController.deletePlace);
router.get('/:id', feedbackController.getFeedback);
router.post('/', feedbackController.postFeedback);

module.exports = router;
