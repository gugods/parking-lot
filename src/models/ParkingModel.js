import { Schema, SchemaTypes } from 'mongoose';

const { Number, String } = SchemaTypes;

export default function ParkingModel(mongodb) {
  const ParkingSchema = new Schema(
    {
      name: { type: String, required: true },
      floor: { type: Number, required: true },
      slots: {
        type: Object,
        default: {
          /*
           S : [{id: 1, status : "AVAILABLE"}] },
           M : [{id: 1, status : "UNAVAILABLE"}] },
          */
        }
      }
    },
    { versionKey: false, timestamps: true }
  );

  ParkingSchema.index({ floor: 1 }, { unique: true });

  return mongodb.model('parkings', ParkingSchema);
}
