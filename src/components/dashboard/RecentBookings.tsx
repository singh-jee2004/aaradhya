import React from 'react';
import Link from 'next/link';
import { IBooking } from '@/types/booking';
import StatusBadge from '../bookings/StatusBadge';
import { ArrowRight, Eye, Calendar, User } from 'lucide-react';

interface RecentBookingsProps {
  bookings: IBooking[];
  onViewBooking: (booking: IBooking) => void;
}

export default function RecentBookings({ bookings, onViewBooking }: RecentBookingsProps) {
  const recent = bookings.slice(0, 5);

  const formatDate = (dateString: string | Date) => {
    try {
      const d = new Date(dateString);
      return new Intl.DateTimeFormat('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }).format(d);
    } catch {
      return String(dateString);
    }
  };

  return (
    <div className="rounded-2xl border border-[#EAE1D4] bg-white p-6 shadow-xs">
      <div className="flex items-center justify-between pb-4 border-b border-[#EAE1D4]">
        <div>
          <h2 className="font-serif text-lg font-bold text-[#34251E]">
            Recent Puja Bookings
          </h2>
          <p className="text-xs text-[#8B7B70] mt-0.5">
            Latest 5 devotional ceremonies submitted
          </p>
        </div>
        <Link
          href="/bookings"
          className="inline-flex items-center gap-1.5 rounded-xl border border-[#B89555]/40 bg-[#FAF7F0] px-3.5 py-1.5 text-xs font-semibold text-[#C66A24] hover:bg-[#C66A24] hover:text-white transition-all duration-150 shadow-xs"
        >
          <span>View All</span>
          <ArrowRight size={13} />
        </Link>
      </div>

      <div className="mt-4 divide-y divide-[#EAE1D4]/60">
        {recent.length === 0 ? (
          <div className="py-8 text-center text-xs text-[#8B7B70]">
            No recent bookings recorded.
          </div>
        ) : (
          recent.map((booking) => (
            <div
              key={booking.bookingId || booking._id}
              className="group flex flex-col sm:flex-row sm:items-center justify-between py-3.5 gap-2 hover:bg-[#FAF7F0]/40 -mx-3 px-3 rounded-xl transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 border border-[#B89555]/30 text-[#C66A24] font-serif font-bold text-xs">
                  ॥ ॐ ॥
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-serif font-bold text-sm text-[#34251E]">
                      {booking.pujaName}
                    </span>
                    <span className="text-[11px] font-mono text-[#8B7B70]">
                      ({booking.bookingId})
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-[#8B7B70]">
                    <span className="inline-flex items-center gap-1">
                      <User size={12} className="text-[#C66A24]" />
                      {booking.devoteeName}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Calendar size={12} className="text-[#B89555]" />
                      {formatDate(booking.bookingDate)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 self-end sm:self-center mt-2 sm:mt-0">
                <div className="text-right">
                  <div className="font-semibold text-xs text-[#34251E]">
                    ₹{booking.amount?.toLocaleString('en-IN')}
                  </div>
                  <div className="mt-0.5">
                    <StatusBadge status={booking.status} size="sm" />
                  </div>
                </div>

                <button
                  onClick={() => onViewBooking(booking)}
                  className="rounded-lg p-2 text-[#8B7B70] hover:bg-[#FAF7F0] hover:text-[#C66A24] transition-colors"
                  title="View Details"
                  aria-label="View booking details"
                >
                  <Eye size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
