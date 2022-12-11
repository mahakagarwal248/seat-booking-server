import express from 'express';

import { bookSeat, getBookingDetails } from "../controllers/seatBooking.js";

const router = express.Router();

router.post('/bookSeat', bookSeat);
router.get('/getBooking/:coachId', getBookingDetails);

export default router;