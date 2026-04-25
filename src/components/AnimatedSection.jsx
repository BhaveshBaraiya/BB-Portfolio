import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const AnimatedSection = ({ children, id, className = "" }) => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%", 
          toggleActions: "play reverse play reverse",
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section 
      id={id} 
      ref={sectionRef} 
      className={`py-24 px-6 transition-colors duration-500 ${className}`}
    >
      {children}
    </section>
  );
};

export default AnimatedSection;