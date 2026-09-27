import React, { useState } from 'react';
import {
  Tag,
  PenSquare,
  Sparkles,
  Plus,
  Building2,
  Bot,
  Send,
  CheckCircle2,
  TrendingUp,
  ArrowRight,
  SlidersHorizontal,
  Download,
  Clock,
  Check,
  Calendar,
  CloudUpload,
  MessageSquare,
  X,
  Radio,
  BookOpen,
  Inbox
} from 'lucide-react';

export const OverviewPage: React.FC = () => {
  // Modal state for Inspecting deliverables
  const [inspectModalTask, setInspectModalTask] = useState<{
    id: string;
    title: string;
    designer: string;
    brand: string;
    due: string;
    image: string;
    type: string;
    notes?: string;
  } | null>(null);

  // Quick state for approved items in review queue
  const [approvedItemIds, setApprovedItemIds] = useState<string[]>([]);

  const handleApprove = (id: string) => {
    setApprovedItemIds((prev) => [...prev, id]);
  };

  return (
    <div className="space-y-7 pb-12 font-sans antialiased text-slate-800">
      {/* 1. Header Banner & Action Buttons */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        <div>
          {/* Top Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-sky-50 text-sky-700 border border-sky-100">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
              LIVE CAMPAIGN WINDOW / Sep 27, 2026
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-sky-50/70 text-sky-700 border border-sky-200/80">
              <Tag className="w-3 h-3 text-sky-600" />
              URBANA • Fall/Winter Launch 2025
            </span>
          </div>

          {/* Main Title & Subtitle */}
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Marketing Overview
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Cross-functional intelligence hub & AI-assisted operational pacing for URBANA global campaigns.
          </p>
        </div>

        {/* Action Buttons Right */}
        <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-xs font-bold text-slate-700 shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <PenSquare className="w-3.5 h-3.5 text-sky-600" />
              Assign Creative Task
            </button>
            <button
              type="button"
              className="px-3.5 py-2 rounded-xl bg-[#0369a1] hover:bg-[#0284c7] text-white text-xs font-bold shadow-sm shadow-sky-800/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Launch AI Studio
            </button>
          </div>
          <button
            type="button"
            className="px-4 py-2 rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-bold shadow-sm shadow-sky-600/25 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            New Campaign
          </button>
        </div>
      </div>

      {/* 2. Top 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Active Brands */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">
              ACTIVE BRANDS
            </span>
            <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center border border-sky-100">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-black text-slate-900">3 Brands</div>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-sky-50 text-sky-700 border border-sky-200">
                Primary
              </span>
              <span className="text-xs text-slate-500 font-medium">URBANA +2 in</span>
            </div>
          </div>
        </div>

        {/* Card 2: Live AI Campaigns */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">
              LIVE AI CAMPAIGNS
            </span>
            <div className="w-8 h-8 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center border border-cyan-100">
              <Bot className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-black text-slate-900">4 Active</div>
            <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-emerald-600">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+1 launched this week</span>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#0284c7]" />
        </div>

        {/* Card 3: Content Scheduled */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">
              CONTENT SCHEDULED
            </span>
            <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center border border-sky-100">
              <Send className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-black text-slate-900">18 Drops</div>
            <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-500 font-medium">
              <Check className="w-3.5 h-3.5 text-sky-600 stroke-[3]" />
              <span>12 Reels / 6 Carousel posts</span>
            </div>
          </div>
        </div>

        {/* Card 4: Completed Assets */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">
              COMPLETED ASSETS
            </span>
            <div className="w-8 h-8 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center border border-cyan-100">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-black text-slate-900">42 Assets</div>
            <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-500 font-medium">
              <span className="font-bold text-slate-800">98.4%</span>
              <span>on-time delivery velocity</span>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-cyan-500" />
        </div>
      </div>

      {/* 3. Three Hub Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: AI Studio Engine */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between relative overflow-hidden group hover:border-sky-300 transition-all">
          <div>
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#0284c7] text-white flex items-center justify-center shadow-md shadow-sky-500/20">
                <PenSquare className="w-5 h-5" />
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-sky-50 text-sky-700 border border-sky-100">
                Generative
              </span>
            </div>
            <h3 className="text-sm font-bold text-slate-900 mt-4">AI Studio Engine</h3>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              Generate multi-lingual streetwear copy in Darija & French, create mood boards and brief synopses in seconds.
            </p>
          </div>
          <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100 text-xs">
            <button className="font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1 cursor-pointer">
              Open Generator <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <span className="text-slate-400 font-medium">12 active templates</span>
          </div>
        </div>

        {/* Card 2: URBANA Brand Hub */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between relative overflow-hidden group hover:border-teal-300 transition-all">
          <div>
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#0f766e] text-white flex items-center justify-center shadow-md shadow-teal-700/20">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-teal-50 text-teal-700 border border-teal-100">
                Verified
              </span>
            </div>
            <h3 className="text-sm font-bold text-slate-900 mt-4">URBANA Brand Hub</h3>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              Review Algerian Berber geometry assets, color tokens, typography scales, and regional streetwear guardrails.
            </p>
          </div>
          <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100 text-xs">
            <button className="font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1 cursor-pointer">
              Explore Guidelines <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <span className="text-slate-400 font-medium">v3.2 Brand Kit</span>
          </div>
        </div>

        {/* Card 3: Review Submissions */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between relative overflow-hidden group hover:border-rose-300 transition-all">
          <div>
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center border border-sky-200">
                <Inbox className="w-5 h-5" />
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-rose-50 text-rose-600 border border-rose-100">
                5 Pending
              </span>
            </div>
            <h3 className="text-sm font-bold text-slate-900 mt-4">Review Submissions</h3>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              Inspect 3D mockups, lookbook video reels, and billboard renders submitted by creative partner studios.
            </p>
          </div>
          <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100 text-xs">
            <button className="font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1 cursor-pointer">
              Open Approval Queue <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <span className="text-rose-600 font-semibold">2 Due today</span>
          </div>
        </div>
      </div>

      {/* 4. Campaign Performance & Pacing Section */}
      <div className="space-y-3 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#0284c7]" />
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Campaign Performance & Pacing
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Real-time expenditure, algorithmic reach, and audience acquisition across North African & European diaspora targets.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-1.5 shadow-2xs cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
              Filter: Live Drops
            </button>
            <button
              type="button"
              className="p-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 shadow-2xs cursor-pointer"
              title="Download Report"
            >
              <Download className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 2 Big Campaign Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Campaign 1: Casbah Pulse 2025 */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=120&h=120&q=80"
                    alt="Casbah Pulse"
                    className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-slate-900">Casbah Pulse 2025</h3>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-sky-50 text-sky-700 border border-sky-100">
                        Hero Drop
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Primary Channel: Instagram & TikTok Viral Seeding
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-cyan-50 text-cyan-700 border border-cyan-100 shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                  70% Paced
                </span>
              </div>

              {/* 3 Metrics Box */}
              <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-100 text-left">
                <div className="bg-slate-50/70 rounded-xl p-2.5">
                  <div className="text-[10px] font-medium text-slate-400">Budget Pacing</div>
                  <div className="text-sm font-black text-slate-900 mt-0.5">$4,200</div>
                  <div className="text-[10px] text-slate-500">of $6,000 max</div>
                </div>
                <div className="bg-slate-50/70 rounded-xl p-2.5">
                  <div className="text-[10px] font-medium text-slate-400">Total Impressions</div>
                  <div className="text-sm font-black text-slate-900 mt-0.5">182.4K</div>
                  <div className="text-[10px] font-semibold text-emerald-600">+18% vs benchmark</div>
                </div>
                <div className="bg-slate-50/70 rounded-xl p-2.5">
                  <div className="text-[10px] font-medium text-slate-400">Engagement Rate</div>
                  <div className="text-sm font-black text-slate-900 mt-0.5">4.82%</div>
                  <div className="text-[10px] font-semibold text-sky-600">Top 5% category</div>
                </div>
              </div>

              {/* Target Conversion Progress */}
              <div className="mt-4">
                <div className="flex items-center justify-between text-[11px] font-semibold">
                  <span className="text-slate-600">Target Conversion Progress</span>
                  <span className="text-[#0284c7]">1,420 / 2,000 Pre-Orders (71%)</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 mt-1.5 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-sky-400 to-[#0284c7]"
                    style={{ width: '71%' }}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] text-slate-400 mt-4 pt-3 border-t border-slate-100">
              <span>Launched Oct 12</span>
              <span>Ends Nov 05</span>
            </div>
          </div>

          {/* Campaign 2: Desert Techwear */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=120&h=120&q=80"
                    alt="Desert Techwear"
                    className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-slate-900">Desert Techwear</h3>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                        Capsule
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Channel: Lookbook App & Web Exclusive
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-medium text-slate-400">Hourly CTR Velocity (Last 24h)</div>
                  <div className="text-xs font-bold text-[#0284c7] mt-0.5">+34.2% AI Boost</div>
                </div>
              </div>

              {/* Sparkline Curve Area Chart */}
              <div className="mt-3 h-24 w-full relative">
                <svg className="w-full h-full" viewBox="0 0 400 90" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="cyanGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.45" />
                      <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  {/* Area fill */}
                  <path
                    d="M0,70 Q60,65 120,40 T240,45 T340,15 T400,22 L400,90 L0,90 Z"
                    fill="url(#cyanGradient)"
                  />
                  {/* Line stroke */}
                  <path
                    d="M0,70 Q60,65 120,40 T240,45 T340,15 T400,22"
                    fill="none"
                    stroke="#0284c7"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

            {/* Bottom 3 Metrics */}
            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100 text-left">
              <div>
                <div className="text-[10px] text-slate-400 font-medium">Budget Allocated</div>
                <div className="text-xs font-bold text-slate-800 mt-0.5">$2,800 / $3,500</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400 font-medium">Impressions</div>
                <div className="text-xs font-bold text-slate-800 mt-0.5">94.1K Reach</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400 font-medium">Click-Through</div>
                <div className="text-xs font-bold text-[#0284c7] mt-0.5">3.91%</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Two-Column Layout: Creative Review Queue & Publishing Milestones */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pt-2">
        {/* Left Column: Creative Review Queue (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-md bg-sky-50 text-sky-600 flex items-center justify-center">
                  <Inbox className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">Creative Review Queue</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-50 text-rose-600 border border-rose-100">
                  2 Action Required
                </span>
              </div>
              <button className="text-xs font-bold text-[#0284c7] hover:underline cursor-pointer">
                View all (5)
              </button>
            </div>

            {/* List of 3 Review Items */}
            <div className="divide-y divide-slate-100 mt-2">
              {/* Item 1 */}
              <div className="py-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative shrink-0">
                    <img
                      src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=100&h=100&q=80"
                      alt="Casbah Oversized Hoodie"
                      className="w-11 h-11 rounded-xl object-cover border border-slate-200"
                    />
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-rose-500 ring-2 ring-white" />
                  </div>
                  <div className="truncate">
                    <h4 className="text-xs font-bold text-slate-900 truncate">
                      Casbah Oversized Hoodie 3D Render
                    </h4>
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-0.5">
                      <span>Alex Rivera</span>
                      <span>•</span>
                      <span className="font-semibold text-slate-700">URBANA</span>
                      <span>•</span>
                      <span className="text-rose-600 font-semibold inline-flex items-center gap-0.5">
                        <Clock className="w-3 h-3" /> Due in 2 hrs
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() =>
                      setInspectModalTask({
                        id: 'item-1',
                        title: 'Casbah Oversized Hoodie 3D Render',
                        designer: 'Alex Rivera',
                        brand: 'URBANA',
                        due: 'Due in 2 hrs',
                        image:
                          'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&h=600&q=80',
                        type: '3D Render / Lookbook',
                        notes: 'Adjusted fabric tension on zipper seam per designer specs. Cinema4D octane render export.'
                      })
                    }
                    className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
                  >
                    Inspect
                  </button>
                  <button
                    type="button"
                    disabled={approvedItemIds.includes('item-1')}
                    onClick={() => handleApprove('item-1')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold text-white flex items-center gap-1 transition-all cursor-pointer ${
                      approvedItemIds.includes('item-1')
                        ? 'bg-emerald-600 opacity-90'
                        : 'bg-[#0284c7] hover:bg-[#0369a1]'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
                    {approvedItemIds.includes('item-1') ? 'Approved' : 'Approve'}
                  </button>
                </div>
              </div>

              {/* Item 2 */}
              <div className="py-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=100&h=100&q=80"
                    alt="Viral TikTok Hook"
                    className="w-11 h-11 rounded-xl object-cover border border-slate-200 shrink-0"
                  />
                  <div className="truncate">
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs font-bold text-slate-900 truncate">
                        Viral TikTok Hook Cut #3
                      </h4>
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-sky-50 text-sky-700 border border-sky-100">
                        Reel Edit
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-0.5">
                      <span>Maya Chen</span>
                      <span>•</span>
                      <span className="font-semibold text-slate-700">URBANA</span>
                      <span>•</span>
                      <span>Due today, 6 PM</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() =>
                      setInspectModalTask({
                        id: 'item-2',
                        title: 'Viral TikTok Hook Cut #3',
                        designer: 'Maya Chen',
                        brand: 'URBANA',
                        due: 'Due today, 6 PM',
                        image:
                          'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&h=600&q=80',
                        type: 'Reel Video 9:16',
                        notes: 'High energy 1.2s opening hook with localized Darija rap beat soundtrack.'
                      })
                    }
                    className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
                  >
                    Inspect
                  </button>
                  <button
                    type="button"
                    disabled={approvedItemIds.includes('item-2')}
                    onClick={() => handleApprove('item-2')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold text-white flex items-center gap-1 transition-all cursor-pointer ${
                      approvedItemIds.includes('item-2')
                        ? 'bg-emerald-600 opacity-90'
                        : 'bg-[#0284c7] hover:bg-[#0369a1]'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
                    {approvedItemIds.includes('item-2') ? 'Approved' : 'Approve'}
                  </button>
                </div>
              </div>

              {/* Item 3 */}
              <div className="py-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src="https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=100&h=100&q=80"
                    alt="Drop Announcement"
                    className="w-11 h-11 rounded-xl object-cover border border-slate-200 shrink-0"
                  />
                  <div className="truncate">
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs font-bold text-slate-900 truncate">
                        Drop Announcement Ban...
                      </h4>
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700">
                        Display Ads
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-0.5">
                      <span>Karim Belkacem</span>
                      <span>•</span>
                      <span className="font-semibold text-slate-700">URBANA</span>
                      <span>•</span>
                      <span>Due tomorrow, 11 AM</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() =>
                      setInspectModalTask({
                        id: 'item-3',
                        title: 'Drop Announcement Banner Set',
                        designer: 'Karim Belkacem',
                        brand: 'URBANA',
                        due: 'Due tomorrow, 11 AM',
                        image:
                          'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&h=600&q=80',
                        type: 'Display Ad Package',
                        notes: '300x250, 728x90, 160x600 banner sizes with high-contrast neon branding.'
                      })
                    }
                    className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
                  >
                    Inspect
                  </button>
                  <button
                    type="button"
                    disabled={approvedItemIds.includes('item-3')}
                    onClick={() => handleApprove('item-3')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold text-white flex items-center gap-1 transition-all cursor-pointer ${
                      approvedItemIds.includes('item-3')
                        ? 'bg-emerald-600 opacity-90'
                        : 'bg-[#0284c7] hover:bg-[#0369a1]'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
                    {approvedItemIds.includes('item-3') ? 'Approved' : 'Approve'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Publishing Milestones (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-md bg-teal-50 text-teal-600 flex items-center justify-center">
                  <Calendar className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">Publishing Milestones</h3>
              </div>
              <span className="text-xs text-slate-400 font-semibold">Week 43</span>
            </div>

            {/* Vertical Timeline */}
            <div className="mt-4 relative pl-5 space-y-4">
              <div className="absolute left-1.5 top-2 bottom-2 w-px bg-slate-200" />

              {/* Milestone 1 */}
              <div className="relative">
                <span className="absolute -left-5 top-1 w-2.5 h-2.5 rounded-full bg-[#0284c7] ring-4 ring-white" />
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#0284c7]">TODAY • 4:00 PM</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-sky-50 text-sky-700 border border-sky-100">
                    IG Video Reel
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 mt-1">
                  Casbah Pulse: Hero Look Teaser
                </h4>
                <p className="text-[11px] text-slate-500 leading-relaxed mt-0.5">
                  Automated distribution to Instagram & Facebook with geo-targeting for Paris, Marseille, and Algiers.
                </p>
              </div>

              {/* Milestone 2 */}
              <div className="relative">
                <span className="absolute -left-5 top-1 w-2.5 h-2.5 rounded-full bg-cyan-500 ring-4 ring-white" />
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-cyan-700">TOMORROW • 10:30 AM</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-700">
                    A/B TikTok Test
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 mt-1">
                  Sahara Windbreaker Audio Hook
                </h4>
                <p className="text-[11px] text-slate-500 leading-relaxed mt-0.5">
                  Testing dynamic AI-generated Darija voiceover against ambient electronic instrumental track.
                </p>
              </div>

              {/* Milestone 3 */}
              <div className="relative">
                <span className="absolute -left-5 top-1 w-2.5 h-2.5 rounded-full bg-slate-300 ring-4 ring-white" />
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-600">IN 3 DAYS</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-700">
                    Newsletter
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 mt-1">
                  VIP Early-Access Email Blast
                </h4>
                <p className="text-[11px] text-slate-500 leading-relaxed mt-0.5">
                  Exclusive preview link dispatched to 14,200 tier-1 loyalty members.
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="w-full mt-4 py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-xs font-bold text-slate-700 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            View Full Editorial Calendar
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>
      </div>

      {/* 6. Live Team Activity & AI Log */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-sky-600" />
            <h3 className="text-sm font-bold text-slate-900">Live Team Activity & AI Log</h3>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-sky-700">
            <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
            <span>SYNCING REALTIME</span>
          </div>
        </div>

        {/* 4 Activity Rows */}
        <div className="divide-y divide-slate-100">
          {/* Row 1 */}
          <div className="py-3.5 flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-slate-800 leading-relaxed">
                  <span className="font-bold text-[#0284c7]">MarkAi Copilot</span> generated 16 bilingual caption variations for <span className="font-semibold">"Casbah Pulse Lookbook"</span>
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Prompt template: Urban Streetwear / High Engagement Darija
                </p>
              </div>
            </div>
            <span className="text-[11px] text-slate-400 font-medium shrink-0">4 mins ago</span>
          </div>

          {/* Row 2 */}
          <div className="py-3.5 flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0 mt-0.5">
                <CloudUpload className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-slate-800 leading-relaxed">
                  <span className="font-bold text-slate-900">Maya Chen</span> uploaded 4 revisions for <span className="font-semibold">"TikTok Hook Cut #3"</span> (1080×1920)
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Tagged brand: URBANA • Fall/Winter 2025
                </p>
              </div>
            </div>
            <span className="text-[11px] text-slate-400 font-medium shrink-0">28 mins ago</span>
          </div>

          {/* Row 3 */}
          <div className="py-3.5 flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-slate-800 leading-relaxed">
                  <span className="font-bold text-slate-900">Sarah Jenkins</span> approved <span className="font-semibold">"Desert Techwear Macro Fabric Zoom"</span> hero banner
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Sent to production pipeline • Ready for ad ops
                </p>
              </div>
            </div>
            <span className="text-[11px] text-slate-400 font-medium shrink-0">1 hour ago</span>
          </div>

          {/* Row 4 */}
          <div className="py-3.5 flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 mt-0.5">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-slate-800 leading-relaxed">
                  <span className="font-bold text-slate-900">Alex Rivera</span> left feedback on <span className="font-semibold">"Casbah Oversized Hoodie 3D Render"</span>
                </p>
                <p className="text-[11px] text-slate-500 italic mt-0.5">
                  "Adjusted fabric tension on zipper seam per designer specs"
                </p>
              </div>
            </div>
            <span className="text-[11px] text-slate-400 font-medium shrink-0">2 hours ago</span>
          </div>
        </div>
      </div>

      {/* Inspect Modal */}
      {inspectModalTask && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-slate-900">{inspectModalTask.title}</h3>
                <p className="text-xs text-slate-500">
                  By {inspectModalTask.designer} • {inspectModalTask.brand}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setInspectModalTask(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-4 space-y-3">
              <img
                src={inspectModalTask.image}
                alt={inspectModalTask.title}
                className="w-full h-56 object-cover rounded-xl border border-slate-200"
              />

              <div className="bg-slate-50 rounded-xl p-3 text-xs space-y-1">
                <div className="font-semibold text-slate-700">Designer Submission Notes:</div>
                <div className="text-slate-600">{inspectModalTask.notes}</div>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setInspectModalTask(null)}
                className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  handleApprove(inspectModalTask.id);
                  setInspectModalTask(null);
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#0284c7] hover:bg-[#0369a1] flex items-center gap-1.5 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                Approve Deliverable
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};