import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import ReportPage from "./components/ReportPage";

function App() {
  return (
    <>
      <button onClick={() => (window.location.href = "/report")}>
        View Report
      </button>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/report" element={<ReportPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
