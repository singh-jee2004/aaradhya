'use client';

import React, { useState } from 'react';
import { IBooking, BookingStatus } from '@/types/booking';
import StatusBadge from './StatusBadge';
import {
  X,
  Calendar,
  IndianRupee,
  Mail,
  Phone,
  User,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from 'lucide-react';

interface BookingDetailsProps {
  booking: IBooking | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusUpdated: (updatedBooking: IBooking) => void;
}

export default function BookingDetails({
  booking,
  isOpen,
  onClose,
  onStatusUpdated,
}: BookingDetailsProps) {
  const [selectedStatus, setSelectedStatus] = useState<BookingStatus | ''>('');
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(
    null
  );

  if (!isOpen || !booking) return null;

  const currentStatus = selectedStatus || booking.status;

  const formatDate = (dateString: string | Date | undefined) => {
    if (!dateString) return 'N/A';
    try {
      const d = new Date(dateString);
      return new Intl.DateTimeFormat('en-IN', {
        weekday: 'short',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(d);
    } catch {
      return String(dateString);
    }
  };

  const handleUpdateStatus = async (newStatus: BookingStatus) => {
    setUpdating(true);
    setMessage(null);

    try {
      const id = booking._id || booking.bookingId;
      const res = await fetch(`/api/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();

      if (data.success && data.data) {
        setSelectedStatus(newStatus);
        setMessage({
          type: 'success',
          text: `Booking status successfully changed to ${newStatus}`,
        });
        onStatusUpdated(data.data);
      } else {
        setMessage({
          type: 'error',
          text: data.error || 'Failed to update status',
        });
      }
    } catch (err: any) {
      setMessage({
        type: 'error',
        text: err.message || 'Network error updating booking status',
      });
    } finally {
      setUpdating(false);
    }
  };

  const statuses: BookingStatus[] = ['Pending', 'Confirmed', 'In Progress', 'Completed'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end overflow-hidden bg-stone-900/40 backdrop-blur-xs transition-opacity animate-fade-in">
      {/* Background click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Drawer / Modal Container */}
      <div className="relative z-10 flex h-full w-full max-w-lg flex-col bg-[#FAF7F0] shadow-2xl transition-transform border-l border-[#EAE1D4]">
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-[#EAE1D4] bg-white px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 border border-[#B89555]/30 text-[#C66A24]">
              <Sparkles size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-lg font-bold text-[#34251E]">
                  Booking Details
                </h3>
                <span className="font-mono text-xs font-semibold text-[#C66A24] bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                  {booking.bookingId}
                </span>
              </div>
              <p className="text-xs text-[#8B7B70]">
                Aaradhya Setu Seva Administration
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl border border-[#EAE1D4] p-2 text-stone-500 hover:bg-[#FAF7F0] hover:text-[#34251E] transition-colors"
            aria-label="Close details"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Notification Alert */}
          {message && (
            <div
              className={`flex items-start gap-2.5 rounded-xl p-3.5 text-xs font-medium border ${
                message.type === 'success'
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : 'bg-rose-50 text-rose-800 border-rose-200'
              }`}
            >
              {message.type === 'success' ? (
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle size={16} className="text-rose-600 shrink-0 mt-0.5" />
              )}
              <span>{message.text}</span>
            </div>
          )}

          {/* Section 1: Puja Information */}
          <div className="rounded-2xl border border-[#EAE1D4] bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#EAE1D4]/60">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#8B7B70]">
                Puja Information
              </span>
              <StatusBadge status={currentStatus} size="sm" />
            </div>

            <div className="mt-3">
              <h4 className="font-serif text-xl font-bold text-[#34251E]">
                {booking.pujaName}
              </h4>
              <p className="mt-1 text-xs text-[#8B7B70] leading-relaxed">
                {booking.pujaDescription || 'Vedic temple rituals, shloka chantings, and devotee sankalp.'}
              </p>

              <div className="mt-4 grid grid-cols-2 gap-3 pt-3 border-t border-[#EAE1D4]/40">
                <div>
                  <span className="text-[11px] text-[#8B7B70] block">Scheduled Puja Date</span>
                  <div className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-[#34251E]">
                    <Calendar size={13} className="text-[#C66A24]" />
                    <span>{formatDate(booking.bookingDate)}</span>
                  </div>
                </div>

                <div>
                  <span className="text-[11px] text-[#8B7B70] block">Dakshina / Amount</span>
                  <div className="mt-1 flex items-center gap-1 text-xs font-bold text-[#C66A24]">
                    <IndianRupee size={13} />
                    <span>{(booking.amount || 0).toLocaleString('en-IN')} INR</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Devotee Information */}
          <div className="rounded-2xl border border-[#EAE1D4] bg-white p-5 shadow-xs">
            <div className="pb-3 border-b border-[#EAE1D4]/60">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#8B7B70]">
                Devotee Details
              </span>
            </div>

            <div className="mt-3 space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 border border-orange-200 text-[#C66A24]">
                  <User size={16} />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#8B7B70]">Name</span>
                  <p className="text-sm font-semibold text-[#34251E]">{booking.devoteeName}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 border border-sky-200 text-sky-700">
                  <Mail size={16} />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#8B7B70]">Email Address</span>
                  <p className="text-xs font-medium text-[#34251E]">{booking.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700">
                  <Phone size={16} />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#8B7B70]">Contact Number</span>
                  <p className="text-xs font-medium text-[#34251E]">{booking.phone}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Booking Status Management */}
          <div className="rounded-2xl border border-[#B89555]/40 bg-white p-5 shadow-xs">
            <div className="pb-2 border-b border-[#EAE1D4]/60">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#34251E]">
                Update Booking Status
              </span>
              <p className="text-[11px] text-[#8B7B70] mt-0.5">
                Status updates are persisted instantly to the database.
              </p>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              {statuses.map((st) => {
                const isSelected = currentStatus === st;
                return (
                  <button
                    key={st}
                    onClick={() => handleUpdateStatus(st)}
                    disabled={updating}
                    className={`flex items-center justify-center gap-2 rounded-xl py-2.5 px-3 text-xs font-semibold transition-all duration-150 border ${
                      isSelected
                        ? 'bg-[#C66A24] text-white border-[#C66A24] shadow-md shadow-[#C66A24]/20 ring-2 ring-[#C66A24]/20'
                        : 'bg-[#FAF7F0] text-[#34251E] border-[#EAE1D4] hover:bg-white hover:border-[#B89555]'
                    } ${updating ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {updating && isSelected ? (
                      <Loader2 size={13} className="animate-spin" />
                    ) : null}
                    <span>{st}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Audit Timestamps */}
          <div className="rounded-xl bg-stone-100/70 p-3 text-[11px] text-[#8B7B70] space-y-1">
            <div className="flex justify-between">
              <span>Created:</span>
              <span className="text-[#34251E]">{formatDate(booking.createdAt)}</span>
            </div>
            {booking.updatedAt && (
              <div className="flex justify-between">
                <span>Last Updated:</span>
                <span className="text-[#34251E]">{formatDate(booking.updatedAt)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="border-t border-[#EAE1D4] bg-white p-4">
          <button
            onClick={onClose}
            className="w-full rounded-xl border border-[#EAE1D4] bg-[#FAF7F0] py-2.5 text-xs font-semibold text-[#34251E] hover:bg-stone-200/50 transition-colors"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
}
