import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ShopGrid = () => {
  const gridRef = useRef(null);

  const images = [
    { src: "shop/1.webp", alt: "Shop Interior", size: "large" },
    { src: "shop/2.webp", alt: "Product Display", size: "small" },
    { src: "shop/3.webp", alt: "Herbal Collection", size: "medium" },
    { src: "shop/4.webp", alt: "Natural Remedies", size: "small" },
    { src: "shop/6.webp", alt: "Beauty Products", size: "medium" },
    { src: "shop/7.webp", alt: "Beauty Products", size: "medium" },
    { src: "shop/8.webp", alt: "Shop Display", size: "small" },
    { src: "shop/9.webp", alt: "Product Collection", size: "large" },
    { src: "shop/10.webp", alt: "Herbal Remedies", size: "medium" },
    { src: "shop/11.webp", alt: "Natural Ingredients", size: "small" },
    { src: "shop/12.webp", alt: "Natural Ingredients", size: "large" },
    { src: "shop/4.webp", alt: "Natural Remedies", size: "small" },
    { src: "shop/2.webp", alt: "Product Display", size: "small" },
  ];

  useEffect(() => {
    const items = gridRef.current.querySelectorAll('.grid-item');

    items.forEach((item, index) => {
      gsap.from(item, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: index * 0.1,
        scrollTrigger: {
          trigger: item,
          start: "top bottom-=50",
          toggleActions: "play none none reverse"
        }
      });
    });
  }, []);

  const getSizeClass = (size) => {
    switch (size) {
      case 'large':
        return 'col-span-1 row-span-2';
      case 'medium':
        return 'col-span-1 row-span-2';
      default:
        return 'col-span-1 row-span-1';
    }
  };

  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-[Phenomena] text-white text-center mb-8 md:mb-12">
          Visit Our <span className="text-[#ffb400]">Shop</span>
        </h2>

        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 auto-rows-[150px] md:auto-rows-[200px]"
        >
          {images.map((image, index) => (
            <div
              key={index}
              className={`grid-item group relative overflow-hidden rounded-lg ${getSizeClass(image.size)}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopGrid; 