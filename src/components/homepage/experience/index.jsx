import { experiences } from "@/utils/data/experience";
import { BsPersonWorkspace } from "react-icons/bs";
import experience from '../../../assets/lottie/code.json';
import AnimationLottie from "../../helper/animation-lottie";
import GlowCard from "../../helper/glow-card";
import useScrollAnimation from "@/hooks/useScrollAnimation";

function Experience() {
  const [sectionRef, isVisible] = useScrollAnimation(0.1);

  return (
    <div id="experience" ref={sectionRef} className="relative z-50 border-t my-12 lg:my-24 border-[#25213b]">
      <img
        src="/section.svg"
        alt="Hero"
        width={1572}
        height={795}
        className="absolute top-0 -z-10"
      />

      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex  items-center">
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
          <span className={`bg-[#1a1443] w-fit text-white p-2 px-5 text-xl rounded-md glitch-hover ${isVisible ? 'fade-in' : 'scroll-hidden'}`} data-text="Experiences">
            Experiences
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      <div className="py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <div className={`flex justify-center items-start ${isVisible ? 'fade-in-left' : 'scroll-hidden'}`}>
            <div className="w-full h-full">
              <AnimationLottie animationPath={experience} />
            </div>
          </div>

          <div className={`flex flex-col gap-6 ${isVisible ? 'fade-in-right' : 'scroll-hidden'}`}>
            {
              experiences.map((exp, index) => (
                <GlowCard key={exp.id} identifier={`experience-${exp.id}`}>
                  <div className={`p-3 relative card-hover bug-scan ${isVisible ? `stagger-${index + 1}` : ''}`}>
                    <img
                      src="/blur-23.svg"
                      alt="Hero"
                      width={1080}
                      height={200}
                      className="absolute bottom-0 opacity-80"
                    />
                    <div className="flex justify-center">
                      <p className="text-xs sm:text-sm text-[#16f2b3]">
                        {exp.duration}
                      </p>
                    </div>
                    <div className="flex items-center gap-x-8 px-3 py-5">
                      <div className="text-violet-500 transition-all duration-300 hover:scale-125 hover:text-[#16f2b3] hover:rotate-12">
                        <BsPersonWorkspace size={36} />
                      </div>
                      <div>
                        <p className="text-base sm:text-xl mb-2 font-medium uppercase glitch-hover" data-text={exp.title}>
                          {exp.title}
                        </p>
                        <p className="text-sm sm:text-base">
                          {exp.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </GlowCard>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
