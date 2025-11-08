// App.jsx
import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';
import ScrollToTop, { setLenisInstance } from './components/common/ScrollToTop';
import HomePage from './pages/HomePage';
// import ProductsPage from './pages/ProductPage';
import Cosmetics from './pages/Cosmetics';
import Herbs from './pages/Herbs';
import Incense from './pages/Incense';
import Footer from './components/Footer';
import Header from './components/Header';

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    setLenisInstance(lenis);

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      setLenisInstance(null);
    };
  }, []);

  return (
    <>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cosmetics" element={<Cosmetics />} />
        <Route path="/herbs" element={<Herbs />} />
        <Route path="/incense" element={<Incense />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
