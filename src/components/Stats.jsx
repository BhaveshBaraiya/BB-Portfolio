import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SectionTitle from './SectionTitle';
import { MonitorSmartphone, GitCommit, Users, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const statsData = [
  {
    title: "Web Projects",
    value: 95,
    suffix: "+",
    icon: <MonitorSmartphone size={32} strokeWidth={1.5} />
  },
  {
    title: "Code Commits",
    value: 2500,
    suffix: "+",
    icon: <GitCommit size={32} strokeWidth={1.5} />
  },
  {
    title: "Happy Clients",
    value: 20,
    suffix: "+",
    icon: <Users size={32} strokeWidth={1.5} />
  },
  {
    title: "Hours Coded",
    value: 1500,
    suffix: "+",
    icon: <Clock size={32} strokeWidth={1.5} />
  }
];

const Stats = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    // 1. Header Reveal (Triggers on the header itself)
    gsap.fromTo('.stats-header-anim',
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 1, ease: "power3.out",
        scrollTrigger: {
          trigger: '.stats-header-anim', 
          start: "top 75%", 
          toggleActions: "play none none reverse"
        }
      }
    );

    // 2. The Inner Cards (Infinite Floating - Always Running)
    const cards = gsap.utils.toArray('.stat-card');
    cards.forEach((card) => {
      gsap.to(card, {
        y: -12,
        duration: 2 + Math.random(), 
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: Math.random() 
      });
    });

    // 3. The Outer Wrappers (4-Direction Cinematic Fly-In)
    const wrappers = gsap.utils.toArray('.stat-fly-wrapper');
    const directions = [
      { x: 0, y: -200 },  // Top
      { x: 200, y: 0 },   // Right
      { x: 0, y: 200 },   // Bottom
      { x: -200, y: 0 }   // Left
    ];

    wrappers.forEach((wrapper, index) => {
      const dir = directions[index];

      gsap.fromTo(wrapper,
        { 
          opacity: 0, 
          x: dir.x, 
          y: dir.y, 
          scale: 0.6,
          rotation: index % 2 === 0 ? 15 : -15 
        },
        {
          opacity: 1, 
          x: 0, 
          y: 0, 
          scale: 1,
          rotation: 0,
          duration: 1.8, 
          ease: "power3.out", 
          scrollTrigger: {
            // FIXED: Triggers specifically when the grid of cards is visible
            trigger: '.stats-grid',
            // FIXED: Waits until the top of the grid hits exactly 60% of your screen
            start: "top 60%", 
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // 4. Long Number Count-Up
    const numbers = gsap.utils.toArray('.stat-number');
    numbers.forEach((num) => {
      const target = parseInt(num.getAttribute('data-target'));
      
      gsap.fromTo(num,
        { innerHTML: 0 },
        {
          innerHTML: target,
          duration: 2.5, 
          ease: "power3.out",
          snap: { innerHTML: 1 }, 
          scrollTrigger: {
            // FIXED: Same trigger as the cards so the counting syncs perfectly
            trigger: '.stats-grid',
            start: "top 60%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    ScrollTrigger.refresh();
  }, { scope: sectionRef });

  return (
    <section 
      id="stats" 
      ref={sectionRef} 
      className="py-32 px-6 relative bg-white dark:bg-zinc-950 transition-colors duration-500 overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[500px] bg-brand-primary/5 dark:bg-brand-primary/10 rounded-full blur-[120px] pointer-events-none mix-blend-overlay"></div>
      
      <div className="container mx-auto relative z-10 max-w-6xl">
        
        <div className="text-center mb-24 pt-5">
          <div className="stats-header-anim will-change-transform">
            <SectionTitle title="Count With Me" backtitle="Statistics" />
            <p className="mt-4 text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto text-lg">
              From countless hours of dedication to milestones achieved, these numbers reflect our passion, progress, and the trust we’ve earned. With each project, I aim for excellence — and the stats reflect my passion, dedication, and consistency. Here's a quick look at what I've accomplished so far.
            </p>
          </div>
        </div>

        {/* ADDED class 'stats-grid' here for GSAP to target perfectly */}
        <div className="stats-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statsData.map((stat, index) => (
            
            <div key={index} className="stat-fly-wrapper will-change-transform w-full h-full">
              
              <div className="stat-card will-change-transform relative group p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 backdrop-blur-sm overflow-hidden flex flex-col items-center text-center hover:shadow-[0_0_40px_rgba(var(--color-brand-primary),0.15)] transition-shadow duration-500 h-full">
                
                <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/0 to-brand-primary/5 dark:to-brand-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                <div className="relative mb-8 text-brand-primary">
                  <div className="absolute inset-0 bg-brand-primary/20 rounded-full blur-xl scale-150 group-hover:scale-[2] transition-transform duration-700"></div>
                  <div className="relative z-10 w-20 h-20 flex items-center justify-center bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">
                    {stat.icon}
                  </div>
                </div>

                <div className="flex items-baseline justify-center gap-1 mb-3">
                  <span 
                    className="stat-number text-6xl font-black text-zinc-900 dark:text-white tracking-tighter"
                    data-target={stat.value}
                  >
                    0
                  </span>
                  <span className="text-4xl font-bold text-brand-primary">
                    {stat.suffix}
                  </span>
                </div>

                <h4 className="text-sm font-mono tracking-widest text-zinc-500 dark:text-zinc-400 uppercase group-hover:text-zinc-800 dark:group-hover:text-zinc-200 transition-colors duration-300">
                  {stat.title}
                </h4>

                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-brand-primary rounded-t-full opacity-0 group-hover:opacity-100 group-hover:w-32 transition-all duration-700"></div>
              </div>
            </div>
            
          ))}
        </div>

      </div>
    </section>
  );
};

export default Stats;