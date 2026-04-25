import { useRef } from 'react';
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

  useGSAP(() => {
    gsap.fromTo('.expertise-header-anim',
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", toggleActions: "play none none reverse" }
      }
    );

    gsap.fromTo('.lottie-container',
      { opacity: 0, x: -50, rotationY: -15 },
      {
        opacity: 1, x: 0, rotationY: 0, duration: 1.5, ease: "power3.out",
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
        { opacity: 0.2, scale: 0.9, x: 40, filter: "blur(5px)" },
        {
          opacity: 1, scale: 1, x: 0, filter: "blur(0px)",
          duration: 0.7, ease: "back.out(1.2)", 
          scrollTrigger: {
            trigger: item,
            start: "top 60%", end: "bottom 40%", 
            toggleActions: "play reverse play reverse"
          }
        }
      );

      gsap.fromTo(glowBorder,
        { opacity: 0 },
        {
          opacity: 1, duration: 0.5,
          scrollTrigger: { trigger: item, start: "top 60%", end: "bottom 40%", toggleActions: "play reverse play reverse" }
        }
      );

      gsap.fromTo(nodeNum,
        { color: "inherit", scale: 1, textShadow: "0px 0px 0px transparent" },
        {
          color: "var(--color-brand-primary)",
          scale: 1.2,
          textShadow: "0px 0px 20px rgba(var(--color-brand-primary), 0.8)",
          duration: 0.4,
          scrollTrigger: { trigger: item, start: "top 50%", end: "bottom 50%", toggleActions: "play reverse play reverse" }
        }
      );

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
      id="expertise" 
      ref={sectionRef} 
      className="py-32 px-6 relative bg-zinc-50 dark:bg-zinc-950 transition-colors duration-500 overflow-x-clip"
    >
      <div className="container mx-auto relative z-10 max-w-7xl">
        
        <div className="text-center mb-24 pt-5">
          <div className="expertise-header-anim will-change-transform">
            <SectionTitle title="Expertise" backtitle="What I Do Best" />
            <p className="mt-4 text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto text-lg">
              A comprehensive breakdown of my technical arsenal and engineering capabilities.
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 relative">
          
          <div className="w-full lg:w-5/12 relative">
            <div className="lottie-container sticky top-[5vh] flex items-center justify-center w-full h-[350px] md:h-[500px] bg-white/30 dark:bg-zinc-900/30 backdrop-blur-2xl border border-white/50 dark:border-zinc-800/50 rounded-[40px] overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-brand-primary/10 blur-[100px] rounded-full scale-150 pointer-events-none"></div>
                <img 
                src='./images/Expertise/expertise-img.jpeg' 
                alt='FAQ Image' 
                className="absolute inset-0 w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700"
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
                    <span className="node-number font-mono text-xl md:text-3xl font-black text-zinc-300 dark:text-zinc-700 bg-zinc-50 dark:bg-zinc-950 py-4 transition-colors duration-300 will-change-transform">
                      0{index + 1}
                    </span>
                  </div>

                  <div className="expertise-item will-change-transform w-full relative p-8 md:p-10 rounded-3xl bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 transition-colors duration-500 overflow-hidden shadow-xl">
                    <div className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div
                        className="absolute w-[400px] h-[400px] bg-brand-primary/10 dark:bg-brand-primary/15 rounded-full blur-[60px] -translate-x-1/2 -translate-y-1/2 will-change-transform"
                        style={{ left: "var(--mouse-x, 50%)", top: "var(--mouse-y, 50%)" }}
                      ></div>
                    </div>

                    <div className="glow-border absolute inset-0 rounded-3xl border border-brand-primary/40 shadow-[inset_0_0_20px_rgba(var(--color-brand-primary),0.1)] pointer-events-none opacity-0 z-10"></div>

                    <div className="relative z-20">
                      <h3 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white mb-4 tracking-tight font-serif lg:font-sans">
                        {item.title}
                      </h3>
                      <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
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