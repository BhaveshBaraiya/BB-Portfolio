import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SectionTitle from './SectionTitle';

gsap.registerPlugin(ScrollTrigger);

const expertiseData = [
  {
    title: "Debugging & Troubleshooting",
    desc: "Efficiently identifying, isolating, and resolving code issues using tools like Chrome DevTools, VSCode Debugger, and advanced console logging strategies."
  },
  {
    title: "Performance Optimization",
    desc: "Enhancing application speed and responsiveness by minimizing render cycles, lazy-loading resources, and applying efficient state management."
  },
  {
    title: "Web Development (MERN Stack)",
    desc: "Building scalable and dynamic web applications using MongoDB, Express.js, React, and Node.js with seamless frontend-backend integration."
  },
  {
    title: "UI/UX Design",
    desc: "Designing intuitive, pixel-perfect interfaces using Bootstrap 5 and Figma, ensuring excellent user engagement and accessibility."
  },
  {
    title: "API Integration & Development",
    desc: "Creating and integrating RESTful APIs with secure authentication, error handling, and efficient data flow between frontend and backend."
  },
  {
    title: "Cloud & Deployment (DevOps Lite)",
    desc: "Deploying web applications on Vercel, Netlify, and configuring backend services on platforms like Render, Railway, and Cloudinary."
  },
  {
    title: "Version Control & Collaboration",
    desc: "Managing codebase with Git and GitHub, resolving merge conflicts, and collaborating effectively in team environments with pull requests."
  },
  {
    title: "Testing & Quality Assurance",
    desc: "Ensuring code reliability through unit testing (Jest), end-to-end testing (Cypress), and test-driven development methodologies."
  }
];

const Expertise = () => {
  const sectionRef = useRef(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useGSAP(() => {    
    gsap.fromTo('.expertise-header-anim',
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 1.2, ease: "expo.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", toggleActions: "play none none reverse" }
      }
    );
    
    gsap.fromTo('.lottie-container',
      { opacity: 0, y: 40 }, 
      {
        opacity: 1, y: 0, duration: 1.5, ease: "expo.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 60%", toggleActions: "play none none reverse" }
      }
    );
    
    gsap.fromTo('.neural-progress',
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: '.expertise-list-container',
          start: "top 50%",    
          end: "bottom 50%",   
          scrub: true,         
        }
      }
    );
    
    const items = gsap.utils.toArray('.expertise-item');
    
    items.forEach((item) => {
      const glowBorder = item.querySelector('.glow-border');
      const nodeNum = item.querySelector('.node-number');

      gsap.fromTo(item,
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 1, ease: "expo.out", 
          scrollTrigger: {
            trigger: item,
            start: "top 75%", 
            toggleActions: "play reverse play reverse"
          }
        }
      );

      gsap.fromTo(glowBorder,
        { opacity: 0 },
        {
          opacity: 1, duration: 0.5,
          scrollTrigger: { trigger: item, start: "top 75%", toggleActions: "play reverse play reverse" }
        }
      );

      gsap.fromTo(nodeNum,
        { color: "inherit", scale: 1, textShadow: "0px 0px 0px transparent" },
        {
          color: "var(--color-brand-primary)",
          scale: 1.1,
          textShadow: "0px 0px 15px rgba(var(--color-brand-primary), 0.6)",
          duration: 0.4,
          scrollTrigger: { trigger: item, start: "top 50%", end: "bottom 50%", toggleActions: "play reverse play reverse" }
        }
      );
    });

    ScrollTrigger.refresh();
  }, { scope: sectionRef });
  
  useEffect(() => {
    const items = document.querySelectorAll('.expertise-item');
    
    const handleMouseMove = (e) => {
      const item = e.currentTarget;
      const rect = item.getBoundingClientRect();
      requestAnimationFrame(() => {
        item.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
        item.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
      });
    };

    items.forEach((item) => {
      item.addEventListener("mousemove", handleMouseMove);
    });

    return () => {
      items.forEach((item) => {
        item.removeEventListener("mousemove", handleMouseMove);
      });
    };
  }, []);

  return (
    <section 
      id="expertise" 
      ref={sectionRef} 
      className="py-32 px-6 relative bg-zinc-50 dark:bg-zinc-950 transition-colors duration-500 overflow-x-clip"
    >      
      <div className="absolute top-0 left-0 w-full h-[1px] bg-zinc-200 dark:bg-zinc-800"></div>
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-zinc-200 dark:bg-zinc-800"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      <div className="container mx-auto relative z-10 max-w-7xl">
        <div className="text-center mb-24 pt-5 border-b border-zinc-200 dark:border-zinc-800 pb-12">
          <div className="expertise-header-anim w-full flex flex-col items-center">            
            <SectionTitle title="Expertise" backtitle="What I Do Best" />
            <p className="mt-6 text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto text-lg font-serif italic leading-relaxed">
              "A comprehensive breakdown of my technical arsenal and engineering capabilities. Precision, logic, and seamless integration at every layer."
            </p>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 relative">                  
          <div className="w-full lg:w-5/12 relative">            
            <div className="lottie-container group sticky top-[15vh] flex items-center justify-center w-full h-[350px] md:h-[500px] bg-white/30 dark:bg-zinc-900/30 backdrop-blur-2xl border border-white/50 dark:border-zinc-800/50 rounded-[40px] overflow-hidden shadow-2xl">              
                          
              <div className="absolute inset-0 bg-brand-primary/10 blur-[100px] rounded-full scale-150 pointer-events-none z-0"></div>
              <div className="absolute inset-4 border border-zinc-200/50 dark:border-zinc-700/50 rounded-[28px] pointer-events-none z-30 transition-colors duration-500 group-hover:border-brand-primary/30"></div>
                          
              {!isImageLoaded && (
                <div className="absolute inset-0 bg-zinc-300 dark:bg-zinc-800 animate-pulse z-10"></div>
              )}              
              <img 
                src='./images/Expertise/expertise-img.jpeg' 
                alt='Expertise Concept' 
                loading="lazy"
                decoding="async"
                onLoad={() => setIsImageLoaded(true)}
                className={`absolute inset-0 w-full h-full object-cover scale-100 group-hover:scale-105 filter grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 z-20 ${
                  isImageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </div>
          </div>
          <div className="w-full lg:w-7/12 relative md:pb-[30vh] expertise-list-container">            
            <div className="absolute left-[20px] md:left-[30px] top-12 bottom-[30vh] w-[2px] bg-zinc-200 dark:bg-zinc-800 rounded-full"></div>                       
            <div className="neural-progress absolute left-[20px] md:left-[30px] top-12 bottom-[30vh] w-[2px] bg-brand-primary origin-top shadow-[0_0_15px_rgba(var(--color-brand-primary),0.8)] will-change-transform z-10"></div>
            <div className="flex flex-col gap-12 relative z-20">
              {expertiseData.map((item, index) => (
                <div key={index} className="relative flex items-center group pl-16 md:pl-24">
                                    
                  <div className="absolute left-0 w-[40px] md:w-[60px] flex justify-center z-20">
                    <span className="node-number font-mono text-xl md:text-2xl font-bold text-zinc-300 dark:text-zinc-700 bg-zinc-50 dark:bg-zinc-950 py-4 transition-colors duration-300 will-change-transform">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  
                  <div className="absolute left-[40px] md:left-[60px] w-6 md:w-12 h-[1px] bg-zinc-200 dark:bg-zinc-800 z-10 group-hover:bg-brand-primary/50 transition-colors duration-500"></div>
                  
                  <div className="expertise-item will-change-transform w-full relative p-8 md:p-10 rounded-3xl bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 transition-colors duration-500 overflow-hidden shadow-xl">
                                        
                    <div className="absolute top-4 left-4 w-2 h-2 border-t border-l border-zinc-300 dark:border-zinc-700 pointer-events-none z-20"></div>
                    <div className="absolute bottom-4 right-4 w-2 h-2 border-b border-r border-zinc-300 dark:border-zinc-700 pointer-events-none z-20"></div>
                    
                    <div className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div
                        className="absolute w-[400px] h-[400px] bg-brand-primary/10 dark:bg-brand-primary/15 rounded-full blur-[60px] -translate-x-1/2 -translate-y-1/2 will-change-transform"
                        style={{ left: "var(--mouse-x, 50%)", top: "var(--mouse-y, 50%)" }}
                      ></div>
                    </div>

                    <div className="glow-border absolute inset-0 rounded-3xl border border-brand-primary/40 shadow-[inset_0_0_20px_rgba(var(--color-brand-primary),0.1)] pointer-events-none opacity-0 z-10"></div>

                    <div className="relative z-20">
                      <h3 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-white mb-4 tracking-tight font-sans">
                        {item.title}
                      </h3>
                      <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-serif">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Expertise;