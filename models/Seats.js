import mongoose from "mongoose";

const SeatSchema = mongoose.Schema({
  coachId: { type: Number, default: "" },
  seatDetails: [
    {
      seatNumber: { type: Number, default: "" },
      isReserved: { type: Boolean, default: false },
    },
  ],
});

export default mongoose.model("seatSchema", SeatSchema);
