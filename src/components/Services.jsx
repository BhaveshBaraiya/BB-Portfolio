import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SectionTitle from './SectionTitle';
import { LayoutTemplate, Server, Database, BrainCircuit, Code2, Smartphone } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const servicesData = [
  {
    icon: <Code2 size={32} />,
    title: "Frontend Architecture",
    description: "Building pixel-perfect, highly animated, and responsive user interfaces using React, Vue, and GSAP."
  },
  {
    icon: <Server size={32} />,
    title: "Backend & API Systems",
    description: "Engineering secure, high-performance server-side logic and RESTful APIs using Node.js and Express."
  },
  {
    icon: <LayoutTemplate size={32} />,
    title: "Enterprise CMS Solutions",
    description: "Developing robust CMS solutions using PHP and TYPO3."
  },
  {
    icon: <Database size={32} />,
    title: "Database Architecture",
    description: "Designing scalable schemas using MongoDB and SQL."
  },
  {
    icon: <BrainCircuit size={32} />,
    title: "AI & ML Integration",
    description: "Integrating AI models and intelligent automation using Python."
  },
  {
    icon: <Smartphone size={32} />,
    title: "Cross-Platform Mobile",
    description: "Building mobile apps using React Native."
  }
];

const Services = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    // ✅ Header animation (unchanged)
    gsap.fromTo('.services-header-anim',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: '.services-header-anim',
          start: "top 90%",
          toggleActions: "play none none reverse"
        }
      }
    );

 mm.add("(max-width: 767px)", () => {
  const cards = gsap.utils.toArray('.service-card');

  function updateActiveCard() {
    let closestCard = null;
    let closestDistance = Infinity;

    const viewportCenter = window.innerHeight / 2;

    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.top + rect.height / 2;

      const distance = Math.abs(viewportCenter - cardCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestCard = card;
      }
    });

    // ⚡ INSTANT UPDATE (NO gsap.to, NO duration)
    cards.forEach((card) => {
      if (card === closestCard) {
        gsap.set(card, {
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
        });
      } else {
        gsap.set(card, {
          scale: 0.95,
          opacity: 0.4,
          filter: "blur(3px)",
        });
      }
    });
  }

  ScrollTrigger.create({
    trigger: sectionRef.current,
    start: "top top",
    end: "bottom bottom",
    scrub: true,
    onUpdate: updateActiveCard,
  });

  // initial state
  updateActiveCard();
});

    // ✅ DESKTOP (UNCHANGED)
    mm.add("(min-width: 768px)", () => {
      gsap.fromTo('.service-card',
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.5)",
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.services-grid',
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    return () => mm.revert();
  }, { scope: sectionRef });

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-24 px-6 relative border-t border-zinc-200 dark:border-white/5 bg-white dark:bg-zinc-950 transition-colors duration-500 overflow-hidden"
    >
      <div className="container mx-auto relative z-10 max-w-7xl">

        <div className="text-center mb-16 pt-5">
          <SectionTitle title="Services" backtitle="What I Do" />
          <p className="services-header-anim mt-4 text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            From database architecture to frontend animations, I provide end-to-end development services.
          </p>
        </div>

        {/* ✅ ONLY MOBILE spacing fix */}
        <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-8">

          {servicesData.map((service, index) => (
            <div
              key={index}
              className="service-card sticky top-[90px] md:relative md:top-0 min-h-[260px] will-change-transform [transform:translateZ(0)] group relative p-8 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl hover:border-brand-primary/50 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-xl dark:shadow-none mb-4 md:mb-0"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"></div>

              <div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 group-hover:text-brand-primary group-hover:border-brand-primary/50 transition-colors duration-300 shadow-sm relative z-10">
                {service.icon}
              </div>

              <div className="relative z-10">
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3 group-hover:text-brand-primary transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm">
                  {service.description}
                </p>
              </div>

              <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-brand-primary to-brand-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Services;