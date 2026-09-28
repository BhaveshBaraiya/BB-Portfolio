import { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Camera, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import SectionTitle from './SectionTitle';

gsap.registerPlugin(ScrollTrigger);

const momentsData = [
  {
    id: 2,
    src: "/images/FAQS/faq-img.jpeg",
    title: "Carnival Mode",
    tag: "Fun Moment"
  },
  {
    id: 4,
    src: "/images/Moments/moment-4.jpeg",
    title: "Festival Vibes",
    tag: "Celebration"
  },
  {
    id: 5,
    src: "/images/Moments/moment-5.jpeg",
    title: "Acoustic Vibes",
    tag: "Team Work"
  },
  {
    id: 7,
    src: "/images/Moments/moment-7.jpeg",
    title: "AI Carnival",
    tag: "Fun Mode"
  },
  {
    id: 8,
    src: "/images/Moments/moment-8.jpeg",
    title: "Solo Live Stage Moment",
    tag: "Concert Vibes"
  },
  {
    id: 9,
    src: "/images/Moments/moment-9.jpeg",
    title: "Celebration Mode",
    tag: "Team Work"
  },
  {
    id: 10,
    src: "/images/Moments/moment-10.jpeg",
    title: "Celebration Mode",
    tag: "Birthday"
  },
  {
    id: 11,
    src: "/images/Moments/moment-traveler.jpeg",
    title: "Traveler Vibes",
    tag: "Adventure"
  },
  {
    id: 12,
    src: "/images/Moments/moment-fun.jpeg",
    title: "Fun Vibes",
    tag: "Enjoyment"
  },
  {
    id: 13,
    src: "/images/Moments/moment-techfest.jpeg",
    title: "Techfest Vibes",
    tag: "Innovation"
  },
  {
    id: 15,
    src: "/images/Expertise/expertise-img.jpeg",
    title: "Motivation Mode",
    tag: "Learning"
  },
  {
    id: 16,
    src: "/images/Moments/about-1.jpg",
    title: "Hackathon Mode",
    tag: "Winner"
  },
  {
    id: 17,
    src: "/images/Moments/moment-12.jpeg",
    title: "Techfest Mode",
    tag: "Festival"
  },
  {
    id: 18,
    src: "/images/Moments/moment-13.jpeg",
    title: "Chasing Nature",
    tag: "Capture Mode"
  },
  {
    id: 19,
    src: "/images/Moments/moment-14.jpeg",
    title: "AI Mode",
    tag: "Carnival"
  },
  {
    id: 20,
    src: "/images/Moments/moment-15.jpeg",
    title: "Sports Mode",
    tag: "Beach"
  },
  {
    id: 21,
    src: "/images/Moments/moment-16.jpeg",
    title: "AI Summit",
    tag: "Carnival Vibes"
  },
  {
    id: 22,
    src: "/images/Moments/moment-17.jpeg",
    title: "Chasing Desert",
    tag: "Nature"
  },
  {
    id: 23,
    src: "/images/Moments/moment-18.jpeg",
    title: "Celebration Mode",
    tag: "Performance"
  }
];

const MomentCard = ({ moment, isPriority, onSelect }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    if (imgRef.current?.complete && imgRef.current?.naturalWidth > 0) {
      setIsLoaded(true);
    }
  }, []);

  const handleImageLoad = () => {
    setIsLoaded(true);
    ScrollTrigger.refresh();
  };

  return (
    <div
      onClick={() => onSelect(moment)}
      className="moment-item group relative rounded-2xl overflow-hidden cursor-pointer bg-zinc-200 dark:bg-zinc-800/90 border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm hover:shadow-2xl hover:border-cyan-500/40 dark:hover:border-cyan-500/40 transition-all duration-500"
    >
      <div className="relative w-full overflow-hidden">
        {/* Placeholder skeleton while loading */}
        {!isLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-200 via-zinc-300 to-zinc-200 dark:from-zinc-800 dark:via-zinc-700 dark:to-zinc-800 animate-pulse z-0" />
        )}

        <img
          ref={imgRef}
          src={moment.src}
          alt={moment.title}
          loading={isPriority ? "eager" : "lazy"}
          fetchPriority={isPriority ? "high" : "auto"}
          decoding="async"
          onLoad={handleImageLoad}
          className={`w-full h-auto block object-cover scale-100 group-hover:scale-105 transition-all duration-700 ease-out filter grayscale-[20%] group-hover:grayscale-0 relative z-10 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Hover overlay with smooth gradient */}
        <div className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none" />

          <div className="absolute bottom-0 left-0 w-full p-5 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-30">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-cyan-400 font-mono text-xs font-semibold tracking-wider uppercase bg-cyan-950/70 border border-cyan-500/40 px-2.5 py-0.5 rounded-full backdrop-blur-sm">
                {moment.tag}
              </span>
              <span className="p-1.5 rounded-full bg-white/10 text-white backdrop-blur-sm opacity-90 group-hover:opacity-100 transition-opacity">
                <Maximize2 size={13} />
              </span>
            </div>
            <h3 className="text-white text-base md:text-lg font-bold drop-shadow-sm leading-snug">
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
  const [selectedMoment, setSelectedMoment] = useState(null);
  const [columnsCount, setColumnsCount] = useState(3);

  // Responsive column count based on viewport width
  useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth < 640) {
        setColumnsCount(1);
      } else if (window.innerWidth < 1024) {
        setColumnsCount(2);
      } else {
        setColumnsCount(3);
      }
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  // Distribute items round-robin across columns to eliminate whitespace gaps
  const columns = useMemo(() => {
    const cols = Array.from({ length: columnsCount }, () => []);
    momentsData.forEach((item, index) => {
      cols[index % columnsCount].push(item);
    });
    return cols;
  }, [columnsCount]);

  // Lightbox navigation
  const currentIndex = useMemo(() => {
    if (!selectedMoment) return -1;
    return momentsData.findIndex((m) => m.id === selectedMoment.id);
  }, [selectedMoment]);

  const handlePrev = useCallback((e) => {
    e?.stopPropagation();
    if (currentIndex > 0) {
      setSelectedMoment(momentsData[currentIndex - 1]);
    } else {
      setSelectedMoment(momentsData[momentsData.length - 1]);
    }
  }, [currentIndex]);

  const handleNext = useCallback((e) => {
    e?.stopPropagation();
    if (currentIndex < momentsData.length - 1) {
      setSelectedMoment(momentsData[currentIndex + 1]);
    } else {
      setSelectedMoment(momentsData[0]);
    }
  }, [currentIndex]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!selectedMoment) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedMoment(null);
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedMoment, handlePrev, handleNext]);

  // Entrance animations via ScrollTrigger
  useGSAP(() => {
    const cards = gsap.utils.toArray('.moment-item');
    if (!cards.length) return;

    gsap.fromTo(cards,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true
        }
      }
    );
  }, { scope: sectionRef, dependencies: [columnsCount] });

  return (
    <section 
      ref={sectionRef} 
      id="moments" 
      className="py-24 bg-zinc-50 dark:bg-zinc-950 relative overflow-hidden"
    >
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* Decorative Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 dark:bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        
        {/* Header Section */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-mono font-semibold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 rounded-full mb-4">
            <Camera size={14} /> UNFILTERED
          </div>
          <SectionTitle title="Moments" backtitle="Captures" />
          <p className="text-zinc-600 dark:text-zinc-400 text-lg">
            A visual journal of the places I've been, the things I build, and the memories captured along the way.
          </p>
        </div>

        {/* True Masonry Column Layout */}
        <div className={`grid gap-6 ${
          columnsCount === 1 ? 'grid-cols-1' : columnsCount === 2 ? 'grid-cols-2' : 'grid-cols-3'
        }`}>
          {columns.map((columnItems, colIdx) => (
            <div key={colIdx} className="flex flex-col gap-6">
              {columnItems.map((moment, idx) => (
                <MomentCard 
                  key={moment.id} 
                  moment={moment} 
                  isPriority={colIdx === 0 && idx < 2}
                  onSelect={setSelectedMoment}
                />
              ))}
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedMoment && (
        <div 
          onClick={() => setSelectedMoment(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8 animate-fadeIn"
        >
          {/* Close button */}
          <button
            onClick={() => setSelectedMoment(null)}
            className="absolute top-5 right-5 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer z-50 backdrop-blur-sm"
            aria-label="Close preview"
          >
            <X size={22} />
          </button>

          {/* Navigation Previous */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all cursor-pointer z-50 backdrop-blur-sm hidden sm:flex items-center justify-center"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Navigation Next */}
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all cursor-pointer z-50 backdrop-blur-sm hidden sm:flex items-center justify-center"
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>

          {/* Modal Content */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center justify-center"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-zinc-900 max-h-[78vh] flex items-center justify-center">
              <img
                src={selectedMoment.src}
                alt={selectedMoment.title}
                className="max-h-[78vh] w-auto max-w-full object-contain rounded-2xl"
              />
            </div>

            {/* Modal Caption */}
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between w-full px-2 gap-2 text-center sm:text-left">
              <div>
                <span className="text-cyan-400 font-mono text-xs font-semibold tracking-wider uppercase bg-cyan-950/80 border border-cyan-500/40 px-3 py-1 rounded-full inline-block mb-1.5">
                  {selectedMoment.tag}
                </span>
                <h2 className="text-white text-xl font-bold">
                  {selectedMoment.title}
                </h2>
              </div>
              <div className="text-zinc-400 text-xs font-mono">
                {currentIndex + 1} of {momentsData.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Moments;