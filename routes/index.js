const router = require('express').Router();

const memberRouter = require('./members');
const facilityRouter = require('./facilities');
const bookingRouter = require('./bookings');

router.use('/members', memberRouter);
router.use('/facilities', facilityRouter);
router.use('/bookings', bookingRouter);

module.exports = router;