import React from 'react';
import { BookingStatus } from '@/types/booking';
import { Clock, CheckCircle2, RefreshCw, CheckCheck } from 'lucide-react';

interface StatusBadgeProps {
  status: BookingStatus;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export default function StatusBadge({ status, size = 'md', showIcon = true }: StatusBadgeProps) {
  let badgeStyles = '';
  let dotColor = '';
  let IconComponent = Clock;

  switch (status) {
    case 'Pending':
      badgeStyles = 'bg-amber-50 text-amber-800 border-amber-200/80';
      dotColor = 'bg-amber-500';
      IconComponent = Clock;
      break;
    case 'Confirmed':
      badgeStyles = 'bg-sky-50 text-sky-800 border-sky-200/80';
      dotColor = 'bg-sky-500';
      IconComponent = CheckCircle2;
      break;
    case 'In Progress':
      badgeStyles = 'bg-purple-50 text-purple-800 border-purple-200/80';
      dotColor = 'bg-purple-500';
      IconComponent = RefreshCw;
      break;
    case 'Completed':
      badgeStyles = 'bg-emerald-50 text-emerald-800 border-emerald-200/80';
      dotColor = 'bg-emerald-500';
      IconComponent = CheckCheck;
      break;
    default:
      badgeStyles = 'bg-stone-50 text-stone-700 border-stone-200';
      dotColor = 'bg-stone-400';
      IconComponent = Clock;
  }

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-xs font-medium px-2.5 py-1 gap-1.5',
    lg: 'text-sm font-medium px-3 py-1.5 gap-2',
  }[size];

  const iconSizes = {
    sm: 11,
    md: 13,
    lg: 15,
  }[size];

  return (
    <span
      className={`inline-flex items-center rounded-full border shadow-xs transition-colors duration-150 ${sizeClasses} ${badgeStyles}`}
    >
      {showIcon && <IconComponent size={iconSizes} className="shrink-0 stroke-[2.2]" />}
      <span>{status}</span>
    </span>
  );
}
