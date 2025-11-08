import React from 'react';
import { Link } from 'react-router-dom';
import ProductTeasersItem from './InternalComponents/ProductTeasersItem';

const ProductTeasers = () => {
  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-[Phenomena] text-center mb-16">
        Explore Our <span className="text-[#ffb400]">Collections</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ProductTeasersItem
          title="Cosmetics"
          description="Discover beauty secrets of Cleopatra and Nefertiti"
          image="cosmetics.webp"
          link="/cosmetics"
        />

        <ProductTeasersItem
          title="Herbs"
          description="Experience the healing power of nature's ancient remedies"
          image="herbs.webp"
          link="/herbs"
        />

        <ProductTeasersItem
          title="Incense"
          description="Connect with the divine through ancient aromatic traditions"
          image="incense.webp"
          link="/incense"
        />
      </div>
    </section>
  );
};

export default ProductTeasers; 