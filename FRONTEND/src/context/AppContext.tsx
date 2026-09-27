import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

interface Brand {
	id: string;
	name: string;
}

interface User {
	name: string;
	avatar?: string;
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
}

const brands: Brand[] = [
	{ id: 'urbana', name: 'URBANA' },
	{ id: 'northstar', name: 'Northstar' },
	{ id: 'atelier', name: 'Atelier 09' },
];

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
	const [currentRoute, setCurrentRoute] = useState('/marketing/overview');
	const [selectedBrand, setSelectedBrand] = useState(brands[0]);
	const [currentUser, setCurrentUser] = useState<User>({ name: 'Sarah Jenkins' });

	const value = useMemo<AppContextValue>(() => ({
		currentRoute,
		navigateTo: setCurrentRoute,
		currentUser,
		logout: () => setCurrentRoute('/login'),
		loginAs: (team) => {
			setCurrentUser({ name: team === 'creative' ? 'Alex Morgan' : 'Sarah Jenkins' });
			setCurrentRoute(team === 'creative' ? '/creative/dashboard' : '/marketing/overview');
		},
		brands,
		selectedBrand,
		setSelectedBrand,
	}), [currentRoute, currentUser, selectedBrand]);

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
	const context = useContext(AppContext);
	if (!context) {
		throw new Error('useApp must be used inside AppProvider');
	}
	return context;
}
