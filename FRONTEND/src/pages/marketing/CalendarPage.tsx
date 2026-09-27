import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { api } from '../../services/api';
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  ChevronDown,
  TrendingUp,
  Cpu,
  Check,
  X,
  Sparkles
} from 'lucide-react';

export const CalendarPage: React.FC = () => {
  const { selectedBrand, campaigns, showToast, addCalendarItem } = useApp();

  const [currentMonth] = useState('November 2025');
  const [viewMode, setViewMode] = useState<'Monthly' | 'Weekly' | 'List View'>('Monthly');
  const [channelFilter, setChannelFilter] = useState<'All' | 'Instagram' | 'TikTok' | 'Newsletter'>('All');
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [scheduleTitle, setScheduleTitle] = useState('Casbah Pulse Limited Pre-Order Drop');
  const [schedulePlatform, setSchedulePlatform] = useState('Instagram');
  const [scheduleFormat, setScheduleFormat] = useState('Carousel (4:5)');
  const [scheduleDate, setScheduleDate] = useState('2026-11-18');
  const [scheduleTime, setScheduleTime] = useState('16:00');

  const handleScheduleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let caption = `Discover ${scheduleTitle} from ${selectedBrand?.name || 'URBANA'} on ${schedulePlatform}.`;

    try {
      const generated = await api.ai.generate({
        purpose: 'calendar_caption',
        brand: selectedBrand?.name || 'URBANA',
        campaign: campaigns[0]?.name || 'Casbah Pulse Winter Drop',
        title: scheduleTitle,
        platform: schedulePlatform,
        format: scheduleFormat,
      });
      if (typeof generated === 'object' && generated !== null && 'caption' in generated) {
        caption = String(generated.caption);
      }
    } catch {
      showToast('AI caption service unavailable; using a standard caption.', 'info');
    }

    addCalendarItem({
      title: scheduleTitle,
      brandId: selectedBrand?.id || 'brand-urbana',
      brandName: selectedBrand?.name || 'URBANA',
      campaignId: campaigns[0]?.id || 'camp-kasbah-fall',
      campaignName: campaigns[0]?.name || 'Casbah Pulse Winter Drop',
      platform: schedulePlatform,
      format: scheduleFormat,
      scheduledDate: scheduleDate,
      scheduledTime: scheduleTime,
      caption,
      hashtags: '#URBANA #CasbahDrop',
      status: 'scheduled',
      creator: 'Sarah Jenkins',
    });
    setIsScheduleOpen(false);
    showToast('Scheduled to Content Calendar successfully!', 'success');
  };

  const handleAddStagedItem = (title: string, format: string, platform: any) => {
    addCalendarItem({
      title,
      brandId: selectedBrand?.id || 'brand-urbana',
      brandName: selectedBrand?.name || 'URBANA',
      campaignId: campaigns[0]?.id || 'camp-kasbah-fall',
      campaignName: campaigns[0]?.name || 'Casbah Pulse Winter Drop',
      platform,
      format,
      scheduledDate: '2026-11-20',
      scheduledTime: '18:00',
      caption: `Fresh drop collateral for ${title}`,
      hashtags: '#URBANA #CasbahDrop',
      status: 'scheduled',
      creator: 'Elena R.',
      approvedBy: 'Sarah Jenkins',
      mediaUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80'
    });
    showToast(`Added "${title}" directly to calendar!`, 'success');
  };

  return (
    <div className="space-y-6 pb-12 font-sans antialiased text-slate-800">
      {/* 1. Month Navigator & Top Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-white border border-slate-200/90 rounded-2xl p-1.5 shadow-2xs">
            <button type="button" className="p-1 rounded-lg text-slate-500 hover:text-slate-800 cursor-pointer">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm font-black text-slate-900 px-2 tracking-tight">
              {currentMonth}
            </span>
            <button type="button" className="p-1 rounded-lg text-slate-500 hover:text-slate-800 cursor-pointer">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <button
            type="button"
            className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 shadow-2xs cursor-pointer"
          >
            Today
          </button>

          <div className="hidden md:flex items-center gap-2 pl-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              SYNC STATE
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-50 text-cyan-700 border border-cyan-100">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
              Live Engine 4.1
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center bg-white p-1 rounded-xl border border-slate-200/90 shadow-2xs">
            {(['Monthly', 'Weekly', 'List View'] as const).map((view) => (
              <button
                key={view}
                type="button"
                onClick={() => setViewMode(view)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewMode === view
                    ? 'bg-[#0284c7] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {view}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setIsScheduleOpen(true)}
            className="px-4 py-2 rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-bold shadow-sm shadow-sky-600/25 flex items-center gap-1.5 transition-all cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            Schedule Content
          </button>
        </div>
      </div>

      {/* 2. Filter Sub-Bar */}
      <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-3 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <div className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800 shadow-2xs flex items-center gap-1.5 cursor-pointer">
            <Check className="w-3.5 h-3.5 text-sky-600" />
            <span>URBANA Brand</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </div>

          <div className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800 shadow-2xs flex items-center gap-1.5 cursor-pointer">
            <span className="text-slate-400">⚡</span>
            <span>Casbah Pulse</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </div>

          <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 shadow-2xs">
            {(['All', 'Instagram', 'TikTok', 'Newsletter'] as const).map((ch) => (
              <button
                key={ch}
                type="button"
                onClick={() => setChannelFilter(ch)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  channelFilter === ch
                    ? 'bg-[#0284c7] text-white'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {ch}
              </button>
            ))}
          </div>

          <span className="text-xs font-semibold text-slate-600 ml-1">
            Status: <span className="text-sky-600 font-bold">● Scheduled & Active (14)</span>
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs font-semibold text-slate-600">
          <div className="flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-sky-600" />
            <span className="text-slate-400">Est. Impressions:</span>
            <span className="font-bold text-slate-900">384.2k</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-sky-600" />
            <span className="text-slate-400">AI Asset Accuracy:</span>
            <span className="font-bold text-slate-900">99.4%</span>
          </div>
        </div>
      </div>

      {/* 3. Calendar Matrix Table */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
        <div className="grid grid-cols-7 border-b border-slate-200 text-center bg-slate-50/60 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">
          <div>MON</div>
          <div>TUE</div>
          <div>WED</div>
          <div>THU</div>
          <div>FRI</div>
          <div>SAT</div>
          <div>SUN</div>
        </div>

        <div className="grid grid-cols-7 divide-x divide-y divide-slate-100 text-xs">
          {/* Row 1: Oct 27 - Nov 2 */}
          <div className="min-h-24 p-2 text-slate-400 font-medium">27</div>
          <div className="min-h-24 p-2 text-slate-400 font-medium">28</div>
          <div className="min-h-24 p-2 text-slate-400 font-medium">29</div>
          <div className="min-h-24 p-2 text-slate-400 font-medium">30</div>
          <div className="min-h-24 p-2 text-slate-400 font-medium">31</div>
          <div className="min-h-24 p-2 font-bold text-slate-800">1</div>
          <div className="min-h-24 p-2 font-bold text-slate-800">2</div>

          {/* Row 2: Nov 3 - Nov 9 */}
          <div className="min-h-24 p-2 font-bold text-slate-800">3</div>
          <div className="min-h-24 p-2 font-bold text-slate-800">4</div>
          <div className="min-h-24 p-2 font-bold text-slate-800">5</div>
          <div className="min-h-24 p-2 font-bold text-slate-800">6</div>
          <div className="min-h-24 p-2 font-bold text-slate-800">7</div>
          <div className="min-h-24 p-2 font-bold text-slate-800">8</div>
          <div className="min-h-24 p-2 font-bold text-slate-800">9</div>

          {/* Row 3: Nov 10 - Nov 16 */}
          <div className="min-h-28 p-2 font-bold text-slate-800">10</div>
          <div className="min-h-28 p-2 font-bold text-slate-800">11</div>
          <div className="min-h-28 p-2 bg-sky-50/20">
            <div className="flex items-center justify-between font-bold text-slate-800">
              <span>12</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
            </div>
            <div className="mt-1.5 p-1.5 rounded-xl bg-sky-50 border border-sky-200/80 text-[10px]">
              <div className="flex items-center gap-1 font-bold text-sky-700">
                <span className="text-[9px]">◉ Reel</span>
                <span className="text-slate-400 font-normal">Published</span>
              </div>
              <div className="font-bold text-slate-900 truncate mt-0.5">Casbah Pulse...</div>
              <div className="text-slate-500 text-[9px] mt-0.5">👁 88k views</div>
            </div>
          </div>
          <div className="min-h-28 p-2 font-bold text-slate-800">13</div>
          <div className="min-h-28 p-2 bg-sky-50/20">
            <div className="flex items-center justify-between font-bold text-slate-800">
              <span>14</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
            </div>
            <div className="mt-1.5 p-1.5 rounded-xl bg-sky-50 border border-sky-200/80 text-[10px]">
              <div className="flex items-center gap-1 font-bold text-sky-700">
                <span className="text-[9px]">TikTok</span>
                <span className="text-slate-400 font-normal">Published</span>
              </div>
              <div className="font-bold text-slate-900 truncate mt-0.5">Behind the...</div>
              <div className="text-slate-500 text-[9px] mt-0.5">⚡ 140k views</div>
            </div>
          </div>
          <div className="min-h-28 p-2 font-bold text-slate-800">15</div>
          <div className="min-h-28 p-2 font-bold text-slate-800">16</div>

          {/* Row 4: Nov 17 - Nov 23 */}
          <div className="min-h-32 p-2 font-bold text-slate-800">17</div>
          {/* Nov 18: TODAY Column */}
          <div className="min-h-32 p-2 bg-[#f0f9ff] ring-2 ring-[#0284c7] ring-inset relative">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded-md bg-[#0284c7] text-white font-black text-[10px]">
                18 TODAY
              </span>
              <span className="w-2 h-2 rounded-full bg-[#0284c7] animate-pulse" />
            </div>

            <div className="mt-2 p-2 rounded-xl bg-white border border-sky-200 shadow-xs space-y-1">
              <div className="flex items-center justify-between text-[10px]">
                <span className="font-bold text-sky-700">Carousel</span>
                <span className="text-[9px] font-semibold text-slate-400 bg-slate-100 px-1.5 py-0.2 rounded">
                  4:00 PM
                </span>
              </div>
              <div className="font-black text-slate-900 text-[11px] leading-tight">
                Product Drop: Casbah Oversized...
              </div>
              <div className="flex items-center gap-1.5 pt-1 text-[10px] text-slate-500">
                <span className="w-4 h-4 rounded-full bg-slate-900 text-white font-bold text-[8px] flex items-center justify-center">
                  AR
                </span>
                <span>Alex Rivera</span>
              </div>
            </div>
          </div>
          <div className="min-h-32 p-2 font-bold text-slate-800">19</div>
          <div className="min-h-32 p-2 font-bold text-slate-800">20</div>
          <div className="min-h-32 p-2 bg-amber-50/20">
            <div className="flex items-center justify-between font-bold text-slate-800">
              <span>21</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            </div>
            <div className="mt-1.5 p-1.5 rounded-xl bg-amber-50 border border-amber-200/80 text-[10px]">
              <div className="flex items-center justify-between text-[9px] font-bold text-amber-800">
                <span>TikTok</span>
                <span className="text-amber-600 bg-amber-100 px-1 rounded">Asset Pending</span>
              </div>
              <div className="font-bold text-slate-900 truncate mt-0.5">Streetwear...</div>
              <div className="text-[9px] text-slate-500 mt-1 flex items-center gap-1">
                <span>Maya Chen</span>
              </div>
            </div>
          </div>
          <div className="min-h-32 p-2 font-bold text-slate-800">22</div>
          <div className="min-h-32 p-2 font-bold text-slate-800">23</div>

          {/* Row 5: Nov 24 - Nov 30 */}
          <div className="min-h-28 p-2">
            <div className="flex items-center justify-between font-bold text-slate-800">
              <span>24</span>
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
            </div>
            <div className="mt-1.5 p-1.5 rounded-xl bg-sky-50 border border-sky-200/80 text-[10px]">
              <div className="flex items-center justify-between text-[9px] font-bold text-sky-800">
                <span>VIP Blast</span>
                <span className="text-sky-600 bg-sky-100 px-1 rounded">Ready</span>
              </div>
              <div className="font-bold text-slate-900 truncate mt-0.5">Casbah Drop...</div>
              <div className="text-[9px] text-slate-500 mt-0.5">Segment: Tier 1 VIPs</div>
            </div>
          </div>
          <div className="min-h-28 p-2 font-bold text-slate-800">25</div>
          <div className="min-h-28 p-2 font-bold text-slate-800">26</div>
          <div className="min-h-28 p-2 font-bold text-slate-800">27</div>
          <div className="min-h-28 p-2">
            <div className="flex items-center justify-between font-bold text-slate-800">
              <span>28</span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
            </div>
            <div className="mt-1.5 p-1.5 rounded-xl bg-slate-50 border border-slate-200 text-[10px]">
              <div className="flex items-center justify-between text-[9px] font-semibold text-slate-600">
                <span>Meta Paid</span>
                <span className="text-slate-500 bg-slate-200 px-1 rounded">Draft</span>
              </div>
              <div className="font-bold text-slate-900 truncate mt-0.5">Black Friday...</div>
              <div className="text-[9px] text-slate-500 mt-0.5">💳 $12.5k Cap</div>
            </div>
          </div>
          <div className="min-h-28 p-2 font-bold text-slate-800">29</div>
          <div className="min-h-28 p-2 font-bold text-slate-800">30</div>
        </div>
      </div>

      {/* 4. Bottom Section: Approved from AI Studio Queue */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-sky-600" />
              <h3 className="text-sm font-bold text-slate-900">
                Approved from AI Studio Queue
              </h3>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-sky-50 text-sky-700 border border-sky-100">
                4 Ready to Drop
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Generative collateral vetted by Creative Lead & verified against URBANA Brand Guidelines.
            </p>
          </div>

          <button
            type="button"
            onClick={() => showToast('Opening AI Studio Staging Pool')}
            className="text-xs font-bold text-[#0284c7] hover:underline flex items-center gap-1 cursor-pointer shrink-0"
          >
            View Studio Staging &rarr;
          </button>
        </div>

        {/* 4 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="border border-slate-200/90 rounded-2xl overflow-hidden bg-slate-50/50 flex flex-col justify-between">
            <div>
              <div className="relative h-32 bg-slate-900">
                <img
                  src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=400&q=80"
                  alt="Casbah Dune"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded-md text-[9px] font-bold bg-white/95 text-slate-900 shadow-xs">
                    ✨ 96% Match
                  </span>
                  <span className="px-2 py-0.5 rounded-md text-[9px] font-bold bg-sky-600 text-white">
                    IG Story
                  </span>
                </div>
              </div>
              <div className="p-3">
                <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                  URBANA • CASBAH DROP
                </div>
                <h4 className="text-xs font-black text-slate-900 mt-0.5">
                  Casbah Dune Silhouette...
                </h4>
                <p className="text-[11px] text-slate-500 mt-1 italic line-clamp-2">
                  "Structured warmth engineered for the twilight transit. Dropping..."
                </p>
              </div>
            </div>

            <div className="p-3 pt-0 flex items-center justify-between text-xs">
              <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                <Check className="w-3 h-3" /> Vetted by Elena R.
              </span>
              <button
                type="button"
                onClick={() => handleAddStagedItem('Casbah Dune Silhouette', 'Story', 'Instagram')}
                className="px-2.5 py-1 rounded-lg font-bold text-white bg-[#0284c7] hover:bg-[#0369a1] text-[11px] flex items-center gap-1 cursor-pointer"
              >
                + Add
              </button>
            </div>
          </div>

          <div className="border border-slate-200/90 rounded-2xl overflow-hidden bg-slate-50/50 flex flex-col justify-between">
            <div>
              <div className="relative h-32 bg-slate-900">
                <img
                  src="https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=400&q=80"
                  alt="Tactile Stormproof Weave"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded-md text-[9px] font-bold bg-white/95 text-slate-900 shadow-xs">
                    ✨ 98% Match
                  </span>
                  <span className="px-2 py-0.5 rounded-md text-[9px] font-bold bg-cyan-600 text-white">
                    TikTok Reel
                  </span>
                </div>
              </div>
              <div className="p-3">
                <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                  URBANA • MATERIALS SERIES
                </div>
                <h4 className="text-xs font-black text-slate-900 mt-0.5">
                  Tactile Stormproof Weave
                </h4>
                <p className="text-[11px] text-slate-500 mt-1 italic line-clamp-2">
                  "Zero moisture infiltration. 100% sustainable deadstock yarn crafted..."
                </p>
              </div>
            </div>

            <div className="p-3 pt-0 flex items-center justify-between text-xs">
              <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                <Check className="w-3 h-3" /> Vetted by Elena R.
              </span>
              <button
                type="button"
                onClick={() => handleAddStagedItem('Tactile Stormproof Weave', 'Reel', 'TikTok')}
                className="px-2.5 py-1 rounded-lg font-bold text-white bg-[#0284c7] hover:bg-[#0369a1] text-[11px] flex items-center gap-1 cursor-pointer"
              >
                + Add
              </button>
            </div>
          </div>

          <div className="border border-slate-200/90 rounded-2xl overflow-hidden bg-slate-50/50 flex flex-col justify-between">
            <div>
              <div className="relative h-32 bg-slate-900">
                <img
                  src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=400&q=80"
                  alt="Casbah Pulse 48h Early Pass"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded-md text-[9px] font-bold bg-white/95 text-slate-900 shadow-xs">
                    ✨ 100% Match
                  </span>
                  <span className="px-2 py-0.5 rounded-md text-[9px] font-bold bg-amber-600 text-white">
                    VIP Email
                  </span>
                </div>
              </div>
              <div className="p-3">
                <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                  URBANA • COUNTDOWN
                </div>
                <h4 className="text-xs font-black text-slate-900 mt-0.5">
                  Casbah Pulse 48h Early Pass
                </h4>
                <p className="text-[11px] text-slate-500 mt-1 italic line-clamp-2">
                  "Your private unlock code is ready. Secure early access before global..."
                </p>
              </div>
            </div>

            <div className="p-3 pt-0 flex items-center justify-between text-xs">
              <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                <Check className="w-3 h-3" /> Vetted by Sarah J.
              </span>
              <button
                type="button"
                onClick={() => handleAddStagedItem('Casbah Pulse 48h Early Pass', 'Newsletter', 'Newsletter')}
                className="px-2.5 py-1 rounded-lg font-bold text-white bg-[#0284c7] hover:bg-[#0369a1] text-[11px] flex items-center gap-1 cursor-pointer"
              >
                + Add
              </button>
            </div>
          </div>

          <div className="border border-slate-200/90 rounded-2xl overflow-hidden bg-slate-50/50 flex flex-col justify-between">
            <div>
              <div className="relative h-32 bg-slate-900">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80"
                  alt="Designing with AI"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded-md text-[9px] font-bold bg-white/95 text-slate-900 shadow-xs">
                    ✨ 94% Match
                  </span>
                  <span className="px-2 py-0.5 rounded-md text-[9px] font-bold bg-blue-700 text-white">
                    LinkedIn Poll
                  </span>
                </div>
              </div>
              <div className="p-3">
                <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                  URBANA • BEHIND THE SCENES
                </div>
                <h4 className="text-xs font-black text-slate-900 mt-0.5">
                  Designing with AI...
                </h4>
                <p className="text-[11px] text-slate-500 mt-1 italic line-clamp-2">
                  "How we accelerated the Casbah Capsule from initial sketch to..."
                </p>
              </div>
            </div>

            <div className="p-3 pt-0 flex items-center justify-between text-xs">
              <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                <Check className="w-3 h-3" /> Vetted by Elena R.
              </span>
              <button
                type="button"
                onClick={() => handleAddStagedItem('Designing with AI', 'Post', 'LinkedIn')}
                className="px-2.5 py-1 rounded-lg font-bold text-white bg-[#0284c7] hover:bg-[#0369a1] text-[11px] flex items-center gap-1 cursor-pointer"
              >
                + Add
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Schedule Modal */}
      {isScheduleOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-black text-slate-900">Schedule Content Drop</h3>
              <button
                type="button"
                onClick={() => setIsScheduleOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={handleScheduleSubmit}
              className="mt-4 space-y-3.5 text-xs text-left"
            >
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Post Title</label>
                <input
                  type="text"
                  required
                  value={scheduleTitle}
                  onChange={(e) => setScheduleTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Platform</label>
                  <select value={schedulePlatform} onChange={(e) => setSchedulePlatform(e.target.value)} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl">
                    <option>Instagram</option>
                    <option>TikTok</option>
                    <option>Newsletter</option>
                    <option>Meta Ads</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Format</label>
                  <select value={scheduleFormat} onChange={(e) => setScheduleFormat(e.target.value)} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl">
                    <option>Carousel (4:5)</option>
                    <option>Reel (9:16)</option>
                    <option>Story</option>
                    <option>Banner</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Date</label>
                  <input
                    type="date"
                    value={scheduleDate}
                    onChange={(e) => setScheduleDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Time</label>
                  <input
                    type="time"
                    value={scheduleTime}
                    onChange={(e) => setScheduleTime(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsScheduleOpen(false)}
                  className="px-3.5 py-2 rounded-xl font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl font-bold text-white bg-[#0284c7] hover:bg-[#0369a1] shadow-xs cursor-pointer"
                >
                  Schedule Drop
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};