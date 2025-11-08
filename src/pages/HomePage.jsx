import React from 'react';
import Hero from '../components/Home/Hero'
import { useEffect } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import About from '../components/Home/about'
import Products from '../components/Home/Products'
import BlogSection from '../components/Home/BlogSection'
import ShopGrid from '../components/Home/ShopGrid'
import ProductTeasers from '../components/Home/ProductTeasers'

const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 1500, // animation duration in ms
      delay: 200, // delay before animation starts in ms
      once: true, // whether animation should happen only once or every time you scroll up/down to element
    });
  }, []);

  return (
    <main className='m-auto  text-white overflow-x-hidden '>
      <Hero />
      <div className="h-[150vh] lg:h-[100vh]"></div>
      <About />
      <ProductTeasers />
      <Products />
      <ShopGrid />
      {/* <BlogSection /> */}
    </main>
  )
}

export default Home