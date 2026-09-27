import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  FolderOpen,
  Plus,
  Search,
  ChevronDown,
  SlidersHorizontal,
  LayoutGrid,
  List,
  CheckCircle2,
  Box,
  Download,
  Share2,
  Check,
  X,
  Trash2,
  Archive,
  Play
} from 'lucide-react';

interface AssetItem {
  id: string;
  name: string;
  type: '3D' | 'VIDEO' | 'PHOTO' | 'VECTOR';
  status: 'Approved' | 'Review';
  resolution: string;
  fileFormat: string;
  size: string;
  tags: string[];
  creator: string;
  creatorAvatar: string;
  image: string;
  description: string;
  campaign: string;
  duration?: string;
}

export const AssetHubPage: React.FC = () => {
  const { showToast } = useApp();

  const [activeType, setActiveType] = useState('All Types (22)');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAssetId, setSelectedAssetId] = useState<string>('asset-1');
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const assets: AssetItem[] = [
    {
      id: 'asset-1',
      name: 'Casbah_Parka_3D_Render_4K.png',
      type: '3D',
      status: 'Approved',
      resolution: '3840 × 2160 (4K UHD)',
      fileFormat: 'PNG • sRGB 16-bit',
      size: '14.2 MB',
      tags: ['#3D', '#Lookbook', '#URBANA'],
      creator: 'Alex Rivera',
      creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80',
      description: 'Production-ready garment render for omni-channel e-commerce lookbook & hero ads.',
      campaign: 'Casbah Pulse 2025'
    },
    {
      id: 'asset-2',
      name: 'Casbah_Pulse_Teaser_Reel_vFinal.mp4',
      type: 'VIDEO',
      status: 'Approved',
      resolution: '1080 × 1920 (9:16 Vertical)',
      fileFormat: 'MP4 • H.265 Master',
      size: '48.5 MB',
      tags: ['#Reels', '#TikTok', '#Pulse25'],
      creator: 'Maya Chen',
      creatorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80',
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
      description: 'Fast-paced opening hook reel with synchronized electro-raï soundtrack for TikTok ad sets.',
      campaign: 'Casbah Pulse 2025',
      duration: '00:24'
    },
    {
      id: 'asset-3',
      name: 'Berber_Embroidery_Macro_Zoom.jpg',
      type: 'PHOTO',
      status: 'Approved',
      resolution: '5120 × 2880 (5K Raw)',
      fileFormat: 'JPG • 300 DPI Raw',
      size: '8.7 MB',
      tags: ['#Macro', '#FabricCraft', '#Editorial'],
      creator: 'Devon Kim',
      creatorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80',
      description: 'High-magnification textile macro shot highlighting authentic Numidian geometric stitching on waterproof nylon.',
      campaign: 'Casbah Pulse 2025'
    },
    {
      id: 'asset-4',
      name: 'URBANA_Typography_Lockup_Dark.svg',
      type: 'VECTOR',
      status: 'Approved',
      resolution: 'Infinite Vector',
      fileFormat: 'SVG • Clean Paths',
      size: '340 KB',
      tags: ['#Identity', '#Logotype', '#DarkTheme'],
      creator: 'Sarah Jenkins',
      creatorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      description: 'Official master vector brand lockup with Berber geometric glyph accents and techwear sub-branding.',
      campaign: 'Casbah Pulse 2025'
    }
  ];

  const selectedAsset = assets.find((a) => a.id === selectedAssetId) || assets[0];

  return (
    <div className="space-y-6 pb-12 font-sans antialiased text-slate-800">
      {/* 1. Subheader Row */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <div className="text-[11px] font-bold text-sky-600 tracking-wider uppercase mb-1">
            CENTRAL DAM REPOSITORY • 42.8 GB / 100 GB Pooled Storage
          </div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Asset Hub
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-sky-50 text-sky-700 border border-sky-100">
              URBANA Master
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="bg-sky-50/70 border border-sky-100 rounded-2xl p-2 px-3 flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-sky-100 text-sky-600 flex items-center justify-center">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="text-[9px] font-semibold text-slate-400">Compliance</div>
              <div className="text-xs font-bold text-slate-900">99.4%</div>
            </div>
          </div>

          <div className="bg-sky-50/70 border border-sky-100 rounded-2xl p-2 px-3 flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-sky-100 text-sky-600 flex items-center justify-center">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="text-[9px] font-semibold text-slate-400">Verified Assets</div>
              <div className="text-xs font-bold text-slate-900">1,248</div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsUploadOpen(true)}
            className="px-4 py-2 rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-bold shadow-sm shadow-sky-600/25 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Upload Asset
          </button>
        </div>
      </div>

      {/* 2. Filter & Sort Bar */}
      <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-3 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2 flex-1">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by asset title, tag, or creator..."
              className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-sky-500 shadow-2xs"
            />
          </div>

          <div className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 shadow-2xs flex items-center gap-1.5 cursor-pointer">
            <span>Brand: URBANA</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </div>

          <div className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 shadow-2xs flex items-center gap-1.5 cursor-pointer">
            <span>Campaign: Casbah Pulse 2025</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </div>

          <div className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 shadow-2xs flex items-center gap-1.5 cursor-pointer">
            <span>Status: All (Approved + Review)</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </div>

          <button className="p-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-500 cursor-pointer">
            <SlidersHorizontal className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-semibold">Sort:</span>
          <div className="px-2.5 py-1 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800 shadow-2xs flex items-center gap-1 cursor-pointer">
            <span>Date Modified</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </div>
          <div className="flex items-center bg-white p-1 rounded-xl border border-slate-200/80 shadow-2xs">
            <button className="p-1 rounded-lg bg-sky-50 text-sky-600">
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button className="p-1 rounded-lg text-slate-400 hover:text-slate-700">
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Types Filter Pills */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-1.5">
          {['All Types (22)', 'Videos (11)', 'Images (14)', '3D Renders (4)', 'Vectors (3)'].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setActiveType(t)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                activeType === t
                  ? 'bg-[#0284c7] text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5 text-slate-500 font-medium text-[11px]">
          <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
          <span>Auto-sync active: URBANA Drive linked</span>
        </div>
      </div>

      {/* 4. Active Brand Directories (Folders) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-slate-900 flex items-center gap-1.5">
            <FolderOpen className="w-3.5 h-3.5 text-sky-600" />
            Active Brand Directories
          </span>
          <button
            onClick={() => showToast('Folder hierarchy management opened')}
            className="text-sky-600 font-bold hover:underline cursor-pointer"
          >
            Organize hierarchy &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-white rounded-2xl border border-slate-200/90 p-3.5 flex items-center justify-between shadow-2xs hover:border-sky-300 transition-colors cursor-pointer">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
                <FolderOpen className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">URBANA / Casbah Pulse 2025</div>
                <div className="text-[10px] text-slate-400">18 assets • 1.4 GB updated 2h ago</div>
              </div>
            </div>
            <span className="text-slate-400">&rsaquo;</span>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 p-3.5 flex items-center justify-between shadow-2xs hover:border-sky-300 transition-colors cursor-pointer">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
                <FolderOpen className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">URBANA / Brand Identity Kits</div>
                <div className="text-[10px] text-slate-400">6 assets • Master Logotypes & SVGs</div>
              </div>
            </div>
            <span className="text-slate-400">&rsaquo;</span>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 p-3.5 flex items-center justify-between shadow-2xs hover:border-sky-300 transition-colors cursor-pointer">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <FolderOpen className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">URBANA / Desert Techwear</div>
                <div className="text-[10px] text-slate-400">8 assets • Lookbook Season 04</div>
              </div>
            </div>
            <span className="text-slate-400">&rsaquo;</span>
          </div>
        </div>
      </div>

      {/* 5. Main Split: Asset Cards Grid + Right Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {assets.map((asset) => {
            const isSelected = selectedAssetId === asset.id;
            return (
              <div
                key={asset.id}
                onClick={() => setSelectedAssetId(asset.id)}
                className={`bg-white rounded-3xl border shadow-xs overflow-hidden flex flex-col justify-between cursor-pointer transition-all ${
                  isSelected
                    ? 'border-[#0284c7] ring-2 ring-sky-200 shadow-md'
                    : 'border-slate-200/90 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="relative h-44 bg-slate-950 overflow-hidden">
                    <img
                      src={asset.image}
                      alt={asset.name}
                      className="w-full h-full object-cover opacity-90 hover:scale-102 transition-transform duration-500"
                    />

                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded-md text-[9px] font-black bg-slate-900/80 backdrop-blur-md text-white">
                        {asset.type}
                      </span>
                      {asset.duration && (
                        <span className="px-2 py-0.5 rounded-md text-[9px] font-bold bg-slate-900/80 text-white">
                          {asset.duration}
                        </span>
                      )}
                    </div>

                    <span className="absolute top-2.5 right-2.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {asset.status}
                    </span>

                    {asset.type === 'VIDEO' && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-[#0284c7]/90 text-white flex items-center justify-center shadow-lg">
                          <Play className="w-4 h-4 fill-white ml-0.5" />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="p-3.5 space-y-1">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-bold text-[#0284c7]">URBANA</span>
                      <span className="text-slate-400 font-medium">{asset.size}</span>
                    </div>

                    <h4 className="text-xs font-bold text-slate-900 truncate">
                      {asset.name}
                    </h4>

                    <div className="text-[10px] text-slate-400">
                      {asset.resolution} • {asset.fileFormat}
                    </div>

                    <div className="flex flex-wrap gap-1 pt-1">
                      {asset.tags.map((tg) => (
                        <span key={tg} className="text-[10px] text-slate-500 font-semibold">
                          {tg}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="px-3.5 py-2.5 border-t border-slate-100 flex items-center justify-between text-xs bg-slate-50/50">
                  <div className="flex items-center gap-2">
                    <img
                      src={asset.creatorAvatar}
                      alt={asset.creator}
                      className="w-5 h-5 rounded-full object-cover border border-slate-200"
                    />
                    <span className="text-[11px] font-semibold text-slate-700">{asset.creator}</span>
                  </div>
                  <span className="text-slate-400 hover:text-slate-600">•••</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Asset Inspector */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-sm space-y-5 sticky top-20">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Box className="w-4 h-4 text-sky-600" />
              <h3 className="text-sm font-bold text-slate-900">Asset Inspector</h3>
            </div>
            <button className="text-slate-400 hover:text-slate-700 p-1 rounded-lg">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-200">
            <img
              src={selectedAsset.image}
              alt={selectedAsset.name}
              className="w-full h-52 object-cover opacity-90"
            />
            <span className="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-lg bg-slate-900/80 backdrop-blur-md text-[10px] font-bold text-white">
              {selectedAsset.resolution}
            </span>
          </div>

          <div>
            <div className="flex items-center justify-between text-[10px]">
              <span className="px-2 py-0.5 rounded-full font-bold bg-sky-50 text-sky-700 border border-sky-100">
                Active Master File
              </span>
              <span className="text-slate-400 font-mono">ID: ASSET-98214</span>
            </div>
            <h4 className="text-sm font-black text-slate-900 mt-1">{selectedAsset.name}</h4>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              {selectedAsset.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => showToast(`Downloaded ${selectedAsset.name} (Master RAW)`, 'success')}
              className="py-2.5 px-3 rounded-xl font-bold text-white bg-[#0284c7] hover:bg-[#0369a1] text-xs flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              Download
            </button>
            <button
              type="button"
              onClick={() => showToast('Asset share link copied to clipboard!')}
              className="py-2.5 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              Share Link
            </button>
          </div>

          <div className="border-t border-slate-100 pt-3 space-y-2 text-xs">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              GOVERNANCE & OWNERSHIP
            </span>
            <div className="flex items-center justify-between bg-slate-50 rounded-xl p-2.5">
              <div className="flex items-center gap-2">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80"
                  alt="Sarah Jenkins"
                  className="w-6 h-6 rounded-full object-cover"
                />
                <div>
                  <div className="text-[11px] font-bold text-slate-900">Sarah Jenkins</div>
                  <div className="text-[9px] text-slate-400">Approving Marketer</div>
                </div>
              </div>
              <span className="text-emerald-600 font-bold text-[10px] flex items-center gap-0.5">
                <Check className="w-3 h-3" /> Signed
              </span>
            </div>

            <div className="space-y-1.5 text-[11px] pt-1 text-slate-600">
              <div className="flex justify-between">
                <span className="text-slate-400">Linked Campaign</span>
                <span className="font-semibold text-slate-800">{selectedAsset.campaign}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Creator</span>
                <span className="font-semibold text-slate-800">{selectedAsset.creator} (3D Lead)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Rights & License</span>
                <span className="font-semibold text-sky-600">Commercial Worldwide</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Expiration</span>
                <span className="font-semibold text-slate-800">Dec 31, 2026</span>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-3 space-y-2 text-xs">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              AUDIT ACTIVITY
            </span>
            <div className="space-y-1.5 text-[11px]">
              <div>
                <span className="font-bold text-slate-800 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" /> Final Colorway Approved
                </span>
                <span className="text-slate-400 text-[10px] pl-2.5">Sarah Jenkins • Yesterday at 4:18 PM</span>
              </div>
              <div>
                <span className="font-bold text-slate-800 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500" /> 4K Blender Render Ingested
                </span>
                <span className="text-slate-400 text-[10px] pl-2.5">Alex Rivera via Cloud Sync • Oct 24, 11:02 AM</span>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-3 flex items-center justify-between text-xs">
            <button
              type="button"
              onClick={() => showToast('Asset moved to trash')}
              className="text-rose-600 font-bold hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" /> Delete Asset
            </button>
            <button
              type="button"
              onClick={() => showToast('Asset archived')}
              className="text-slate-500 font-bold hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Archive className="w-3.5 h-3.5" /> Archive
            </button>
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {isUploadOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-black text-slate-900">Upload New Master Asset</h3>
              <button
                type="button"
                onClick={() => setIsUploadOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-4 border-2 border-dashed border-sky-300 rounded-2xl p-6 text-center bg-sky-50/50">
              <Download className="w-8 h-8 text-sky-600 mx-auto rotate-180" />
              <p className="text-xs font-bold text-slate-800 mt-2">
                Drag and drop 4K media, USDZ 3D models, or SVGs
              </p>
              <p className="text-[10px] text-slate-400 mt-1">Supports ProRes, MP4, PNG, USDZ up to 500MB</p>
            </div>

            <div className="mt-4 space-y-3 text-xs text-left">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Asset Title</label>
                <input
                  type="text"
                  placeholder="e.g. Casbah_Hoodie_Backprint_4K"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Target Directory</label>
                <select className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl">
                  <option>URBANA / Casbah Pulse 2025</option>
                  <option>URBANA / Brand Identity Kits</option>
                  <option>URBANA / Desert Techwear</option>
                </select>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsUploadOpen(false)}
                className="px-3.5 py-2 rounded-xl font-semibold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsUploadOpen(false);
                  showToast('Uploaded asset to URBANA Master Repository!', 'success');
                }}
                className="px-4 py-2 rounded-xl font-bold text-white bg-[#0284c7] hover:bg-[#0369a1] shadow-xs cursor-pointer"
              >
                Ingest & Verify
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};