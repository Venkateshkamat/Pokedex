import React from "react";
import { Routes, Route} from "react-router-dom";
import ListView from "./components/ListView";
import GalleryView from "./components/GalleryView";
import DetailView from "./components/DetailView";
import { useNavigate } from 'react-router-dom';



function App() {

  const navigate = useNavigate();

  return (
    <div>
      <h1>MP2 Application</h1>
      <button onClick={() => navigate(`/gallery`)}>Gallery View</button>
      <button onClick={() => navigate(`/`)}>List View</button>
      <Routes>
        <Route path="/" element={<ListView />} />
        <Route path="/gallery" element={<GalleryView />} />
        <Route path="/pokemon/:name" element={<DetailView />} />
      </Routes>
    </div>
  );
}

export default App;
