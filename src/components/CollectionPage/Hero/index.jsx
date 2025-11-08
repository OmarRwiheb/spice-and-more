import React from 'react';

const Hero = ({ title, subtitle, image }) => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <img
        src="herobg1.webp"
        alt="Hero Background"
        className="absolute top-0 left-0 w-full h-full object-cover -z-10 opacity-25"
        data-aos="fade-in"
        data-aos-duration="2000"
      />

      {/* Hero Section Content */}
      <section className="w-full h-full mt-28 mb-28 max-w-[90%] xl:max-w-none m-auto overflow-x-clip">
        <div className="w-full h-full flex flex-col xl:flex-row items-center justify-center gap-22 lg:gap-0">
          {/* Image Box */}
          <div
            className="xl:w-1/2 order-2 xl:order-1"
            data-aos="fade-right"
            data-aos-duration="1500"
          >
            <div className="mask-clip-path about-image relative w-[300px] h-[300px] lg:w-[500px] lg:h-[500px] xl:w-[600px] xl:h-[600px] overflow-hidden rounded-[50px] lg:rounded-[100px] m-auto">
              <img
                src={image || 'herobox1.webp'}
                alt={`Ancient Egyptian ${title}`}
                className="w-full h-full object-cover p-0 lg:p-10 rounded-[50px] lg:rounded-[100px]"
              />
            </div>
          </div>

          {/* Text Box */}
          <div
            className="flex flex-col gap-9 xl:items-start xl:justify-start items-center justify-center xl:w-1/2 xl:pt-10 order-1 xl:order-2 xl:pr-22"
            data-aos="fade-left"
            data-aos-duration="1500"
          >
            <h1
              className="font-[Phenomena] text-[70px] xl:text-[90px] text-center xl:text-left leading-22"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Ancient Egyptian <span className="text-[#ffb400]">{title}</span>
            </h1>
            <p
              className="text-2xl xl:text-3xl font-[lato] font-light text-center xl:text-left"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              {subtitle}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
