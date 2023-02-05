import { Schema, SchemaTypes } from 'mongoose';
import { CAR_SIZE } from 'src/config';

const { Date, Number, String } = SchemaTypes;

export default function TicketModel(mongodb) {
  const TicketSchema = new Schema(
    {
      plateNumber: { type: String, required: true },
      carSize: {
        type: String,
        enum: [CAR_SIZE.S, CAR_SIZE.M, CAR_SIZE.L, CAR_SIZE.X],
        required: true
      },
      slotId: { type: String },
      parkingId: { type: String },
      parkingFloor: { type: Number },
      parkedAt: { type: Date },
      exitedAt: { type: Date }
    },
    { versionKey: false, timestamps: true }
  );

  return mongodb.model('tickets', TicketSchema);
}
