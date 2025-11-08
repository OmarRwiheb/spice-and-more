import { Link } from 'react-router-dom';

const ProductTeasersItem = ({ title, description, image, link }) => {
  return (
    <Link to={link} className="group">
      <div className="relative overflow-hidden rounded-[30px] lg:rounded-[50px] h-[400px] transition-transform duration-300 group-hover:scale-105">
        <img
          src={image}
          alt="Ancient Egyptian Cosmetics"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
          <h3 className="text-4xl font-[Phenomena] mb-2">{title}</h3>
          <p className="text-lg font-[lato] text-gray-200">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductTeasersItem;