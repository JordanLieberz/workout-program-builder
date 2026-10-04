import React from "react";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import Header from "./components/Header/Header";
import ProgramBuilder from "./components/ProgramBuilder/ProgramBuilder";
import QuoteCard from "./components/QuoteCard/QuoteCard";
import "./App.css";

function App() {
  return (
    <div className="page">
      <div className="page__sidebar">
        <Navigation />
        <QuoteCard />
      </div>

      <main className="page__content">
        <Header />
        <Routes>
          <Route path="/" element={<ProgramBuilder />} />
          <Route path="/builder" element={<ProgramBuilder />} />
          <Route
            path="/my-programs"
            element={<div className="page__placeholder">My Programs Content</div>}
          />
          <Route
            path="/profile"
            element={<div className="page__placeholder">Profile Content</div>}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;