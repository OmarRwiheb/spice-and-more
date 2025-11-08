const CategoryFilter = ({ categories, activeCategory, onSelect }) => (
  <div className="flex flex-wrap justify-center gap-4 mb-10">
    {categories.map((category) => (
      <button
        key={category}
        onClick={() => onSelect(category)}
        className={`px-5 py-2 rounded-full hover:cursor-pointer border-2 transition duration-200 ${activeCategory === category
          ? "bg-[#ffb400] text-black"
          : "border-[#e0a800]"
          }`}
      >
        {category}
      </button>
    ))}
  </div>
);


export default CategoryFilter;
