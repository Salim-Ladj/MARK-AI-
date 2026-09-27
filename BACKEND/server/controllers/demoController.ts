import { Request, Response } from 'express';
import { formatResponse } from '../utils/responseFormatter.js';

const brands = [
  { id: 'brand-urbana', name: 'URBANA', industry: 'Urban Apparel & Streetwear', toneOfVoice: ['Bold', 'Cultural'] },
  { id: 'brand-atlas', name: 'Atlas Botanicals', industry: 'Natural Skincare', toneOfVoice: ['Pure', 'Earthy', 'Zen'] },
  { id: 'brand-sahara', name: 'Sahara Nomad', industry: 'Eco-Travel Gear', toneOfVoice: ['Rugged', 'Purposeful'] },
];

const campaigns = [
  { id: 'camp-kasbah-fall', name: 'Casbah Pulse Winter Drop' },
  { id: 'camp-urbana-core', name: 'URBANA Core Essentials' },
];

const tasks: Record<string, unknown>[] = [];
const calendarItems: Record<string, unknown>[] = [];
const creativeSubmissions: Record<string, unknown>[] = [];
const revisionSubmissions: Record<string, unknown>[] = [];
const archivedWork: Record<string, unknown>[] = [];
const creativeBriefs = Array.from({ length: 14 }, (_, index) => ({
  id: `brief-${String(index + 1).padStart(2, '0')}`,
  status: 'approved',
  brand: 'URBANA CO.',
  title: index === 0 ? 'Casbah Pulse: 3D Turntable & Fabric Simulation' : `URBANA Production Brief ${index + 1}`,
}));

const list = (collection: unknown[]) => (_req: Request, res: Response) => {
  res.json(formatResponse.success(collection));
};

const create = (collection: Record<string, unknown>[], resource: string) => (req: Request, res: Response) => {
  const item = { ...req.body, id: `${resource}-${Date.now()}`, createdAt: new Date().toISOString() };
  collection.push(item);
  res.status(201).json(formatResponse.success(item, `${resource} created successfully`));
};

const update = (collection: Record<string, unknown>[]) => (req: Request, res: Response) => {
  const index = collection.findIndex((item) => item.id === req.params.id);
  if (index < 0) {
    res.status(404).json(formatResponse.error('Resource not found', 404));
    return;
  }
  collection[index] = { ...collection[index], ...req.body, id: req.params.id, updatedAt: new Date().toISOString() };
  res.json(formatResponse.success(collection[index], 'Resource updated successfully'));
};

export const demoController = {
  getBrands: list(brands),
  createBrand: create(brands, 'brand'),
  updateBrand: update(brands),
  getCampaigns: list(campaigns),
  createCampaign: create(campaigns, 'campaign'),
  getTasks: list(tasks),
  createTask: create(tasks, 'task'),
  getCalendar: list(calendarItems),
  createCalendar: create(calendarItems, 'calendar'),
  getAssets: list([]),
  getCreativeTeam: list([]),
  getCreativeDashboard: (_req: Request, res: Response) => res.json(formatResponse.success({
    assigned: 3,
    dueThisWeek: 1,
    underReview: 1,
    revisions: 1,
    passed: 14,
  })),
  getCreativeBriefs: list(creativeBriefs),
  getCreativeReviews: list(revisionSubmissions),
  getCompletedWork: list(archivedWork),
  submitCreativeWork: create(creativeSubmissions, 'creative-submission'),
  submitRevision: create(revisionSubmissions, 'revision'),
  archiveWork: create(archivedWork, 'archive'),
  getPerformance: (_req: Request, res: Response) => res.json(formatResponse.success({
    reach: 842600,
    impressions: 2140000,
    engagementRate: 5.82,
    linkClicks: 48900,
    attributedOrders: 1420,
  })),
  getOverview: (_req: Request, res: Response) => res.json(formatResponse.success({
    activeBrands: brands.length,
    liveCampaigns: 4,
    scheduledDrops: 18,
    completedAssets: 42,
    activeCampaigns: [
      { id: 'camp-kasbah-fall', name: 'Casbah Pulse 2025', channel: 'Instagram & TikTok Viral Seeding', pace: 70 },
      { id: 'camp-urbana-core', name: 'Desert Techwear', channel: 'Lookbook App & Web Exclusive', pace: 48 },
    ],
  })),
};
