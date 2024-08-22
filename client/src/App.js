
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import AddBlog from "./pages/add-blog.jsx";
import ReadBlog from "./pages/blog.jsx";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/blog" element={<ReadBlog/>}></Route>
        <Route path="/add-blog" element={<AddBlog/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
