import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  Download,
  Search,
  LayoutGrid,
  List,
  CreditCard,
  TrendingUp,
  Zap,
  CheckCircle2,
  Building2,
  Sliders,
  Instagram
} from 'lucide-react';

export const CampaignsPage: React.FC = () => {
  const { selectedBrand, navigateTo, showToast } = useApp();

  const [activeTab, setActiveTab] = useState<'All' | 'Active' | 'In Review' | 'Draft' | 'Completed'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  return (
    <div className="space-y-6 pb-12 font-sans antialiased text-slate-800">
      {/* 1. Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <div className="text-[11px] font-bold text-sky-600 tracking-wider uppercase flex items-center gap-1.5 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AUTONOMOUS GROWTH ENGINES / ACTIVE EXECUTION</span>
          </div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Campaign Management
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-sky-50 text-sky-600 border border-sky-100">
              4 Active
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => showToast('Exporting campaign management executive summary...', 'success')}
          className="px-3.5 py-2 rounded-xl bg-white border border-slate-200/90 hover:bg-slate-50 text-xs font-semibold text-slate-700 shadow-2xs flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <Download className="w-3.5 h-3.5 text-slate-500" />
          Export Summary
        </button>
      </div>

      {/* 2. Filter & Tabs Bar */}
      <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-2.5 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <div className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-800 flex items-center gap-2 shadow-2xs">
            <Building2 className="w-3.5 h-3.5 text-sky-600" />
            <span>BRAND: {selectedBrand?.name || 'URBANA'}</span>
          </div>

          <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200/80 shadow-2xs">
            {(['All (8)', 'Active (4)', 'In Review (2)', 'Draft (1)', 'Completed (1)'] as const).map((tab) => {
              const key = tab.split(' ')[0] as any;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(key)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeTab === key
                      ? 'bg-[#0284c7] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by title, tag, target..."
              className="pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-sky-500 transition-all shadow-2xs w-48 sm:w-56"
            />
          </div>

          <div className="flex items-center bg-white p-1 rounded-xl border border-slate-200/80 shadow-2xs">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'grid' ? 'bg-sky-50 text-sky-600' : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'list' ? 'bg-sky-50 text-sky-600' : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Four Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              TOTAL ACTIVE BUDGET
            </span>
            <div className="w-7 h-7 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
              <CreditCard className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900 tracking-tight">
              $24,500 <span className="text-xs font-semibold text-slate-400">/ month</span>
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-xs font-medium text-slate-500">
              <TrendingUp className="w-3.5 h-3.5 text-sky-600" />
              <span>$12,480 spent across 4 active runs</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              PROJECTED ROAS
            </span>
            <div className="w-7 h-7 rounded-lg bg-cyan-50 text-cyan-600 flex items-center justify-center">
              <TrendingUp className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900 tracking-tight">
              3.82<span className="text-sky-600">x</span>
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-emerald-600">
              <span>+0.4x above category baseline</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              AI ASSET THROUGHPUT
            </span>
            <div className="w-7 h-7 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
              <Zap className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900 tracking-tight">26 Assets</div>
            <div className="flex items-center gap-1.5 mt-2 text-xs font-medium text-slate-500">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
              <span>19 finalized, 5 under review</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              AVG BRAND FIDELITY
            </span>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900 tracking-tight">98.4%</div>
            <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-emerald-600">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Zero palette violations</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Large Featured Active Campaign Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          <div className="lg:col-span-5 relative min-h-[300px] bg-slate-900 overflow-hidden flex flex-col justify-between p-6">
            <img
              src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&h=600&q=80"
              alt="Casbah Pulse Winter Drop"
              className="absolute inset-0 w-full h-full object-cover opacity-85"
            />
            <div className="relative z-10 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-slate-900/80 backdrop-blur-md text-white border border-white/20">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                ACTIVE • 12 DAYS LEFT
              </span>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#0284c7] text-white">
                URBANA CORE
              </span>
            </div>

            <div className="relative z-10 mt-auto pt-16">
              <div className="text-[10px] font-bold text-sky-300 uppercase tracking-widest">
                WINTER 2024 COLLECTION DROP
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1">
                Casbah Pulse Winter Drop
              </h2>
              <p className="text-xs text-white/80 mt-1 leading-relaxed line-clamp-2">
                Algerian urban diaspora & local streetwear enthusiasts (18–30) across Paris, Algiers, London, and Montreal.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 p-6 flex flex-col justify-between space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-sky-50/50 rounded-2xl p-4 border border-sky-100">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  MARKETING OBJECTIVE
                </div>
                <div className="flex items-center gap-1.5 font-black text-slate-900 text-sm mt-1.5">
                  <Zap className="w-4 h-4 text-sky-600" />
                  <span>Awareness & DTC Sales</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Multi-touch attribution with Shopify direct sync
                </p>
              </div>

              <div className="bg-sky-50/50 rounded-2xl p-4 border border-sky-100">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  ACTIVE AD CHANNELS
                </div>
                <div className="flex items-center gap-2.5 mt-1.5 text-xs font-bold text-slate-800">
                  <span className="inline-flex items-center gap-1 text-sky-600">
                    <Instagram className="w-3.5 h-3.5" /> Instagram
                  </span>
                  <span>•</span>
                  <span>TikTok</span>
                  <span>•</span>
                  <span className="text-slate-500 font-semibold">Meta Ads</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  100% vertical short-form dynamic creative
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-100">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700">Budget Utilization</span>
                  <span className="font-black text-[#0284c7]">70% spent</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2 mt-2 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-sky-400 to-[#0284c7]" style={{ width: '70%' }} />
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2 font-medium">
                  <span>$3,500 consumed</span>
                  <span className="font-semibold text-slate-800">$5,000 Total Allocation</span>
                </div>
              </div>

              <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-100">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700">Linked Creative Tasks</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-100 text-sky-700">
                    8 Total Assets
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-2 text-center">
                  <div className="bg-white rounded-xl p-1.5 border border-slate-200/80">
                    <div className="text-sm font-black text-slate-900">5</div>
                    <div className="text-[9px] text-slate-400 font-medium">Completed</div>
                  </div>
                  <div className="bg-white rounded-xl p-1.5 border border-slate-200/80">
                    <div className="text-sm font-black text-amber-600">2</div>
                    <div className="text-[9px] text-slate-400 font-medium">In Review</div>
                  </div>
                  <div className="bg-white rounded-xl p-1.5 border border-slate-200/80">
                    <div className="text-sm font-black text-sky-600">1</div>
                    <div className="text-[9px] text-slate-400 font-medium">Studio Live</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-100">
              <div className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
                <span>ACTIVE ENGINE:</span>
                <span className="font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md border border-sky-100">
                  MarkAi Generative Agent v4
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => navigateTo('/marketing/performance')}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
                >
                  Deep Metrics
                </button>
                <button
                  type="button"
                  onClick={() => navigateTo('/marketing/assets')}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
                >
                  View Assets (8)
                </button>
                <button
                  type="button"
                  onClick={() => navigateTo('/marketing/ai-studio')}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-[#0284c7] hover:bg-[#0369a1] flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Open AI Studio
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Sub-campaign Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=120&h=120&q=80"
                  alt="Desert Techwear"
                  className="w-12 h-12 rounded-2xl object-cover border border-slate-200 shrink-0"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-50 text-cyan-700 border border-cyan-100">
                      Concept Phase
                    </span>
                    <span className="text-xs font-bold text-slate-500">URBANA</span>
                  </div>
                  <h3 className="text-sm font-black text-slate-900 mt-0.5">
                    Desert Techwear Capsule
                  </h3>
                </div>
              </div>
              <span className="text-slate-400 hover:text-slate-700 cursor-pointer">•••</span>
            </div>

            <p className="text-xs text-slate-500 mt-3 leading-relaxed">
              High-performance modular technical garments designed for extreme thermal shifts. Targeted at active urban commuters and modern...
            </p>

            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="bg-slate-50 rounded-2xl p-3">
                <div className="text-[10px] font-bold text-slate-400 uppercase">TARGET BUDGET</div>
                <div className="text-base font-black text-slate-900 mt-0.5">$8,000</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Allocation unspent</div>
              </div>
              <div className="bg-slate-50 rounded-2xl p-3">
                <div className="text-[10px] font-bold text-slate-400 uppercase">PLANNED RUNWAY</div>
                <div className="text-base font-black text-slate-900 mt-0.5">Jan 10 – Feb 28</div>
                <div className="text-[10px] text-slate-500 mt-0.5">49 Days planned</div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100 text-xs">
            <span className="text-slate-500 font-medium">14 Prompts Prepared</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => showToast('Opening Desert Techwear brief preview')}
                className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 font-semibold text-slate-700 cursor-pointer"
              >
                Review Brief
              </button>
              <button
                type="button"
                onClick={() => navigateTo('/marketing/ai-studio')}
                className="px-3 py-1.5 rounded-xl font-bold text-white bg-[#0284c7] hover:bg-[#0369a1] flex items-center gap-1 cursor-pointer"
              >
                <Sparkles className="w-3 h-3" />
                Generate Assets
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=120&h=120&q=80"
                  alt="Ramadan Nights"
                  className="w-12 h-12 rounded-2xl object-cover border border-slate-200 shrink-0"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600">
                      Draft
                    </span>
                    <span className="text-xs font-bold text-slate-500">URBANA Atelier</span>
                  </div>
                  <h3 className="text-sm font-black text-slate-900 mt-0.5">
                    Ramadan Nights Pre-Collection
                  </h3>
                </div>
              </div>
              <span className="text-slate-400 hover:text-slate-700 cursor-pointer">•••</span>
            </div>

            <p className="text-xs text-slate-500 mt-3 leading-relaxed">
              Modern festive leisure-wear with intricate heritage stitching. Focus on VIP early-access invites and community pop-up lounges.
            </p>

            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="bg-slate-50 rounded-2xl p-3">
                <div className="text-[10px] font-bold text-slate-400 uppercase">EST. BUDGET</div>
                <div className="text-base font-black text-slate-900 mt-0.5">$12,000</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Pending Approval</div>
              </div>
              <div className="bg-slate-50 rounded-2xl p-3">
                <div className="text-[10px] font-bold text-slate-400 uppercase">TARGET HORIZON</div>
                <div className="text-base font-black text-slate-900 mt-0.5">Mar 01 – Apr 15</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Q1 Seasonal</div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100 text-xs">
            <span className="text-slate-400 font-medium">Strategy incomplete</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => showToast('Blueprint editor opened')}
                className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 font-semibold text-slate-700 cursor-pointer"
              >
                Edit Blueprint
              </button>
              <button
                type="button"
                onClick={() => navigateTo('/marketing/ai-studio')}
                className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 font-bold text-slate-700 flex items-center gap-1 cursor-pointer"
              >
                <Sliders className="w-3 h-3 text-slate-500" />
                Configure AI
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};