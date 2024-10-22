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
      <button onClick={() => navigate(`/mp2/gallery`)}>Gallery View</button>
      <button onClick={() => navigate(`/mp2/`)}>List View</button>
      <Routes>
        <Route path="/mp2/" element={<ListView />} />
        <Route path="/mp2/gallery" element={<GalleryView />} />
        <Route path="/mp2/pokemon/:name" element={<DetailView />} />
      </Routes>
    </div>
  );
}

export default App;
