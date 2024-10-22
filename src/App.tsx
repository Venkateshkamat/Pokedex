import React from "react";
import { Routes, Route } from "react-router-dom";
import ListView from "./components/ListView";
import GalleryView from "./components/GalleryView";
import DetailView from "./components/DetailView";
import Navbar from "./components/Navbar";

import "./App.css"

function App() {
  return (
    <div className="App">
      <Navbar />

      <div className="main--body">
        <Routes>
          <Route path="/mp2/" element={<ListView />} />
          <Route path="/mp2/gallery" element={<GalleryView />} />
          <Route path="/mp2/pokemon/:name" element={<DetailView />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
