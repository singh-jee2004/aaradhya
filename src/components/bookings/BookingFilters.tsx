import React from 'react';
import { Search, Filter, ArrowUpDown, X } from 'lucide-react';

interface BookingFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusChange: (status: string) => void;
  sortBy: string;
  onSortByChange: (sort: string) => void;
  order: 'asc' | 'desc';
  onOrderToggle: () => void;
  onClearFilters: () => void;
  totalFiltered: number;
}

export default function BookingFilters({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusChange,
  sortBy,
  onSortByChange,
  order,
  onOrderToggle,
  onClearFilters,
  totalFiltered,
}: BookingFiltersProps) {
  const statuses = ['All Statuses', 'Pending', 'Confirmed', 'In Progress', 'Completed'];

  const hasActiveFilters = searchTerm !== '' || statusFilter !== 'All Statuses';

  return (
    <div className="rounded-2xl border border-[#EAE1D4] bg-white p-4 sm:p-5 shadow-xs mb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8B7B70]"
          />
          <input
            type="text"
            placeholder="Search by Booking ID, devotee name, or puja..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full rounded-xl border border-[#EAE1D4] bg-[#FAF7F0]/50 py-2.5 pl-10 pr-9 text-xs sm:text-sm text-[#34251E] placeholder-[#8B7B70] shadow-xs outline-none transition-all focus:border-[#C66A24] focus:bg-white focus:ring-2 focus:ring-[#C66A24]/20"
          />
          {searchTerm && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-stone-400 hover:bg-stone-200/50 hover:text-stone-600"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Filters and Sorting Controls */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
          {/* Status Filter */}
          <div className="flex items-center gap-1.5 rounded-xl border border-[#EAE1D4] bg-[#FAF7F0]/40 px-3 py-1.5">
            <Filter size={14} className="text-[#8B7B70]" />
            <select
              value={statusFilter}
              onChange={(e) => onStatusChange(e.target.value)}
              className="bg-transparent text-xs font-medium text-[#34251E] outline-none cursor-pointer"
            >
              {statuses.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Column Selection */}
          <div className="flex items-center gap-1.5 rounded-xl border border-[#EAE1D4] bg-[#FAF7F0]/40 px-3 py-1.5">
            <span className="text-[11px] font-semibold text-[#8B7B70] uppercase">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => onSortByChange(e.target.value)}
              className="bg-transparent text-xs font-medium text-[#34251E] outline-none cursor-pointer"
            >
              <option value="bookingDate">Puja Date</option>
              <option value="amount">Amount</option>
              <option value="devoteeName">Devotee Name</option>
            </select>
          </div>

          {/* Asc/Desc Order Toggle */}
          <button
            onClick={onOrderToggle}
            className="flex items-center gap-1 rounded-xl border border-[#EAE1D4] bg-white px-3 py-2 text-xs font-medium text-[#34251E] shadow-xs hover:border-[#B89555] hover:text-[#C66A24] transition-colors"
            title={`Sort Order: ${order === 'asc' ? 'Ascending' : 'Descending'}`}
          >
            <ArrowUpDown size={14} className="text-[#C66A24]" />
            <span className="capitalize">{order}</span>
          </button>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="flex items-center gap-1 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700 hover:bg-rose-100 transition-colors shadow-xs"
            >
              <X size={13} />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>

      {/* Results Count & Quick Status Tabs */}
      <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2 border-t border-[#EAE1D4]/60 pt-3 text-xs text-[#8B7B70]">
        <span>
          Showing <strong className="text-[#34251E] font-semibold">{totalFiltered}</strong>{' '}
          devotional booking records
        </span>

        <div className="flex flex-wrap items-center gap-1.5">
          {statuses.map((st) => {
            const isSelected = statusFilter === st;
            return (
              <button
                key={st}
                onClick={() => onStatusChange(st)}
                className={`rounded-lg px-2.5 py-1 text-xs transition-colors ${isSelected
                  ? 'bg-[#C66A24] text-white font-medium shadow-xs'
                  : 'bg-[#FAF7F0] text-[#8B7B70] hover:text-[#34251E] hover:bg-stone-200/50'
                  }`}
              >
                {st}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
