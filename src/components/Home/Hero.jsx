import ScrollHeroImage from './InternalComponents/HeroVideoScroll';
import CircularText from './InternalComponents/CircularText';
import HeroTextImageBox from './InternalComponents/HeroTextImageBox';

const Hero = () => {
  return (
    <section className="w-full mt-28 xl:mt-10 xl:h-[100vh] my-16 flex flex-col xl:flex-row items-center justify-center m-auto mb-44 max-w-[90%] xl:max-w-none overflow-x-clip">
      <img
        src="herobg1.webp"
        alt="Hero Background"
        className="absolute top-0 right-0 -z-10 opacity-25 h-screen object-cover"
      />

      <div className="xl:w-1/2 order-2 xl:order-1">
        <ScrollHeroImage src="herovid.mp4" />
      </div>

      <div className="flex flex-col gap-9 xl:items-start xl:justify-start items-center justify-center xl:w-1/2 xl:pt-10 order-1 xl:order-2 xl:pr-22">
        <h1 className="font-[Phenomena] text-[50px] xl:text-[90px] text-center xl:text-left leading-22">
          <span className="text-[#ffb400]">Unlock</span> the <HeroTextImageBox src="herobox1.webp" /> Secrets of Ancient <HeroTextImageBox src="herobox2.webp" /> Egyptian <span className="text-[#ffb400]">Beauty</span> and <span className="text-[#ffb400]">Wellness</span>
        </h1>
        <p className="text-2xl xl:text-3xl font-[lato] font-light text-center xl:text-left">
          Natural herbs and cosmetics used by the pharaohs—now in your hands.
        </p>
        <CircularText />
      </div>
    </section>
  );
};

export default Hero;
