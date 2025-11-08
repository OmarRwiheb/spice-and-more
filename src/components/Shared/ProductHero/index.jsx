import React from 'react';

const ProductHero = ({ title, subtitle, category }) => {
  return (
    <section className="relative h-[60vh] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/images/${category.toLowerCase()}-hero.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>
      <div className="relative z-10 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-[Phenomena] mb-4" data-aos="fade-up">
          {title}
        </h1>
        <p className="text-xl md:text-2xl" data-aos="fade-up" data-aos-delay="200">
          {subtitle}
        </p>
      </div>
    </section>
  );
};

export default ProductHero; 