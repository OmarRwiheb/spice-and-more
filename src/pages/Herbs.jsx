import React, { useEffect } from 'react';
import Hero from '../components/CollectionPage/Hero';
import Header from '../components/CollectionPage/Header';
import Benefits from '../components/CollectionPage/Benefits';
import Products from '../components/CollectionPage/Products';
import productsData from '../data/products.json';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Herbs = () => {
  useEffect(() => {
    AOS.init({
      duration: 1500,
      delay: 200,
      once: true,
    });
  }, []);

  const products = productsData.filter(product => product.category === "Herbs");

  const benefits = [
    { title: 'Natural Healing', icon: 'icon1.webp' },
    { title: 'Traditional Medicine', icon: 'icon2.webp' },
    { title: 'Holistic Wellness', icon: 'icon3.webp' }
  ];

  return (
    <main className="m-auto text-white overflow-hidden">
      <div data-aos="fade-down" data-aos-duration="2000">
        <Hero
          title="Herbs"
          subtitle="Experience the healing power of nature's ancient remedies"
          image="herbs.webp"
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
          title="Ancient Egyptian Herbs"
          subtitle="Discover the healing power of traditional herbs used in ancient Egyptian medicine, carefully selected and prepared for modern wellness."
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

export default Herbs; 