import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectToDatabase } from '@/lib/mongodb';
import Booking from '@/models/Booking';
import { updateStatusSchema } from '@/lib/validations';
import { memoryStore } from '@/lib/memoryStore';

// GET /api/bookings/[id] - Retrieve single booking by ID (MongoDB _id or bookingId)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Booking ID is required' },
        { status: 400 }
      );
    }

    try {
      await connectToDatabase();

      let booking = null;
      if (mongoose.Types.ObjectId.isValid(id)) {
        booking = await Booking.findById(id).lean();
      }
      if (!booking) {
        booking = await Booking.findOne({ bookingId: id }).lean();
      }

      if (!booking) {
        return NextResponse.json(
          { success: false, error: 'Booking not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        data: booking,
      });
    } catch (dbErr: any) {
      console.warn('MongoDB unavailable for GET [id], checking in-memory store:', dbErr.message);
      const memBooking = memoryStore.getById(id);
      if (!memBooking) {
        return NextResponse.json(
          { success: false, error: 'Booking not found' },
          { status: 404 }
        );
      }
      return NextResponse.json({
        success: true,
        data: memBooking,
      });
    }
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// PATCH /api/bookings/[id] - Update booking status
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const validation = updateStatusSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid status provided. Must be one of: Pending, Confirmed, In Progress, Completed.',
          details: validation.error.format(),
        },
        { status: 400 }
      );
    }

    const { status } = validation.data;

    try {
      await connectToDatabase();

      let query: any = {};
      if (mongoose.Types.ObjectId.isValid(id)) {
        query = { $or: [{ _id: id }, { bookingId: id }] };
      } else {
        query = { bookingId: id };
      }

      const updated = await Booking.findOneAndUpdate(
        query,
        { status, updatedAt: new Date() },
        { new: true, runValidators: true }
      ).lean();

      if (!updated) {
        const memBooking = memoryStore.updateStatus(id, status);
        if (memBooking) {
          return NextResponse.json({
            success: true,
            message: 'Booking status updated successfully',
            data: memBooking,
          });
        }

        return NextResponse.json(
          { success: false, error: 'Booking not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        message: 'Booking status updated successfully',
        data: updated,
      });
    } catch (dbErr: any) {
      console.warn('MongoDB unavailable for PATCH, updating in-memory store:', dbErr.message);
      const memBooking = memoryStore.updateStatus(id, status);
      if (!memBooking) {
        return NextResponse.json(
          { success: false, error: 'Booking not found' },
          { status: 404 }
        );
      }
      return NextResponse.json({
        success: true,
        message: 'Booking status updated successfully',
        data: memBooking,
      });
    }
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}