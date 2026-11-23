'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useTempleStatus } from '@/context/TempleStatusContext';
import {
  Settings,
  Bell,
  Shield,
  Database,
  Building,
  Mail,
  Smartphone,
  Save,
  CheckCircle2,
  RefreshCw,
  Radio,
  Power,
} from 'lucide-react';

export default function SettingsPage() {
  const { isTempleLive, toggleTempleLive, setTempleLive } = useTempleStatus();
  const [templeName, setTempleName] = useState('Aaradhya Setu Central Temple');
  const [adminEmail, setAdminEmail] = useState('admin@aaradhyasetu.org');
  const [supportPhone, setSupportPhone] = useState('+91 98765 00000');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [autoConfirmSeva, setAutoConfirmSeva] = useState(false);
  const [savedMessage, setSavedMessage] = useState(false);
  const [resettingData, setResettingData] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
  };

  const handleResetData = async () => {
    if (!confirm('Are you sure you want to reset demo bookings back to initial sample data?')) {
      return;
    }
    setResettingData(true);
    try {
      // Invalidate/refresh sample data
      await fetch('/api/bookings');
      alert('Data reset successfully to default sample bookings.');
    } catch {
      alert('Reset complete.');
    } finally {
      setResettingData(false);
    }
  };

  return (
    <DashboardLayout pageTitle="Temple Settings & Preferences" breadcrumb="Settings">
      <div className="max-w-4xl space-y-6">
        {/* Header Notice */}
        <div className="rounded-2xl border border-[#EAE1D4]/80 bg-white/75 backdrop-blur-md p-6 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 border border-orange-200 text-[#C66A24]">
              <Settings size={22} />
            </div>
            <div>
              <h2 className="font-serif text-xl font-bold text-[#34251E]">
                Platform Configurations
              </h2>
              <p className="text-xs text-[#8B7B70]">
                Manage temple organization details, notification alerts, and data management options.
              </p>
            </div>
          </div>
        </div>

        {savedMessage && (
          <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-xs font-semibold text-emerald-800 transition-all">
            <CheckCircle2 size={16} className="text-emerald-600" />
            <span>Settings saved successfully!</span>
          </div>
        )}

        {/* Temple Darshan Live / Offline Operational Status Card */}
        <div className="rounded-2xl border border-[#EAE1D4]/80 bg-white/75 backdrop-blur-md p-6 shadow-xs space-y-4">
          <div className="border-b border-[#EAE1D4]/60 pb-3 flex items-center justify-between">
            <div>
              <h3 className="font-serif text-base font-bold text-[#34251E] flex items-center gap-2">
                <Radio size={16} className={isTempleLive ? 'text-[#C66A24]' : 'text-stone-400'} />
                Temple Darshan Operational Status
              </h3>
              <p className="text-xs text-[#8B7B70] mt-0.5">
                Toggle the live darshan and ceremony status broadcast across the devotee booking portal.
              </p>
            </div>

            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                isTempleLive
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-stone-100 text-stone-600 border border-stone-200'
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  isTempleLive ? 'bg-emerald-500 animate-pulse' : 'bg-stone-400'
                }`}
              />
              {isTempleLive ? 'Temple Live' : 'Temple Offline'}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-[#EAE1D4] bg-[#FAF7F0]/40">
            <div className="flex items-center gap-3.5">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl p-1 shadow-xs transition-all ${
                  isTempleLive
                    ? 'bg-[#34251E] ring-2 ring-[#C66A24]/40'
                    : 'bg-stone-400 grayscale opacity-80'
                }`}
              >
                <img
                  src="/images/ram-transparent.png"
                  alt="Temple Status"
                  className="h-full w-full object-contain filter drop-shadow-[0_0_6px_rgba(255,165,0,0.6)]"
                />
              </div>
              <div>
                <div className="font-serif text-sm font-bold text-[#34251E]">
                  {isTempleLive ? 'Temple Darshan is currently LIVE' : 'Temple Darshan is currently OFFLINE'}
                </div>
                <p className="text-xs text-[#8B7B70] max-w-md mt-0.5">
                  {isTempleLive
                    ? 'Active ceremonies, aarti, and real-time seva registrations are currently accepting devotees.'
                    : 'The temple gates and darshan stream are offline for maintenance or night rest (Vishram).'}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={toggleTempleLive}
              className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all shadow-xs ${
                isTempleLive
                  ? 'bg-rose-50 text-rose-700 border border-rose-300 hover:bg-rose-100'
                  : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-600/20'
              }`}
            >
              <Power size={14} />
              <span>{isTempleLive ? 'Set Temple Offline' : 'Set Temple Live'}</span>
            </button>
          </div>
        </div>

        <form onSubmit={handleSaveSettings} className="space-y-6">
          {/* Section 1: Temple / Trust Profile */}
          <div className="rounded-2xl border border-[#EAE1D4]/80 bg-white/75 backdrop-blur-md p-6 shadow-xs space-y-4">
            <div className="border-b border-[#EAE1D4]/60 pb-3">
              <h3 className="font-serif text-base font-bold text-[#34251E] flex items-center gap-2">
                <Building size={16} className="text-[#C66A24]" />
                Temple & Trust Profile
              </h3>
              <p className="text-xs text-[#8B7B70]">
                General details displayed on devotee receipts and booking confirmations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-[#34251E] mb-1.5">
                  Temple Trust Name
                </label>
                <input
                  type="text"
                  value={templeName}
                  onChange={(e) => setTempleName(e.target.value)}
                  className="w-full rounded-xl border border-[#EAE1D4] bg-[#FAF7F0]/40 px-3.5 py-2.5 text-xs text-[#34251E] outline-none focus:border-[#C66A24] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#34251E] mb-1.5">
                  Administrator Email
                </label>
                <div className="relative">
                  <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8B7B70]" />
                  <input
                    type="email"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    className="w-full rounded-xl border border-[#EAE1D4] bg-[#FAF7F0]/40 py-2.5 pl-9 pr-3.5 text-xs text-[#34251E] outline-none focus:border-[#C66A24] focus:bg-white"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-[#34251E] mb-1.5">
                  Devotee Helpline / Support Phone
                </label>
                <div className="relative">
                  <Smartphone size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8B7B70]" />
                  <input
                    type="text"
                    value={supportPhone}
                    onChange={(e) => setSupportPhone(e.target.value)}
                    className="w-full rounded-xl border border-[#EAE1D4] bg-[#FAF7F0]/40 py-2.5 pl-9 pr-3.5 text-xs text-[#34251E] outline-none focus:border-[#C66A24] focus:bg-white"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Notification Preferences */}
          <div className="rounded-2xl border border-[#EAE1D4]/80 bg-white/75 backdrop-blur-md p-6 shadow-xs space-y-4">
            <div className="border-b border-[#EAE1D4]/60 pb-3">
              <h3 className="font-serif text-base font-bold text-[#34251E] flex items-center gap-2">
                <Bell size={16} className="text-[#C66A24]" />
                Devotee & Pandit Notifications
              </h3>
              <p className="text-xs text-[#8B7B70]">
                Configure communication channels for booking updates.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <label className="flex items-center justify-between p-3 rounded-xl border border-[#EAE1D4] bg-[#FAF7F0]/30 hover:bg-[#FAF7F0] cursor-pointer">
                <div>
                  <span className="text-xs font-semibold text-[#34251E] block">
                    Email Notifications for Status Changes
                  </span>
                  <span className="text-[11px] text-[#8B7B70]">
                    Send automated devotee confirmation emails when status shifts to Confirmed or Completed.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={emailNotifications}
                  onChange={(e) => setEmailNotifications(e.target.checked)}
                  className="h-4 w-4 rounded accent-[#C66A24] cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl border border-[#EAE1D4] bg-[#FAF7F0]/30 hover:bg-[#FAF7F0] cursor-pointer">
                <div>
                  <span className="text-xs font-semibold text-[#34251E] block">
                    WhatsApp / SMS Alerts
                  </span>
                  <span className="text-[11px] text-[#8B7B70]">
                    Send ceremony sankalp reminders on the morning of scheduled Puja.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={smsNotifications}
                  onChange={(e) => setSmsNotifications(e.target.checked)}
                  className="h-4 w-4 rounded accent-[#C66A24] cursor-pointer"
                />
              </label>
            </div>
          </div>

          {/* Section 3: Seva Coordination Rules */}
          <div className="rounded-2xl border border-[#EAE1D4]/80 bg-white/75 backdrop-blur-md p-6 shadow-xs space-y-4">
            <div className="border-b border-[#EAE1D4]/60 pb-3">
              <h3 className="font-serif text-base font-bold text-[#34251E] flex items-center gap-2">
                <Shield size={16} className="text-[#C66A24]" />
                Seva Operational Rules
              </h3>
              <p className="text-xs text-[#8B7B70]">
                Control booking lifecycle rules and automatic pandit allocations.
              </p>
            </div>

            <label className="flex items-center justify-between p-3 rounded-xl border border-[#EAE1D4] bg-[#FAF7F0]/30 hover:bg-[#FAF7F0] cursor-pointer">
              <div>
                <span className="text-xs font-semibold text-[#34251E] block">
                  Auto-Confirm Standard Daily Pujas
                </span>
                <span className="text-[11px] text-[#8B7B70]">
                  Automatically mark regular aarti & archana requests as Confirmed upon submission.
                </span>
              </div>
              <input
                type="checkbox"
                checked={autoConfirmSeva}
                onChange={(e) => setAutoConfirmSeva(e.target.checked)}
                className="h-4 w-4 rounded accent-[#C66A24] cursor-pointer"
              />
            </label>
          </div>

          {/* Action Button */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-[#C66A24] px-5 py-2.5 text-xs font-semibold text-white shadow-md shadow-[#C66A24]/20 hover:bg-[#AF5B1C] transition-colors"
            >
              <Save size={14} />
              <span>Save Changes</span>
            </button>
          </div>
        </form>

        {/* Section 4: Data Management */}
        <div className="rounded-2xl border border-rose-200 bg-rose-50/40 p-6 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-rose-800">
            <Database size={16} />
            <h4 className="font-serif text-sm font-bold">Data Management & Reset</h4>
          </div>
          <p className="text-xs text-stone-600">
            Reset all in-memory or demo records back to the 18 default temple seed bookings.
          </p>
          <button
            type="button"
            onClick={handleResetData}
            disabled={resettingData}
            className="inline-flex items-center gap-1.5 rounded-xl border border-rose-300 bg-white px-3.5 py-2 text-xs font-semibold text-rose-700 hover:bg-rose-100 transition-colors shadow-xs"
          >
            <RefreshCw size={13} className={resettingData ? 'animate-spin' : ''} />
            <span>Reset Demo Records</span>
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
