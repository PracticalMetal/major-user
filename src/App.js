import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./LandingPage";
import DocHistory from "./components/DocHistory" 

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route for LandingPage */}
        <Route path="/" element={<LandingPage />} />

        {/* Route for DocHistory */}
        <Route path="/doc-history" element={<DocHistory />} />
      </Routes>
    </Router>
  );
}

export default App;
