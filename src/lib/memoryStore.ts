import { IBooking, BookingStatus } from '@/types/booking';
import { sampleBookings } from './sampleData';

class MemoryBookingStore {
  private bookings: IBooking[] = [];
  private initialized = false;

  constructor() {
    this.init();
  }

  private init() {
    if (!this.initialized) {
      this.bookings = sampleBookings.map((b, idx) => ({
        ...b,
        _id: `mem_${idx + 1}`,
        createdAt: new Date(Date.now() - (idx * 3600000 * 4)).toISOString(),
        updatedAt: new Date(Date.now() - (idx * 3600000 * 2)).toISOString(),
      }));
      this.initialized = true;
    }
  }

  public getAll(filter?: {
    search?: string;
    status?: string;
    sortBy?: string;
    order?: 'asc' | 'desc';
    page?: number;
    limit?: number;
  }) {
    let result = [...this.bookings];

    if (filter?.status && filter.status !== 'All') {
      result = result.filter(
        (b) => b.status.toLowerCase() === filter.status?.toLowerCase()
      );
    }

    if (filter?.search) {
      const q = filter.search.toLowerCase().trim();
      result = result.filter(
        (b) =>
          b.bookingId.toLowerCase().includes(q) ||
          b.devoteeName.toLowerCase().includes(q) ||
          b.pujaName.toLowerCase().includes(q)
      );
    }

    const sortBy = filter?.sortBy || 'bookingDate';
    const order = filter?.order === 'asc' ? 1 : -1;

    result.sort((a, b) => {
      if (sortBy === 'amount') {
        return (a.amount - b.amount) * order;
      }
      if (sortBy === 'devoteeName') {
        return a.devoteeName.localeCompare(b.devoteeName) * order;
      }
      const dateA = new Date(a.bookingDate).getTime();
      const dateB = new Date(b.bookingDate).getTime();
      return (dateA - dateB) * order;
    });

    const total = result.length;
    const page = filter?.page || 1;
    const limit = filter?.limit || 50;
    const startIndex = (page - 1) * limit;
    const paginated = result.slice(startIndex, startIndex + limit);

    return { data: paginated, total };
  }

  public getById(id: string): IBooking | null {
    return this.bookings.find((b) => b._id === id || b.bookingId === id) || null;
  }

  public create(booking: Omit<IBooking, '_id' | 'createdAt' | 'updatedAt'>): IBooking {
    const newBooking: IBooking = {
      ...booking,
      _id: `mem_${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.bookings.unshift(newBooking);
    return newBooking;
  }

  public updateStatus(id: string, status: BookingStatus): IBooking | null {
    const booking = this.getById(id);
    if (!booking) return null;
    booking.status = status;
    booking.updatedAt = new Date().toISOString();
    return booking;
  }

  public resetToSample() {
    this.initialized = false;
    this.init();
    return this.bookings;
  }
}

declare global {
  // eslint-disable-next-line no-var
  var __memoryBookingStore: MemoryBookingStore | undefined;
}

export const memoryStore = global.__memoryBookingStore || new MemoryBookingStore();
if (process.env.NODE_ENV !== 'production') {
  global.__memoryBookingStore = memoryStore;
}