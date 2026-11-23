'use client';

import React, { useState, useEffect, useCallback } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StatsCards from '@/components/dashboard/StatsCards';
import RecentBookings from '@/components/dashboard/RecentBookings';
import BookingChart from '@/components/dashboard/BookingChart';
import BookingTable from '@/components/bookings/BookingTable';
import BookingFilters from '@/components/bookings/BookingFilters';
import BookingDetails from '@/components/bookings/BookingDetails';
import { IBooking, BookingStats } from '@/types/booking';
import { Sparkles, RefreshCw } from 'lucide-react';

export default function OverviewPage() {
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [stats, setStats] = useState<BookingStats>({
    totalBookings: 0,
    pendingBookings: 0,
    confirmedBookings: 0,
    inProgressBookings: 0,
    completedBookings: 0,
    totalRevenue: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters and Sorting
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [sortBy, setSortBy] = useState('bookingDate');
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');

  // Selected Booking Drawer
  const [selectedBooking, setSelectedBooking] = useState<IBooking | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  // Fetch stats and bookings
  const loadDashboardData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // 1. Fetch bookings
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (statusFilter && statusFilter !== 'All Statuses') params.append('status', statusFilter);
      params.append('sortBy', sortBy);
      params.append('order', order);
      params.append('limit', '50');

      const [bookingsRes, statsRes] = await Promise.all([
        fetch(`/api/bookings?${params.toString()}`),
        fetch('/api/stats'),
      ]);

      const bookingsData = await bookingsRes.json();
      const statsData = await statsRes.json();

      if (bookingsData.success) {
        setBookings(bookingsData.data || []);
      } else {
        throw new Error(bookingsData.error || 'Failed to fetch bookings');
      }

      if (statsData.success) {
        setStats(statsData.data);
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Error loading dashboard records');
    } finally {
      setLoading(false);
    }
  }, [searchTerm, statusFilter, sortBy, order]);

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  const handleOpenDetails = (booking: IBooking) => {
    setSelectedBooking(booking);
    setDetailsOpen(true);
  };

  const handleStatusUpdated = (updatedBooking: IBooking) => {
    setBookings((prev) =>
      prev.map((b) => (b.bookingId === updatedBooking.bookingId ? updatedBooking : b))
    );
    setSelectedBooking(updatedBooking);
    // Refresh stats
    fetch('/api/stats')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setStats(data.data);
      })
      .catch(console.error);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setStatusFilter('All Statuses');
    setSortBy('bookingDate');
    setOrder('desc');
  };

  return (
    <DashboardLayout
      pageTitle="Overview Dashboard"
      breadcrumb="Overview"
      searchValue={searchTerm}
      onSearchChange={setSearchTerm}
      selectedStatusFilter={statusFilter === 'All Statuses' ? 'All' : statusFilter}
      onSelectStatusFilter={(st) => setStatusFilter(st === 'All' ? 'All Statuses' : st)}
    >
      <div className="space-y-6">
        {/* Welcome Spiritual Banner */}
        <div className="relative overflow-hidden rounded-2xl border border-[#B89555]/40 bg-gradient-to-r from-[#FAF7F0] via-[#F4E8D1]/60 to-[#FAF7F0] p-6 shadow-xs">
          {/* Subtle Ram Artwork Watermark in background */}
          <div className="absolute -right-6 -bottom-10 h-52 w-52 opacity-[0.16] pointer-events-none mix-blend-multiply select-none">
            <img
              src="/images/ram-transparent.png"
              alt=""
              className="h-full w-full object-contain filter drop-shadow-[0_0_12px_rgba(198,106,36,0.6)]"
            />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C66A24]">
                <div className="h-4 w-4 overflow-hidden rounded bg-[#34251E] flex items-center justify-center p-0.5">
                  <img
                    src="/images/ram-transparent.png"
                    alt="Seva"
                    className="h-full w-full object-contain"
                  />
                </div>
                <span>Devotee Management Platform</span>
              </div>
              <h2 className="font-serif text-2xl font-bold text-[#34251E] mt-1">
                Aaradhya Setu • Admin Dashboard
              </h2>
              <p className="text-xs text-[#8B7B70] max-w-xl mt-1 leading-relaxed">
                Centralized monitoring of devotee Puja registrations, priest coordination, status progressions, and sacred seva records.
              </p>
            </div>

            <button
              onClick={() => loadDashboardData()}
              className="flex items-center gap-2 self-start md:self-center rounded-xl border border-[#B89555]/50 bg-white px-3.5 py-2 text-xs font-semibold text-[#34251E] shadow-xs hover:border-[#C66A24] hover:text-[#C66A24] transition-all"
            >
              <RefreshCw size={13} className={loading ? 'animate-spin text-[#C66A24]' : ''} />
              <span>Refresh Records</span>
            </button>
          </div>
        </div>

        {/* Error notification */}
        {error && (
          <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs font-medium text-rose-800 flex items-center justify-between">
            <span>{error}</span>
            <button
              onClick={() => loadDashboardData()}
              className="underline font-bold text-rose-900 ml-4 hover:text-rose-700"
            >
              Retry
            </button>
          </div>
        )}

        {/* 1. Statistics Cards */}
        <StatsCards stats={stats} loading={loading && bookings.length === 0} />

        {/* 2. Visual Distribution Chart & Recent 5 Bookings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BookingChart bookings={bookings} />
          <RecentBookings bookings={bookings} onViewBooking={handleOpenDetails} />
        </div>

        {/* 3. Filter Controls & All Bookings Table */}
        <div className="pt-2">
          <div className="mb-4">
            <h3 className="font-serif text-xl font-bold text-[#34251E]">
              Puja Bookings Master Table
            </h3>
            <p className="text-xs text-[#8B7B70] mt-0.5">
              Inspect details, search by devotee or puja, and update lifecycle statuses
            </p>
          </div>

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
      </div>

      {/* Booking Details Drawer / Modal */}
      <BookingDetails
        booking={selectedBooking}
        isOpen={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        onStatusUpdated={handleStatusUpdated}
      />
    </DashboardLayout>
  );
}
