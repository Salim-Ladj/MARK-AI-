import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  Gauge,
  Layers,
  Sparkles,
  Download,
  UserPlus,
  Search,
  LayoutGrid,
  List,
  Clock,
  Send,
  Zap,
  X
} from 'lucide-react';

export const CreativeTeamPage: React.FC = () => {
  const { navigateTo, showToast, addTask, selectedBrand, campaigns } = useApp();

  const [activeDiscipline, setActiveDiscipline] = useState('All Disciplines (14)');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  const handleAssignTask = (member: string) => {
    addTask({
      title: `Casbah Sprint: Asset for ${member}`,
      brandId: selectedBrand?.id || 'brand-urbana',
      brandName: selectedBrand?.name || 'URBANA',
      campaignId: campaigns[0]?.id || 'camp-kasbah-fall',
      campaignName: 'Casbah Pulse Winter Drop',
      assignedToId: 'user-crt-1',
      assignedToName: member,
      priority: 'high',
      dueDate: '2026-10-22',
      format: 'Post 1:1',
      brief: {
        summary: 'Direct production brief dispatched from Creative Team Roster.',
        dimensions: '1080x1080',
        tone: 'Bold & Cultural',
        keyElements: ['URBANA Logo', 'High-contrast typography']
      }
    });
    showToast(`Direct brief assigned to ${member}!`, 'success');
  };

  return (
    <div className="space-y-6 pb-12 font-sans antialiased text-slate-800">
      {/* 1. Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <div className="text-[11px] font-bold text-sky-600 tracking-wider uppercase mb-1">
            PRODUCTION ENGINE • ACTIVE COHORT • Q4 Brand Sprint: URBANA Casbah Pulse
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Creative Team Roster
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Coordinate specialized multidisciplinary talent, supervise studio bandwidth, and directly dispatch AI-augmented briefs to 3D artists, video editors, and visual typographers.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => showToast('Downloading Q4 Studio Bandwidth & Utilization CSV...', 'success')}
            className="px-3.5 py-2 rounded-xl bg-white border border-slate-200/90 hover:bg-slate-50 text-xs font-semibold text-slate-700 shadow-2xs flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            Utilization Report
          </button>
          <button
            type="button"
            onClick={() => setIsInviteModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-bold shadow-sm shadow-sky-600/25 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            Invite Team Member
          </button>
        </div>
      </div>

      {/* 2. Top 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              TOTAL ACTIVE CREATORS
            </span>
            <div className="w-7 h-7 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
              <Users className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900 tracking-tight">14</div>
            <div className="flex items-center gap-1.5 mt-2 text-xs font-bold text-sky-600">
              <span>10 In-House • 4 Contract</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              STUDIO CAPACITY
            </span>
            <div className="w-7 h-7 rounded-lg bg-cyan-50 text-cyan-600 flex items-center justify-center">
              <Gauge className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900 tracking-tight">68.4%</span>
              <span className="text-[10px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-100">
                Optimal Velocity
              </span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2.5 overflow-hidden">
              <div className="h-full rounded-full bg-[#0284c7]" style={{ width: '68.4%' }} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              ACTIVE TASK QUEUE
            </span>
            <div className="w-7 h-7 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
              <Layers className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900 tracking-tight">23 Tasks</span>
              <span className="text-xs text-slate-400">across 5 campaigns</span>
            </div>
            <div className="flex items-center gap-2 mt-2 text-xs font-medium text-slate-500">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500" /> 18 In Progress
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> 5 Review
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              AI BRIEF ADOPTION
            </span>
            <div className="w-7 h-7 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900 tracking-tight">91.2%</span>
              <span className="text-xs font-semibold text-emerald-600">+14% vs Q3</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-2">
              Pre-tokenized style tokens injected
            </div>
          </div>
        </div>
      </div>

      {/* 3. Filter Pills Bar */}
      <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-2.5 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          {['All Disciplines (14)', '3D Artist (4)', 'Video Editor (5)', 'Graphic Designer (3)', 'Copywriter (2)'].map((disc) => (
            <button
              key={disc}
              type="button"
              onClick={() => setActiveDiscipline(disc)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeDiscipline === disc
                  ? 'bg-[#0284c7] text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {disc}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by software, skill..."
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

      {/* 4. Creative Member Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Card 1: Alex Rivera */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80"
                    alt="Alex Rivera"
                    className="w-12 h-12 rounded-2xl object-cover border border-slate-200"
                  />
                  <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-black text-slate-900">Alex Rivera</h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-100">
                      Core In-House
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-sky-600 mt-0.5">
                    Senior 3D & Motion Designer
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 font-semibold mt-0.5">
                    <span>High Availability • Online</span>
                  </div>
                </div>
              </div>
              <span className="text-slate-400 hover:text-slate-700 cursor-pointer">•••</span>
            </div>

            <div className="flex flex-wrap gap-1.5 mt-3.5">
              {['3D Garment Simulation', 'Cinema 4D', 'Blender (Cycles)', 'Marvelous Designer'].map((sk) => (
                <span key={sk} className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200/80 text-[10px] font-semibold text-slate-600">
                  {sk}
                </span>
              ))}
              <span className="px-2.5 py-1 rounded-lg bg-sky-50 border border-sky-200 text-[10px] font-bold text-sky-700 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> AI Latent Mesh
              </span>
            </div>

            <div className="bg-slate-50/80 rounded-2xl p-3.5 border border-slate-100 mt-4 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700">Workload Allocation</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 text-[10px]">
                    65% - Optimal Bandwidth
                  </span>
                  <span className="text-slate-400 text-[11px]">28 hrs / 40 hrs</span>
                </div>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                <div className="h-full rounded-full bg-emerald-500" style={{ width: '65%' }} />
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5">
                <span className="flex items-center gap-2">
                  <span>● 2 In Progress</span>
                  <span>● 1 Awaiting Review</span>
                </span>
                <span className="text-sky-600 font-semibold flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Next slot: Tomorrow 10am
                </span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100">
              <div className="flex items-center justify-between text-[11px] mb-2">
                <span className="font-bold text-slate-400 uppercase tracking-wider">
                  RECENT URBANA DELIVERABLES
                </span>
                <button onClick={() => navigateTo('/marketing/assets')} className="font-bold text-[#0284c7] hover:underline cursor-pointer">
                  View Portfolio Asset Hub &rarr;
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="bg-slate-50 rounded-xl p-2 flex items-center gap-2 border border-slate-200/80">
                  <img
                    src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=100&h=100&q=80"
                    alt="Casbah 3D Parka"
                    className="w-9 h-9 rounded-lg object-cover"
                  />
                  <div className="truncate">
                    <div className="text-[11px] font-bold text-slate-900 truncate">Casbah 3D Parka M</div>
                    <div className="text-[9px] text-slate-500">USDZ • 8K Albedo</div>
                    <div className="text-[9px] text-emerald-600 font-bold">✓ Approved</div>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-2 flex items-center gap-2 border border-slate-200/80">
                  <img
                    src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=100&h=100&q=80"
                    alt="Streetwear Lookbook"
                    className="w-9 h-9 rounded-lg object-cover"
                  />
                  <div className="truncate">
                    <div className="text-[11px] font-bold text-slate-900 truncate">Streetwear Lookboc</div>
                    <div className="text-[9px] text-slate-500">9:16 • ProRes 422</div>
                    <div className="text-[9px] text-amber-600 font-bold">In QA Review</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2">
            <button
              type="button"
              onClick={() => handleAssignTask('Alex Rivera')}
              className="py-2.5 px-3 rounded-xl font-bold text-white bg-[#0284c7] hover:bg-[#0369a1] text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
              Assign New Task
            </button>
            <button
              type="button"
              onClick={() => showToast('Opening Alex Rivera complete workload view')}
              className="py-2.5 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
            >
              Workload & Tasks
            </button>
          </div>
        </div>

        {/* Card 2: Maya Chen */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&h=120&q=80"
                    alt="Maya Chen"
                    className="w-12 h-12 rounded-2xl object-cover border border-slate-200"
                  />
                  <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-amber-500 ring-2 ring-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-black text-slate-900">Maya Chen</h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-50 text-cyan-700 border border-cyan-100">
                      Growth Pod
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-sky-600 mt-0.5">
                    Lead Social Video Editor
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-amber-600 font-semibold mt-0.5">
                    <span>In a Task • Render Pipeline</span>
                  </div>
                </div>
              </div>
              <span className="text-slate-400 hover:text-slate-700 cursor-pointer">•••</span>
            </div>

            <div className="flex flex-wrap gap-1.5 mt-3.5">
              {['TikTok & Reel Viral Hooks', 'After Effects', 'Spatial Sound Design', 'Premiere Pro'].map((sk) => (
                <span key={sk} className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200/80 text-[10px] font-semibold text-slate-600">
                  {sk}
                </span>
              ))}
              <span className="px-2.5 py-1 rounded-lg bg-sky-50 border border-sky-200 text-[10px] font-bold text-sky-700 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Runway Gen-3
              </span>
            </div>

            <div className="bg-slate-50/80 rounded-2xl p-3.5 border border-slate-100 mt-4 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700">Workload Allocation</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200 text-[10px]">
                    85% - High Surge Capacity
                  </span>
                  <span className="text-slate-400 text-[11px]">34 hrs / 40 hrs</span>
                </div>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                <div className="h-full rounded-full bg-amber-500" style={{ width: '85%' }} />
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5">
                <span className="flex items-center gap-2">
                  <span>● 3 In Progress</span>
                  <span>● 0 Review</span>
                </span>
                <span className="text-sky-600 font-semibold flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Next slot: Friday 3pm
                </span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100">
              <div className="flex items-center justify-between text-[11px] mb-2">
                <span className="font-bold text-slate-400 uppercase tracking-wider">
                  RECENT URBANA DELIVERABLES
                </span>
                <button onClick={() => navigateTo('/marketing/assets')} className="font-bold text-[#0284c7] hover:underline cursor-pointer">
                  View 18 Clips &rarr;
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="bg-slate-50 rounded-xl p-2 flex items-center gap-2 border border-slate-200/80">
                  <img
                    src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=100&h=100&q=80"
                    alt="Casbah Waterproof"
                    className="w-9 h-9 rounded-lg object-cover"
                  />
                  <div className="truncate">
                    <div className="text-[11px] font-bold text-slate-900 truncate">Casbah Waterproof</div>
                    <div className="text-[9px] text-slate-500">TikTok 9:16 • 4.2M views</div>
                    <div className="text-[9px] text-sky-600 font-bold">Top Performer</div>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-2 flex items-center gap-2 border border-slate-200/80">
                  <img
                    src="https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=100&h=100&q=80"
                    alt="Runway Teaser"
                    className="w-9 h-9 rounded-lg object-cover"
                  />
                  <div className="truncate">
                    <div className="text-[11px] font-bold text-slate-900 truncate">Runway Teaser Cut</div>
                    <div className="text-[9px] text-slate-500">IG Story 15s Cut</div>
                    <div className="text-[9px] text-slate-600 font-bold">Exported</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2">
            <button
              type="button"
              onClick={() => handleAssignTask('Maya Chen')}
              className="py-2.5 px-3 rounded-xl font-bold text-white bg-[#0284c7] hover:bg-[#0369a1] text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
              Assign New Task
            </button>
            <button
              type="button"
              onClick={() => showToast('Opening Maya Chen complete workload view')}
              className="py-2.5 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
            >
              Workload & Tasks
            </button>
          </div>
        </div>

        {/* Card 3: Karim Belkacem */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80"
                    alt="Karim Belkacem"
                    className="w-12 h-12 rounded-2xl object-cover border border-slate-200"
                  />
                  <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-black text-slate-900">Karim Belkacem</h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-100">
                      Algiers Studio
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-sky-600 mt-0.5">
                    Visual Brand & Type Designer
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 font-semibold mt-0.5">
                    <span>Available • 40% Workload</span>
                  </div>
                </div>
              </div>
              <span className="text-slate-400 hover:text-slate-700 cursor-pointer">•••</span>
            </div>

            <div className="flex flex-wrap gap-1.5 mt-3.5">
              {['Berber Neo-Calligraphy', 'Vector Art & Glyphs', 'Lookbook Layout Systems', 'Figma & InDesign'].map((sk) => (
                <span key={sk} className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200/80 text-[10px] font-semibold text-slate-600">
                  {sk}
                </span>
              ))}
              <span className="px-2.5 py-1 rounded-lg bg-sky-50 border border-sky-200 text-[10px] font-bold text-sky-700 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Midjourney Style Tuner
              </span>
            </div>

            <div className="bg-slate-50/80 rounded-2xl p-3.5 border border-slate-100 mt-4 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700">Workload Allocation</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 text-[10px]">
                    40% - Open For Direct Briefs
                  </span>
                  <span className="text-slate-400 text-[11px]">16 hrs / 40 hrs</span>
                </div>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                <div className="h-full rounded-full bg-emerald-500" style={{ width: '40%' }} />
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5">
                <span className="flex items-center gap-2">
                  <span>● 1 In Progress</span>
                  <span>● 2 Completed this week</span>
                </span>
                <span className="text-emerald-600 font-semibold flex items-center gap-1">
                  <Zap className="w-3 h-3" /> Ready for Immediate Sprint
                </span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100">
              <div className="flex items-center justify-between text-[11px] mb-2">
                <span className="font-bold text-slate-400 uppercase tracking-wider">
                  RECENT URBANA DELIVERABLES
                </span>
                <button onClick={() => navigateTo('/marketing/brands')} className="font-bold text-[#0284c7] hover:underline cursor-pointer">
                  View Brand Kit &rarr;
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="bg-slate-50 rounded-xl p-2 flex items-center gap-2 border border-slate-200/80">
                  <img
                    src="https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=100&h=100&q=80"
                    alt="Casbah Heritage"
                    className="w-9 h-9 rounded-lg object-cover"
                  />
                  <div className="truncate">
                    <div className="text-[11px] font-bold text-slate-900 truncate">Casbah Heritage M...</div>
                    <div className="text-[9px] text-slate-500">SVG Master • OTF Font</div>
                    <div className="text-[9px] text-sky-600 font-bold">Brand Core</div>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-2 flex items-center gap-2 border border-slate-200/80">
                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=100&h=100&q=80"
                    alt="Fall Lookbook"
                    className="w-9 h-9 rounded-lg object-cover"
                  />
                  <div className="truncate">
                    <div className="text-[11px] font-bold text-slate-900 truncate">Fall Lookbook Grid...</div>
                    <div className="text-[9px] text-slate-500">48-page InDesign Spread</div>
                    <div className="text-[9px] text-emerald-600 font-bold">Approved</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2">
            <button
              type="button"
              onClick={() => handleAssignTask('Karim Belkacem')}
              className="py-2.5 px-3 rounded-xl font-bold text-white bg-[#0284c7] hover:bg-[#0369a1] text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
              Assign New Task
            </button>
            <button
              type="button"
              onClick={() => showToast('Opening Karim Belkacem complete workload view')}
              className="py-2.5 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
            >
              Workload & Tasks
            </button>
          </div>
        </div>

        {/* Card 4: Elena Rostova */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&h=120&q=80"
                    alt="Elena Rostova"
                    className="w-12 h-12 rounded-2xl object-cover border border-slate-200"
                  />
                  <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-black text-slate-900">Elena Rostova</h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                      Contract Lead
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-sky-600 mt-0.5">
                    Motion Graphics & CGI Animator
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 font-semibold mt-0.5">
                    <span>Available • 55% Capacity</span>
                  </div>
                </div>
              </div>
              <span className="text-slate-400 hover:text-slate-700 cursor-pointer">•••</span>
            </div>

            <div className="flex flex-wrap gap-1.5 mt-3.5">
              {['Houdini FX Simulation', 'Unreal Engine 5.4', 'Kinetic Type Animation', 'Nuke Compositing'].map((sk) => (
                <span key={sk} className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200/80 text-[10px] font-semibold text-slate-600">
                  {sk}
                </span>
              ))}
              <span className="px-2.5 py-1 rounded-lg bg-sky-50 border border-sky-200 text-[10px] font-bold text-sky-700 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Neural NeRF Renders
              </span>
            </div>

            <div className="bg-slate-50/80 rounded-2xl p-3.5 border border-slate-100 mt-4 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700">Workload Allocation</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 text-[10px]">
                    55% - Steady Throughput
                  </span>
                  <span className="text-slate-400 text-[11px]">22 hrs / 40 hrs</span>
                </div>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                <div className="h-full rounded-full bg-emerald-500" style={{ width: '55%' }} />
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5">
                <span className="flex items-center gap-2">
                  <span>● 2 In Progress</span>
                  <span>● 1 Client Review</span>
                </span>
                <span className="text-sky-600 font-semibold flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Next slot: Wednesday 2pm
                </span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100">
              <div className="flex items-center justify-between text-[11px] mb-2">
                <span className="font-bold text-slate-400 uppercase tracking-wider">
                  RECENT URBANA DELIVERABLES
                </span>
                <button onClick={() => navigateTo('/marketing/assets')} className="font-bold text-[#0284c7] hover:underline cursor-pointer">
                  View Motion Reel &rarr;
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="bg-slate-50 rounded-xl p-2 flex items-center gap-2 border border-slate-200/80">
                  <img
                    src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=100&h=100&q=80"
                    alt="Hydrophobic Partic"
                    className="w-9 h-9 rounded-lg object-cover"
                  />
                  <div className="truncate">
                    <div className="text-[11px] font-bold text-slate-900 truncate">Hydrophobic Partic...</div>
                    <div className="text-[9px] text-slate-500">4K 60fps • Alpha Mat</div>
                    <div className="text-[9px] text-emerald-600 font-bold">Final Approved</div>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-2 flex items-center gap-2 border border-slate-200/80">
                  <img
                    src="https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=100&h=100&q=80"
                    alt="Casbah 3D Anamorp"
                    className="w-9 h-9 rounded-lg object-cover"
                  />
                  <div className="truncate">
                    <div className="text-[11px] font-bold text-slate-900 truncate">Casbah 3D Anamorg...</div>
                    <div className="text-[9px] text-slate-500">Shibuya & Times Sq Sp</div>
                    <div className="text-[9px] text-amber-600 font-bold">In Render</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2">
            <button
              type="button"
              onClick={() => handleAssignTask('Elena Rostova')}
              className="py-2.5 px-3 rounded-xl font-bold text-white bg-[#0284c7] hover:bg-[#0369a1] text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
              Assign New Task
            </button>
            <button
              type="button"
              onClick={() => showToast('Opening Elena Rostova complete workload view')}
              className="py-2.5 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
            >
              Workload & Tasks
            </button>
          </div>
        </div>
      </div>

      {/* Invite Modal */}
      {isInviteModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-black text-slate-900">Invite Creative Specialist</h3>
              <button
                type="button"
                onClick={() => setIsInviteModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsInviteModalOpen(false);
                showToast('Invitation dispatched to creative specialist via email!', 'success');
              }}
              className="mt-4 space-y-3.5 text-xs text-left"
            >
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="name@studio.com"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Role / Discipline</label>
                <select className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl">
                  <option>Senior 3D Artist (Cinema 4D / Blender)</option>
                  <option>Lead Video Editor (Reels / After Effects)</option>
                  <option>Typographer & Visual Brand Designer</option>
                  <option>Generative Prompt Engineer & CGI Lead</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Contract Type</label>
                <select className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl">
                  <option>Core In-House Talent</option>
                  <option>Growth Pod Specialist</option>
                  <option>Contract Retainer</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsInviteModalOpen(false)}
                  className="px-3.5 py-2 rounded-xl font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl font-bold text-white bg-[#0284c7] hover:bg-[#0369a1] shadow-xs cursor-pointer"
                >
                  Send Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};