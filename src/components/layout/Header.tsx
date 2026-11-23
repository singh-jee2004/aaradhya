'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  Menu,
  Search,
  Calendar as CalendarIcon,
  Sparkles,
  ChevronRight,
  User,
  Settings,
  ShieldCheck,
  Bell,
  ExternalLink,
} from 'lucide-react';
import { useTempleStatus } from '@/context/TempleStatusContext';

interface HeaderProps {
  pageTitle: string;
  breadcrumb?: string;
  searchValue?: string;
  onSearchChange?: (val: string) => void;
  onMenuClick: () => void;
}

export default function Header({
  pageTitle,
  breadcrumb = 'Dashboard',
  searchValue = '',
  onSearchChange,
  onMenuClick,
}: HeaderProps) {
  const { isTempleLive, toggleTempleLive } = useTempleStatus();
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const today = new Intl.DateTimeFormat('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date());

  return (
    <header className="sticky top-0 z-30 flex h-20 w-full items-center justify-between border-b border-[#EAE1D4] bg-[#FAF7F0]/90 px-4 backdrop-blur-md sm:px-8">
      {/* Left: Mobile Menu & Breadcrumb */}
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          onClick={onMenuClick}
          className="rounded-xl border border-[#EAE1D4] bg-white p-2 text-[#34251E] shadow-xs hover:bg-[#FAF7F0] lg:hidden"
          aria-label="Open Navigation Menu"
        >
          <Menu size={20} />
        </button>

        <div>
          <div className="flex items-center gap-1.5 text-xs font-medium text-[#8B7B70]">
            <Link href="/" className="hover:text-[#C66A24] transition-colors">
              Aaradhya Setu
            </Link>
            <ChevronRight size={12} className="text-stone-400" />
            <span className="text-[#34251E] font-semibold">{breadcrumb}</span>
          </div>
          <h1 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#34251E]">
            {pageTitle}
          </h1>
        </div>
      </div>

      {/* Right: Search, Date, Profile Indicator */}
      <div className="flex items-center gap-3 sm:gap-5">
        {/* Top Header Search Bar */}
        {onSearchChange && (
          <div className="relative hidden md:block w-64 lg:w-80">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8B7B70]"
            />
            <input
              type="text"
              placeholder="Search by ID, devotee, puja..."
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full rounded-xl border border-[#EAE1D4] bg-white py-2 pl-9 pr-4 text-xs text-[#34251E] placeholder-[#8B7B70] shadow-xs outline-none transition-all focus:border-[#C66A24] focus:ring-2 focus:ring-[#C66A24]/20"
            />
            {searchValue && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-stone-400 hover:text-stone-600"
              >
                Clear
              </button>
            )}
          </div>
        )}

        {/* Current Date Badge */}
        <div className="hidden sm:flex items-center gap-2 rounded-xl border border-[#EAE1D4] bg-white px-3 py-1.5 shadow-xs text-xs font-medium text-[#34251E]">
          <CalendarIcon size={14} className="text-[#C66A24]" />
          <span>{today}</span>
        </div>

        {/* Puja Darshan / Live or Offline Indicator with quick click to toggle or navigate to settings */}
        <Link
          href="/settings"
          title="Click to manage Temple Live / Offline status in Settings"
          className={`flex items-center gap-2 rounded-xl px-2.5 py-1 text-xs font-medium transition-all ${
            isTempleLive
              ? 'bg-amber-500/10 border border-[#B89555]/40 text-[#C66A24] hover:bg-amber-500/20'
              : 'bg-stone-200/70 border border-stone-300 text-stone-600 hover:bg-stone-300/60'
          }`}
        >
          <div
            className={`h-5 w-5 overflow-hidden rounded-md flex items-center justify-center p-0.5 ${
              isTempleLive ? 'bg-[#34251E]' : 'bg-stone-500 grayscale opacity-80'
            }`}
          >
            <img
              src="/images/ram-transparent.png"
              alt="Darshan"
              className="h-full w-full object-contain"
            />
          </div>
          <div className="flex items-center gap-1.5">
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                isTempleLive ? 'bg-emerald-500 animate-pulse' : 'bg-stone-400'
              }`}
            />
            <span className="hidden sm:inline font-semibold">
              {isTempleLive ? 'Temple Live' : 'Temple Offline'}
            </span>
          </div>
        </Link>

        {/* Administrator Profile Menu */}
        <div className="relative pl-2 border-l border-[#EAE1D4]" ref={dropdownRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="group relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-[#642F35] to-[#C66A24] text-white font-serif font-bold text-xs shadow-xs hover:ring-2 hover:ring-[#C66A24]/40 hover:scale-105 transition-all cursor-pointer"
            aria-label="Admin Profile Menu"
          >
            A
            <span
              className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white ${
                isTempleLive ? 'bg-emerald-500' : 'bg-amber-500'
              }`}
            />
          </button>

          {/* Interactive Dropdown Menu */}
          {profileOpen && (
            <div className="absolute right-0 mt-3 w-64 rounded-2xl border border-[#EAE1D4] bg-white/95 backdrop-blur-xl p-3 shadow-xl shadow-stone-900/10 z-50 animate-fade-in divide-y divide-[#EAE1D4]/60">
              {/* User Identity Info */}
              <div className="pb-3 px-2 pt-1">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-[#642F35] to-[#C66A24] text-white font-serif font-bold text-sm shadow-xs">
                    A
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-serif text-xs font-bold text-[#34251E] truncate">
                      Tushar Singh
                    </p>
                    <p className="text-[10px] text-[#8B7B70] truncate">
                      Head Seva Administrator
                    </p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      <span className="text-[10px] font-semibold text-emerald-700">
                        Admin Session Active
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Links & Shortcuts */}
              <div className="py-2 space-y-0.5">
                <Link
                  href="/settings"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-xs font-medium text-[#34251E] hover:bg-[#FAF7F0] hover:text-[#C66A24] transition-colors"
                >
                  <Settings size={14} className="text-[#8B7B70]" />
                  <span>Platform Settings</span>
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    toggleTempleLive();
                    setProfileOpen(false);
                  }}
                  className="w-full flex items-center justify-between rounded-xl px-2.5 py-2 text-xs font-medium text-[#34251E] hover:bg-[#FAF7F0] hover:text-[#C66A24] transition-colors text-left"
                >
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck size={14} className="text-[#8B7B70]" />
                    <span>Darshan Status</span>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                      isTempleLive
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-stone-100 text-stone-600 border border-stone-200'
                    }`}
                  >
                    {isTempleLive ? 'Live' : 'Offline'}
                  </span>
                </button>

                <Link
                  href="/bookings"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-xs font-medium text-[#34251E] hover:bg-[#FAF7F0] hover:text-[#C66A24] transition-colors"
                >
                  <Bell size={14} className="text-[#8B7B70]" />
                  <span>Seva Approvals</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
