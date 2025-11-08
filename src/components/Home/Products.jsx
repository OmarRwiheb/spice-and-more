import { useState, useRef, useEffect } from "react";
import ProductCard from "../common/ProductCard";
import products from "../../data/products.json";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import CategoryFilter from "../CategoryFilter";
import Button from "../UI/Button";

import "swiper/css";
import "swiper/css/navigation";

const categories = ["All", "Cosmetics", "Herbs", "Incense"];

const ProductSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [swiper, setSwiper] = useState(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  // Update navigation when swiper or refs change
  useEffect(() => {
    if (swiper) {
      swiper.params.navigation.prevEl = prevRef.current;
      swiper.params.navigation.nextEl = nextRef.current;
      swiper.navigation.init();
      swiper.navigation.update();
    }
  }, [swiper]);

  return (
    <section className="py-14 text-white">
      <div className="mx-auto px-4 md:px-8 text-center max-w-[1440px]">
        <h2 className="text-4xl md:text-5xl font-[Phenomena] mb-10">
          Our Products
        </h2>

        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onSelect={setActiveCategory}
        />

        {/* Carousel Container with padding for hover effects */}
        <div className="relative mt-8">
          {/* Side Gradients */}
          <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          {/* Add padding wrapper to handle overflow */}
          <div className="py-4">
            <Swiper
              modules={[Navigation]}
              onSwiper={setSwiper}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              breakpoints={{
                0: { slidesPerView: 1.2, spaceBetween: 16 },
                640: { slidesPerView: 2.2, spaceBetween: 20 },
                1024: { slidesPerView: 3.2, spaceBetween: 24 },
                1280: { slidesPerView: 4.2 },
              }}
              className="!overflow-visible"
            >
              {filteredProducts.map((product, idx) => (
                <SwiperSlide key={idx} className="!overflow-visible">
                  <div className="p-2">
                    <ProductCard product={product} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center items-center gap-6 mt-8">
            <button
              ref={prevRef}
              className="w-11 h-11 rounded-full border-2 border-[#ffb400] flex items-center justify-center
                       text-[#ffb400] transition-all duration-300
                       hover:bg-[#ffb400] hover:text-white"
              aria-label="Previous products"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              ref={nextRef}
              className="w-11 h-11 rounded-full border-2 border-[#ffb400] flex items-center justify-center
                       text-[#ffb400] transition-all duration-300
                       hover:bg-[#ffb400] hover:text-white"
              aria-label="Next products"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>


        </div>
      </div>
    </section>
  );
};

export default ProductSection;
