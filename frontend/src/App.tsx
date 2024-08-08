import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import ReportPage from "./components/ReportPage";
import Menu from "./components/Menu.tsx";

function App() {
  return (
    <>
      <Menu></Menu>
      <Router></Router>
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
