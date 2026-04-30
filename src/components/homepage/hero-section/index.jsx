import { personalData } from "@/utils/data/personal-data";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { FaFacebook, FaTwitterSquare } from "react-icons/fa";
import { MdDownload } from "react-icons/md";
import { RiContactsFill } from "react-icons/ri";
import { SiLeetcode } from "react-icons/si";
import TypingEffect from "../../helper/typing-effect";
import GlitchText from "../../helper/glitch-text";

function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-between py-4 lg:py-12">
      <img
        src="/hero.svg"
        alt="Hero"
        width={1572}
        height={795}
        className="absolute -top-[98px] -z-10"
      />

      <div className="grid grid-cols-1 items-start lg:grid-cols-2 lg:gap-12 gap-y-8">
        <div className="order-2 lg:order-1 flex flex-col items-start justify-center p-2 pb-20 md:pb-10 lg:pt-10">
          <h1 className="text-3xl font-bold leading-10 text-white md:font-extrabold lg:text-[2.6rem] lg:leading-[3.5rem]">
            <span className="fade-in">Hello, </span><br />
            <span className="fade-in stagger-1">My Name Is{' '}</span>
            <span className="text-pink-500 fade-in stagger-2 " data-text={personalData.name}>{personalData.name}</span>
            {`, I'm a Professional `}
            <span className="text-[#16f2b3] fade-in stagger-3">
              <TypingEffect text={personalData.designation} speed={100} />
            </span>
          </h1>

          <div className="my-12 flex items-center gap-5">
            <a
              href={personalData.github}
              target='_blank'
              rel="noopener noreferrer"
              className="transition-all text-pink-500 hover:scale-125 hover:text-[#16f2b3] duration-300 stagger-1"
            >
              <BsGithub size={30} />
            </a>
            <a
              href={personalData.linkedIn}
              target='_blank'
              rel="noopener noreferrer"
              className="transition-all text-pink-500 hover:scale-125 hover:text-[#16f2b3] duration-300 stagger-2"
            >
              <BsLinkedin size={30} />
            </a>
            <a
              href={personalData.facebook}
              target='_blank'
              rel="noopener noreferrer"
              className="transition-all text-pink-500 hover:scale-125 hover:text-[#16f2b3] duration-300 stagger-3"
            >
              <FaFacebook size={30} />
            </a>
            <a
              href={personalData.leetcode}
              target='_blank'
              rel="noopener noreferrer"
              className="transition-all text-pink-500 hover:scale-125 hover:text-[#16f2b3] duration-300 stagger-4"
            >
              <SiLeetcode size={30} />
            </a>
            <a
              href={personalData.twitter}
              target='_blank'
              rel="noopener noreferrer"
              className="transition-all text-pink-500 hover:scale-125 hover:text-[#16f2b3] duration-300 stagger-5"
            >
              <FaTwitterSquare size={30} />
            </a>
          </div>

          <div className="flex items-center gap-3">
            <a href="#contact" className="bg-gradient-to-r to-pink-500 from-violet-600 p-[1px] rounded-full transition-all duration-300 hover:from-pink-500 hover:to-violet-600 glow-pulse">
              <button className="px-3 text-xs md:px-8 py-3 md:py-4 bg-[#0d1224] rounded-full border-none text-center md:text-sm font-medium uppercase tracking-wider text-[#ffff] no-underline transition-all duration-200 ease-out  md:font-semibold flex items-center gap-1 hover:gap-3">
                <span>Contact me</span>
                <RiContactsFill size={16} />
              </button>
            </a>

            <a className="flex items-center gap-1 hover:gap-3 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 px-3 md:px-8 py-3 md:py-4 text-center text-xs md:text-sm font-medium uppercase tracking-wider text-white no-underline transition-all duration-200 ease-out hover:text-white hover:no-underline md:font-semibold gradient-animate shimmer" role="button" target="_blank" rel="noopener noreferrer" href={personalData.resume}
            >
              <span>Get Resume</span>
              <MdDownload size={16} />
            </a>
          </div>

        </div>
        <div className="order-1 lg:order-2 from-[#0d1224] border-[#1b2c68a0] relative rounded-lg border bg-gradient-to-r to-[#0a0d37] card-hover bug-scan cyber-border">
          <div className="flex flex-row">
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-pink-500 to-violet-600"></div>
            <div className="h-[1px] w-full bg-gradient-to-r from-violet-600 to-transparent"></div>
          </div>
          <div className="px-4 lg:px-8 py-5">
            <div className="flex flex-row space-x-2">
              <div className="h-3 w-3 rounded-full bg-red-400 pulse"></div>
              <div className="h-3 w-3 rounded-full bg-orange-400 pulse stagger-1"></div>
              <div className="h-3 w-3 rounded-full bg-green-200 pulse stagger-2"></div>
            </div>
          </div>
          <div className="overflow-hidden border-t-[2px] border-indigo-900 px-4 lg:px-8 py-4 lg:py-8 scanline">
            <code className="font-mono text-xs md:text-sm lg:text-base">
              <div className="blink">
                <span className="mr-2 text-pink-500">const</span>
                <span className="mr-2 text-white">coder</span>
                <span className="mr-2 text-pink-500">=</span>
                <span className="text-gray-400">{'{'}</span>
              </div>
              <div className="stagger-1">
                <span className="ml-4 lg:ml-8 mr-2 text-white">name:</span>
                <span className="text-gray-400">{`'`}</span>
                <span className="text-amber-300">ABHISHEK GOND</span>
                <span className="text-gray-400">{`',`}</span>
              </div>
              <div className="ml-4 lg:ml-8 mr-2 stagger-2">
                <span className=" text-white">skills:</span>
                <span className="text-gray-400">{`['`}</span>
                <span className="text-amber-300">React</span>
                <span className="text-gray-400">{"', '"}</span>
                <span className="text-amber-300">NextJS</span>
                <span className="text-gray-400">{"', '"}</span>
                <span className="text-amber-300">Redux</span>
                <span className="text-gray-400">{"', '"}</span>
                <span className="text-amber-300">Express</span>
                <span className="text-gray-400">{"', '"}</span>
                <span className="text-amber-300">NestJS</span>
                <span className="text-gray-400">{"', '"}</span>
                <span className="text-amber-300">MySql</span>
                <span className="text-gray-400">{"', '"}</span>
                <span className="text-amber-300">MongoDB</span>
                <span className="text-gray-400">{"', '"}</span>
                <span className="text-amber-300">Docker</span>
                <span className="text-gray-400">{"', '"}</span>
                <span className="text-amber-300">AWS</span>
                <span className="text-gray-400">{"'],"}</span>
              </div>
              <div className="stagger-3">
                <span className="ml-4 lg:ml-8 mr-2 text-white">hardWorker:</span>
                <span className="text-orange-400">true</span>
                <span className="text-gray-400">,</span>
              </div>
              <div className="stagger-4">
                <span className="ml-4 lg:ml-8 mr-2 text-white">quickLearner:</span>
                <span className="text-orange-400">true</span>
                <span className="text-gray-400">,</span>
              </div>
              <div className="stagger-5">
                <span className="ml-4 lg:ml-8 mr-2 text-white">problemSolver:</span>
                <span className="text-orange-400">true</span>
                <span className="text-gray-400">,</span>
              </div>
              <div className="stagger-6">
                <span className="ml-4 lg:ml-8 mr-2 text-white">hireable:</span>
                <span className="text-pink-500">function</span>
                <span className="text-gray-400">{'()'}</span>
                <span className="text-white">{'{'}</span>
              </div>
              <div className="stagger-7">
                <span className="ml-8 lg:ml-12 mr-2 text-pink-500">return</span>
                <span className="text-gray-400">{'('}</span>
              </div>
              <div className="stagger-8">
                <span className="ml-12 lg:ml-16 mr-2 text-white">this.</span>
                <span className="text-amber-300">hardWorker</span>
                <span className="text-white">{' &&'}</span>
              </div>
              <div className="stagger-9">
                <span className="ml-12 lg:ml-16 mr-2 text-white">this.</span>
                <span className="text-amber-300">problemSolver</span>
                <span className="text-white">{' &&'}</span>
              </div>
              <div className="stagger-10">
                <span className="ml-12 lg:ml-16 mr-2 text-white">this.</span>
                <span className="text-amber-300">skills</span>
                <span className="text-white">.</span>
                <span className="text-amber-300">length</span>
                <span className="text-white">{' >= '}</span>
                <span className="text-orange-400">5</span>
              </div>
              <div className="stagger-11">
                <span className="ml-8 lg:ml-12 text-gray-400">{');'}</span>
              </div>
              <div className="stagger-12">
                <span className="ml-4 lg:ml-8 text-gray-400">{'}'}</span>
              </div>
              <div><span className="text-gray-400">{`}`};</span></div>
            </code>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
