'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  CalendarDays,
  Clock,
  CheckCircle2,
  CheckCheck,
  Settings,
  Sparkles,
  X,
} from 'lucide-react';

interface SidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  selectedStatusFilter?: string;
  onSelectStatusFilter?: (status: string) => void;
}

export default function Sidebar({
  mobileOpen,
  setMobileOpen,
  selectedStatusFilter,
  onSelectStatusFilter,
}: SidebarProps) {
  const pathname = usePathname();

  const isSettings = pathname === '/settings';

  const navItems = [
    {
      label: 'Overview',
      icon: LayoutDashboard,
      href: '/',
      filter: 'All',
      active: pathname === '/' && (!selectedStatusFilter || selectedStatusFilter === 'All'),
    },
    {
      label: 'All Bookings',
      icon: CalendarDays,
      href: '/bookings',
      filter: 'All',
      active: pathname === '/bookings' && (!selectedStatusFilter || selectedStatusFilter === 'All'),
    },
    {
      label: 'Pending Bookings',
      icon: Clock,
      href: '/bookings?status=Pending',
      filter: 'Pending',
      color: 'text-amber-600',
      active: selectedStatusFilter === 'Pending',
    },
    {
      label: 'Confirmed Bookings',
      icon: CheckCircle2,
      href: '/bookings?status=Confirmed',
      filter: 'Confirmed',
      color: 'text-sky-600',
      active: selectedStatusFilter === 'Confirmed',
    },
    {
      label: 'Completed Bookings',
      icon: CheckCheck,
      href: '/bookings?status=Completed',
      filter: 'Completed',
      color: 'text-emerald-600',
      active: selectedStatusFilter === 'Completed',
    },
  ];

  const handleNavClick = (filter: string) => {
    if (onSelectStatusFilter) {
      onSelectStatusFilter(filter);
    }
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-stone-900/40 backdrop-blur-xs transition-opacity lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex w-72 flex-col border-r border-[#EAE1D4] bg-[#FAF7F0] transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="flex h-20 items-center justify-between border-b border-[#EAE1D4] px-6">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative flex h-11 w-11 items-center justify-center rounded-xl overflow-hidden bg-gradient-to-br from-[#34251E] via-[#5C2E1F] to-[#C66A24] p-0.5 shadow-md shadow-[#C66A24]/25 ring-1.5 ring-[#C66A24]/40 group-hover:scale-105 transition-transform duration-200">
              <img
                src="/images/ram-transparent.png"
                alt="Aaradhya Setu"
                className="h-full w-full object-contain filter drop-shadow-[0_0_6px_rgba(255,165,0,0.7)]"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-lg font-bold tracking-wide text-[#34251E]">
                  आराध्य Setu
                </span>
              </div>
              <p className="text-[11px] font-medium tracking-wider uppercase text-[#B89555]">
                Puja Booking Admin
              </p>
            </div>
          </Link>

          <button
            onClick={() => setMobileOpen(false)}
            className="rounded-lg p-1.5 text-stone-500 hover:bg-stone-200/60 lg:hidden"
            aria-label="Close Sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Traditional Temple Motif Banner */}
        <div className="mx-4 mt-4 rounded-xl border border-[#B89555]/30 bg-gradient-to-r from-[#FAF7F0] via-[#F4E8D1]/40 to-[#FAF7F0] p-3 shadow-xs">
          <p className="text-center text-xs font-serif italic text-[#642F35]">
            ॥ ॐ श्री गणेशाय नमः ॥
          </p>
          <p className="text-center text-[10px] text-[#8B7B70] mt-0.5">
            Devotee Seva & Booking Management
          </p>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
          <div className="px-3 pb-2 pt-1 text-[11px] font-bold uppercase tracking-wider text-[#8B7B70]">
            Core Dashboard
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isCurrent = item.active;

            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => handleNavClick(item.filter)}
                className={`group flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-150 ${
                  isCurrent
                    ? 'bg-[#C66A24] text-white shadow-md shadow-[#C66A24]/25'
                    : 'text-[#34251E] hover:bg-white hover:text-[#C66A24] hover:shadow-xs'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    size={18}
                    className={`${
                      isCurrent
                        ? 'text-white'
                        : item.color || 'text-[#8B7B70] group-hover:text-[#C66A24]'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {isCurrent && (
                  <span className="h-2 w-2 rounded-full bg-white shadow-xs" />
                )}
              </Link>
            );
          })}

          <div className="pt-6 px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-[#8B7B70]">
            Administration
          </div>

          <Link
            href="/settings"
            onClick={() => setMobileOpen(false)}
            className={`group flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-150 ${
              isSettings
                ? 'bg-[#C66A24] text-white shadow-md shadow-[#C66A24]/25'
                : 'text-[#34251E] hover:bg-white hover:text-[#C66A24] hover:shadow-xs'
            }`}
          >
            <div className="flex items-center gap-3">
              <Settings
                size={18}
                className={isSettings ? 'text-white' : 'text-[#8B7B70] group-hover:text-[#C66A24]'}
              />
              <span>Settings</span>
            </div>
            {isSettings ? (
              <span className="h-2 w-2 rounded-full bg-white shadow-xs" />
            ) : (
              <span className="rounded-md bg-amber-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-[#C66A24] border border-[#B89555]/30">
                Active
              </span>
            )}
          </Link>
        </div>

        {/* Administrator Profile Card */}
        <div className="border-t border-[#EAE1D4] p-4 bg-white/50">
          <div className="flex items-center gap-3 rounded-xl bg-white p-3 border border-[#EAE1D4] shadow-xs">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FAF7F0] border border-[#B89555]/40 text-[#C66A24] font-serif font-bold text-sm">
              AS
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold text-[#34251E]">
                Chief Temple Administrator
              </p>
              <p className="truncate text-[11px] text-[#8B7B70]">
                admin@aaradhyasetu.org
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}