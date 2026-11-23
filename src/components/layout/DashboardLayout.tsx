'use client';

import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

interface DashboardLayoutProps {
  children: React.ReactNode;
  pageTitle: string;
  breadcrumb?: string;
  searchValue?: string;
  onSearchChange?: (val: string) => void;
  selectedStatusFilter?: string;
  onSelectStatusFilter?: (status: string) => void;
}

export default function DashboardLayout({
  children,
  pageTitle,
  breadcrumb,
  searchValue,
  onSearchChange,
  selectedStatusFilter,
  onSelectStatusFilter,
}: DashboardLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#FAF7F0] text-[#34251E] overflow-x-hidden">
      {/* Sacred Ganesh Ji Background Watermark - Balanced & Distinct */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center lg:left-72 overflow-hidden select-none"
      >
        <img
          src="/images/ganesh-watermark.png"
          alt=""
          className="w-[520px] max-w-[80vw] sm:w-[620px] lg:w-[720px] opacity-[0.22] object-contain filter drop-shadow-[0_0_16px_rgba(180,83,9,0.3)] mix-blend-multiply"
        />
      </div>

      {/* Sidebar Navigation */}
      <Sidebar
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        selectedStatusFilter={selectedStatusFilter}
        onSelectStatusFilter={onSelectStatusFilter}
      />

        {/* Main Content Area */}
        <div className="relative z-10 flex flex-col lg:pl-72 min-h-screen">
        <Header
          pageTitle={pageTitle}
          breadcrumb={breadcrumb}
          searchValue={searchValue}
          onSearchChange={onSearchChange}
          onMenuClick={() => setMobileOpen(true)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}