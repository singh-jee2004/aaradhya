'use client';

import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';
import BookingTable from '@/components/bookings/BookingTable';
import BookingFilters from '@/components/bookings/BookingFilters';
import BookingDetails from '@/components/bookings/BookingDetails';
import { IBooking } from '@/types/booking';
import { RefreshCw } from 'lucide-react';

function BookingsPageContent() {
  const searchParams = useSearchParams();
  const initialStatus = searchParams.get('status') || 'All Statuses';

  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState(initialStatus);
  const [sortBy, setSortBy] = useState('bookingDate');
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');

  const [selectedBooking, setSelectedBooking] = useState<IBooking | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  // Sync when query param changes
  useEffect(() => {
    const statusFromQuery = searchParams.get('status');
    if (statusFromQuery) {
      setStatusFilter(statusFromQuery);
    }
  }, [searchParams]);

  const loadBookings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (statusFilter && statusFilter !== 'All Statuses') params.append('status', statusFilter);
      params.append('sortBy', sortBy);
      params.append('order', order);
      params.append('limit', '100');

      const res = await fetch(`/api/bookings?${params.toString()}`);
      const data = await res.json();

      if (data.success) {
        setBookings(data.data || []);
      } else {
        throw new Error(data.error || 'Failed to retrieve bookings');
      }
    } catch (err: any) {
      setError(err.message || 'Error loading bookings');
    } finally {
      setLoading(false);
    }
  }, [searchTerm, statusFilter, sortBy, order]);

  useEffect(() => {
    loadBookings();
  }, [loadBookings]);

  const handleOpenDetails = (booking: IBooking) => {
    setSelectedBooking(booking);
    setDetailsOpen(true);
  };

  const handleStatusUpdated = (updatedBooking: IBooking) => {
    setBookings((prev) =>
      prev.map((b) => (b.bookingId === updatedBooking.bookingId ? updatedBooking : b))
    );
    setSelectedBooking(updatedBooking);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setStatusFilter('All Statuses');
    setSortBy('bookingDate');
    setOrder('desc');
  };

  return (
    <DashboardLayout
      pageTitle="Puja Bookings Management"
      breadcrumb="Bookings"
      searchValue={searchTerm}
      onSearchChange={setSearchTerm}
      selectedStatusFilter={statusFilter === 'All Statuses' ? 'All' : statusFilter}
      onSelectStatusFilter={(st) => setStatusFilter(st === 'All' ? 'All Statuses' : st)}
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#34251E]">
              All Puja Bookings
            </h2>
            <p className="text-xs text-[#8B7B70] mt-0.5">
              Review and manage incoming bookings, devotee contacts, and ritual completion status
            </p>
          </div>

          <button
            onClick={() => loadBookings()}
            className="flex items-center gap-2 self-start sm:self-center rounded-xl border border-[#B89555]/50 bg-white px-3.5 py-2 text-xs font-semibold text-[#34251E] shadow-xs hover:border-[#C66A24] hover:text-[#C66A24] transition-all"
          >
            <RefreshCw size={13} className={loading ? 'animate-spin text-[#C66A24]' : ''} />
            <span>Refresh</span>
          </button>
        </div>

        {error && (
          <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs font-medium text-rose-800 flex items-center justify-between">
            <span>{error}</span>
            <button
              onClick={() => loadBookings()}
              className="underline font-bold text-rose-900 ml-4 hover:text-rose-700"
            >
              Retry
            </button>
          </div>
        )}

        <BookingFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          sortBy={sortBy}
          onSortByChange={setSortBy}
          order={order}
          onOrderToggle={() => setOrder(order === 'asc' ? 'desc' : 'asc')}
          onClearFilters={handleClearFilters}
          totalFiltered={bookings.length}
        />

        <BookingTable
          bookings={bookings}
          loading={loading}
          onViewBooking={handleOpenDetails}
          onClearFilters={handleClearFilters}
        />
      </div>

      <BookingDetails
        booking={selectedBooking}
        isOpen={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        onStatusUpdated={handleStatusUpdated}
      />
    </DashboardLayout>
  );
}

export default function BookingsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs">Loading bookings...</div>}>
      <BookingsPageContent />
    </Suspense>
  );
}
