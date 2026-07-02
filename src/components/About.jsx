import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SectionTitle from './SectionTitle';

gsap.registerPlugin(ScrollTrigger);

const aboutSliderImages = [
  "/images/About/about-1.png", 
  "/images/About/about-2.jpeg",
  "/images/About/about-3.jpg"
];

const headlineTech = [
  "MERN", "PYTHON", "CMS", "PHP", "TypeScript", 
  "JavaScript", "React.js","Next.js", "Angular", 
  "Vue", "Shopify"
];

const AboutSliderImage = ({ src, index, currentImageIndex }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const wrapperRef = useRef(null);
  const isActive = index === currentImageIndex;

  useEffect(() => {
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect(); 
        }
      },
      { rootMargin: "200px" } 
    );

    if (wrapperRef.current) {
      observer.observe(wrapperRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapperRef} className="absolute inset-0 w-full h-full">
      {!isLoaded && isActive && (
        <div className="absolute inset-0 bg-zinc-300 dark:bg-zinc-800 animate-pulse z-0"></div>
      )}
            
      {isInView && (
        <img
          src={src}
          alt={`Bhavesh Baraiya - Slide ${index + 1}`}
          onLoad={() => setIsLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-[1500ms] ease-in-out z-10 ${
            isActive
              ? (isLoaded ? 'opacity-100 scale-105' : 'opacity-0 scale-105')
              : 'opacity-0 scale-100'
          }`}
        />
      )}
    </div>
  );
};

const About = () => {
  const containerRef = useRef(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % aboutSliderImages.length);
    }, 4500);
    return () => clearInterval(timer); 
  }, []);

  useGSAP(() => {
    gsap.to('.about-slider-wrapper', {
      y: -10, 
      duration: 4, 
      ease: "sine.inOut", 
      yoyo: true, 
      repeat: -1
    });

    gsap.fromTo('.about-left-col',
      { opacity: 0, x: -40 },
      { 
        opacity: 1, x: 0, duration: 1.2, ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        }
      }
    );

    gsap.fromTo('.about-text-anim',
      { opacity: 0, y: 20 },
      { 
        opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        }
      }
    );
    
    gsap.fromTo('.tech-badge',
      { opacity: 0, scale: 0.9 },
      { 
        opacity: 1, scale: 1, duration: 0.5, ease: "back.out(2)", stagger: 0.03,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        }
      }
    );

    ScrollTrigger.refresh();
  }, { scope: containerRef });

  return (
    <section id="about" className="py-24 px-6 relative border-t border-zinc-200 dark:border-white/5 bg-zinc-50 dark:bg-zinc-950 transition-colors duration-500 overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 dark:bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/5 dark:bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none -translate-x-1/3 translate-y-1/3" />
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-16 pt-5">
          <SectionTitle title="About Me" backtitle="Who I Am" />
        </div>
        <div ref={containerRef} className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">      
          <div className="about-left-col flex-1 w-full max-w-md lg:max-w-lg relative group will-change-transform">          
            <div className="about-slider-wrapper relative z-10 rounded-tr-3xl rounded-bl-3xl overflow-hidden bg-zinc-200 dark:bg-zinc-900 shadow-2xl h-[450px] md:h-[550px] border border-white/20 dark:border-white/5">
              
              {aboutSliderImages.map((src, index) => (
                <AboutSliderImage 
                  key={index} 
                  src={src} 
                  index={index} 
                  currentImageIndex={currentImageIndex} 
                />
              ))}
                            
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 pointer-events-none z-20"></div>                      
              <div className="absolute bottom-6 left-6 md:left-auto md:right-6 bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20 p-5 rounded-2xl shadow-2xl transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-75 z-30">
                <div className="flex items-center gap-4">
                  <div className="text-4xl font-black text-white leading-none">3+</div>
                  <div className="flex flex-col">
                    <span className="text-cyan-300 font-mono text-xs uppercase tracking-widest">Years of</span>
                    <span className="text-white font-semibold text-sm">Experience</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
          <div className="flex-1 space-y-10">
            <div className="space-y-6">
              <div className="about-text-anim flex items-center gap-3">
                <div className="h-[1px] w-12 bg-cyan-600 dark:bg-cyan-400"></div>
                <h2 className="text-cyan-600 dark:text-cyan-400 font-mono text-sm tracking-[0.2em] uppercase font-semibold">
                  Software Engineer
                </h2>
              </div>
              
              <h3 className="about-text-anim will-change-transform text-4xl md:text-5xl lg:text-6xl font-extrabold text-zinc-900 dark:text-white leading-[1.1] tracking-tight">
                The Architect Behind <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-indigo-600 dark:from-cyan-400 dark:to-indigo-400">
                  The Code.
                </span>
              </h3>
              
              <div className="flex flex-wrap gap-2 pt-2">
                {headlineTech.map((tech) => (
                  <span 
                    key={tech} 
                    className="tech-badge will-change-transform px-4 py-1.5 text-xs font-mono font-medium text-zinc-600 dark:text-zinc-400 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md shadow-sm hover:border-cyan-500/50 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-6 text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
              <p className="about-text-anim will-change-transform border-l-2 border-zinc-300 dark:border-zinc-700 pl-6">
                With over 3+ years of professional experience, I specialize in engineering high-performance digital architectures. While my foundation is deeply rooted in the MERN stack, my expertise spans across a vast ecosystem—from crafting enterprise CMS solutions to building dynamic interfaces with modern frontend frameworks.
              </p>
              <p className="about-text-anim will-change-transform border-l-2 border-zinc-300 dark:border-zinc-700 pl-6">
                I don't just write code; I architect solutions that drive real business value. Recently, I have been expanding my technical trajectory into the realm of AI and Machine Learning. By utilizing Python, I integrate intelligent, data-driven features into modern web platforms, bridging the gap between traditional software development and the future of tech.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-zinc-200 dark:border-zinc-800">
              <div className="about-text-anim will-change-transform group">
                <div className="text-zinc-900 dark:text-white font-bold text-xl mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                  Architecture
                </div>
                <div className="text-zinc-500 dark:text-zinc-500 font-mono text-sm leading-relaxed">
                  Web Applications<br/>Mobile Platforms<br/>Enterprise CMS
                </div>
              </div>
              <div className="about-text-anim will-change-transform group">
                <div className="text-zinc-900 dark:text-white font-bold text-xl mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  Next-Gen
                </div>
                <div className="text-zinc-500 dark:text-zinc-500 font-mono text-sm leading-relaxed">
                  AI/ML Integration<br/>Python Ecosystem<br/>Data Automations
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default About;