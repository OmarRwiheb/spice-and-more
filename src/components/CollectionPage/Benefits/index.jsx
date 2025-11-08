import React from 'react';

const Benefits = ({ benefits }) => {
  return (
    <section className="my-16">
      <h2 className="text-3xl md:text-4xl font-[Phenomena] text-center mb-12">
        Highlighted <span className="text-[#ffb400]">Benefits</span>
      </h2>
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-36">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex flex-col items-center gap-4 md:gap-8">
            <img src={benefit.icon} alt={benefit.title} className="w-12 h-12 md:w-16 md:h-16 object-contain" />
            <h3 className="text-xl md:text-2xl font-[Phenomena] text-white">{benefit.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Benefits; 