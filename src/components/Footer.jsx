import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Mail } from 'lucide-react';
import CTA from './CTA';

gsap.registerPlugin(ScrollTrigger);

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const Footer = () => {
  const footerRef = useRef(null);
  const currentYear = new Date().getFullYear();

  useGSAP(() => {
    gsap.fromTo('.footer-col',
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: '.footer-main-content',
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );

    gsap.fromTo('.footer-bottom-bar',
      { opacity: 0, filter: "blur(4px)" },
      {
        opacity: 1,
        filter: "blur(0px)",
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: '.footer-bottom-bar',
          start: "top 95%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, { scope: footerRef });

  return (
    <footer ref={footerRef} className="relative bg-zinc-950 pt-0 overflow-hidden">

      <CTA />

      {/* 🔥 MAIN CONTENT */}
      <div className="footer-main-content container mx-auto px-6 py-20 relative z-10 grid md:grid-cols-3 gap-12 items-start">

        {/* LEFT */}
        <div className="footer-col flex flex-col gap-6">
          <div className="footer-logo w-fit">
            <img
              src="/images/brand-logo.png"
              alt="Bhavesh Baraiya Logo"
              className="h-12 md:h-20 w-auto object-contain brightness-0 invert"
            />
          </div>

          <p className="text-zinc-400 text-base leading-relaxed">
            Crafting cinematic digital experiences and scalable enterprise architectures.
            From pixel-perfect frontends to robust MERN backends.
          </p>
        </div>

        {/* 🔥 CENTER (PHILOSOPHY) */}
        <div className="footer-col flex flex-col items-center justify-center text-center gap-4">

          <div className="w-10 h-[1px] bg-zinc-700"></div>

          <div className="flex flex-col gap-2">
            <p className="text-white text-lg md:text-xl font-medium tracking-tight">
              Quality over quantity
            </p>
            <p className="text-zinc-500 text-sm">
              Clean • Scalable • Meaningful
            </p>
          </div>

          <div className="w-10 h-[1px] bg-zinc-700"></div>

            <p className="text-white text-lg md:text-xl font-medium tracking-tight">
              Follow Me On
            </p>
           <div className="flex items-center gap-6">
            <a href="https://github.com/itsbaraiya" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white transition-all duration-300 hover:scale-110">
              <GithubIcon />
            </a>
            <a href="https://www.linkedin.com/in/bhavesh-baraiya/" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-[#0A66C2] transition-all duration-300 hover:scale-110">
              <LinkedinIcon />
            </a>
            <a href="https://www.instagram.com/__bhavesh_baraiya_77/" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-[#E1306C] transition-all duration-300 hover:scale-110">
              <InstagramIcon />
            </a>
            <a href="mailto:bhavesh.baraiya.codes@gmail.com" className="text-zinc-500 hover:text-brand-primary transition-all duration-300 hover:scale-110">
              <Mail size={20} />
            </a>
          </div>

          <div className="w-10 h-[1px] bg-zinc-700"></div>


        </div>

        {/* RIGHT */}
        <div className="footer-col flex flex-col gap-6">

          <div>
            <p className="text-xl md:text-2xl font-medium text-white leading-relaxed tracking-tight">
              “I don’t just build websites… <br />
              I craft experiences that feel alive.”
            </p>

            <div className="w-16 h-[2px] bg-brand-primary mt-4"></div>
          </div>

          <p className="text-zinc-400 text-sm leading-relaxed">
            Blending creativity, code, and storytelling to turn ideas into
            meaningful digital products.
          </p>

          <p className="text-zinc-500 text-xs tracking-widest uppercase">
            — Bhavesh Baraiya
          </p>

        </div>

      </div>
      <div className="footer-bottom-bar border-t border-zinc-800/50 bg-zinc-950">
        <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row justify-center items-center gap-6">

          <p className="text-zinc-500 text-sm text-center md:text-left font-mono">
            © {currentYear} BHAVESH BARAIYA. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>

    </footer>
  );
};

export default Footer;