import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import YouTube from "./components/YouTube";
import Contact from "./components/Contact";
import VideoPage from "./pages/VideoPage";

const Home = () => (
  <div className="crt">
    <div className="grain" />
    <Nav />
    <main>
      <Hero />
      <About />
      <Projects />
      <YouTube />
      <Contact />
    </main>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/video/:id" element={<VideoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
