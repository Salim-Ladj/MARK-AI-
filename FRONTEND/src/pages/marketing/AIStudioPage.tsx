import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  Sliders,
  ChevronDown,
  Layers,
  CalendarPlus,
  Send,
  Download,
  Code,
  Maximize2,
  Copy,
  Check,
  Zap,
  Music,
  Tv,
  Instagram,
  Facebook,
  Linkedin,
  Youtube
} from 'lucide-react';

export const AIStudioPage: React.FC = () => {
  const { selectedBrand, campaigns, showToast, addTask, addCalendarItem } = useApp();

  const [objective, setObjective] = useState('Drive Viral Engagement & DTC Pre-Orders');
  const [selectedChannels, setSelectedChannels] = useState<string[]>(['Instagram', 'TikTok']);
  const [creativeFormat, setCreativeFormat] = useState<'Post' | 'Reel' | 'Story' | 'Carousel' | 'Video'>('Reel');
  const [toneSetting, setToneSetting] = useState<'english' | 'bilingual' | 'maghreb'>('bilingual');
  const [slangPercentage] = useState(45);
  const [creativeDirectives, setCreativeDirectives] = useState(
    'Spotlight Berber hand-embroidered geometric tags on our heavy 340gsm waterproof nylon parka. Emphasize limited 48h preorder drop.'
  );

  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedCTA, setCopiedCTA] = useState(false);

  const handleCopyCTA = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCTA(true);
    showToast('CTA copied to clipboard!', 'success');
    setTimeout(() => setCopiedCTA(false), 2000);
  };

  const handleCreateTaskFromBrief = (title: string) => {
    addTask({
      title: `Production: ${title}`,
      brandId: selectedBrand?.id || 'brand-urbana',
      brandName: selectedBrand?.name || 'URBANA',
      campaignId: campaigns[0]?.id || 'camp-kasbah-fall',
      campaignName: campaigns[0]?.name || 'Casbah Pulse Winter Drop',
      assignedToId: 'user-crt-1',
      assignedToName: 'Alex Rivera',
      priority: 'high',
      dueDate: '2026-10-18',
      format: 'Story/Reel 9:16',
      brief: {
        summary: creativeDirectives,
        dimensions: '1080x1920',
        tone: 'Bold & Cultural',
        keyElements: ['Berber Geometric Crest', '450GSM Nylon Texture', 'Cheb Kadir Audio Hook'],
        references: ['https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80']
      }
    });
    showToast('Creative task created and assigned to Alex Rivera!', 'success');
  };

  const handleAddToCalendar = (title: string) => {
    addCalendarItem({
      title,
      brandId: selectedBrand?.id || 'brand-urbana',
      brandName: selectedBrand?.name || 'URBANA',
      campaignId: campaigns[0]?.id || 'camp-kasbah-fall',
      campaignName: campaigns[0]?.name || 'Casbah Pulse Winter Drop',
      platform: 'Instagram',
      format: 'Reel',
      scheduledDate: '2026-11-18',
      scheduledTime: '16:00',
      caption: creativeDirectives,
      hashtags: '#UrbanaDrop #AlgiersStreetwear #CasbahPulse #NorthAfricanDesign',
      status: 'scheduled',
      creator: 'Sarah Jenkins',
      approvedBy: 'Sarah Jenkins',
      mediaUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80'
    });
    showToast('Scheduled to Content Calendar for Nov 18, 4:00 PM!', 'success');
  };

  const toggleChannel = (channel: string) => {
    setSelectedChannels((prev) =>
      prev.includes(channel) ? prev.filter((c) => c !== channel) : [...prev, channel]
    );
  };

  return (
    <div className="space-y-6 pb-12 font-sans antialiased text-slate-800">
      {/* 1. Subheader Row */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="text-[11px] font-bold text-sky-600 tracking-wider uppercase mb-1 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
            <span>GENERATIVE ENGINE • Model: OmniMarketing v4.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            AI Studio — Generative Marketing Engine
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 shadow-2xs flex items-center gap-1.5 cursor-pointer">
            <span className="text-slate-400">Brand Profile:</span>
            <span className="font-bold text-slate-900">{selectedBrand?.name || 'URBANA'}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </div>

          <div className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 shadow-2xs flex items-center gap-1.5 cursor-pointer">
            <span className="text-slate-400">Target Campaign:</span>
            <span className="font-bold text-slate-900">Casbah Pulse Winter Dro</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </div>

          <button
            type="button"
            onClick={() => showToast('URBANA v3.2 Brand Ruleset Loaded', 'info')}
            className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-semibold text-slate-700 shadow-2xs flex items-center gap-1.5 cursor-pointer"
          >
            <Sliders className="w-3.5 h-3.5 text-sky-600" />
            <span>Brand Ruleset</span>
          </button>
        </div>
      </div>

      {/* 2. Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Parameters */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-sky-600" />
              <h2 className="text-sm font-bold text-slate-900">Synthesis Parameters</h2>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-sky-50 text-sky-700 border border-sky-100">
              URBANA • Algerian Streetwear
            </span>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-slate-700">Primary Campaign Objective</label>
              <span className="text-[10px] font-bold text-sky-600">High Conversion</span>
            </div>
            <select
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200/90 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-sky-500 focus:bg-white transition-all cursor-pointer"
            >
              <option>Drive Viral Engagement & DTC Pre-Orders</option>
              <option>Brand Equity & Cultural Resonance</option>
              <option>Lookbook Video Hype Seeding</option>
            </select>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-700">Audience Cohort Specifier</label>
              <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                Matched (128k reach)
              </span>
            </div>
            <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200/80 text-xs text-slate-600 leading-relaxed">
              Gen Z & Millennials in Algiers, Paris, London interested in North African diaspora street culture, techno raï, brutalist fashion & utilitarian outerwear.
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Channel Deployment</label>
            <div className="flex flex-wrap gap-1.5">
              {[
                { name: 'Instagram', icon: Instagram },
                { name: 'TikTok', icon: Tv },
                { name: 'YouTube Shorts', icon: Youtube },
                { name: 'Facebook', icon: Facebook },
                { name: 'LinkedIn', icon: Linkedin }
              ].map(({ name, icon: Icon }) => {
                const isActive = selectedChannels.includes(name);
                return (
                  <button
                    key={name}
                    type="button"
                    onClick={() => toggleChannel(name)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#0284c7] text-white shadow-xs'
                        : 'bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Creative Format Engine</label>
            <div className="grid grid-cols-5 gap-1.5 text-center">
              {(['Post', 'Reel', 'Story', 'Carousel', 'Video'] as const).map((fmt) => (
                <button
                  key={fmt}
                  type="button"
                  onClick={() => setCreativeFormat(fmt)}
                  className={`py-2 px-1 rounded-xl text-xs font-bold transition-all cursor-pointer flex flex-col items-center gap-1 ${
                    creativeFormat === fmt
                      ? 'bg-[#0284c7] text-white shadow-xs'
                      : 'bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span className="text-[10px]">{fmt}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-sky-50/50 rounded-2xl p-3.5 border border-sky-100 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">Tone: Bold & Culturally Rooted</span>
              <span className="text-[10px] font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded-full">
                Slang Darija: {slangPercentage}%
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              {[
                { label: 'Pure Global English', key: 'english' },
                { label: 'Bilingual Code-Switch', key: 'bilingual' },
                { label: 'Heavy Maghreb Slang', key: 'maghreb' }
              ].map(({ label, key }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setToneSetting(key as any)}
                  className={`flex-1 py-1.5 px-2 rounded-lg text-[10px] font-bold text-center transition-all cursor-pointer ${
                    toneSetting === key
                      ? 'bg-white text-sky-700 shadow-xs border border-sky-200'
                      : 'text-slate-500 hover:bg-white/60'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Creative Directives & Specific Focus
            </label>
            <textarea
              rows={3}
              value={creativeDirectives}
              onChange={(e) => setCreativeDirectives(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200/90 rounded-2xl text-xs text-slate-800 focus:outline-none focus:border-sky-500 focus:bg-white transition-all leading-relaxed"
            />
            <div className="flex flex-wrap gap-1 mt-2">
              {[
                '+ Highlight Berber embroidery on waterproof nylon',
                '+ Urgent limited drop 48h',
                '+ Creator review hook'
              ].map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => setCreativeDirectives((prev) => `${prev} ${chip.replace('+', '')}`)}
                  className="text-[10px] font-semibold text-sky-700 bg-sky-50 border border-sky-200/60 px-2 py-0.5 rounded-md hover:bg-sky-100 transition-colors cursor-pointer"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>

          <div>
            <button
              type="button"
              disabled={isGenerating}
              onClick={() => {
                setIsGenerating(true);
                setTimeout(() => {
                  setIsGenerating(false);
                  showToast('Synthesized 2 new strategy briefs!', 'success');
                }, 800);
              }}
              className="w-full py-3 px-4 rounded-2xl font-bold text-white bg-gradient-to-r from-[#0284c7] via-[#0ea5e9] to-[#38bdf8] hover:opacity-95 shadow-md shadow-sky-500/25 active:scale-[0.99] transition-all flex items-center justify-center gap-2 text-xs tracking-wide cursor-pointer disabled:opacity-70"
            >
              {isGenerating ? (
                <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Generate with MarkAi Engine
                </>
              )}
            </button>
            <p className="text-[10px] text-center text-slate-400 mt-2">
              URBANA Brand Safety Guardrails Active • v2.4
            </p>
          </div>

          <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-3.5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">Campaign Predictive Resonance</span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Top 4% Industry
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center pt-1">
              <div>
                <div className="text-[10px] text-slate-400 font-semibold">Expected CTR</div>
                <div className="text-sm font-black text-[#0284c7] mt-0.5">5.82%</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400 font-semibold">Est. Reach</div>
                <div className="text-sm font-black text-slate-800 mt-0.5">42.5K</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400 font-semibold">Brand Fit</div>
                <div className="text-sm font-black text-emerald-600 mt-0.5">99.4%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Output Strategy Cards */}
        <div className="lg:col-span-7 space-y-5">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-3 px-4 flex items-center justify-between shadow-2xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-slate-900">
                2 AI Strategy Briefs Synthesized
              </span>
              <span className="text-[10px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md font-mono">
                Latency: 1.14s
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400">
              <button className="p-1 hover:text-slate-700 rounded-lg hover:bg-slate-100">
                <Download className="w-3.5 h-3.5" />
              </button>
              <button className="p-1 hover:text-slate-700 rounded-lg hover:bg-slate-100">
                <Code className="w-3.5 h-3.5" />
              </button>
              <button className="p-1 hover:text-slate-700 rounded-lg hover:bg-slate-100">
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Strategy Card 1 */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200">
                  REEL CAMPAIGN 01
                </span>
                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  High Virality Probability
                </span>
              </div>
              <span className="text-xs font-bold text-sky-600 flex items-center gap-1">
                <Zap className="w-3.5 h-3.5" /> 9.6/10
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
              Concept: Casbah Cyber-Nomad Reel Hook
            </h3>

            <div className="bg-sky-50/70 border border-sky-200/80 rounded-2xl p-4">
              <div className="text-[10px] font-bold text-sky-700 uppercase tracking-wider mb-1">
                OPENING HOOK (0:00 - 0:02)
              </div>
              <p className="text-sm font-black text-slate-900 italic">
                “Think streetwear is just London and Tokyo? Watch what Algiers is crafting.”
              </p>
            </div>

            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                SOCIAL CAPTION (MULTILINGUAL / DARIJA-INFUSED)
              </div>
              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                We did not wait for approval. Casbah roots meet brutalist weather-proof fabrication. Designed in El-Harrach, engineered for the sub-zero diaspora wind. Sahbi, the batch is limited. Khallas, step into the circle.{' '}
                <span className="text-sky-600 font-semibold">
                  #UrbanaDrop #AlgiersStreetwear #CasbahPulse #NorthAfricanDesign
                </span>
              </p>
            </div>

            <div className="bg-sky-100/60 border border-sky-200 rounded-xl p-3 flex items-center justify-between gap-3 text-xs">
              <span className="font-semibold text-slate-800 truncate">
                <span className="font-bold text-sky-700">CTA:</span> "Tap link in bio to claim early drop access before batch 01 sells out."
              </span>
              <button
                type="button"
                onClick={() => handleCopyCTA('Tap link in bio to claim early drop access before batch 01 sells out.')}
                className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-sky-700 font-bold text-[11px] shrink-0 hover:bg-slate-50 cursor-pointer flex items-center gap-1"
              >
                {copiedCTA ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                Copy CTA
              </button>
            </div>

            <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50/50 flex flex-col sm:flex-row gap-4 items-start">
              <div className="relative w-full sm:w-44 h-36 rounded-xl overflow-hidden shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80"
                  alt="Visual Moodboard"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-slate-900/80 backdrop-blur-md text-[9px] font-bold text-white">
                  Visual Moodboard
                </span>
              </div>
              <div className="space-y-2 flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900">Creative Production Brief</h4>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-100 text-sky-800">
                    9:16 Vertical • 15s Reel
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  <span className="font-semibold text-slate-700">Visual Direction:</span> Dark moody cinematic aesthetic, rainy Algiers Kasbah cobblestones, macro shot of embroidered Berber geometric crest on waterproof oversized parka. High tempo electronic Raï fusion audio sync with micro-glitch transitions.
                </p>
                <div className="flex items-center gap-4 text-[10px] text-slate-500 pt-1">
                  <span className="flex items-center gap-1">
                    <Music className="w-3 h-3 text-sky-600" /> "Cheb Kadir (Kavinsky Remix)"
                  </span>
                  <span>1080 x 1920</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-100 text-xs">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => showToast('Regenerated fresh angle hook!')}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 font-semibold text-slate-700 cursor-pointer"
                >
                  Regenerate
                </button>
                <button
                  type="button"
                  onClick={() => showToast('Edit copy drawer opened')}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 font-semibold text-slate-700 cursor-pointer"
                >
                  Edit Copy
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleAddToCalendar('Concept: Casbah Cyber-Nomad Reel')}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 font-bold text-slate-700 flex items-center gap-1.5 cursor-pointer"
                >
                  <CalendarPlus className="w-3.5 h-3.5 text-slate-500" />
                  Add to Calendar
                </button>
                <button
                  type="button"
                  onClick={() => handleCreateTaskFromBrief('Casbah Cyber-Nomad Reel Hook')}
                  className="px-3.5 py-1.5 rounded-xl font-bold text-white bg-[#0284c7] hover:bg-[#0369a1] flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  Create Creative Task
                </button>
              </div>
            </div>
          </div>

          {/* Strategy Card 2 */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-cyan-700 bg-cyan-50 px-2.5 py-0.5 rounded-full border border-cyan-200">
                  CAROUSEL STRATEGY 02
                </span>
                <span className="text-[10px] font-semibold text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200">
                  High Saves & Shares
                </span>
              </div>
              <span className="text-xs font-bold text-cyan-600 flex items-center gap-1">
                <Zap className="w-3.5 h-3.5" /> 9.3/10
              </span>
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                Concept: Berber Geometry 3D Render Carousel
              </h3>
              <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold mt-1">
                <span>CAROUSEL ARCHITECTURE (5 MULTI-ASSET SLIDES)</span>
                <span className="text-sky-600">Swipe sequence optimized</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="border border-slate-200 rounded-2xl p-2.5 bg-slate-50/50 space-y-2">
                <div className="relative h-28 rounded-xl overflow-hidden bg-slate-900">
                  <img
                    src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=400&q=80"
                    alt="Slide 1"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-slate-900/80 text-[9px] font-bold text-white">
                    Slide 1 • Hook
                  </span>
                </div>
                <div className="text-[11px] font-bold text-slate-900">
                  Ancient Amulet &rarr; Street Hardware
                </div>
              </div>

              <div className="border border-slate-200 rounded-2xl p-2.5 bg-slate-50/50 space-y-2">
                <div className="relative h-28 rounded-xl overflow-hidden bg-slate-900">
                  <img
                    src="https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=400&q=80"
                    alt="Slide 2"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-slate-900/80 text-[9px] font-bold text-white">
                    Slide 2 • Specs
                  </span>
                </div>
                <div className="text-[11px] font-bold text-slate-900">
                  5-Layer Weatherproof Breakdown
                </div>
              </div>

              <div className="border border-slate-200 rounded-2xl p-2.5 bg-slate-50/50 space-y-2">
                <div className="relative h-28 rounded-xl overflow-hidden bg-slate-900">
                  <img
                    src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=400&q=80"
                    alt="Slide 3"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-slate-900/80 text-[9px] font-bold text-white">
                    Slide 3 • On-Body
                  </span>
                </div>
                <div className="text-[11px] font-bold text-slate-900">
                  Lookbook & Silhouette in Wild
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                SLIDE 5 CLOSING CTA & CAPTION SNIPPET
              </span>
              <p className="text-xs text-slate-600 leading-relaxed italic">
                “Every seam carries 2,000 years of Numidian geometry re-coded for cold European winters. Batch 01 drops Saturday 20:00 CET. Members with secret code get 15-min headstart.”
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 text-xs">
              <button
                type="button"
                onClick={() => handleCreateTaskFromBrief('Berber Geometry 3D Render Carousel')}
                className="px-3.5 py-1.5 rounded-xl font-bold text-white bg-[#0284c7] hover:bg-[#0369a1] flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                Create Creative Task
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};