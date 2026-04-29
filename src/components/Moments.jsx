import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Camera } from 'lucide-react';
import SectionTitle from './SectionTitle';

gsap.registerPlugin(ScrollTrigger);

const momentsData = [
  {
    id: 1,
    src: "/images/Moments/moment-1.jpeg",
    title: "Workspace",
    tag: "Work Mode"
  },
  {
    id: 2,
    src: "/images/FAQS/faq-img.jpeg",
    title: "Carnival Mode",
    tag: "Fun Moment"
  },
  {
    id: 3,
    src: "/images/Moments/moment-2.jpeg",
    title: "Samandar Ke Sath Kabaddi",
    tag: "Travel"
  },
  {
    id: 4,
    src: "/images/Moments/moment-3.jpeg",
    title: "Acoustic Flow",
    tag: "Music"
  },
  {
    id: 5,
    src: "/images/Moments/moment-4.jpeg",
    title: "Festival Vibes",
    tag: "Celebration"
  },
  {
    id: 6,
    src: "/images/Moments/moment-5.jpeg",
    title: "Accoustic Vibes",
    tag: "Team Work"
  },
  {
    id: 7,
    src: "/images/Moments/moment-6.jpeg",
    title: "Work Place",
    tag: "Casual"
  },
  {
    id: 8,
    src: "/images/Moments/moment-7.jpeg",
    title: "AI Carnival",
    tag: "Fun Mode"
  },
  {
    id: 9,
    src: "/images/Moments/moment-8.jpeg",
    title: "Solo Live Stage Moment",
    tag: "Concert Vibes"
  },
  {
    id: 10,
    src: "/images/Moments/moment-9.jpeg",
    title: "Celebration Mode",
    tag: "Team Work"
  },
  {
    id: 11,
    src: "/images/Moments/moment-10.jpeg",
    title: "Celebration Mode",
    tag: "Birthday"
  },
  {
    id: 12,
    src: "/images/Moments/moment-11.jpeg",
    title: "Celebration Mode",
    tag: "Birthday"
  },
  {
    id: 13,
    src: "/images/CTA/cta.jpeg",
    title: "Workspace",
    tag: "Chasing Deadlines"
  },
  {
    id: 14,
    src: "/images/Expertise/expertise-img.jpeg",
    title: "Motivation Mode",
    tag: "Learning"
  },
  {
    id: 15,
    src: "/images/About/about-1.jpg",
    title: "Hackathon Mode",
    tag: "Winner"
  },
  {
    id: 16,
    src: "/images/Moments/moment-12.jpeg",
    title: "Techfest Mode",
    tag: "Festival"
  },
  {
    id: 17,
    src: "/images/Moments/moment-13.jpeg",
    title: "Chasing Nature",
    tag: "Capture Mode"
  },
  {
    id: 18,
    src: "/images/Moments/moment-14.jpeg",
    title: "AI Mode",
    tag: "Carnival"
  },
  {
    id: 19,
    src: "/images/Moments/moment-15.jpeg",
    title: "Sports Mode",
    tag: "Beach"
  },
  {
    id: 20,
    src: "/images/Moments/moment-16.jpeg",
    title: "AI Summit",
    tag: "Carnival Vibes"
  },
  {
    id: 21,
    src: "/images/Moments/moment-17.jpeg",
    title: "Chasing Desert",
    tag: "Nature"
  },
  {
    id: 22,
    src: "/images/Moments/moment-18.jpeg",
    title: "Celebration Mode",
    tag: "Performance"
  },
  {
    id: 23,
    src: "/images/Moments/moment-19.jpeg",
    title: "Corporate Vibe",
    tag: "Office"
  },  
];

const MomentCard = ({ moment }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="moment-item relative group break-inside-avoid rounded-2xl overflow-hidden cursor-pointer bg-zinc-200 dark:bg-zinc-800 mb-6">      
      <div className="w-full relative overflow-hidden min-h-[250px]">
                
        {!isLoaded && (
          <div className="absolute inset-0 bg-zinc-300 dark:bg-zinc-700 animate-pulse z-0"></div>
        )}
        
        <img 
          src={moment.src} 
          alt={moment.title} 
          loading="lazy"
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-auto block scale-100 group-hover:scale-110 transition-all duration-700 ease-in-out filter grayscale-[50%] group-hover:grayscale-0 relative z-10 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
                
        <div className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"></div>
          
          <div className="absolute bottom-0 left-0 w-full p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-30">
            <span className="text-cyan-400 font-mono text-xs font-bold tracking-wider uppercase block mb-1">
              {moment.tag}
            </span>
            <h3 className="text-white text-xl font-bold">
              {moment.title}
            </h3>
          </div>
        </div>

      </div>
    </div>
  );
};

const Moments = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
  const items = gsap.utils.toArray('.moment-item');

  items.forEach((item, i) => {
    gsap.fromTo(item,
      {
        opacity: 0,
        y: 80,
        scale: 0.95
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: item,
          start: "top 95%",
          end: "top 60%",
          scrub: true
        }
      }
    );

    gsap.to(item, {
      y: i % 2 === 0 ? -20 : -40,
      ease: "none",
      scrollTrigger: {
        trigger: item,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  });
}, { scope: sectionRef });

  return (
    <section 
      ref={sectionRef} 
      id="moments" 
      className="py-24 bg-zinc-50 dark:bg-zinc-950 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-mono font-semibold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 rounded-full mb-4">
            <Camera size={14} /> UNFILTERED
          </div>
          <SectionTitle title="Moments" backtitle="Captures" />
          <p className="text-zinc-600 dark:text-zinc-400 text-lg">
            A visual journal of the places I've been, the things I build, and the strings I bend.
          </p>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
          {momentsData.map((moment) => (
            <MomentCard key={moment.id} moment={moment} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Moments;