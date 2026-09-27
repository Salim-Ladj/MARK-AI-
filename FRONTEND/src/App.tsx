import { useEffect, useState } from 'react';
import LoginPage from './pages/auth/LoginPage';
import SignUpPage from './pages/auth/SignUpPage';
import { AppProvider, useApp } from './context/AppContext';
import { MarketingLayout } from './layouts/MarketingLayout';
import { OverviewPage } from './pages/marketing/OverviewPage';
import { BrandsPage } from './pages/marketing/BrandManagementPage';
import { AIStudioPage } from './pages/marketing/AIStudioPage';
import { CalendarPage } from './pages/marketing/CalendarPage';
import { CampaignsPage } from './pages/marketing/CampaignsPage';
import { PerformancePage } from './pages/marketing/PerformancePage';
import { CreativeTeamPage } from './pages/marketing/CreativeTeamPage';
import { AssetHubPage } from './pages/marketing/AssetHubPage';

type Route = 'login' | 'signup' | 'overview' | 'brands' | 'campaigns' | 'ai-studio' | 'calendar' | 'performance' | 'creative-team' | 'assets';
type NavigationRoute = Route | 'forgot-password';

function routeFromPath(pathname: string): Route {
	const path = pathname.toLowerCase();
	if (path === '/signup') return 'signup';
	if (path === '/marketing/overview') return 'overview';
	if (path === '/marketing/brands') return 'brands';
	if (path === '/marketing/campaigns') return 'campaigns';
	if (path === '/marketing/ai-studio') return 'ai-studio';
	if (path === '/marketing/calendar') return 'calendar';
	if (path === '/marketing/performance') return 'performance';
	if (path === '/marketing/creative-team') return 'creative-team';
	if (path === '/marketing/assets') return 'assets';
	return 'login';
}

function AppContent() {
	const { currentRoute, navigateTo } = useApp();
	const [route, setRoute] = useState<Route>(() => routeFromPath(window.location.pathname));

	useEffect(() => {
		const handlePopState = () => setRoute(routeFromPath(window.location.pathname));
		window.addEventListener('popstate', handlePopState);
		return () => window.removeEventListener('popstate', handlePopState);
	}, []);

	useEffect(() => {
		setRoute(routeFromPath(currentRoute));
	}, [currentRoute]);

	const navigate = (nextRoute: NavigationRoute) => {
		const path = nextRoute === 'signup'
			? '/signup'
			: nextRoute === 'brands'
				? '/marketing/brands'
				: nextRoute === 'campaigns'
					? '/marketing/campaigns'
					: nextRoute === 'ai-studio'
						? '/marketing/ai-studio'
						: nextRoute === 'calendar'
							? '/marketing/calendar'
							: nextRoute === 'performance'
								? '/marketing/performance'
								: nextRoute === 'creative-team'
									? '/marketing/creative-team'
									: nextRoute === 'assets'
										? '/marketing/assets'
				: nextRoute === 'overview' ? '/marketing/overview' : '/login';
		window.history.pushState({}, '', path);
		setRoute(nextRoute === 'signup' ? 'signup' : nextRoute === 'brands' ? 'brands' : nextRoute === 'campaigns' ? 'campaigns' : nextRoute === 'ai-studio' ? 'ai-studio' : nextRoute === 'calendar' ? 'calendar' : nextRoute === 'performance' ? 'performance' : nextRoute === 'creative-team' ? 'creative-team' : nextRoute === 'assets' ? 'assets' : nextRoute === 'overview' ? 'overview' : 'login');
		navigateTo(path);
	};

	if (route === 'overview') {
		return <MarketingLayout><OverviewPage /></MarketingLayout>;
	}

	if (route === 'brands') {
		return <MarketingLayout><BrandsPage /></MarketingLayout>;
	}

	if (route === 'campaigns') {
		return <MarketingLayout><CampaignsPage /></MarketingLayout>;
	}

	if (route === 'ai-studio') {
		return <MarketingLayout><AIStudioPage /></MarketingLayout>;
	}

	if (route === 'calendar') {
		return <MarketingLayout><CalendarPage /></MarketingLayout>;
	}

	if (route === 'performance') {
		return <MarketingLayout><PerformancePage /></MarketingLayout>;
	}

	if (route === 'creative-team') {
		return <MarketingLayout><CreativeTeamPage /></MarketingLayout>;
	}

	if (route === 'assets') {
		return <MarketingLayout><AssetHubPage /></MarketingLayout>;
	}

	if (route === 'signup') {
		return <SignUpPage onNavigate={navigate} />;
	}

	return <LoginPage onNavigate={navigate} onLoginSuccess={() => navigate('overview')} />;
}

export default function App() {
	return (
		<AppProvider>
			<AppContent />
		</AppProvider>
	);
}
