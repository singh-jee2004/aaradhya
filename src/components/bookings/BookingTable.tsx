import React from 'react';
import { IBooking, BookingStatus } from '@/types/booking';
import StatusBadge from './StatusBadge';
import { Eye, Calendar } from 'lucide-react';

interface BookingTableProps {
  bookings: IBooking[];
  loading?: boolean;
  onViewBooking: (booking: IBooking) => void;
  onUpdateStatusQuick?: (id: string, status: BookingStatus) => void;
  onClearFilters: () => void;
}

export default function BookingTable({
  bookings,
  loading = false,
  onViewBooking,
  onClearFilters,
}: BookingTableProps) {
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

  if (loading) {
    return (
      <div className="rounded-2xl border border-[#EAE1D4] bg-white p-6 shadow-xs">
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-stone-100 rounded-xl w-full" />
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-14 bg-stone-50 rounded-xl w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="rounded-2xl border border-[#EAE1D4] bg-white p-12 text-center shadow-xs">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#34251E] border border-[#B89555]/40 p-2 shadow-sm">
          <img
            src="/images/ram-transparent.png"
            alt="No records"
            className="h-full w-full object-contain filter drop-shadow-[0_0_8px_rgba(255,165,0,0.6)]"
          />
        </div>
        <h3 className="font-serif text-lg font-bold text-[#34251E] mt-4">
          No bookings found
        </h3>
        <p className="text-xs text-[#8B7B70] max-w-sm mx-auto mt-1">
          No devotee booking matches your active search query or status filter.
        </p>
        <button
          onClick={onClearFilters}
          className="mt-5 inline-flex items-center gap-1.5 rounded-xl bg-[#C66A24] px-4 py-2 text-xs font-semibold text-white shadow-md shadow-[#C66A24]/20 hover:bg-[#AF5B1C] transition-colors"
        >
          Reset Filters
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[#EAE1D4]/80 bg-white/75 backdrop-blur-md shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#EAE1D4]/80 bg-[#FAF7F0]/80 text-[11px] font-bold uppercase tracking-wider text-[#8B7B70]">
              <th className="py-4 px-5">Booking ID</th>
              <th className="py-4 px-5">Devotee Details</th>
              <th className="py-4 px-5">Puja Name</th>
              <th className="py-4 px-5">Scheduled Date</th>
              <th className="py-4 px-5">Amount</th>
              <th className="py-4 px-5">Status</th>
              <th className="py-4 px-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EAE1D4]/60 text-xs text-[#34251E]">
            {bookings.map((booking) => (
              <tr
                key={booking.bookingId || booking._id}
                className="hover:bg-[#FAF7F0]/40 transition-colors group cursor-pointer"
                onClick={() => onViewBooking(booking)}
              >
                <td className="py-4 px-5 font-mono font-medium text-[#C66A24]">
                  {booking.bookingId}
                </td>

                <td className="py-4 px-5">
                  <div className="font-semibold text-sm text-[#34251E]">
                    {booking.devoteeName}
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-[#8B7B70] mt-0.5">
                    <span className="truncate max-w-[150px]">{booking.email}</span>
                  </div>
                </td>

                <td className="py-4 px-5 font-serif font-medium text-sm text-[#34251E]">
                  {booking.pujaName}
                </td>

                <td className="py-4 px-5 text-[#8B7B70]">
                  <div className="inline-flex items-center gap-1.5">
                    <Calendar size={13} className="text-[#B89555]" />
                    <span className="font-medium text-[#34251E]">
                      {formatDate(booking.bookingDate)}
                    </span>
                  </div>
                </td>

                <td className="py-4 px-5">
                  <span className="font-semibold text-sm text-[#34251E]">
                    ₹{(booking.amount || 0).toLocaleString('en-IN')}
                  </span>
                </td>

                <td className="py-4 px-5" onClick={(e) => e.stopPropagation()}>
                  <StatusBadge status={booking.status} />
                </td>

                <td
                  className="py-4 px-5 text-right"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => onViewBooking(booking)}
                    className="inline-flex items-center gap-1 rounded-lg border border-[#EAE1D4] bg-white px-2.5 py-1.5 text-xs font-medium text-[#34251E] shadow-xs hover:border-[#C66A24] hover:text-[#C66A24] transition-colors"
                  >
                    <Eye size={13} className="text-[#C66A24]" />
                    <span>Inspect</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
