import { useState, useRef, useEffect } from 'react';
import { TypeAnimation } from 'react-type-animation';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Code2, Sparkles, Guitar, TentTree, BrainCircuit, Palette } from 'lucide-react';

const slideData = [
  {
    sub: "Hey there, This is Bhavesh Baraiya",
    head: "A Web Developer",
    desc: "Architecting seamless full-stack applications with high-performance animations and secure backend systems.",
    img: "/images/Hero/hero-1.jpg",
    badge: "WEB & Animations",
    centerText: "ENGINEER.MODE", 
    floatingBadges: [
      { Icon: Code2, label: "Architecture", value: "Web & App", color: "cyan" },
      { Icon: BrainCircuit, label: "Automation", value: "System Logic", color: "indigo" },
    ]
  },
  {
    sub: "Crafting modern digital experiences",
    head: "Traveler Turns Coder!!",
    desc: "From chasing horizons to chasing bugs, my journey shaped the way I code — with curiosity, creativity, and connection.",
    img: "/images/Hero/hero-2.jpeg",
    badge: "Exploration & Logic",
    centerText: "FROM.ROADS.TO.CODE", 
    floatingBadges: [
      { Icon: TentTree, label: "Explorer Mode", value: "Curiosity First", color: "cyan" },
      { Icon: Code2, label: "Problem Solving", value: "The Zen Zone", color: "indigo" },
    ]
  },
  {
    sub: "Building enterprise scale solutions",
    head: "Code Meets Creativity",
    desc: "Whether I’m writing clean code, designing in Figma, or composing melodies, I bring heart and soul into everything I create.",
    img: "/images/Hero/hero-3.jpeg",
    badge: "Rhythm & Syntax",
    centerText: "CODE.WITH.CHORD", 
    floatingBadges: [
      { Icon: Palette, label: "Music", value: "Visual Rhythm", color: "cyan" },
      { Icon: Guitar, label: "Acoustic Vibe", value: "Creative Flow", color: "indigo" },
    ]
  }
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const progressRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({ repeat: -1 });

    const particles = gsap.utils.toArray('.background-particle');
    particles.forEach(p => {
      gsap.set(p, {
        x: `random(0, ${containerRef.current.offsetWidth}px)`,
        y: `random(0, ${containerRef.current.offsetHeight}px)`,
        opacity: `random(0.1, 0.4)`,
        scale: `random(0.5, 1.2)`
      });
      gsap.to(p, {
        x: "+= random(-100, 100)",
        y: "+= random(-100, 100)",
        duration: `random(10, 20)`,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });

    slideData.forEach((_, index) => {
      tl.call(() => {
        setCurrentSlide(index);
        gsap.to('.background-particle', { 
          opacity: 0.6, scale: 1.5, duration: 0.5, yoyo: true, repeat: 1, ease: "power2.out" 
        });
      });      
      tl.fromTo(".hero-content-anim",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power4.out" }
      );

      tl.fromTo(".hero-image-wrapper",
        { opacity: 0, scale: 0.85, rotationY: 15 },
        { opacity: 1, scale: 1, rotationY: 0, duration: 1.2, ease: "expo.out" },
        "<0.2"
      );

      tl.fromTo(".floating-badge",
        { opacity: 0, scale: 0.5, x: 20, y: 20 },
        { opacity: 1, scale: 1, x: 0, y: 0, duration: 1, ease: "back.out(1.7)", stagger: 0.3 },
        "<"
      );

      tl.fromTo(".center-text-anim",
        { opacity: 0, scale: 0.5, rotation: -90 },
        { opacity: 1, scale: 1, rotation: -90, duration: 1, ease: "back.out(1.5)" },
        "<0.2"
      );

      tl.fromTo(progressRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 6, ease: "none", transformOrigin: "left center" },
        "<" 
      );

      tl.fromTo(".glow-dot",
        { top: "0%", opacity: 0 },
        { top: "100%", opacity: 1, duration: 6, ease: "none" },
        "<"
      );

      gsap.to(".floating-badge", {
        y: -15,
        duration: 2.5,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        stagger: 0.3
      });

      tl.to({}, { duration: 1 });       
      tl.to([".hero-image-wrapper", ".floating-badge"],
        { opacity: 0, scale: 0.95, duration: 0.6, ease: "power2.in", stagger: 0.1 }
      );

      tl.to([".hero-content-anim", ".center-text-anim", ".glow-dot"],
        { opacity: 0, y: -20, duration: 0.6, stagger: 0.05, ease: "power2.in" },
        "<"
      );

    });

  }, { scope: containerRef });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!imageRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const xPos = (clientX / innerWidth - 0.5) * 20; 
      const yPos = (clientY / innerHeight - 0.5) * 20;

      gsap.to(imageRef.current, {
        x: xPos,
        y: yPos,
        rotationY: xPos * 0.5,
        rotationX: -yPos * 0.5,
        ease: "power2.out",
        duration: 1
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const isSecondSlide = currentSlide === 1;

  const colorMap = {
    cyan: "text-cyan-600 dark:text-cyan-400 bg-cyan-500/20",
    indigo: "text-indigo-600 dark:text-indigo-400 bg-indigo-500/20",
  };

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen flex items-center py-25 md:py-30 bg-zinc-50 dark:bg-zinc-950 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-zinc-50/50 dark:bg-zinc-950/80 pointer-events-none"></div>
      
      {[...Array(12)].map((_, i) => (
        <div key={i} className="background-particle absolute w-2 h-2 rounded-full bg-cyan-500 mix-blend-screen blur-[1px] pointer-events-none"></div>
      ))}

      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-cyan-500/20 dark:bg-cyan-500/10 rounded-full blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '4s' }} />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-500/20 dark:bg-indigo-500/10 rounded-full blur-[150px] mix-blend-screen animate-pulse" style={{ animationDuration: '6s' }} />

      <div className="hidden lg:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[75%] w-[1px] bg-gradient-to-b from-transparent via-zinc-300 dark:via-zinc-700 to-transparent z-0 pointer-events-none items-center justify-center">
          <div className="glow-dot absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-[60px] bg-gradient-to-b from-transparent via-cyan-500 to-transparent blur-[1px]"></div>

          <div className="center-text-anim absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 bg-zinc-50 dark:bg-zinc-950 px-6 py-2 border border-zinc-200 dark:border-zinc-800 rounded-full flex items-center gap-3 shadow-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></div>
                <span className="text-xs font-mono tracking-[0.25em] text-zinc-500 dark:text-zinc-400 whitespace-nowrap uppercase">
                  {slideData[currentSlide].centerText}
                </span>
          </div>
      </div>

      <div className={`container mx-auto px-6 relative z-10 flex flex-col ${isSecondSlide ? 'md:flex-row-reverse' : 'md:flex-row'} items-center justify-between xl:justify-center gap-16 xl:gap-32`}>

        <div className="flex-1 max-w-2xl text-left">
          <div className="hero-content-anim min-h-[40px] flex items-center gap-3 mb-4">
            <span className="px-3 py-1 text-xs font-mono font-semibold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 rounded-full flex items-center gap-2">
              <Sparkles size={14} /> {slideData[currentSlide].badge}
            </span>
          </div>

          <div className="hero-content-anim min-h-[40px]">
            <TypeAnimation
              key={currentSlide}
              sequence={[slideData[currentSlide].sub]}
              wrapper="p"
              cursor
              repeat={0}
              speed={50}
              className="text-lg md:text-2xl text-brand-primary font-mono mb-4"
            />
          </div>

          <h1 className="hero-content-anim min-h-[100px] md:min-h-[160px] text-5xl md:text-7xl lg:text-8xl font-extrabold text-zinc-900 dark:text-white mb-6 leading-[1.1] tracking-tight">
            {slideData[currentSlide].head}
          </h1>

          <p className="hero-content-anim min-h-[90px] text-base md:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-xl border-l-4 border-cyan-500 pl-6 bg-gradient-to-r from-zinc-100 dark:from-zinc-900/50 to-transparent py-2">
            {slideData[currentSlide].desc}
          </p>

          <div className="hero-content-anim mt-10 flex flex-wrap gap-4">
            <a href="#projects" className="group relative px-8 py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold rounded-xl overflow-hidden shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300">
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative z-10 flex items-center gap-2">
                <Code2 size={18} /> View Work
              </span>
            </a>
            <a href="#contact" className="px-8 py-4 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white font-bold rounded-xl hover:border-cyan-500/50 hover:bg-zinc-50 dark:hover:bg-zinc-800/80 transition-all duration-300">
              Let's Talk
            </a>
          </div>
        </div>

        <div className={`flex-1 w-full flex ${isSecondSlide ? 'justify-center md:justify-start' : 'justify-center md:justify-end'}`}>
          <div ref={imageRef} className="hero-image-wrapper relative w-full max-w-[350px] md:max-w-[490px] md:h-[550px] group perspective-[1000px]">
            
            <div className="absolute -inset-4 bg-gradient-to-tr from-cyan-500 to-indigo-500 rounded-[32px] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
            
            <div className="relative w-full h-full overflow-hidden rounded-[24px] border border-white/20 dark:border-white/10 shadow-2xl bg-zinc-100 dark:bg-zinc-900">
              <img
                key={currentSlide}
                src={slideData[currentSlide].img}
                alt="Hero"
                className="object-cover w-full h-full scale-105 group-hover:scale-100 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60"></div>
            </div>

            {slideData[currentSlide].floatingBadges.map(({ Icon, label, value, color }, index) => {
              const positionClasses = [
                "-bottom-8 -left-8 md:-left-12",
                "-top-8 -right-8 md:-right-10 px-4 py-3", 
              ];

              return (
                <div key={index} className={`floating-badge absolute ${positionClasses[index]} px-6 py-4 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-white/40 dark:border-zinc-700 shadow-xl rounded-2xl flex items-center gap-3 transition-opacity duration-300`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${colorMap[color] || colorMap.cyan}`}>
                    <Icon size={20} />
                  </div>
                  {index === 0 && (
                    <div className="flex flex-col">
                      <span className="text-xs text-zinc-500 font-mono uppercase tracking-wider">{label}</span>
                      <span className="text-sm font-bold text-zinc-900 dark:text-white">{value}</span>
                    </div>
                  )}
                </div>
              );
            })}

          </div>
        </div>

      </div>

      <div className="absolute bottom-0 left-0 w-full h-1 bg-zinc-200 dark:bg-zinc-800">
        <div ref={progressRef} className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 origin-left"></div>
      </div>
      
      <div className="absolute bottom-8 right-8 font-mono text-sm font-bold text-zinc-500 dark:text-zinc-400">
        0{currentSlide + 1} <span className="text-zinc-300 dark:text-zinc-600">/</span> 0{slideData.length}
      </div>

    </section>
  );
};

export default Hero;