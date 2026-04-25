import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CTA = () => {
  const sectionRef = useRef(null);
  const marqueeRef = useRef(null);
  const imageRef = useRef(null);

  useGSAP(() => {
    // 1. Infinite Marquee
    gsap.fromTo(
      marqueeRef.current,
      { xPercent: -50 },
      {
        xPercent: 0,
        duration: 25,
        ease: "none",
        repeat: -1,
      }
    );

    // 2. Parallax Image
    gsap.fromTo(
      imageRef.current,
      { scale: 1.1, yPercent: -5 },
      {
        scale: 1,
        yPercent: 5,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );

    // 3. Button Reveal
    gsap.fromTo(
      '.cta-btn',
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative bg-zinc-950 overflow-hidden border-t border-zinc-800 flex flex-col md:flex-row items-center md:items-end gap-10 md:gap-0 min-h-[450px] py-16 md:pb-24 md:pt-0"
    >

      {/* 🔥 BACKGROUND GLOW */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 bg-brand-primary/20 blur-[120px] rounded-full opacity-40"></div>
      </div>

      {/* 🔥 GRID TEXTURE */}
      <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      {/* 1. MARQUEE */}
      <div className="relative md:absolute top-0 left-0 w-full md:w-[200vw] z-0 flex pointer-events-none mb-10 md:mb-0 md:mt-10">
        <div ref={marqueeRef} className="flex whitespace-nowrap items-center will-change-transform">
          <h2 className="text-[3rem] md:text-[4rem] font-black uppercase leading-none tracking-tighter mr-8 cta-stroke-text opacity-30 md:opacity-100">
            Let's Build The Future • Have a Project? •
          </h2>
          <h2 className="text-[3rem] md:text-[4rem] font-black uppercase leading-none tracking-tighter mr-8 cta-stroke-text opacity-30 md:opacity-100">
            Let's Build The Future • Have a Project? •
          </h2>
        </div>
      </div>

      {/* 2. CONTENT */}
      <div className="container mx-auto relative z-30 px-6">
        <div className="cta-btn flex flex-col items-center md:items-start text-center md:text-left gap-6 max-w-xl">

          {/* Headline */}
          <h3 className="text-3xl md:text-5xl font-bold text-white leading-[1.2] md:leading-[1.1] tracking-tight">
            Ready to engineer <br className="hidden md:block" />
            your next <span className="text-brand-primary">big idea?</span>
          </h3>          

          {/* Button */}
          <a
            href="mailto:bhavesh.baraiya.codes@gmail.com"
            className="group relative inline-flex items-center gap-4 bg-brand-primary text-white px-8 py-4 md:px-6 md:py-3 rounded-full font-bold text-base overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_10px_40px_rgba(var(--color-brand-primary),0.3)]"
          >
            <span className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
            <span className="relative z-10">Start a Conversation</span>
            <div className="relative z-10 w-8 h-8 md:w-10 md:h-10 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-brand-primary transition-colors duration-300">
              <ArrowRight size={18} className="group-hover:-rotate-45 transition-transform duration-300" />
            </div>
          </a>
        </div>
      </div>

      {/* 3. IMAGE */}
      <div
        className="relative md:absolute right-0 top-0 bottom-0 w-full md:w-[40%] h-[250px] md:h-full mt-10 md:mt-0 z-10 overflow-hidden"
        style={{ clipPath: "none" }}
      >
        <style
          dangerouslySetInnerHTML={{
            __html: `
            @media (min-width: 768px) {
              .cta-image-clip {
                clip-path: polygon(15% 0, 100% 0, 100% 100%, 0 100%) !important;
              }
            }
          `,
          }}
        />

        <div className="cta-image-clip h-full w-full relative">
          <div className="absolute inset-0 bg-brand-primary/20 mix-blend-overlay z-20 pointer-events-none"></div>
          <img
            ref={imageRef}
            src="/images/CTA/cta.jpeg"
            alt="Collaboration"
            className="w-full h-full object-cover will-change-transform"
          />
        </div>
      </div>

      {/* 🔥 EXTRA ACCENT (desktop only) */}
      <div className="hidden md:block absolute bottom-10 left-10 w-20 h-20 border border-zinc-700 rounded-full opacity-20"></div>

    </section>
  );
};

export default CTA;