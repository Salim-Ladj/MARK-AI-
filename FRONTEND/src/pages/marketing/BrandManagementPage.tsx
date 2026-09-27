import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  Plus,
  Search,
  SlidersHorizontal,
  Bookmark,
  Share2,
  CheckCircle2,
  Eye,
  Edit3,
  Download,
  ArrowRight,
  X,
  Compass,
  Check
} from 'lucide-react';
import { Brand } from '../../types';

export const BrandsPage: React.FC = () => {
  const { brands, setSelectedBrand, addBrand, updateBrand, showToast } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [industryFilter, setIndustryFilter] = useState('All Industries');
  const [workspaceFilter, setWorkspaceFilter] = useState('Primary Workspace');

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [viewingBrandProfile, setViewingBrandProfile] = useState<Brand | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // New Brand Form State
  const [newBrand, setNewBrand] = useState({
    name: '',
    industry: 'Urban Apparel & Streetwear',
    description: '',
    toneOfVoice: 'Bold, Rebellious, Youth-Driven',
    demographics: 'Gen-Z (18-28)',
    geography: 'North Africa & Europe'
  });

  const handleCreateBrand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBrand.name.trim()) return;

    const brand = addBrand({
      name: newBrand.name,
      logo: 'https://api.iconify.design/lucide:zap.svg?color=%230284c7',
      industry: newBrand.industry,
      description: newBrand.description || 'Innovative lifestyle apparel and cultural narrative.',
      productsAndServices: ['Capsule Collection', 'Heavyweight Hoodies', 'Accessories'],
      targetAudience: {
        demographics: newBrand.demographics,
        psychographics: 'Culturally forward, design-driven',
        geography: newBrand.geography,
        interests: ['Fashion', 'Music', 'Design']
      },
      positioning: 'Pioneering authentic modern cultural aesthetics.',
      toneOfVoice: newBrand.toneOfVoice.split(',').map((s) => s.trim()),
      marketingObjectives: ['Scale audience reach', 'Automate multi-channel creative generation'],
      socialPlatforms: ['Instagram', 'TikTok']
    });

    setIsAddModalOpen(false);
    setSelectedBrand(brand);
    showToast(`Brand "${brand.name}" integrated successfully!`, 'success');
  };

  const handleExportBrandKit = (brandName: string) => {
    showToast(`Exported "${brandName}" Brand Kit (PDF, Tokens, SVGs)`, 'success');
  };

  // The 3 brands in the design:
  const urbana = brands.find((b) => b.id === 'brand-urbana') || brands[0];
  const atlas = brands.find((b) => b.id === 'brand-atlas') || {
    id: 'brand-atlas',
    name: 'Atlas Botanicals',
    industry: 'Natural Skincare',
    description: 'High Atlas Wild Organic Elements',
    toneOfVoice: ['Pure', 'Earthy', 'Zen'],
    campaignsCount: '1 Campaign • 8 Assets'
  };
  const sahara = brands.find((b) => b.id === 'brand-sahara') || {
    id: 'brand-sahara',
    name: 'Sahara Nomad',
    industry: 'Eco-Travel Gear',
    description: 'Circular Expedition Equipment',
    toneOfVoice: ['Rugged', 'Purposeful'],
    campaignsCount: '3 Campaigns • 24 Assets'
  };

  return (
    <div className="space-y-6 pb-12 font-sans antialiased text-slate-800">
      {/* 1. Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <div className="text-[11px] font-bold text-sky-600 tracking-wider uppercase mb-1">
            PORTFOLIO DIRECTORY • 3 Active Accounts
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Brand Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Control generative visual guidelines, localized positioning vectors, and synchronized digital assets across global workspaces.
          </p>
        </div>

        {/* Right Metric Card & Add Button */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="bg-sky-50/70 border border-sky-100 rounded-2xl p-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] font-medium text-slate-500">Brand Consistency Index</div>
              <div className="text-xs font-bold text-slate-900">98.4% Compliance</div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-bold shadow-sm shadow-sky-600/25 flex items-center gap-2 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add New Brand
          </button>
        </div>
      </div>

      {/* 2. Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter by brand name, archetype, or locale..."
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200/90 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-sky-500 transition-all shadow-xs"
          />
        </div>

        {/* Dropdown: All Industries */}
        <select
          value={industryFilter}
          onChange={(e) => setIndustryFilter(e.target.value)}
          className="px-3.5 py-2 bg-white border border-slate-200/90 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-sky-500 shadow-xs cursor-pointer"
        >
          <option>All Industries</option>
          <option>Urban Apparel & Streetwear</option>
          <option>Natural Skincare</option>
          <option>Eco-Travel Gear</option>
        </select>

        {/* Dropdown: Primary Workspace */}
        <select
          value={workspaceFilter}
          onChange={(e) => setWorkspaceFilter(e.target.value)}
          className="px-3.5 py-2 bg-white border border-slate-200/90 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-sky-500 shadow-xs cursor-pointer"
        >
          <option>Primary Workspace</option>
          <option>All Workspaces</option>
          <option>Europe / Diaspora</option>
          <option>North Africa</option>
        </select>

        {/* Filter Tune Icon */}
        <button
          type="button"
          className="p-2 rounded-xl border border-slate-200/90 bg-white hover:bg-slate-50 text-slate-600 shadow-xs cursor-pointer shrink-0"
        >
          <SlidersHorizontal className="w-4 h-4 text-slate-500" />
        </button>
      </div>

      {/* 3. Main Content: Left Featured Card (URBANA) & Right Column (Atlas, Sahara, Integrate) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: URBANA Brand (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between">
          <div>
            {/* Hero Image with Streetwear Aesthetic */}
            <div className="relative h-72 sm:h-84 w-full bg-slate-900 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&h=700&q=80"
                alt="URBANA Streetwear"
                className="w-full h-full object-cover object-center opacity-90 hover:scale-102 transition-transform duration-700"
              />

              {/* Faint UI Mock overlay on left */}
              <div className="absolute left-3 top-10 hidden sm:flex flex-col gap-1.5 text-[9px] text-white/50 font-mono tracking-wider">
                <span className="text-white/80">⌂ Dashboard</span>
                <span>◈ Assets</span>
                <span>⬡ Brand Hub</span>
                <span>⚙ Settings</span>
              </div>

              {/* Top Badges */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-white text-slate-900 shadow-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7]" />
                  Primary Brand
                </span>
                <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-slate-900/60 backdrop-blur-md text-white border border-white/20">
                  Algerian Streetwear
                </span>
              </div>

              {/* Top Right Action Icons */}
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => showToast('Brand bookmarked in quick navigation')}
                  className="w-8 h-8 rounded-full bg-slate-900/50 backdrop-blur-md text-white flex items-center justify-center hover:bg-slate-900/80 transition-colors"
                >
                  <Bookmark className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => showToast('Shareable link copied to clipboard')}
                  className="w-8 h-8 rounded-full bg-slate-900/50 backdrop-blur-md text-white flex items-center justify-center hover:bg-slate-900/80 transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Bottom Left: Logo + Name + Description */}
              <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                <div className="flex items-center gap-3">
                  {/* Square Black URB Logo Box */}
                  <div className="w-12 h-12 rounded-xl bg-slate-950 text-white flex flex-col items-center justify-center border border-white/20 shadow-lg shrink-0">
                    <span className="text-xs font-black tracking-widest leading-none">URB</span>
                    <span className="text-[8px] font-bold tracking-widest text-slate-400 mt-0.5">
                      ALGIERS
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5">
                      <h2 className="text-lg font-black text-white tracking-tight">URBANA</h2>
                      <CheckCircle2 className="w-4 h-4 text-[#38bdf8] fill-[#0284c7]" />
                    </div>
                    <p className="text-xs text-white/80 max-w-sm truncate">
                      Reinventing Maghrebi youth culture through premium...
                    </p>
                  </div>
                </div>

                {/* Bottom Right: Tone Pill */}
                <div className="shrink-0">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-slate-900/80 backdrop-blur-md text-white border border-white/20">
                    <Compass className="w-3.5 h-3.5 text-sky-400" />
                    Tone: Bold & Cultural
                  </span>
                </div>
              </div>
            </div>

            {/* White Body Content */}
            <div className="p-6 space-y-5">
              {/* 4 Vectors Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
                {/* 1. Active Campaigns */}
                <div className="bg-slate-50/80 rounded-2xl p-3.5 border border-slate-100">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    ACTIVE CAMPAIGNS
                  </div>
                  <div className="text-xl font-black text-slate-900 mt-1">
                    02 <span className="text-xs font-bold text-sky-600">Active</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">18 Generative Assets</div>
                </div>

                {/* 2. Tone Vector */}
                <div className="bg-slate-50/80 rounded-2xl p-3.5 border border-slate-100">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    TONE VECTOR
                  </div>
                  <div className="text-base font-black text-slate-900 mt-1">Rebellious</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Sophisticated Berber</div>
                </div>

                {/* 3. Social Footprint */}
                <div className="bg-slate-50/80 rounded-2xl p-3.5 border border-slate-100">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    SOCIAL FOOTPRINT
                  </div>
                  <div className="text-base font-black text-slate-900 mt-1">176k Total</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">IG 64k • TT 112k</div>
                </div>

                {/* 4. AI Studio Presets */}
                <div className="bg-slate-50/80 rounded-2xl p-3.5 border border-slate-100">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    AI STUDIO PRESETS
                  </div>
                  <div className="text-base font-black text-slate-900 mt-1">
                    14 <span className="text-xs font-bold text-sky-600">LoRAs</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">3 Drop Collections</div>
                </div>
              </div>

              {/* Chromatic Spec Container */}
              <div className="bg-slate-50/80 border border-slate-100 rounded-2xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold text-slate-500 tracking-wider uppercase">
                    CHROMATIC SPEC
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span
                      title="Desert Gold (#C29B38)"
                      className="w-4 h-4 rounded-full bg-[#C29B38] border border-white shadow-xs cursor-pointer"
                    />
                    <span
                      title="High Atlas Emerald (#0f766e)"
                      className="w-4 h-4 rounded-full bg-[#0f766e] border border-white shadow-xs cursor-pointer"
                    />
                    <span
                      title="Mediterranean Deep Teal (#0d3b4c)"
                      className="w-4 h-4 rounded-full bg-[#0d3b4c] border border-white shadow-xs cursor-pointer"
                    />
                    <span
                      title="Kasbah Midnight (#0a192f)"
                      className="w-4 h-4 rounded-full bg-[#0a192f] border border-white shadow-xs cursor-pointer"
                    />
                  </div>
                </div>

                <span className="text-xs text-slate-500 font-medium">
                  Embedded across 4 Ad sets & 12 TikTok storyboards
                </span>
              </div>

              {/* Action Buttons Row */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setViewingBrandProfile(urbana)}
                    className="px-4 py-2.5 rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-bold shadow-sm shadow-sky-600/20 flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    View Brand Profile
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(true)}
                    className="px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-slate-500" />
                    Edit Guidelines
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => handleExportBrandKit('URBANA')}
                  className="px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-slate-500" />
                  Export Brand Kit
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: 2 Secondary Brand Cards + Integrate Card (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Card 1: Atlas Botanicals */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between group hover:border-slate-300 transition-all">
            {/* Top image */}
            <div className="relative h-40 bg-slate-900 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1608248597359-0027f9184511?auto=format&fit=crop&w=800&h=400&q=80"
                alt="Atlas Botanicals"
                className="w-full h-full object-cover opacity-85 group-hover:scale-102 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-white/90 backdrop-blur-md text-slate-900">
                Natural Skincare
              </span>

              {/* Bottom overlay */}
              <div className="absolute bottom-3 left-3 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-950/80 text-amber-200 flex items-center justify-center font-black text-[10px] border border-white/20">
                  AB
                </div>
                <div>
                  <h3 className="text-xs font-black text-white">Atlas Botanicals</h3>
                  <p className="text-[10px] text-white/80">High Atlas Wild Organic Elements</p>
                </div>
              </div>
            </div>

            {/* White Body */}
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase">
                    ACTIVE CAMPAIGNS
                  </div>
                  <div className="font-bold text-slate-800 text-[11px] mt-0.5">
                    1 Campaign • 8 Assets
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">TONE</div>
                  <div className="font-bold text-slate-800 text-[11px] mt-0.5">
                    Pure • Earthy • Zen
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <div className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#d4a373]" />
                  <span className="w-3.5 h-3.5 rounded-full bg-[#b5835a]" />
                  <span className="w-3.5 h-3.5 rounded-full bg-[#4a5840]" />
                </div>
                <button
                  type="button"
                  onClick={() => setViewingBrandProfile(atlas as Brand)}
                  className="text-xs font-bold text-[#0284c7] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  Inspect Profile <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Sahara Nomad */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between group hover:border-slate-300 transition-all">
            {/* Top image */}
            <div className="relative h-40 bg-slate-900 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&h=400&q=80"
                alt="Sahara Nomad"
                className="w-full h-full object-cover opacity-85 group-hover:scale-102 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-white/90 backdrop-blur-md text-slate-900">
                Eco-Travel Gear
              </span>

              {/* Bottom overlay */}
              <div className="absolute bottom-3 left-3 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-orange-950/80 text-orange-200 flex items-center justify-center font-black text-[10px] border border-white/20">
                  SN
                </div>
                <div>
                  <h3 className="text-xs font-black text-white">Sahara Nomad</h3>
                  <p className="text-[10px] text-white/80">Circular Expedition Equipment</p>
                </div>
              </div>
            </div>

            {/* White Body */}
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase">
                    ACTIVE CAMPAIGNS
                  </div>
                  <div className="font-bold text-slate-800 text-[11px] mt-0.5">
                    3 Campaigns • 24 Assets
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">TONE</div>
                  <div className="font-bold text-slate-800 text-[11px] mt-0.5">
                    Rugged • Purposeful
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <div className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#c85a32]" />
                  <span className="w-3.5 h-3.5 rounded-full bg-[#1b365d]" />
                  <span className="w-3.5 h-3.5 rounded-full bg-[#e8a838]" />
                </div>
                <button
                  type="button"
                  onClick={() => setViewingBrandProfile(sahara as Brand)}
                  className="text-xs font-bold text-[#0284c7] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  Inspect Profile <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Card 3: Integrate New Brand Entity */}
          <div
            onClick={() => setIsAddModalOpen(true)}
            className="bg-[#f0f9ff]/70 border border-dashed border-sky-300 rounded-3xl p-6 text-center hover:bg-sky-50 transition-all cursor-pointer group shadow-2xs"
          >
            <div className="w-10 h-10 rounded-full bg-white text-sky-600 flex items-center justify-center mx-auto shadow-xs border border-sky-100 group-hover:scale-105 transition-transform">
              <Plus className="w-5 h-5 stroke-[2.5]" />
            </div>
            <h4 className="text-xs font-bold text-slate-900 mt-3">Integrate New Brand Entity</h4>
            <p className="text-[11px] text-slate-500 mt-1 max-w-xs mx-auto leading-relaxed">
              Upload guidelines, color codes, & product catalogues to calibrate MarkAi engine.
            </p>
          </div>
        </div>
      </div>

      {/* Modal 1: Brand Profile Inspector */}
      {viewingBrandProfile && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 animate-fadeIn max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-xs">
                  {viewingBrandProfile.name.slice(0, 3).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">
                    {viewingBrandProfile.name}
                  </h3>
                  <p className="text-xs text-sky-600 font-semibold">
                    {viewingBrandProfile.industry}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setViewingBrandProfile(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-4 space-y-4 text-xs">
              <div>
                <span className="font-bold text-slate-800">Brand Manifesto & Positioning:</span>
                <p className="text-slate-600 mt-1 leading-relaxed bg-slate-50 p-3 rounded-xl">
                  {viewingBrandProfile.description || viewingBrandProfile.positioning}
                </p>
              </div>

              <div>
                <span className="font-bold text-slate-800">Calibrated Tone of Voice:</span>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {viewingBrandProfile.toneOfVoice?.map((t: string) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-lg bg-sky-50 text-sky-700 font-semibold border border-sky-100"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="font-bold text-slate-800">Core Product Categories:</span>
                <ul className="list-disc list-inside text-slate-600 mt-1 space-y-1">
                  {viewingBrandProfile.productsAndServices?.map((p: string) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="font-bold text-slate-800">Target Demographics & Geography:</span>
                <p className="text-slate-600 mt-1">
                  {viewingBrandProfile.targetAudience?.demographics} •{' '}
                  {viewingBrandProfile.targetAudience?.geography}
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setViewingBrandProfile(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedBrand(viewingBrandProfile);
                  setViewingBrandProfile(null);
                  showToast(`Switched active workspace to ${viewingBrandProfile.name}`);
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#0284c7] hover:bg-[#0369a1] flex items-center gap-1.5 cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" />
                Set as Active Workspace
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 2: Add New Brand */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-black text-slate-900">Integrate New Brand Entity</h3>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateBrand} className="mt-4 space-y-3.5 text-left text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Brand Name</label>
                <input
                  type="text"
                  required
                  value={newBrand.name}
                  onChange={(e) => setNewBrand({ ...newBrand, name: e.target.value })}
                  placeholder="e.g. Kasbah Audio"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-sky-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Industry</label>
                <select
                  value={newBrand.industry}
                  onChange={(e) => setNewBrand({ ...newBrand, industry: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-sky-500 focus:bg-white"
                >
                  <option>Urban Apparel & Streetwear</option>
                  <option>Natural Skincare</option>
                  <option>Eco-Travel Gear</option>
                  <option>Consumer Electronics</option>
                  <option>Culinary & Hospitality</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Brand Description</label>
                <textarea
                  rows={2}
                  value={newBrand.description}
                  onChange={(e) => setNewBrand({ ...newBrand, description: e.target.value })}
                  placeholder="Briefly describe the brand archetype, mission, and aesthetic..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-sky-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Tone of Voice (Comma separated)</label>
                <input
                  type="text"
                  value={newBrand.toneOfVoice}
                  onChange={(e) => setNewBrand({ ...newBrand, toneOfVoice: e.target.value })}
                  placeholder="e.g. Bold, Minimal, Architectural"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-sky-500 focus:bg-white"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-3.5 py-2 rounded-xl font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl font-bold text-white bg-[#0284c7] hover:bg-[#0369a1] flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Calibrate & Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 3: Edit Guidelines */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-black text-slate-900">Edit URBANA Guidelines</h3>
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-4 space-y-3.5 text-xs text-left">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Tone Vector</label>
                <input
                  type="text"
                  defaultValue="Rebellious, Sophisticated Berber, Authentic"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Regional Guardrails
                </label>
                <textarea
                  rows={2}
                  defaultValue="Strict avoidance of generic Orientalist tropes; emphasize high-fashion brutalism & Casbah youth culture."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-3.5 py-2 rounded-xl font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    updateBrand('brand-urbana', {
                      toneOfVoice: ['Rebellious', 'Sophisticated Berber', 'Authentic'],
                      positioning: 'Strict avoidance of generic Orientalist tropes; emphasize high-fashion brutalism & Casbah youth culture.'
                    });
                    setIsEditModalOpen(false);
                    showToast('Brand guidelines updated and deployed to AI Studio agents!', 'success');
                  }}
                  className="px-4 py-2 rounded-xl font-bold text-white bg-[#0284c7] hover:bg-[#0369a1] cursor-pointer shadow-xs"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};