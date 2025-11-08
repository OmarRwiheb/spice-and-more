// components/Home/BlogSection.jsx
import BlogCard from "../BlogCard";
import blogs from "../../data/blogs.json";
import Button from "../UI/Button";

const BlogSection = () => {
  return (
    <section className="py-14 text-white">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-[Phenomena] mb-10">Latest Blog Posts</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {blogs.map((blog, idx) => (
            <BlogCard key={idx} blog={blog} />
          ))}
        </div>
        <Button>View All</Button>
      </div>
    </section>
  );
};

export default BlogSection;
