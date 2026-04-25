import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SectionTitle from './SectionTitle';

gsap.registerPlugin(ScrollTrigger);

const aboutSliderImages = [
  "/images/About/about-1.jpg", 
  "/images/About/about-2.jpeg",
  "/images/About/about-3.jpeg"
];

const headlineTech = [
  "MERN", "PYTHON", "TYPO3", "PHP", "Typescript", 
  "jQuery", "Javascript", "ReactNative", "Angular", 
  "Vue", "Shopify", "CRM"
];

const About = () => {
  const containerRef = useRef(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % aboutSliderImages.length);
    }, 5000); 
    return () => clearInterval(timer); 
  }, []);

  useGSAP(() => {
    const images = gsap.utils.toArray('.about-slide-image');
    gsap.to(images, { opacity: 0, duration: 0.4, ease: "power2.inOut" });
    gsap.to(images[currentImageIndex], { opacity: 1, duration: 1, ease: "power2.inOut" });
  }, { dependencies: [currentImageIndex], scope: containerRef });

  useGSAP(() => {
    gsap.to('.about-slider-wrapper', {
      y: -15, duration: 3, ease: "sine.inOut", yoyo: true, repeat: -1
    });

    gsap.fromTo('.about-left-col',
      { opacity: 0, x: -50 },
      { 
        opacity: 1, x: 0, duration: 1.2, ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play reverse play reverse",
        }
      }
    );

    gsap.fromTo('.about-text-anim',
      { opacity: 0, y: 30 },
      { 
        opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.15,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play reverse play reverse",
        }
      }
    );

    gsap.fromTo('.tech-badge',
      { opacity: 0, scale: 0.8 },
      { 
        opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)", stagger: 0.05,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play reverse play reverse",
        }
      }
    );

    ScrollTrigger.refresh();

  }, { scope: containerRef });

  return (
    <section id="about" className="py-24 px-6 relative border-t border-zinc-200 dark:border-white/5 bg-white dark:bg-zinc-950 transition-colors duration-500 overflow-hidden">
      <SectionTitle title="About" backtitle="Your Know Me More" />
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div ref={containerRef} className="container mx-auto flex flex-col md:flex-row items-center gap-16 relative z-10">
      
        <div className="about-left-col flex-1 w-full max-w-md relative group will-change-transform">
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 to-indigo-600 rounded-2xl transform rotate-3 scale-105 opacity-20 dark:opacity-30 group-hover:rotate-6 group-hover:scale-110 transition-all duration-700 ease-out blur-lg"></div>
          
          <div className="about-slider-wrapper relative z-10 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 shadow-xl h-[500px]">
            {aboutSliderImages.map((src, index) => (
              <img 
                key={index}
                src={src} 
                alt={`Slide ${index + 1}`} 
                className="about-slide-image absolute inset-0 w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700"
                style={{ opacity: index === 0 ? 1 : 0 }} 
              />
            ))}
            
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500"></div>
            <div className="absolute inset-0 bg-[url('/assets/grid-pattern.svg')] opacity-10 dark:opacity-20 pointer-events-none mix-blend-overlay"></div>
            
            <div className="absolute bottom-6 right-6 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl shadow-lg transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
              <div className="text-cyan-600 dark:text-cyan-400 font-mono text-sm font-bold">Experience</div>
              <div className="text-zinc-900 dark:text-white font-semibold">3+ Years</div>
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-8">
          <div className="space-y-4">
            <h2 className="about-text-anim will-change-transform text-cyan-600 dark:text-cyan-400 font-mono text-lg tracking-wider uppercase">Full Stack Engineer</h2>
            <h3 className="about-text-anim will-change-transform text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white transition-colors duration-300">
              The Architect Behind <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-indigo-500">
                The Code
              </span>
            </h3>
            
            <div className="flex flex-wrap gap-2 pt-2">
              {headlineTech.map((tech) => (
                <span 
                  key={tech} 
                  className="tech-badge will-change-transform px-3 py-1 text-xs font-mono font-semibold text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full hover:border-cyan-500 dark:hover:border-cyan-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-6 text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed transition-colors duration-300">
            <p className="about-text-anim will-change-transform">
              With over 3+ years of professional experience, I specialize in engineering high-performance digital architectures. While my foundation is deeply rooted in the MERN stack, my expertise spans across a vast ecosystem—from crafting enterprise CMS solutions in PHP and TYPO3, to building dynamic frontend interfaces with Angular, Vue, and React Native.
            </p>
            <p className="about-text-anim will-change-transform">
              I don't just write code; I architect solutions that drive real business value, backed by a strong focus on seamless Client Relationship Management. Recently, I have been expanding my technical trajectory into the realm of AI and Machine Learning. By utilizing Python, I integrate intelligent, data-driven features into modern web platforms, bridging the gap between traditional software development and the future of tech.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 pt-6 border-t border-zinc-200 dark:border-zinc-800">
            <div className="about-text-anim will-change-transform">
              <div className="text-zinc-900 dark:text-white font-bold text-xl mb-1">Architecture</div>
              <div className="text-cyan-600 dark:text-cyan-400 font-mono text-sm">Web • Mobile • Enterprise CMS</div>
            </div>
            <div className="about-text-anim will-change-transform">
              <div className="text-zinc-900 dark:text-white font-bold text-xl mb-1">Next-Gen</div>
              <div className="text-cyan-600 dark:text-cyan-400 font-mono text-sm">AI/ML Integration • Python</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;