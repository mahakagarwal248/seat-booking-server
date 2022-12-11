import SeatSchema from "../models/Seats.js";

export const bookSeat = async (req, res) => {
  const { seatNumber, coachId } = req.body;
  let processed=0;
  try {
    const isExist = await SeatSchema.findOne({ coachId: coachId });
    if (!isExist) {
      await SeatSchema.create({
        coachId: coachId,
        seatDetails: [{ seatNumber: seatNumber, isReserved: true }],
      });
      return res.send("success");
    }
    const isBooked = await SeatSchema.findOne({
      $and: [
        {
          "seatDetails.seatNumber": seatNumber,
          "seatDetails.isReserved": true,
        },
      ],
    });
    if (isBooked) {
      return res.status(400).json({ msg: "seat is already booked" });
    }
    for (const seats of seatNumber) {
      const updateBooking = await SeatSchema.findByIdAndUpdate(isExist._id, {
        $push: { seatDetails: [{ seatNumber: seats, isReserved: true }] },
      });
      processed++;
      if (processed === seatNumber.length) {
        return res.send(updateBooking);
      }
    }
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
};

export const getBookingDetails = async (req, res) => {
  const { coachId } = req.params;
  try {
    const bookings = await SeatSchema.findOne({ coachId: coachId });
    return res.send(bookings);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
};
