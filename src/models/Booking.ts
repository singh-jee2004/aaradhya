import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBookingDocument extends Document {
  bookingId: string;
  devoteeName: string;
  email: string;
  phone: string;
  pujaName: string;
  pujaDescription?: string;
  bookingDate: Date;
  amount: number;
  status: 'Pending' | 'Confirmed' | 'In Progress' | 'Completed';
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBookingDocument>(
  {
    bookingId: {
      type: String,
      required: [true, 'Booking ID is required'],
      unique: true,
      trim: true,
      index: true,
    },
    devoteeName: {
      type: String,
      required: [true, 'Devotee name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    pujaName: {
      type: String,
      required: [true, 'Puja name is required'],
      trim: true,
    },
    pujaDescription: {
      type: String,
      trim: true,
      default: '',
    },
    bookingDate: {
      type: Date,
      required: [true, 'Booking date is required'],
    },
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
      min: [0, 'Amount must be non-negative'],
    },
    status: {
      type: String,
      required: [true, 'Status is required'],
      enum: {
        values: ['Pending', 'Confirmed', 'In Progress', 'Completed'],
        message: '{VALUE} is not a valid status',
      },
      default: 'Pending',
    },
  },
  {
    timestamps: true,
  }
);

const Booking: Model<IBookingDocument> =
  mongoose.models.Booking || mongoose.model<IBookingDocument>('Booking', BookingSchema);

export default Booking;
