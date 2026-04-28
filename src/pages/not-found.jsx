import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-6xl font-bold text-white mb-4">404</h1>
      <p className="text-2xl text-[#16f2b3] mb-8">Page Not Found</p>
      <button
        onClick={() => navigate('/')}
        className="bg-gradient-to-r from-pink-500 to-violet-600 px-8 py-3 rounded-full text-white font-medium transition-all duration-300 hover:scale-105"
      >
        Go Back Home
      </button>
    </div>
  );
}
