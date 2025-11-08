import React from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const ScrollHeroImage = ({ src }) => {
  useGSAP(() => {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: '#clip',
        start: 'start start',
        end: '+=800',
        scrub: 1,
        pin: true,
        pinSpacing: false,

      }
    });

    // Animate mask container
    timeline.to('.mask-clip-path', {
      width: '100vw',
      height: '100vh',
      ease: 'power2.out'
    }, 0);
  });

  return (
    <div id="clip">
      <div id="pin-content" className="relative">
        <div className="mask-clip-path about-image relative w-screen h-[300px] lg:h-[600px] xl:w-[600px] xl:h-[600px] overflow-hidden rounded-[100px] m-auto">
          <video
            src={src}
            className="video-element absolute left-0 top-0 w-screen xl:w-full h-full object-cover p-10 rounded-[100px]"
            autoPlay
            loop
            muted
            playsInline
          />
        </div>
      </div>
    </div>
  );
};

export default ScrollHeroImage;
