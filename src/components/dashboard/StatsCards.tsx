import React from 'react';
import { BookingStats } from '@/types/booking';
import {
  CalendarDays,
  Clock,
  CheckCircle2,
  CheckCheck,
  IndianRupee,
} from 'lucide-react';

interface StatsCardsProps {
  stats: BookingStats;
  loading?: boolean;
}

export default function StatsCards({ stats, loading = false }: StatsCardsProps) {
  const cards = [
    {
      title: 'Total Bookings',
      value: stats.totalBookings,
      icon: CalendarDays,
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-800',
      borderColor: 'border-amber-200/80',
      subtext: 'All recorded puja requests',
    },
    {
      title: 'Pending Bookings',
      value: stats.pendingBookings,
      icon: Clock,
      bgColor: 'bg-amber-50/70',
      textColor: 'text-amber-700',
      borderColor: 'border-amber-200',
      subtext: 'Awaiting priest confirmation',
    },
    {
      title: 'Confirmed Bookings',
      value: stats.confirmedBookings,
      icon: CheckCircle2,
      bgColor: 'bg-sky-50',
      textColor: 'text-sky-700',
      borderColor: 'border-sky-200',
      subtext: 'Scheduled & assigned',
    },
    {
      title: 'Completed Bookings',
      value: stats.completedBookings,
      icon: CheckCheck,
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-700',
      borderColor: 'border-emerald-200',
      subtext: 'Rituals performed',
    },
    {
      title: 'Total Revenue',
      value: `₹${(stats.totalRevenue || 0).toLocaleString('en-IN')}`,
      icon: IndianRupee,
      bgColor: 'bg-orange-50/60',
      textColor: 'text-[#C66A24]',
      borderColor: 'border-[#B89555]/30',
      subtext: 'Recorded booking value',
    },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {[1, 2, 3, 4, 5].map((idx) => (
          <div
            key={idx}
            className="h-32 rounded-2xl bg-white border border-[#EAE1D4] p-5 shadow-xs animate-pulse"
          >
            <div className="h-4 w-24 bg-stone-200 rounded mb-4" />
            <div className="h-8 w-16 bg-stone-300 rounded mb-2" />
            <div className="h-3 w-32 bg-stone-100 rounded" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.title}
            className="group relative overflow-hidden rounded-2xl bg-white/75 backdrop-blur-md p-5 border border-[#EAE1D4]/80 shadow-xs hover:shadow-md hover:border-[#B89555]/60 hover:bg-white/85 transition-all duration-200"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold tracking-wide text-[#8B7B70] uppercase">
                {card.title}
              </span>
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-xl border ${card.borderColor} ${card.bgColor} ${card.textColor}`}
              >
                <Icon size={18} />
              </div>
            </div>

            <div className="mt-3">
              <div className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#34251E]">
                {card.value}
              </div>
              <p className="mt-1 text-[11px] text-[#8B7B70]">
                {card.subtext}
              </p>
            </div>

            <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-[#B89555]/30 to-transparent group-hover:via-[#C66A24] transition-all" />
          </div>
        );
      })}
    </div>
  );
}
