import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";

import { LoginPage } from "./components/pages/login_page";
import { HomePage } from "./components/pages/home_page";
import { useEffect, useState } from "react";

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
        <Route
          path="/"
          element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" /> : <LoginPage />}
        />
      </Routes>
    </Router>
  );
}

export default App;
