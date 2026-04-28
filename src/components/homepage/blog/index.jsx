import { useState, useEffect } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import BlogCard from './blog-card';
import { Link } from 'react-router-dom';
import useScrollAnimation from "@/hooks/useScrollAnimation";

function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sectionRef, isVisible] = useScrollAnimation(0.1);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://dev.to/api/articles?username=AD3826');
      const data = await response.json();
      const filtered = data.filter((item) => item?.cover_image).sort(() => Math.random() - 0.5);
      setBlogs(filtered);
    } catch (error) {
      console.error('Failed to fetch blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id='blogs' ref={sectionRef} className="relative z-50 border-t my-12 lg:my-24 border-[#25213b]">
      <div className="w-[100px] h-[100px] bg-violet-100 rounded-full absolute top-6 left-[42%] translate-x-1/2 filter blur-3xl  opacity-20 float"></div>

      <div className="flex justify-center -translate-y-[1px]">
        <div className="w-3/4">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-violet-500 to-transparent  w-full" />
        </div>
      </div>

      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex  items-center">
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
          <span className={`bg-[#1a1443] w-fit text-white p-2 px-5 text-xl rounded-md ${isVisible ? 'fade-in' : 'scroll-hidden'}`}>
            Blogs
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 lg:gap-8 xl:gap-10 ${isVisible ? 'fade-in-up' : 'scroll-hidden'}`}>
        {
          !loading && blogs.slice(0, 6).map((blog, i) => (
            blog?.cover_image &&
            <div key={i} className={isVisible ? `stagger-${i + 1}` : ''}>
              <BlogCard blog={blog} />
            </div>
          ))
        }
      </div>

      <div className={`flex justify-center  mt-5 lg:mt-12 ${isVisible ? 'fade-in-up stagger-6' : 'scroll-hidden'}`}>
        <Link
          className="flex items-center gap-1 hover:gap-3 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 px-3 md:px-8 py-3 md:py-4 text-center text-xs md:text-sm font-medium uppercase tracking-wider text-white no-underline transition-all duration-200 ease-out hover:text-white hover:no-underline md:font-semibold gradient-animate shimmer"
          role="button"
          to="/blog"
        >
          <span>View More</span>
          <FaArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
};

export default Blog;
