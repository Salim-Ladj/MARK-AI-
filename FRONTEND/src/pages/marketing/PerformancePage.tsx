import React, { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { api } from '../../services/api';
import {
  TrendingUp,
  Download,
  Calendar,
  Sparkles,
  ChevronDown,
  Info,
  Clock,
  Eye,
  Sliders,
  ArrowUpRight,
  Filter
} from 'lucide-react';

export const PerformancePage: React.FC = () => {
  const { navigateTo, showToast } = useApp();
  const [dateRange] = useState('Oct 18 - Nov 17, 2025 (30D)');
  const [metrics, setMetrics] = useState({
    reach: 842600,
    impressions: 2140000,
    engagementRate: 5.82,
    linkClicks: 48900,
    attributedOrders: 1420,
  });
  const [pulseSummary, setPulseSummary] = useState('Deep learning visual analysis scanned 42 creative variations across Meta & TikTok against real-time conversion velocities for Casbah Pulse.');

  useEffect(() => {
    if (!localStorage.getItem('markai_token')) return;
    api.performance.get()
      .then(({ data }) => setMetrics(data))
      .catch(() => undefined);
  }, []);

  const generatePulseFindings = async () => {
    try {
      const response = await api.ai.generate({
        purpose: 'performance_pulse',
        campaign: 'Casbah Pulse',
        metrics,
      });
      if (typeof response === 'object' && response !== null && 'summary' in response) {
        setPulseSummary(String(response.summary));
      }
      showToast('AI performance pulse refreshed.', 'success');
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'AI performance analysis unavailable.', 'error');
    }
  };

  return (
    <div className="space-y-6 pb-12 font-sans antialiased text-slate-800">
      {/* 1. Simulated Demo Banner */}
      <div className="bg-[#f0f9ff]/90 border border-sky-200/90 rounded-2xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-2xs">
        <div className="flex items-center gap-2 text-xs text-slate-700">
          <Info className="w-4 h-4 text-sky-600 shrink-0" />
          <span>
            <strong className="font-bold text-slate-900">Simulated Demo Environment:</strong> Attributed data synchronized with Shopify DTC & Meta Graph API v20.2 sandbox. Live ingestion active.
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-bold text-sky-700 shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
          <span>FEED: SYNCED 4M AGO</span>
        </div>
      </div>

      {/* 2. Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="text-[11px] font-bold text-sky-600 tracking-wider uppercase mb-1">
            MARKETING TEAM EXCLUSIVE • Telemetry v3.1
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Performance Analytics
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 shadow-2xs flex items-center gap-1.5 cursor-pointer">
            <span className="text-slate-400">Brand:</span>
            <span className="font-bold text-slate-900">URBANA</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </div>

          <div className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 shadow-2xs flex items-center gap-1.5 cursor-pointer">
            <span className="text-slate-400">Campaign:</span>
            <span className="font-bold text-slate-900">Casbah Pulse</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </div>

          <div className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 shadow-2xs flex items-center gap-1.5 cursor-pointer">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-bold text-slate-900">{dateRange}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </div>

          <button
            type="button"
            onClick={() => showToast('Exported Performance Analytics CSV!', 'success')}
            className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 shadow-2xs flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            Export CSV
          </button>
        </div>
      </div>

      {/* 3. Top 5 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">TOTAL REACH</span>
            <div className="w-6 h-6 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
              <TrendingUp className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-xl font-black text-slate-900">{(metrics.reach / 1000).toFixed(1)}K</div>
            <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">↗ +24.8% vs prev 30d</div>
            <div className="h-6 w-full mt-2">
              <svg className="w-full h-full" viewBox="0 0 100 24" preserveAspectRatio="none">
                <path d="M0,20 Q25,18 50,10 T100,4" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">IMPRESSIONS</span>
            <div className="w-6 h-6 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <Eye className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-xl font-black text-slate-900">{(metrics.impressions / 1000000).toFixed(2)}M</div>
            <div className="text-[10px] text-purple-600 font-semibold mt-0.5">↗ +18.2% frequency 2.54</div>
            <div className="h-6 w-full mt-2">
              <svg className="w-full h-full" viewBox="0 0 100 24" preserveAspectRatio="none">
                <path d="M0,22 Q30,12 60,14 T100,5" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">ENGAGEMENT RATE</span>
            <div className="w-6 h-6 rounded-lg bg-cyan-50 text-cyan-600 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-xl font-black text-slate-900">{metrics.engagementRate.toFixed(2)}%</div>
            <div className="text-[10px] text-cyan-700 font-semibold mt-0.5">↑ +1.4% above bench</div>
            <div className="h-6 w-full mt-2">
              <svg className="w-full h-full" viewBox="0 0 100 24" preserveAspectRatio="none">
                <path d="M0,18 Q40,20 70,8 T100,6" fill="none" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">LINK CLICKS</span>
            <div className="w-6 h-6 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-xl font-black text-slate-900">{(metrics.linkClicks / 1000).toFixed(1)}K</div>
            <div className="text-[10px] text-sky-600 font-semibold mt-0.5">CTR 2.28% • CPC $0.41</div>
            <div className="h-6 w-full mt-2">
              <svg className="w-full h-full" viewBox="0 0 100 24" preserveAspectRatio="none">
                <path d="M0,19 Q30,16 65,9 T100,4" fill="none" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">DTC ATTRIBUTED</span>
            <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded">ROAS 3.82x</span>
          </div>
          <div className="mt-2">
            <div className="text-xl font-black text-slate-900">{metrics.attributedOrders.toLocaleString()}</div>
            <div className="text-[11px] font-bold text-sky-600">$89.2K <span className="text-slate-400 font-normal">Attributed GMV</span></div>
            <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2 font-medium">
              <span>Target: 1,200</span>
              <span className="text-emerald-600 font-bold">118% reached</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Automated Pulse Findings Banner */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-sky-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-purple-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-black text-slate-900">
                MarkAi Automated Pulse Findings
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-50 text-sky-700 border border-sky-100">
                2 High-Impact Signals
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1 max-w-xl leading-relaxed">
              {pulseSummary}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={generatePulseFindings}
            className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
          >
            Configure Parameters
          </button>
          <button
            type="button"
            onClick={() => navigateTo('/marketing/ai-studio')}
            className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-sky-600 hover:opacity-95 shadow-md shadow-purple-500/20 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Auto-Generate Follow-up Campaign in AI Studio
          </button>
        </div>
      </div>

      {/* 5. Two Insight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs flex items-start gap-3.5">
          <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-xs font-bold text-slate-900">Creative Texture Bias</h4>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-50 text-sky-700 border border-sky-100">
                3.1x Multiplier
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              TikTok 9:16 reels showcasing macro Berber embroidery drove <strong className="text-slate-800">3.1x higher watch-through rate</strong> than polished studio lookbook stills, reducing blended CAC from $34.20 to $11.08.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs flex items-start gap-3.5">
          <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 mt-0.5">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-xs font-bold text-slate-900">Geo-Temporal Window</h4>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-100">
                Peak Window Identified
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Optimal drop timing for Algiers & Paris diaspora audience identified as <strong className="text-slate-800">Fridays 18:00 – 21:00 CET</strong>. Pushing 40% of scheduled ad inventory to this bracket yielded 64% conversion density.
            </p>
          </div>
        </div>
      </div>

      {/* 6. Velocity Trend Chart & Platform Attribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Campaign Performance & Velocity Trend
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Multi-line progression: Reach exposure vs Attributed Orders
                </p>
              </div>

              <div className="flex items-center gap-3 text-xs font-semibold">
                <span className="flex items-center gap-1.5 text-cyan-600">
                  <span className="w-2.5 h-0.5 bg-cyan-500 rounded" /> Daily Reach (k)
                </span>
                <span className="flex items-center gap-1.5 text-[#0284c7]">
                  <span className="w-2.5 h-0.5 bg-[#0284c7] rounded" /> Orders Placed
                </span>
              </div>
            </div>

            <div className="mt-6 h-56 w-full relative">
              <div className="absolute top-6 left-[62%] -translate-x-1/2 bg-slate-900 text-white rounded-xl p-2 px-3 text-[10px] shadow-lg border border-slate-800 z-10 text-center">
                <div className="font-bold text-cyan-400">Launch Peak (Nov 12)</div>
                <div className="text-slate-300">Reach: 48.2K | Orders: 114</div>
              </div>

              <svg className="w-full h-full" viewBox="0 0 500 180" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <line x1="0" y1="30" x2="500" y2="30" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="0" y1="80" x2="500" y2="80" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="0" y1="130" x2="500" y2="130" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />

                <path
                  d="M0,150 Q100,140 180,120 T330,50 T430,90 T500,70 L500,180 L0,180 Z"
                  fill="url(#chartGrad)"
                />

                <path
                  d="M0,150 Q100,140 180,120 T330,50 T430,90 T500,70"
                  fill="none"
                  stroke="#06b6d4"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                <path
                  d="M0,165 Q100,155 180,135 T330,65 T430,105 T500,85"
                  fill="none"
                  stroke="#0284c7"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                <circle cx="330" cy="50" r="4" fill="#06b6d4" stroke="#ffffff" strokeWidth="2" />
                <circle cx="330" cy="65" r="4" fill="#0284c7" stroke="#ffffff" strokeWidth="2" />
              </svg>
            </div>

            <div className="flex items-center justify-between text-[10px] text-slate-400 font-semibold pt-2 border-t border-slate-100">
              <span>Oct 18</span>
              <span>Oct 24</span>
              <span>Oct 31</span>
              <span>Nov 07</span>
              <span className="font-bold text-[#0284c7]">Nov 12 (Drop)</span>
              <span>Nov 17</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Platform Attribution</h3>
                <p className="text-xs text-slate-400 mt-0.5">Share of total attributed DTC revenue</p>
              </div>
              <span className="p-1 rounded-lg text-purple-600 bg-purple-50">
                <Sliders className="w-3.5 h-3.5" />
              </span>
            </div>

            <div className="relative w-40 h-40 mx-auto my-4 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f1f5f9" strokeWidth="12" />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="#0284c7"
                  strokeWidth="12"
                  strokeDasharray="251.2"
                  strokeDashoffset="120.5"
                  strokeLinecap="round"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="#06b6d4"
                  strokeWidth="12"
                  strokeDasharray="251.2"
                  strokeDashoffset="165.7"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">
                  TOTAL ATTRIBUTED
                </span>
                <span className="text-base font-black text-slate-900 mt-0.5">$89.2K</span>
              </div>
            </div>

            <div className="space-y-2 text-xs pt-2">
              <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0284c7]" />
                  <span className="font-semibold text-slate-700">Instagram Reels & Stories</span>
                </div>
                <div className="font-bold text-slate-900">
                  $46.4K <span className="text-slate-400 font-normal">52%</span>
                </div>
              </div>

              <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
                  <span className="font-semibold text-slate-700">TikTok Organic + Spark Ads</span>
                </div>
                <div className="font-bold text-slate-900">
                  $30.3K <span className="text-slate-400 font-normal">34%</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-400" />
                  <span className="font-semibold text-slate-700">Meta Ad Sets (Feed Carousel)</span>
                </div>
                <div className="font-bold text-slate-900">
                  $12.5K <span className="text-slate-400 font-normal">14%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 7. Bottom Table: Top Performing Creative Assets */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-900">Top Performing Creative Assets</h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-50 text-sky-700 border border-sky-100">
                Casbah Pulse Launch
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Real-time engagement velocity, spend allocation, and attributed return
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              Filter Status
            </button>
            <button
              type="button"
              className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              Sort: Engagement (High)
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                <th className="pb-2.5 font-bold">ASSET DETAILS</th>
                <th className="pb-2.5 font-bold">CREATIVE LEAD</th>
                <th className="pb-2.5 font-bold">CHANNEL</th>
                <th className="pb-2.5 font-bold">SPEND</th>
                <th className="pb-2.5 font-bold">IMPRESSIONS</th>
                <th className="pb-2.5 font-bold">ENGAGEMENT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="py-3">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=100&h=100&q=80"
                      alt="Casbah Macro Stitch"
                      className="w-10 h-10 rounded-xl object-cover"
                    />
                    <div>
                      <div className="font-bold text-slate-900">Casbah_Macro_Stitch_9x16.mp4</div>
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mt-0.5">
                        <span className="px-1.5 py-0.2 rounded bg-sky-50 text-sky-700 font-semibold">
                          UGC-Style
                        </span>
                        <span>4K Reel • 15s</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-3">
                  <div className="flex items-center gap-1.5 font-semibold text-slate-700">
                    <span className="w-5 h-5 rounded-full bg-cyan-100 text-cyan-800 text-[9px] font-bold flex items-center justify-center">
                      AR
                    </span>
                    <span>Alex Rivera</span>
                  </div>
                </td>
                <td className="py-3">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-50 text-cyan-700 border border-cyan-100">
                    TikTok Spark
                  </span>
                </td>
                <td className="py-3 font-bold text-slate-900">$4,280.00</td>
                <td className="py-3 font-semibold text-slate-700">648,120</td>
                <td className="py-3">
                  <div className="font-black text-emerald-600">8.42%</div>
                  <div className="text-[9px] text-slate-400">3.1x top benchmark</div>
                </td>
              </tr>

              <tr>
                <td className="py-3">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=100&h=100&q=80"
                      alt="Terrace GoldenHour Carousel"
                      className="w-10 h-10 rounded-xl object-cover"
                    />
                    <div>
                      <div className="font-bold text-slate-900">Terrace_GoldenHour_Carousel.set</div>
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mt-0.5">
                        <span className="px-1.5 py-0.2 rounded bg-sky-50 text-sky-700 font-semibold">
                          Lookbook
                        </span>
                        <span>4 Slides • 4:5</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-3">
                  <div className="flex items-center gap-1.5 font-semibold text-slate-700">
                    <span className="w-5 h-5 rounded-full bg-sky-100 text-sky-800 text-[9px] font-bold flex items-center justify-center">
                      MC
                    </span>
                    <span>Maya Chen</span>
                  </div>
                </td>
                <td className="py-3">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-50 text-sky-700 border border-sky-100">
                    Instagram Carousel
                  </span>
                </td>
                <td className="py-3 font-bold text-slate-900">$6,140.00</td>
                <td className="py-3 font-semibold text-slate-700">792,400</td>
                <td className="py-3">
                  <div className="font-black text-emerald-600">6.18%</div>
                  <div className="text-[9px] text-slate-400">High Saves: 12.4K</div>
                </td>
              </tr>

              <tr>
                <td className="py-3">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=100&h=100&q=80"
                      alt="Geometric Arch Teaser"
                      className="w-10 h-10 rounded-xl object-cover"
                    />
                    <div>
                      <div className="font-bold text-slate-900">Geometric_Arch_Teaser_Static.jpg</div>
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mt-0.5">
                        <span className="px-1.5 py-0.2 rounded bg-purple-50 text-purple-700 font-semibold">
                          Static Hero
                        </span>
                        <span>Retargeting • 1:1</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-3">
                  <div className="flex items-center gap-1.5 font-semibold text-slate-700">
                    <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-800 text-[9px] font-bold flex items-center justify-center">
                      SJ
                    </span>
                    <span>Sarah Jenkins</span>
                  </div>
                </td>
                <td className="py-3">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-100">
                    Meta Dynamic
                  </span>
                </td>
                <td className="py-3 font-bold text-slate-900">$2,890.00</td>
                <td className="py-3 font-semibold text-slate-700">315,600</td>
                <td className="py-3">
                  <div className="font-black text-slate-900">4.22%</div>
                  <div className="text-[9px] text-purple-600 font-semibold">ROAS 4.10x</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100">
          <span>Showing 3 of 42 creative assets attributed to Casbah Pulse</span>
          <div className="flex items-center gap-2">
            <button className="px-2.5 py-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 cursor-pointer">
              Previous
            </button>
            <span className="font-bold text-slate-800">1 of 14</span>
            <button className="px-2.5 py-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 cursor-pointer">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};