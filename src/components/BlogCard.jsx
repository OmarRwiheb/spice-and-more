// components/Home/BlogCard.jsx
const BlogCard = ({ blog }) => {
  return (
    <div className="w-[320px] rounded-[30px] overflow-hidden bg-[#1c1a19] border border-white/10 hover:shadow-lg transition">
      <img src={blog.image} alt={blog.title} className="h-[180px] w-full object-cover" />
      <div className="p-4 text-left">
        <h3 className="text-white text-xl font-[Phenomena] mb-2">{blog.title}</h3>
        <p className="text-gray-300 text-sm mb-3">{blog.excerpt}</p>
        <span className="text-[#ffb400] text-xs">{blog.date}</span>
      </div>
    </div>
  );
};

export default BlogCard;
