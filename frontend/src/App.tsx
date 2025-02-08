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
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</Router>
	);
}

export default App;
