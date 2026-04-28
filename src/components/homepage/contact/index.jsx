import { personalData } from '@/utils/data/personal-data';
import { BiLogoLinkedin } from "react-icons/bi";
import { CiLocationOn } from "react-icons/ci";
import { FaFacebook, FaStackOverflow } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoGithub, IoMdCall } from "react-icons/io";
import { MdAlternateEmail } from "react-icons/md";
import ContactForm from './contact-form';
import useScrollAnimation from "@/hooks/useScrollAnimation";

function ContactSection() {
  const [sectionRef, isVisible] = useScrollAnimation(0.1);

  return (
    <div id="contact" ref={sectionRef} className="my-12 lg:my-16 relative mt-24 text-white">
      <div className="hidden lg:flex flex-col items-center absolute top-24 -right-8">
        <span className="bg-[#1a1443] w-fit text-white rotate-90 p-2 px-5 text-xl rounded-md">
          CONTACT
        </span>
        <span className="h-36 w-[2px] bg-[#1a1443]"></span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        <div className={isVisible ? 'fade-in-left' : 'scroll-hidden'}>
          <ContactForm />
        </div>
        <div className={`lg:w-3/4 ${isVisible ? 'fade-in-right' : 'scroll-hidden'}`}>
          <div className="flex flex-col gap-5 lg:gap-9">
            <p className="text-sm md:text-xl flex items-center gap-3 stagger-1">
              <MdAlternateEmail
                className="bg-[#8b98a5] p-2 rounded-full hover:bg-[#16f2b3] hover:scale-110 transition-all duration-300 text-gray-800 cursor-pointer hover:rotate-12"
                size={36}
              />
              <span>{personalData.email}</span>
            </p>
            <p className="text-sm md:text-xl flex items-center gap-3 stagger-2">
              <IoMdCall
                className="bg-[#8b98a5] p-2 rounded-full hover:bg-[#16f2b3] hover:scale-110 transition-all duration-300 text-gray-800 cursor-pointer hover:rotate-12"
                size={36}
              />
              <span>
                {personalData.phone}
              </span>
            </p>
            <p className="text-sm md:text-xl flex items-center gap-3 stagger-3">
              <CiLocationOn
                className="bg-[#8b98a5] p-2 rounded-full hover:bg-[#16f2b3] hover:scale-110 transition-all duration-300 text-gray-800 cursor-pointer hover:rotate-12"
                size={36}
              />
              <span>
                {personalData.address}
              </span>
            </p>
          </div>
          <div className="my-12 flex items-center gap-8 md:gap-16 py-6 md:py-0">
            <a target="_blank" rel="noopener noreferrer" href={personalData.github} className="transition-all duration-300 hover:text-pink-500 hover:scale-125 stagger-1">
              <IoLogoGithub size={40} />
            </a>
            <a target="_blank" rel="noopener noreferrer" href={personalData.linkedIn} className="transition-all duration-300 hover:text-pink-500 hover:scale-125 stagger-2">
              <BiLogoLinkedin size={40} />
            </a>
            <a target="_blank" rel="noopener noreferrer" href={personalData.facebook} className="transition-all duration-300 hover:text-pink-500 hover:scale-125 stagger-3">
              <FaFacebook size={40} />
            </a>
            <a target="_blank" rel="noopener noreferrer" href={personalData.twitter} className="transition-all duration-300 hover:text-pink-500 hover:scale-125 stagger-4">
              <FaXTwitter size={40} />
            </a>
            <a target="_blank" rel="noopener noreferrer" href={personalData.stackOverflow} className="transition-all duration-300 hover:text-pink-500 hover:scale-125 stagger-5">
              <FaStackOverflow size={40} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
