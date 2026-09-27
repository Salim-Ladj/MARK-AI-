import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  LayoutDashboard,
  Shield,
  Sparkles,
  PenTool,
  Calendar,
  Users,
  FolderOpen,
  BarChart3,
  LogOut,
  ChevronDown,
  ArrowRightLeft,
  Bell,
  Search,
  Building2,
  CheckCircle2
} from 'lucide-react';

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export const MarketingLayout: React.FC<MarketingLayoutProps> = ({ children }) => {
  const {
    currentRoute,
    navigateTo,
    currentUser,
    logout,
    loginAs,
    brands,
    selectedBrand,
    setSelectedBrand
  } = useApp();

  const [brandDropdownOpen, setBrandDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // 8 Exact Marketing Nav Items from Screenshot
  const navItems = [
    { label: 'Overview', route: '/marketing/overview', icon: LayoutDashboard },
    { label: 'Brand Management', route: '/marketing/brands', icon: Shield },
    { label: 'AI Campaigns', route: '/marketing/campaigns', icon: Sparkles },
    { label: 'AI Studio', route: '/marketing/ai-studio', icon: PenTool },
    { label: 'Content Calendar', route: '/marketing/calendar', icon: Calendar },
    { label: 'Creative Team', route: '/marketing/creative-team', icon: Users },
    { label: 'Asset Hub', route: '/marketing/assets', icon: FolderOpen },
    { label: 'Performance', route: '/marketing/performance', icon: BarChart3 }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans text-slate-800 antialiased">
      {/* Sidebar (Width: 240px) */}
      <aside className="w-60 bg-white border-r border-slate-200/80 flex flex-col shrink-0 sticky top-0 h-screen select-none z-20">
        {/* Top Header in Sidebar */}
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
            <span className="text-[11px] font-bold text-slate-500 tracking-wider uppercase">
              Marketing Suite
            </span>
          </div>
          <span className="text-[11px] font-semibold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-100">
            v2.4
          </span>
        </div>

        {/* 8 Primary Navigation Links */}
        <nav className="flex-1 px-3 space-y-1 overflow-y-auto mt-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentRoute === item.route;
            return (
              <button
                key={item.route}
                onClick={() => navigateTo(item.route)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer text-left ${
                  isActive
                    ? 'bg-[#0284c7] text-white shadow-sm shadow-sky-600/20'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="p-3 border-t border-slate-100 space-y-2">
          {/* Workspace Pill */}
          <div className="bg-sky-50/60 border border-sky-100 rounded-xl p-2.5 flex items-center justify-between">
            <div>
              <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                Workspace
              </div>
              <div className="text-xs font-bold text-slate-900">
                {selectedBrand?.name || 'URBANA'} Brand
              </div>
            </div>
            <div className="w-5 h-5 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Switch to Creative */}
          <button
            type="button"
            onClick={() => loginAs('creative')}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <ArrowRightLeft className="w-3.5 h-3.5 text-slate-500" />
              <span>Switch to Creative</span>
            </div>
            <span className="text-slate-400 text-sm">›</span>
          </button>

          {/* Sign Out */}
          <button
            type="button"
            onClick={logout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200/80 px-6 sm:px-8 flex items-center justify-between shrink-0 z-10">
          {/* Left: Brand Logo & Workspace Dropdown */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigateTo('/marketing/overview')}>
              <span className="text-lg font-black tracking-tight text-slate-900">
                Mark<span className="text-[#0284c7]">Ai</span>
              </span>
            </div>

            <div className="h-4 w-px bg-slate-200" />

            {/* URBANA Brand Workspace Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setBrandDropdownOpen(!brandDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-white text-xs font-semibold text-slate-800 transition-all cursor-pointer"
              >
                <Building2 className="w-3.5 h-3.5 text-sky-600" />
                <span>{selectedBrand?.name || 'URBANA'} Brand Workspace</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {brandDropdownOpen && (
                <div className="absolute left-0 top-10 w-56 bg-white rounded-xl border border-slate-200 shadow-xl z-30 p-1.5 space-y-1">
                  <div className="text-[10px] font-bold tracking-wider text-slate-400 uppercase px-2 py-1">
                    Select Active Brand
                  </div>
                  {brands.map((b) => (
                    <button
                      key={b.id}
                      onClick={() => {
                        setSelectedBrand(b);
                        setBrandDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium text-left transition-colors cursor-pointer ${
                        selectedBrand?.id === b.id
                          ? 'bg-sky-50 text-sky-700 font-bold'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span className="truncate">{b.name}</span>
                      {selectedBrand?.id === b.id && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-600" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Center: Search Bar */}
          <div className="flex-1 max-w-md mx-6">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search campaigns, brands, or assets..."
                className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-full text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Right: Notifications & User Profile */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="relative p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500" />
            </button>

            <div className="flex items-center gap-3 pl-2 border-l border-slate-200">
              <div className="text-right hidden sm:block">
                <div className="text-xs font-bold text-slate-900 leading-tight">
                  {currentUser?.name || 'Sarah Jenkins'}
                </div>
                <div className="text-[10px] text-sky-600 font-semibold leading-tight">
                  Marketing Team - Admin
                </div>
              </div>
              <img
                src={currentUser?.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&h=120&q=80'}
                alt={currentUser?.name || 'Sarah'}
                className="w-9 h-9 rounded-full object-cover border border-slate-200 shadow-xs"
              />
            </div>
          </div>
        </header>

        {/* Viewport Canvas */}
        <main className="flex-1 overflow-y-auto p-6 sm:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};