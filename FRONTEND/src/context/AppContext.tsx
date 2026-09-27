import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Brand } from '../types';
import { api } from '../services/api';

interface User {
	name: string;
	avatar?: string;
}

interface Campaign {
	id: string;
	name: string;
}

interface CalendarItem {
	id: string;
	title: string;
	brandId: string;
	brandName: string;
	campaignId: string;
	campaignName: string;
	platform: string;
	format: string;
	scheduledDate: string;
	scheduledTime: string;
	status: string;
	caption?: string;
	hashtags?: string;
	creator?: string;
	approvedBy?: string;
	mediaUrl?: string;
}

interface AppContextValue {
	currentRoute: string;
	navigateTo: (route: string) => void;
	currentUser: User;
	logout: () => void;
	loginAs: (team: 'marketing' | 'creative') => void;
	brands: Brand[];
	selectedBrand: Brand;
	setSelectedBrand: (brand: Brand) => void;
	addBrand: (brand: Omit<Brand, 'id'>) => Brand;
	updateBrand: (id: string, brand: Partial<Brand>) => void;
	campaigns: Campaign[];
	addCampaign: (campaign: Omit<Campaign, 'id'>) => Campaign;
	addTask: (task: Record<string, unknown>) => void;
	addCalendarItem: (item: Omit<CalendarItem, 'id'>) => void;
	showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const initialBrands: Brand[] = [
	{ id: 'brand-urbana', name: 'URBANA', industry: 'Urban Apparel & Streetwear', toneOfVoice: ['Bold', 'Cultural'] },
	{ id: 'brand-atlas', name: 'Atlas Botanicals', industry: 'Natural Skincare', toneOfVoice: ['Pure', 'Earthy', 'Zen'] },
	{ id: 'brand-sahara', name: 'Sahara Nomad', industry: 'Eco-Travel Gear', toneOfVoice: ['Rugged', 'Purposeful'] },
];

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
	const [currentRoute, setCurrentRoute] = useState(() =>
		window.location.pathname === '/' ? '/marketing/overview' : window.location.pathname,
	);
	const [brands, setBrands] = useState(initialBrands);
	const [campaigns, setCampaigns] = useState<Campaign[]>([
		{ id: 'camp-kasbah-fall', name: 'Casbah Pulse Winter Drop' },
		{ id: 'camp-urbana-core', name: 'URBANA Core Essentials' },
	]);
	const [calendarItems, setCalendarItems] = useState<CalendarItem[]>([]);
	const [selectedBrand, setSelectedBrand] = useState(initialBrands[0]);
	const [currentUser, setCurrentUser] = useState<User>({ name: 'Sarah Jenkins' });
	useEffect(() => {
		if (!localStorage.getItem('markai_token')) return;
		Promise.all([api.brands.getAll(), api.campaigns.getAll()])
			.then(([brandResponse, campaignResponse]) => {
				const loadedBrands = brandResponse.data as Brand[];
				const loadedCampaigns = campaignResponse.data as Campaign[];
				if (loadedBrands.length) {
					setBrands(loadedBrands);
					setSelectedBrand(loadedBrands[0]);
				}
				if (loadedCampaigns.length) setCampaigns(loadedCampaigns);
			})
			.catch((error: unknown) => console.warn('Marketing demo data unavailable; using local seed data.', error));
	}, []);
	const navigateTo = (route: string) => {
		if (window.location.pathname !== route) {
			window.history.pushState({}, '', route);
		}
		setCurrentRoute(route);
	};

	const value = useMemo<AppContextValue>(() => ({
		currentRoute,
		navigateTo,
		currentUser,
		logout: () => navigateTo('/login'),
		loginAs: (team) => {
			setCurrentUser({ name: team === 'creative' ? 'Alex Morgan' : 'Sarah Jenkins' });
			navigateTo(team === 'creative' ? '/creative/dashboard' : '/marketing/overview');
		},
		brands,
		campaigns,
		addCampaign: (campaignData) => {
			const campaign = { ...campaignData, id: `campaign-${Date.now()}` };
			setCampaigns((previous) => [...previous, campaign]);
			void api.campaigns.create(campaign).catch((error: unknown) => console.warn('Unable to sync campaign.', error));
			return campaign;
		},
		selectedBrand,
		setSelectedBrand,
		addBrand: (brandData) => {
			const brand = { ...brandData, id: `brand-${Date.now()}` };
			setBrands((previous) => [...previous, brand]);
			void api.brands.create(brand).catch((error: unknown) => console.warn('Unable to sync brand.', error));
			return brand;
		},
		updateBrand: (id, brandData) => {
			setBrands((previous) => previous.map((brand) => brand.id === id ? { ...brand, ...brandData } : brand));
			void api.brands.update(id, brandData).catch((error: unknown) => console.warn('Unable to sync brand update.', error));
		},
		addTask: (task) => {
			void api.tasks.create(task).catch((error: unknown) => console.warn('Unable to sync task.', error));
		},
		addCalendarItem: (item) => {
			setCalendarItems((previous) => [...previous, { ...item, id: `calendar-${Date.now()}` }]);
			void api.calendar.create(item).catch((error: unknown) => console.warn('Unable to sync calendar item.', error));
		},
		showToast: (message, type = 'success') => {
			console.info(`[${type}] ${message}`);
		},
	}), [brands, campaigns, currentRoute, currentUser, selectedBrand, calendarItems]);

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
	const context = useContext(AppContext);
	if (!context) {
		throw new Error('useApp must be used inside AppProvider');
	}
	return context;
}
