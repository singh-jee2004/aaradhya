import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Booking from '@/models/Booking';
import { memoryStore } from '@/lib/memoryStore';

export async function GET() {
  try {
    try {
      await connectToDatabase();
      const bookings = await Booking.find({}).lean();

      const totalBookings = bookings.length;
      const pendingBookings = bookings.filter((b) => b.status === 'Pending').length;
      const confirmedBookings = bookings.filter((b) => b.status === 'Confirmed').length;
      const inProgressBookings = bookings.filter((b) => b.status === 'In Progress').length;
      const completedBookings = bookings.filter((b) => b.status === 'Completed').length;
      const totalRevenue = bookings.reduce((sum, b) => sum + (b.amount || 0), 0);

      return NextResponse.json({
        success: true,
        data: {
          totalBookings,
          pendingBookings,
          confirmedBookings,
          inProgressBookings,
          completedBookings,
          totalRevenue,
        },
      });
    } catch (dbErr) {
      const { data: bookings } = memoryStore.getAll({ limit: 1000 });
      const totalBookings = bookings.length;
      const pendingBookings = bookings.filter((b) => b.status === 'Pending').length;
      const confirmedBookings = bookings.filter((b) => b.status === 'Confirmed').length;
      const inProgressBookings = bookings.filter((b) => b.status === 'In Progress').length;
      const completedBookings = bookings.filter((b) => b.status === 'Completed').length;
      const totalRevenue = bookings.reduce((sum, b) => sum + (b.amount || 0), 0);

      return NextResponse.json({
        success: true,
        data: {
          totalBookings,
          pendingBookings,
          confirmedBookings,
          inProgressBookings,
          completedBookings,
          totalRevenue,
        },
      });
    }
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}