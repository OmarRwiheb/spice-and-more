import React, { useEffect } from 'react';
import Hero from '../components/CollectionPage/Hero';
import Header from '../components/CollectionPage/Header';
import Benefits from '../components/CollectionPage/Benefits';
import Products from '../components/CollectionPage/Products';
import productsData from '../data/products.json';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Cosmetics = () => {
  useEffect(() => {
    AOS.init({
      duration: 1500,
      delay: 200,
      once: true,
    });
  }, []);

  const products = productsData.filter(product => product.category === "Cosmetics");

  const benefits = [
    { title: 'Moisturizing & Anti-aging', icon: 'icon1.webp' },
    { title: 'Skin Repair & Sun Protection', icon: 'icon2.webp' },
    { title: 'Softening Hair & Scalp Health', icon: 'icon3.webp' }
  ];

  return (
    <main className="m-auto text-white overflow-hidden">
      <div data-aos="fade-down" data-aos-duration="2000">
        <Hero
          title="Cosmetics"
          subtitle="Discover beauty secrets of Cleopatra and Nefertiti"
          image="cosmetics.webp"
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
          title="Ancient Egyptian Cosmetics"
          subtitle="Experience the timeless beauty secrets of ancient Egypt, crafted with natural ingredients and traditional methods."
        />
      </div>
      <div data-aos="fade-up" data-aos-delay="200">
        <Benefits benefits={benefits} />
      </div>
      <div data-aos="fade-up" data-aos-delay="400">
        <Products products={products} />
      </div>
    </main>
  );
};

export default Cosmetics; 