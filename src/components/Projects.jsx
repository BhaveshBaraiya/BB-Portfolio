import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SectionTitle from './SectionTitle';
import { ExternalLink, GitBranch } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projectsData = [
  {
    id: "01",
    title: "BB Shop",
    category: "E-commerce Website",
    description: "A modern e-commerce platform built using the MERN stack. Offers seamless shopping with cart, orders, and secure online payments.",
    tech: ["MongoDB", "Express", "React", "Node.js", "Vite", "JWT Auth", "REST API", "Cloudinary", "Axios", "Bootstrap", "Vercel", "Render", "Razorpay", "Stripe"],
    image: "/images/Projects/project-1.png",
    liveLink: "bb-shop-frontend.vercel.app",
    githubLink: "https://github.com/BhaveshBaraiya/BB-Shop"
  },
  {
    id: "02",
    title: "Food Delivery",
    category: "Food Delivery Website",
    description: "A modern food delivery web application with a smooth and intuitive user experience. Features menu browsing, cart management, and responsive design for seamless ordering.",
    tech: ["React", "Redux", "Context", "SCSS", "Bootstrap", "Vite", "Vercel"],
    image: "/images/Projects/project-2.png",
    liveLink: "https://itsbaraiya.github.io/food-delivery/",
    githubLink: "https://github.com/itsbaraiya/food-delivery"
  },
  {
    id: "03",
    title: "RFP AI Platform",
    category: "AI SaaS Dashboard",
    description: "A next-generation proposal management engine. Features a complex user dashboard with role-based access, credit systems, and an integrated AI engine to auto-generate enterprise proposals.",
    tech: ["React", "Node.js", "PostgreSQL", "Express","Vite","Vercel","Render", "OpenAI API", "Tailwind CSS", "Typescript"],
    image: "/images/Projects/project-3.jpeg", 
    liveLink: "https://rfpaify.vercel.app/",
    githubLink: "https://github.com/itsbaraiya/RFP"
  },
  {
    id: "04",
    title: "BB Travels & Destinations",
    category: "Tours & Travels Website",
    description: "A tours and travels website that provides so many features to its users like it provides about the tour packages,price,inclusions and so many other features.You can discover so many tour packages.",
    tech: ["HTML","CSS", "PHP", "Git", "JavaScript", "Bootstrap"],
    image: "/images/Projects/project-4.jpg", 
    liveLink: "https://itsbaraiya.github.io/BB.github.io/tours.html",
  },
  {
    id: "05",
    title: "MERN Portfolio Template",
    category: "Full Stack Portfolio",
    description: "A full-stack MERN portfolio with a powerful backend and admin panel.Features secure authentication, real-time interactions, and dynamic content management.",
    tech: ["MongoDB", "Express", "React", "Node.js", "Vite", "JWT Auth", "REST API", "Cloudinary", "Axios", "Bootstrap", "Vercel", "Render"],
    image: "/images/Projects/project-5.jpg", 
    liveLink: "https://codeandchordswithbb.vercel.app/",    
  }
];

const ProjectImage = ({ project, isReversed }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="w-full lg:w-1/2 h-72 md:h-96 lg:h-auto relative overflow-hidden bg-zinc-100 dark:bg-zinc-950 border-l lg:border-l-0 lg:border-r border-zinc-200 dark:border-zinc-800">
      <div className={`absolute inset-0 bg-gradient-to-${isReversed ? 'l' : 'r'} from-white via-transparent to-transparent dark:from-zinc-900 z-10 hidden lg:block pointer-events-none opacity-20`}></div>

      {!isLoaded && (
        <div className="absolute inset-0 bg-zinc-300 dark:bg-zinc-800 animate-pulse z-0"></div>
      )}

      <img 
        src={project.image} 
        alt={project.title} 
        loading="lazy"
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        className={`project-image absolute inset-0 w-full h-full object-cover object-top transform group-hover:scale-105 filter grayscale-[20%] group-hover:grayscale-0 transition-all duration-1000 ease-out will-change-transform z-10 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
      
      <div className="absolute inset-0 bg-brand-primary/0 group-hover:bg-brand-primary/5 transition-colors duration-500 z-20 mix-blend-overlay pointer-events-none"></div>
    </div>
  );
};

const Projects = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray('.project-card');

    gsap.set(cards, { transformOrigin: "top center" });

    cards.forEach((card, index) => {
      if (index === cards.length - 1) return;
      
      const nextCard = cards[index + 1];
      
      gsap.to(card, {
        scale: 0.95, 
        opacity: 0.4,
        filter: "blur(4px)",
        ease: "none",
        scrollTrigger: {
          trigger: nextCard,           
          start: "top 90%", 
          end: "top 150px", 
          scrub: true, 
        }
      });
    });

    gsap.utils.toArray('.project-image').forEach(img => {
      gsap.fromTo(img, { yPercent: -5 }, {
        yPercent: 5,
        ease: "none",
        scrollTrigger: {
          trigger: img.closest('.project-card'),
          start: "top bottom", 
          end: "bottom top", 
          scrub: true
        }
      });
    });
  }, { scope: sectionRef });

  return (
    <section id="projects" ref={sectionRef} className="py-24 lg:py-32 px-4 md:px-6 relative bg-zinc-50 dark:bg-zinc-950 transition-colors duration-500">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-zinc-200 dark:bg-zinc-800"></div>
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-zinc-200 dark:bg-zinc-800"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-brand-primary/5 dark:bg-brand-primary/5 rounded-full blur-[150px] pointer-events-none mix-blend-overlay"></div>
      
      <div className="container mx-auto max-w-7xl relative z-10"> 
        
        <div className="flex flex-col items-center text-center mb-16 lg:mb-24 pt-5 border-b border-zinc-200 dark:border-zinc-800 pb-12">
          <div className="w-full flex flex-col items-center">
            <SectionTitle title="Projects" backtitle="My Work" />
            <p className="mt-6 text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto text-lg font-serif italic leading-relaxed">
              "A curated collection of digital architectures. Each project represents a unique problem solved with precision, logic, and creative flow."
            </p>
          </div>
        </div>

        <div className="relative"> 
          {projectsData.map((project, index) => {
            const isReversed = index % 2 !== 0;

            return (
              <div 
                key={index} 
                className="project-card sticky top-[100px] w-full mb-12 lg:mb-20 will-change-transform"
              >
                <div className={`w-full lg:min-h-[450px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-tr-[2rem] rounded-bl-[2rem] lg:rounded-tr-[4rem] lg:rounded-bl-[4rem] rounded-tl-none rounded-br-none overflow-hidden shadow-2xl flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-stretch relative group`}>
                  
                  <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-brand-primary dark:border-zinc-700 pointer-events-none z-20"></div>
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-brand-primary dark:border-zinc-700 pointer-events-none z-20"></div>

                  <div className="w-full lg:w-1/2 p-8 md:p-10 lg:p-14 flex flex-col justify-center relative z-10">
                    
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-brand-primary font-mono text-sm">
                        {project.id} //
                      </span>
                      <span className="text-brand-primary font-mono uppercase tracking-[0.2em] text-xs font-semibold">
                        {project.category}
                      </span>
                    </div>
                    
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-zinc-900 dark:text-white mb-6 tracking-tight group-hover:text-brand-primary transition-colors duration-500">
                      {project.title}
                    </h3>
                    
                    <div className="border-l-2 border-zinc-200 dark:border-zinc-800 pl-6 mb-8">
                      <p className="text-sm md:text-base lg:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-serif">
                        {project.description}
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tech.map(tech => (
                        <span key={tech} className="px-3 py-1 lg:px-4 lg:py-1 text-[10px] lg:text-xs font-mono text-zinc-600 dark:text-zinc-400 bg-transparent border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-all duration-300">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-8 mt-auto border-zinc-100 dark:border-zinc-800/50">
                      <a href={project.liveLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-zinc-900 dark:text-white font-bold tracking-wide hover:text-brand-primary transition-colors text-sm lg:text-base uppercase group/link">
                        Launch Site 
                        <ExternalLink size={18} className="group-hover/link:-translate-y-1 group-hover/link:translate-x-1 transition-transform duration-300" strokeWidth={1.5} />
                      </a>
                      {project.githubLink && (
                        <a href={project.githubLink} target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-all duration-300 hover:scale-110">
                          <GitBranch size={22} strokeWidth={1.5} />
                        </a>
                      )}
                    </div>
                  </div>
                  
                  <ProjectImage project={project} isReversed={isReversed} />

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;