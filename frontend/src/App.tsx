import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import "./App.css";

import { LoginPage } from "./pages/login_page";
import { HomePage } from "./pages/home_page";
import { useEffect, useState } from "react";
import { AuthProvider } from "./context/auth_context";
import { NotFoundPage } from "./pages/not_found_page";
import { OidcPage } from "./pages/oidc_page";
import { Auth0Provider } from "@auth0/auth0-react";

function App() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	// TODO: サーバー側にtokenを検証する処理を実装
	useEffect(() => {
		const token = localStorage.getItem("authToken");
		if (token) {
			setIsAuthenticated(true);
		}
	}, []);

	return (
		<Router>
			<Routes>
				<Route path="/" element={<HomePage />} />

				<Route
					path="/login"
					element={
						<AuthProvider>
							<LoginPage />
						</AuthProvider>
					}
				/>

				<Route
					path="/oidc"
					element={
						<Auth0Provider
							domain={import.meta.env.VITE_APP_AUTH0_DOMAIN}
							clientId={import.meta.env.VITE_APP_AUTH0_CLIENT_ID}
							authorizationParams={{
								audience: import.meta.env.VITE_APP_AUTH0_AUDIENCE,
								redirect_uri: `${window.location.origin}/oidc`,
							}}
						>
							<OidcPage />
						</Auth0Provider>
					}
				/>
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</Router>
	);
}

export default App;
