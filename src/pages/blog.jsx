import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BlogCard from '../components/homepage/blog/blog-card';

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://dev.to/api/articles?username=abhishah7');
      const data = await response.json();
      const filtered = data.filter((item) => item?.cover_image);
      setBlogs(filtered);
    } catch (error) {
      console.error('Failed to fetch blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-12 lg:my-16">
      <div className="flex items-center justify-start mb-8">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-[#16f2b3] hover:text-pink-500 transition-colors"
        >
          ← Back to Home
        </button>
      </div>

      <h1 className="text-4xl font-bold text-white mb-12">All Blogs</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 lg:gap-8 xl:gap-10">
        {
          !loading && blogs.map((blog, i) => (
            blog?.cover_image &&
            <BlogCard blog={blog} key={i} />
          ))
        }
      </div>

      {loading && (
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-white text-xl">Loading blogs...</p>
        </div>
      )}
    </div>
  );
}
