import { useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SectionTitle from './SectionTitle';
import { ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const faqData = [
  {
    question: "What services do you offer?",
    answer: "I specialize in end-to-end full-stack web development, custom UI/UX design, enterprise CMS architectures (like TYPO3), sophisticated GSAP animations, and seamless AI integrations to build high-performance digital products."
  },
  {
    question: "Which technologies do you work with?",
    answer: "My core stack revolves around MERN (MongoDB, Express.js, React, Node.js). I also heavily utilize GSAP for cinematic animations, Tailwind CSS for pixel-perfect styling, PHP/TYPO3 for enterprise content management, and Python/OpenAI for smart backend features."
  },
  {
    question: "How can we collaborate?",
    answer: "We kick off with a deep-dive discovery call to align on your vision and technical requirements. From there, I craft a tailored architecture plan. Once approved, I build iteratively, providing transparent updates at every major milestone through to final deployment."
  },
  {
    question: "Do you offer website maintenance?",
    answer: "Yes, launching is just the beginning. I offer dedicated post-launch support, performance monitoring, security patches, and scalable feature upgrades to ensure your ecosystem runs flawlessly over time."
  },
  {
    question: "How long does a project typically take?",
    answer: "It entirely depends on the scope. A cinematic, high-end landing page might take 2-3 weeks, whereas a complex SaaS dashboard or full-stack enterprise ecosystem can take 2-3 months of dedicated engineering."
  },
  {
    question: "What makes you different from other developers?",
    answer: "I bridge the gap between heavy, scalable backend engineering and award-winning, buttery-smooth frontend design. I don't just build websites; I craft memorable, interactive digital experiences that drive engagement."
  },
  {
    question: "What if I don’t have a clear idea yet?",
    answer: "No worries! I love brainstorming. Let’s chat, explore possibilities, and shape your abstract idea into something tangible, architectural, and highly impactful."
  }
];

const FAQ = () => {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0); 

  useGSAP(() => {
    gsap.fromTo('.faq-header-anim',
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 60%", toggleActions: "play none none reverse" }
      }
    );

    gsap.fromTo('.faq-lottie-container',
      { opacity: 0, x: 300, y: 50, rotation: 10, scale: 0.9 },
      {
        opacity: 1, x: 0, y: 0, rotation: 0, scale: 1,
        duration: 1.5, 
        ease: "back.out(1.2)", 
        scrollTrigger: { 
          trigger: sectionRef.current, 
          start: "top 60%", 
          toggleActions: "play none none reverse" 
        }
      }
    );

    const items = gsap.utils.toArray('.faq-item');
    
    gsap.fromTo(items,
      { opacity: 0, x: -50, filter: "blur(5px)" },
      {
        opacity: 1, x: 0, filter: "blur(0px)",
        duration: 0.8, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: '.faq-list-container', start: "top 60%", toggleActions: "play none none reverse" }
      }
    );

    items.forEach((item) => {
      item.addEventListener("mousemove", (e) => {
        const rect = item.getBoundingClientRect();
        item.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
        item.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
      });
    });

    ScrollTrigger.refresh();
  }, { scope: sectionRef });

  return (
    <section 
      id="faq" 
      ref={sectionRef} 
      className="py-32 px-6 relative bg-white dark:bg-zinc-950 transition-colors duration-500 overflow-x-clip"
    >
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-brand-primary/5 dark:bg-brand-primary/10 rounded-full blur-[120px] pointer-events-none mix-blend-overlay -translate-x-1/2"></div>
      
      <div className="container mx-auto relative z-10 max-w-7xl">
        
        <div className="text-center mb-24 pt-5">
          <div className="faq-header-anim will-change-transform">
            <SectionTitle title="FAQ" backtitle="Your Curiosity, My Clarity." />
            <p className="mt-4 text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto text-lg">
              Answers to the most common questions regarding my process, capabilities, and collaborations.
            </p>
          </div>
        </div>

        <div className="flex flex-col-reverse lg:flex-row items-start gap-12 lg:gap-16 relative">
          
          <div className="w-full lg:w-7/12 faq-list-container relative z-20 flex flex-col gap-6">
            {faqData.map((faq, index) => {
              const isOpen = activeIndex === index;
              
              return (
                <div 
                  key={index} 
                  className={`faq-item will-change-transform relative w-full rounded-3xl bg-zinc-50 dark:bg-zinc-900/50 border transition-all duration-500 overflow-hidden cursor-pointer group ${
                    isOpen 
                      ? 'border-brand-primary/50 shadow-[0_0_30px_rgba(var(--color-brand-primary),0.15)] dark:bg-zinc-900' 
                      : 'border-zinc-200 dark:border-zinc-800 hover:border-brand-primary/30'
                  }`}
                  onClick={() => setActiveIndex(isOpen ? null : index)}
                >
                  <div className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div
                      className="absolute w-[400px] h-[400px] bg-brand-primary/10 dark:bg-brand-primary/15 rounded-full blur-[60px] -translate-x-1/2 -translate-y-1/2 will-change-transform"
                      style={{ left: "var(--mouse-x, 50%)", top: "var(--mouse-y, 50%)" }}
                    ></div>
                  </div>

                  <div className="relative z-10 p-6 md:p-8">
                    <div className="flex justify-between items-center gap-6">
                      <h3 className={`text-xl md:text-2xl font-bold transition-colors duration-300 ${isOpen ? 'text-brand-primary' : 'text-zinc-900 dark:text-white'}`}>
                        <span className="text-zinc-400 dark:text-zinc-600 mr-4 font-mono text-lg opacity-50">
                          0{index + 1}
                        </span>
                        {faq.question}
                      </h3>
                      
                      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${isOpen ? 'bg-brand-primary text-white rotate-180' : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400'}`}>
                        <ChevronDown size={20} />
                      </div>
                    </div>

                    <div 
                      className={`grid transition-all duration-500 ease-in-out ${
                        isOpen ? 'grid-rows-[1fr] opacity-100 mt-6' : 'grid-rows-[0fr] opacity-0 mt-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-base md:text-lg border-l-2 border-brand-primary/30 pl-4">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="w-full lg:w-5/12 relative self-stretch">
            <div className="faq-lottie-container sticky top-[5vh] flex items-center justify-center w-full h-[400px] md:h-[600px] bg-zinc-50/50 dark:bg-zinc-900/30 backdrop-blur-2xl border border-zinc-200/50 dark:border-zinc-800/50 rounded-[40px] overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-brand-primary/10 blur-[100px] rounded-full scale-150 pointer-events-none"></div>
            <div className="relative z-10 w-full h-full pointer-events-none">
                <img 
                src='./images/FAQS/faq-img.jpeg' 
                alt='FAQ Image' 
                className="absolute inset-0 w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            </div>
        </div>

        </div>
      </div>
    </section>
  );
};

export default FAQ;