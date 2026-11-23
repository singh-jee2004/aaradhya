import { z } from 'zod';

export const bookingStatusEnum = z.enum(['Pending', 'Confirmed', 'In Progress', 'Completed']);

export const createBookingSchema = z.object({
  bookingId: z.string().min(1, 'Booking ID is required'),
  devoteeName: z.string().min(2, 'Devotee name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(8, 'Valid phone number is required'),
  pujaName: z.string().min(2, 'Puja name is required'),
  pujaDescription: z.string().optional(),
  bookingDate: z.string().or(z.date()),
  amount: z.number().min(0, 'Amount must be a non-negative number'),
  status: bookingStatusEnum.default('Pending'),
});

export const updateStatusSchema = z.object({
  status: bookingStatusEnum,
});

export const queryBookingsSchema = z.object({
  search: z.string().optional(),
  status: z.string().optional(),
  sortBy: z.enum(['bookingDate', 'amount', 'devoteeName', 'createdAt']).optional().default('bookingDate'),
  order: z.enum(['asc', 'desc']).optional().default('desc'),
  page: z.coerce.number().min(1).optional().default(1),
  limit: z.coerce.number().min(1).max(100).optional().default(50),
});
