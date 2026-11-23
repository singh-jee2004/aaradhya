import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Booking from '@/models/Booking';
import { createBookingSchema, queryBookingsSchema } from '@/lib/validations';
import { memoryStore } from '@/lib/memoryStore';
import { sampleBookings } from '@/lib/sampleData';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || undefined;
    const status = searchParams.get('status') || undefined;
    const sortBy = (searchParams.get('sortBy') as any) || 'bookingDate';
    const order = (searchParams.get('order') as any) || 'desc';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '50', 10);

    const queryValidation = queryBookingsSchema.safeParse({
      search,
      status,
      sortBy,
      order,
      page,
      limit,
    });

    if (!queryValidation.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid query parameters',
          details: queryValidation.error.format(),
        },
        { status: 400 }
      );
    }

    try {
      await connectToDatabase();

      const totalInDb = await Booking.countDocuments();
      if (totalInDb === 0) {
        await Booking.insertMany(sampleBookings);
      }

      const query: any = {};

      if (status && status !== 'All' && status !== 'All Statuses') {
        query.status = status;
      }

      if (search) {
        const searchRegex = { $regex: search, $options: 'i' };
        query.$or = [
          { bookingId: searchRegex },
          { devoteeName: searchRegex },
          { pujaName: searchRegex },
        ];
      }

      const sortOrder = order === 'asc' ? 1 : -1;
      const sortConfig: any = { [sortBy]: sortOrder };

      const total = await Booking.countDocuments(query);
      const bookings = await Booking.find(query)
        .sort(sortConfig)
        .skip((page - 1) * limit)
        .limit(limit)
        .lean();

      return NextResponse.json({
        success: true,
        data: bookings,
        total,
        page,
        limit,
        source: 'mongodb',
      });
    } catch (dbErr: any) {
      console.warn('MongoDB connection failed or unavailable, using in-memory store:', dbErr.message);

      const memoryResult = memoryStore.getAll({
        search,
        status: status === 'All Statuses' ? 'All' : status,
        sortBy,
        order,
        page,
        limit,
      });

      return NextResponse.json({
        success: true,
        data: memoryResult.data,
        total: memoryResult.total,
        page,
        limit,
        source: 'memory_fallback',
      });
    }
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Internal Server Error',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = createBookingSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: validation.error.format(),
        },
        { status: 400 }
      );
    }

    const bookingData = validation.data;

    try {
      await connectToDatabase();

      const existing = await Booking.findOne({ bookingId: bookingData.bookingId });
      if (existing) {
        return NextResponse.json(
          {
            success: false,
            error: `Booking ID '${bookingData.bookingId}' already exists`,
          },
          { status: 400 }
        );
      }

      const created = await Booking.create(bookingData);

      return NextResponse.json(
        {
          success: true,
          message: 'Booking created successfully',
          data: created,
        },
        { status: 201 }
      );
    } catch (dbErr: any) {
      console.warn('MongoDB unavailable for POST, saving to in-memory store:', dbErr.message);
      const memBooking = memoryStore.create(bookingData as any);
      return NextResponse.json(
        {
          success: true,
          message: 'Booking created successfully (in-memory fallback)',
          data: memBooking,
        },
        { status: 201 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Internal Server Error',
      },
      { status: 500 }
    );
  }
}
