import React from 'react';
import { Link } from 'react-router-dom';

const CTASection = ({ title, description, buttonText, buttonLink }) => {
  return (
    <section className="py-16 bg-[#1a1a1a] text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-[Phenomena] mb-6" data-aos="fade-up">
          {title}
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">
          {description}
        </p>
        <Link
          to={buttonLink}
          className="inline-block bg-[#ffb400] text-black px-8 py-3 rounded-full font-semibold hover:bg-[#ffc233] transition-colors"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          {buttonText}
        </Link>
      </div>
    </section>
  );
};

export default CTASection; 