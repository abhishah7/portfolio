import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-transparent">
      <div className="flex items-center justify-between py-5">
        <div className="flex flex-shrink-0 items-center">
          <Link
            to="/"
            className=" text-[#16f2b3] text-3xl font-bold hover:scale-105 transition-transform duration-300">
            ABHISHEK GOND
          </Link>
        </div>

        <ul className="mt-4 flex h-screen max-h-0 w-full flex-col items-start text-sm opacity-0 md:mt-0 md:h-auto md:max-h-screen md:w-auto md:flex-row md:space-x-1 md:border-0 md:opacity-100" id="navbar-default">
          <li>
            <a className="block px-4 py-2 no-underline outline-none hover:no-underline" href="/#about">
              <div className="text-sm text-white transition-colors duration-300 hover:text-pink-600 hover:scale-110 transform inline-block">ABOUT</div>
            </a>
          </li>
          <li>
            <a className="block px-4 py-2 no-underline outline-none hover:no-underline" href="/#experience"><div className="text-sm text-white transition-colors duration-300 hover:text-pink-600 hover:scale-110 transform inline-block">EXPERIENCE</div></a>
          </li>
          <li>
            <a className="block px-4 py-2 no-underline outline-none hover:no-underline" href="/#skills"><div className="text-sm text-white transition-colors duration-300 hover:text-pink-600 hover:scale-110 transform inline-block">SKILLS</div></a>
          </li>
          <li>
            <a className="block px-4 py-2 no-underline outline-none hover:no-underline" href="/#education"><div className="text-sm text-white transition-colors duration-300 hover:text-pink-600 hover:scale-110 transform inline-block">EDUCATION</div></a>
          </li>
          <li>
            <Link to="/blog" className="block px-4 py-2 no-underline outline-none hover:no-underline"><div className="text-sm text-white transition-colors duration-300 hover:text-pink-600 hover:scale-110 transform inline-block">BLOGS</div></Link>
          </li>
          <li>
            <a className="block px-4 py-2 no-underline outline-none hover:no-underline" href="/#projects"><div className="text-sm text-white transition-colors duration-300 hover:text-pink-600 hover:scale-110 transform inline-block">PROJECTS</div></a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
