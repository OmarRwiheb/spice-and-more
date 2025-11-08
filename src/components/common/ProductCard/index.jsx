import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="relative overflow-hidden rounded-[50px] shadow-lg hover:shadow-xl transition-shadow duration-300">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-[400px] object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8 text-center">
        <h3 className="text-3xl font-[Phenomena] text-white mb-2">{product.name}</h3>
        <span className="text-[#ffb400] font-semibold mb-2">{product.category}</span>
      </div>
    </div>
  );
};

export default ProductCard; 