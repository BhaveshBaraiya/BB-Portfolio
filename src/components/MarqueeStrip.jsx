import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const MarqueeStrip = ({ 
  text = "Let's Build The Future • Have a Project? • ", 
  speed = 20, 
  reverse = false // New prop
}) => {
  const containerRef = useRef(null);
  const marqueeRef = useRef(null);

  useGSAP(() => {
    // If reverse is true, we move from 0 to -50%
    // If reverse is false (default), we move from -50% to 0
    const fromValue = reverse ? 0 : -50;
    const toValue = reverse ? -50 : 0;

    gsap.fromTo(marqueeRef.current, {
      xPercent: fromValue,
    }, {
      xPercent: toValue,
      duration: speed,
      ease: "none",
      repeat: -1,
    });
  }, { dependencies: [reverse, speed], scope: containerRef });

  return (
    <section 
      ref={containerRef}
      className="relative py-6 md:py-8 bg-zinc-950 overflow-hidden border-y border-zinc-800 flex items-center"
    >
      <div className="flex whitespace-nowrap will-change-transform" ref={marqueeRef}>
        {[1, 2, 3, 4].map((i) => (
          <h2 
            key={i}
            className="text-4xl md:text-6xl font-black uppercase leading-none tracking-tighter px-4 cta-stroke-text opacity-50 hover:opacity-100 transition-opacity duration-500 cursor-default"
          >
            
            {text}
          </h2>
        ))}
      </div>
    </section>
  );
};

export default MarqueeStrip;