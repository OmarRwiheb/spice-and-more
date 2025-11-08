import React, { useEffect } from 'react';
import Hero from '../components/CollectionPage/Hero';
import Header from '../components/CollectionPage/Header';
import Benefits from '../components/CollectionPage/Benefits';
import Products from '../components/CollectionPage/Products';
import { useProducts } from '../hooks/useProducts';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Incense = () => {
  const { products, loading, error } = useProducts({ category: 'Incense' });

  useEffect(() => {
    AOS.init({
      duration: 1500,
      delay: 200,
      once: true,
    });
  }, []);

  const benefits = [
    { title: 'Spiritual Connection', icon: 'icon1.webp' },
    { title: 'Meditation Aid', icon: 'icon2.webp' },
    { title: 'Energy Cleansing', icon: 'icon3.webp' }
  ];

  return (
    <main className="m-auto text-white overflow-hidden">
      <div data-aos="fade-down" data-aos-duration="2000">
        <Hero
          title="Incense"
          subtitle="Connect with ancient spiritual traditions through sacred aromas"
          image="incense.webp"
        />
      </div>
      <div className="relative inset-0 -z-10">
        <img
          src="aboutbg.webp"
          alt=""
          className="absolute h-screen object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background"></div>
      </div>
      <div data-aos="fade-up">
        <Header
          title="Ancient Egyptian Incense"
          subtitle="Experience the sacred aromas of ancient Egyptian temples, crafted with traditional resins and herbs for spiritual practices."
        />
      </div>
      <div data-aos="fade-up" data-aos-delay="200">
        <Benefits benefits={benefits} />
      </div>
      <div data-aos="fade-up" data-aos-delay="400">
        {loading && <div className="text-center py-12">Loading products...</div>}
        {error && <div className="text-center py-12 text-red-400">Error: {error}</div>}
        {!loading && !error && <Products products={products} />}
      </div>
    </main>
  );
};

export default Incense; 