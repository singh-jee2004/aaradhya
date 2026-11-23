export type BookingStatus = 'Pending' | 'Confirmed' | 'In Progress' | 'Completed';

export interface IBooking {
  _id?: string;
  bookingId: string;
  devoteeName: string;
  email: string;
  phone: string;
  pujaName: string;
  pujaDescription?: string;
  bookingDate: string | Date;
  amount: number;
  status: BookingStatus;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface BookingResponse {
  success: boolean;
  data: IBooking | IBooking[];
  total?: number;
  message?: string;
  error?: string;
}

export interface BookingStats {
  totalBookings: number;
  pendingBookings: number;
  confirmedBookings: number;
  inProgressBookings: number;
  completedBookings: number;
  totalRevenue: number;
}
