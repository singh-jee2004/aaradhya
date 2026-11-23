import { connectToDatabase } from '@/lib/mongodb';
import Booking from '@/models/Booking';
import { sampleBookings } from '@/lib/sampleData';
import { memoryStore } from '@/lib/memoryStore';

export async function seedDatabase() {
  try {
    await connectToDatabase();
    const count = await Booking.countDocuments();
    if (count === 0) {
      console.log('Seeding MongoDB with sample bookings...');
      await Booking.insertMany(sampleBookings);
      console.log('MongoDB successfully seeded with 18 sample bookings.');
    }
  } catch (error) {
    console.warn('MongoDB connection not available during startup seed, initialized in-memory data repository.', error);
  }
}
