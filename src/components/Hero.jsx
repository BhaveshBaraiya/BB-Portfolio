import { useState, useRef } from 'react';
import { TypeAnimation } from 'react-type-animation';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const slideData = [
  {
    sub: "Hey there, This is Bhavesh Baraiya",
    head: "A Web Developer",
    desc: "Architecting seamless full-stack applications with high-performance animations and secure backend systems.",
    img: "/images/Hero/hero-1.jpg",
  },
  {
    sub: "Crafting modern digital experiences",
    head: "Traveler Turns Coder!!",
    desc: "From chasing horizons to chasing bugs, my journey as a traveler shaped the way I code — with curiosity, creativity, and connection.",
    img: "/images/Hero/hero-2.jpeg",
  },
  {
    sub: "Building enterprise scale solution",
    head: "Code Meets Creativity",
    desc: "Whether I’m writing clean code or composing melodies on my guitar, I bring heart and soul into everything I create.",
    img: "/images/Hero/hero-3.jpeg",
  }
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({ repeat: -1 });

    slideData.forEach((_, index) => {

      tl.call(() => {
        setCurrentSlide(index);
      });

      tl.fromTo(".hero-content-anim",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );

      tl.fromTo(".hero-image",
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" },
        "<"
      );

      tl.to({}, { duration: 2 });

      tl.to(".hero-content-anim",
        { opacity: 0, y: -30, duration: 0.6, ease: "power2.inOut" }
      );

      tl.to(".hero-image",
        { opacity: 0, scale: 0.95, duration: 0.6, ease: "power2.inOut" },
        "<"
      );

    });

  }, { scope: containerRef });

  const isSecondSlide = currentSlide === 1;

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen flex items-center py-25 md:py-35 bg-zinc-50 dark:bg-zinc-950 overflow-hidden"
    >
      <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-cyan-500/20 dark:bg-cyan-500/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 md:w-96 md:h-96 bg-indigo-500/20 dark:bg-indigo-500/10 rounded-full blur-[100px]" />

      <div className={`container mx-auto px-6 relative z-10 flex flex-col ${isSecondSlide ? 'md:flex-row-reverse' : 'md:flex-row'} items-center justify-between gap-12`}>

        <div className="flex-1 max-w-2xl text-left">

          <div className="hero-content-anim min-h-[40px]">
            <TypeAnimation
              key={currentSlide}
              sequence={[slideData[currentSlide].sub]}
              wrapper="p"
              cursor
              repeat={0}
              speed={50}
              className="text-base md:text-xl text-cyan-600 dark:text-cyan-400 font-mono mb-4"
            />
          </div>

          <h1 className="hero-content-anim min-h-[100px] md:min-h-[140px] text-4xl md:text-7xl font-extrabold text-zinc-900 dark:text-white mb-6 leading-[1.1]">
            {slideData[currentSlide].head}
          </h1>

          <p className="hero-content-anim min-h-[90px] text-base md:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-xl border-l-4 border-indigo-500 pl-4">
            {slideData[currentSlide].desc}
          </p>

          <div className="hero-content-anim mt-8 flex flex-wrap gap-4">
            <a href="#projects" className="px-8 py-3 bg-gradient-to-r from-cyan-600 to-indigo-600 text-white font-bold rounded-lg hover:scale-105 transition-transform">
              View Work
            </a>
            <a href="#contact" className="px-8 py-3 border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-bold rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800">
              Contact Me
            </a>
          </div>

        </div>

        <div className={`hero-image flex-1 w-full flex ${isSecondSlide ? 'justify-center md:justify-start' : 'justify-center md:justify-end'}`}>
          <div className="relative w-full max-w-[320px] md:max-w-[550px] md:h-[600px] group">
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 to-indigo-500 rounded-2xl blur-xl opacity-30"></div>
            <div className="relative w-full h-full overflow-hidden rounded-2xl">
              <img
                key={currentSlide}
                src={slideData[currentSlide].img}
                alt="Hero"
                className="object-cover w-full h-full transition-opacity duration-500"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;