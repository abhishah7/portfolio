import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/navbar';
import Footer from './components/footer';
import ScrollToTop from './components/helper/scroll-to-top';
import HomePage from './pages/home';
import BlogPage from './pages/blog';
import NotFoundPage from './pages/not-found';
import './css/card.scss';

function App() {
  return (
    <Router>
      <ToastContainer />
      <main className="min-h-screen relative mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <ScrollToTop />
      </main>
      <Footer />
    </Router>
  );
}

export default App;
