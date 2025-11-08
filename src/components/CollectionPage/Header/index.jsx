import React from 'react';

const Header = ({ title, subtitle }) => {
  return (
    <div className="text-center px-4 md:px-8 lg:px-12 my-12 md:my-16 lg:my-20">
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-[Phenomena] mb-4 md:mb-6 lg:mb-8">
        {title} <span className="text-[#ffb400]">Collection</span>
      </h2>
      <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-2xl md:max-w-3xl mx-auto leading-relaxed">
        {subtitle}
      </p>
    </div>
  );
};

export default Header; 