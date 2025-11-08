// src/components/Home/About.jsx
import React, { useRef, useState, useEffect } from "react";
import useCountUp from "../../hooks/useCountUp";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

const features = [
  {
    icon: "icon1.webp",
    title: "Historically Proven",
    description: "Based on authentic Egyptian scrolls and tombs.",
  },
  {
    icon: "icon2.webp",
    title: "Museum Exclusive",
    description: "Found in select Egyptian museums.",
  },
  {
    icon: "icon3.webp",
    title: "100% Natural",
    description: "Plant-based & traditional methods.",
  },
];

// Stats Number Component with Animation
const StatNumber = ({ number, label }) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const numericValue = parseInt(number.replace(/[^0-9]/g, ''));
  const suffix = number.replace(numericValue, '');
  const count = useCountUp(isVisible ? numericValue : 0, 2000);

  return (
    <div ref={elementRef} className="text-center">
      <div className="text-4xl md:text-5xl font-[Phenomena] text-[#ffb400] mb-2">
        {count}{suffix}
      </div>
      <div className="text-gray-300 text-lg">
        {label}
      </div>
    </div>
  );
};

const AnimatedQuote = () => {
  const quoteRef = useRef(null);

  useEffect(() => {
    const quote = quoteRef.current;
    const splitText = new SplitText(quote, { type: "words,chars" });
    const chars = splitText.chars;

    gsap.from(chars, {
      scrollTrigger: {
        trigger: quote,
        start: "top 80%",
        end: "top 20%",
        toggleActions: "play none none reverse"
      },
      opacity: 0,
      y: 20,
      rotateX: -90,
      stagger: 0.02,
      duration: 0.8,
      ease: "back.out(1.7)"
    });

    // Cleanup
    return () => {
      splitText.revert();
    };
  }, []);

  return (
    <div className="mt-24 relative py-16">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-radial from-[#ffb400]/5 via-transparent to-transparent"></div>

      {/* Main Container */}
      <div className="relative max-w-4xl mx-auto">
        {/* Decorative Elements */}
        <div className="absolute -left-8 top-0 w-1 h-full bg-gradient-to-b from-transparent via-[#ffb400]/30 to-transparent"></div>
        <div className="absolute -right-8 top-0 w-1 h-full bg-gradient-to-b from-transparent via-[#ffb400]/30 to-transparent"></div>

        {/* Quote Container */}
        <div className="relative px-12">
          {/* Top Decoration */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-8">
            <div className="w-32 h-[2px] bg-gradient-to-r from-transparent via-[#ffb400]/30 to-transparent"></div>
          </div>

          {/* Animated Text */}
          <p
            ref={quoteRef}
            className="text-xl md:text-2xl text-gray-300 text-center leading-relaxed"
          >
            Every product in our collection is crafted following ancient Egyptian recipes,
            using ingredients that have stood the test of time for over 5000 years.
          </p>

          {/* Bottom Decoration */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-8">
            <div className="w-32 h-[2px] bg-gradient-to-r from-transparent via-[#ffb400]/30 to-transparent"></div>
          </div>
        </div>

        {/* Quote Marks */}
        <div className="absolute -left-4 -top-8 text-8xl text-[#ffb400]/20 leading-none">"</div>
        <div className="absolute -right-4 -bottom-8 text-8xl text-[#ffb400]/20 leading-none">"</div>
      </div>
    </div>
  );
};

const About = () => {
  const stats = [
    { number: "5000+", label: "Years of History" },
    { number: "100%", label: "Natural Ingredients" },
    { number: "50+", label: "Ancient Recipes" },
    { number: "1000+", label: "Happy Customers" }
  ];

  const imageContainerRef = useRef(null);
  const mainImageRef = useRef(null);
  const particlesRef = useRef(null);

  useEffect(() => {
    // Create particles
    const createParticles = () => {
      const container = particlesRef.current;
      for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute w-2 h-2 bg-[#ffb400]/30 rounded-full';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        container.appendChild(particle);
      }
    };
    createParticles();

    // Animate particles
    const particles = particlesRef.current.children;
    gsap.to(particles, {
      y: -20,
      opacity: 0,
      duration: 2,
      stagger: {
        amount: 2,
        repeat: -1,
        yoyo: true
      },
      ease: "sine.inOut"
    });

    // Image reveal animation
    gsap.from(mainImageRef.current, {
      scale: 1.2,
      opacity: 0,
      duration: 1.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: imageContainerRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });

    // Cleanup
    return () => {
      if (particlesRef.current) {
        particlesRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <img
          src="aboutbg.webp"
          alt=""
          className="absolute left-0 top-0  object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background"></div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-[Phenomena] mb-4">
            Ancient Wisdom, <span className="text-[#ffb400]">Modern Beauty</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            Discover the secrets of Egyptian beauty rituals, preserved through centuries and reimagined for today.
          </p>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-24">
          {/* Image Column */}
          <div className="lg:w-1/2">
            <div ref={imageContainerRef} className="relative">
              {/* Particles Container */}
              <div ref={particlesRef} className="absolute inset-0 overflow-hidden rounded-[50px]"></div>

              {/* Main Image */}
              <div className="relative overflow-hidden rounded-[50px] h-[500px] lg:h-[600px]">
                <img
                  ref={mainImageRef}
                  src="herobg.webp"
                  alt="Ancient Egyptian beauty"
                  className="w-full h-full object-cover"
                />
                {/* Enhanced Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
              </div>

              {/* Glowing Border Effect */}
              <div className="absolute inset-0 rounded-[50px] border-2 border-[#ffb400]/20 shadow-[0_0_30px_rgba(255,180,0,0.1)]"></div>

              {/* Floating Accent */}
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-[#ffb400]/5 rounded-full blur-2xl"></div>
              <div className="absolute -left-6 -bottom-6 w-32 h-32 bg-[#ffb400]/5 rounded-full blur-2xl"></div>
            </div>
          </div>

          {/* Features Column */}
          <div className="lg:w-1/3">
            <ul className="space-y-16">
              {features.map((feature, idx) => (
                <li
                  key={idx}
                  className="transform transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-center gap-8 justify-center">
                    {/* Icon */}
                    <img
                      src={feature.icon}
                      alt={feature.title}
                      className="w-16 h-16 object-contain"
                    />

                    {/* Content */}
                    <div className="w-1/2 lg:w-full">
                      <h3 className="text-2xl md:text-3xl font-[Phenomena] text-[#ffb400] mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-gray-300 text-lg leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Stats Section with Animation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mt-24">
          {stats.map((stat, idx) => (
            <StatNumber
              key={idx}
              number={stat.number}
              label={stat.label}
            />
          ))}
        </div>

        {/* Bottom Quote */}
        <AnimatedQuote />
      </div>
    </section>
  );
};

export default About;
