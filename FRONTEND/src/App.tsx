import { useEffect, useState } from 'react';
import LoginPage from './pages/auth/LoginPage';
import SignUpPage from './pages/auth/SignUpPage';

type AuthRoute = 'login' | 'signup';
type NavigationRoute = AuthRoute | 'forgot-password';

function routeFromPath(pathname: string): AuthRoute {
	return pathname.toLowerCase() === '/signup' ? 'signup' : 'login';
}

export default function App() {
	const [route, setRoute] = useState<AuthRoute>(() => routeFromPath(window.location.pathname));

	useEffect(() => {
		const handlePopState = () => setRoute(routeFromPath(window.location.pathname));
		window.addEventListener('popstate', handlePopState);
		return () => window.removeEventListener('popstate', handlePopState);
	}, []);

	const navigate = (nextRoute: NavigationRoute) => {
		window.history.pushState({}, '', nextRoute === 'signup' ? '/signup' : '/login');
		setRoute(nextRoute === 'signup' ? 'signup' : 'login');
	};

	if (route === 'signup') {
		return <SignUpPage onNavigate={navigate} />;
	}

	return <LoginPage onNavigate={navigate} onLoginSuccess={() => undefined} />;
}
