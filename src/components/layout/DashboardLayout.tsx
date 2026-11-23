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
    <div className="min-h-screen bg-[#FAF7F0] text-[#34251E]">
      {/* Sidebar Navigation */}
      <Sidebar
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        selectedStatusFilter={selectedStatusFilter}
        onSelectStatusFilter={onSelectStatusFilter}
      />

      {/* Main Content Area */}
      <div className="flex flex-col lg:pl-72 min-h-screen">
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