import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SectionTitle from './SectionTitle';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    title: "Frontend & Mobile Architecture",
    skills: [
      { name: "React & Next.js", level: 95 },
      { name: "TypeScript / JavaScript", level: 90 },
      { name: "Angular & Vue", level: 80 },
      { name: "React Native", level: 85 },
      { name: "Tailwind CSS & GSAP", level: 92 },
    ]
  },
  {
    title: "Backend, CMS & Next-Gen",
    skills: [
      { name: "Node.js & Express", level: 90 },
      { name: "MongoDB", level: 88 },
      { name: "Python (AI/ML Integration)", level: 75 },
      { name: "PHP & TYPO3 Enterprise", level: 85 },
      { name: "CRM Integrations", level: 80 },
    ]
  }
];

const Skills = () => {
  const sectionRef = useRef(null);
  const bgWrapperRef = useRef(null);
  const [isBgLoaded, setIsBgLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);

  // STRICT LAZY LOAD OBSERVER
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" } 
    );

    if (bgWrapperRef.current) {
      observer.observe(bgWrapperRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useGSAP(() => {    
    const headers = gsap.utils.toArray('.skills-header-anim');
    headers.forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: {
            trigger: el, 
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });
    
    const bars = gsap.utils.toArray('.skill-fill');
    bars.forEach((bar) => {
      const targetWidth = bar.getAttribute('data-level') + '%';
      gsap.fromTo(bar, 
        { width: "0%" }, 
        {
          width: targetWidth,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: bar.closest('.group'), 
            start: "top 90%",
            toggleActions: "play none none reverse" 
          }
        }
      );
    });
    
    const percentages = gsap.utils.toArray('.skill-percentage');
    percentages.forEach((pct) => {
      const targetNum = pct.getAttribute('data-target');
      gsap.fromTo(pct,
        { innerHTML: 0 },
        {
          innerHTML: targetNum,
          duration: 1.5,
          ease: "power3.out",
          snap: { innerHTML: 1 }, 
          scrollTrigger: {
            trigger: pct.closest('.group'), 
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });
    
    ScrollTrigger.refresh();

  }, { scope: sectionRef });

  return (
    <section 
      id="skills" 
      ref={sectionRef} 
      className="py-24 px-6 relative border-t border-zinc-200 dark:border-white/5 bg-zinc-50 dark:bg-zinc-900/50 transition-colors duration-500 overflow-hidden"
    >
            
      <div ref={bgWrapperRef} className="absolute inset-0 z-0">
        {!isBgLoaded && (
          <div className="absolute inset-0 bg-zinc-300 dark:bg-zinc-900 animate-pulse z-0"></div>
        )}
        
        {isInView && (
          <img 
            src="/images/Skills/skills-bg.jpg"
            alt="Skills Background"
            onLoad={() => setIsBgLoaded(true)}
            className={`w-full h-full object-cover object-center transition-opacity duration-700 z-10 ${
              isBgLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}
      </div>
      
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-brand-primary/10 rounded-full blur-[120px] pointer-events-none z-10" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-brand-secondary/10 rounded-full blur-[100px] pointer-events-none z-10" />

      <div className="container mx-auto relative z-20 max-w-6xl">
        
        <div className="text-center mb-16 pt-5">
          <SectionTitle title="Skills" backtitle="My Expertise" className="text-black" />
          <p className="skills-header-anim will-change-transform mt-4 text-zinc-600 max-w-2xl mx-auto">
            A comprehensive breakdown of my core competencies across the modern development stack, from responsive UI architecture to complex AI-integrated backends.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {skillCategories.map((category, catIndex) => (
            <div key={catIndex} className="skills-header-anim will-change-transform w-full">
              
              <h4 className="text-2xl font-bold text-zinc-900  mb-8 flex items-center gap-3 border-b border-zinc-200 dark:border-zinc-800 pb-4 transition-colors duration-300">
                <span className="text-brand-primary font-mono text-sm opacity-70">0{catIndex + 1} //</span>
                {category.title}
              </h4>

              <div className="space-y-8">
                {category.skills.map((skill, index) => (
                  <div key={index} className="group">
                    
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-zinc-800  font-medium transition-colors duration-300">
                        {skill.name}
                      </span>
                      <span className="text-brand-primary font-mono text-sm font-bold flex items-center">
                        <span className="skill-percentage" data-target={skill.level}>0</span>%
                      </span>
                    </div>

                    <div className="h-3 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden border border-zinc-300 dark:border-zinc-700/50 relative">
                      <div 
                        className="skill-fill will-change-transform h-full bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full relative"
                        data-level={skill.level}
                        style={{ width: "0%" }}
                      >
                        <div className="absolute right-0 top-0 bottom-0 w-3 bg-white/50 rounded-full blur-[2px] shadow-[0_0_10px_rgba(255,255,255,0.8)]"></div>
                      </div>
                    </div>

                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Skills;