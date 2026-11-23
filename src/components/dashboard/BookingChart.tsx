'use client';

import React from 'react';
import { IBooking } from '@/types/booking';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';
import { PieChart as ChartIcon } from 'lucide-react';

interface BookingChartProps {
  bookings: IBooking[];
}

export default function BookingChart({ bookings }: BookingChartProps) {
  const pending = bookings.filter((b) => b.status === 'Pending').length;
  const confirmed = bookings.filter((b) => b.status === 'Confirmed').length;
  const inProgress = bookings.filter((b) => b.status === 'In Progress').length;
  const completed = bookings.filter((b) => b.status === 'Completed').length;

  const data = [
    { name: 'Pending', count: pending, color: '#F59E0B' },
    { name: 'Confirmed', count: confirmed, color: '#0EA5E9' },
    { name: 'In Progress', count: inProgress, color: '#A855F7' },
    { name: 'Completed', count: completed, color: '#10B981' },
  ];

  return (
    <div className="rounded-2xl border border-[#EAE1D4]/80 bg-white/75 backdrop-blur-md p-6 shadow-xs">
      <div className="flex items-center justify-between pb-4 border-b border-[#EAE1D4]/80">
        <div>
          <h2 className="font-serif text-lg font-bold text-[#34251E] flex items-center gap-2">
            <ChartIcon size={18} className="text-[#C66A24]" />
            Puja Booking Distribution
          </h2>
          <p className="text-xs text-[#8B7B70] mt-0.5">
            Real-time status breakdown across all devotees
          </p>
        </div>
      </div>

      <div className="h-64 w-full pt-4">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={4}
              dataKey="count"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#FAF7F0',
                borderColor: '#EAE1D4',
                borderRadius: '12px',
                fontSize: '12px',
                color: '#34251E',
                boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
              }}
              formatter={(value: any, name: any) => [`${value} Bookings`, name]}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              formatter={(value) => (
                <span className="text-xs font-medium text-[#34251E]">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}