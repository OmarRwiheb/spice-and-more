import React from 'react';
import ProductCard from '../../common/ProductCard';

const Products = ({ products }) => {
  return (
    <section className="my-16">
      <h2 className="text-3xl md:text-4xl font-[Phenomena] text-center mb-12">
        Our <span className="text-[#ffb400]">Products</span>
      </h2>
      <div className="flex flex-wrap justify-center gap-6 w-[250px] mx-auto">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default Products; 