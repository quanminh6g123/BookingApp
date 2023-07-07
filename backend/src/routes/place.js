const express = require('express');
const router = express.Router();

const placeController = require('../app/controllers/PlaceController');

router.post('/', placeController.uploadPlace);
router.put('/', placeController.updatePlace);
router.get('/', placeController.getAllPlaces);
router.get('/find/:query', placeController.queryPlace);
router.get('/:id', placeController.getPlaceID);
router.delete('/:id', placeController.deletePlace);
//router.get('/', placeController.storedCourses);

module.exports = router;
