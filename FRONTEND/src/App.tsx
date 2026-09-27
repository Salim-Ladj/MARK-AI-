import { useEffect, useState } from 'react';
import LoginPage from './pages/auth/LoginPage';
import SignUpPage from './pages/auth/SignUpPage';
import { AppProvider, useApp } from './context/AppContext';
import { MarketingLayout } from './layouts/MarketingLayout';
import { OverviewPage } from './pages/marketing/OverviewPage';

type Route = 'login' | 'signup' | 'overview';
type NavigationRoute = Route | 'forgot-password';

function routeFromPath(pathname: string): Route {
	const path = pathname.toLowerCase();
	if (path === '/signup') return 'signup';
	if (path === '/marketing/overview') return 'overview';
	return 'login';
}

function AppContent() {
	const { navigateTo } = useApp();
	const [route, setRoute] = useState<Route>(() => routeFromPath(window.location.pathname));

	useEffect(() => {
		const handlePopState = () => setRoute(routeFromPath(window.location.pathname));
		window.addEventListener('popstate', handlePopState);
		return () => window.removeEventListener('popstate', handlePopState);
	}, []);

	const navigate = (nextRoute: NavigationRoute) => {
		const path = nextRoute === 'signup' ? '/signup' : nextRoute === 'overview' ? '/marketing/overview' : '/login';
		window.history.pushState({}, '', path);
		setRoute(nextRoute === 'signup' ? 'signup' : nextRoute === 'overview' ? 'overview' : 'login');
		navigateTo(path);
	};

	if (route === 'overview') {
		return <MarketingLayout><OverviewPage /></MarketingLayout>;
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
