const express = require('express');
const router = express.Router();

const bookingController = require('../app/controllers/BookingController');

//router.get('/create', bookingController.create);
//router.post('/store', bookingController.store);
//router.get('/:id/edit', bookingController.edit);
//router.put('/:id', bookingController.update);
//router.patch('/:id/restore', bookingController.restore);
//router.delete('/:id', bookingController.destroy);
router.delete('/:id', bookingController.deleteID);
router.get('/', bookingController.getBookings);
router.post('/', bookingController.show);

module.exports = router;
