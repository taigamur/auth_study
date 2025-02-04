import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import { HomePage } from "./pages/home_page";
import { useEffect, useState } from "react";
import { NotFoundPage } from "./pages/not_found_page";
import { LoginPage } from "./pages/login_page";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
