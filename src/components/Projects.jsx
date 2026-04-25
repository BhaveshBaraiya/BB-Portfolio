    import { useRef } from 'react';
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
        tech: ["React", "Node.js", "PostgreSQL", "Express","Vite","Vercel","Render", "OpenAI API", "Tailwind CSS", "Typescript", ],
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
        githubLink: "https://itsbaraiya.github.io/BB.github.io/tours.html"
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

   const Projects = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray('.project-card');
    
    cards.forEach((card, index) => {
      if (index === cards.length - 1) return;
      const nextCard = cards[index + 1];
      gsap.to(card, {
        scale: 0.95, // Reduced scale for a tighter feel
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
    <section id="projects" ref={sectionRef} className="py-12 lg:py-24 px-4 md:px-6 bg-zinc-50 dark:bg-zinc-950 transition-colors duration-500">
      <div className="container mx-auto max-w-7xl"> 
        
        <div className="text-center mb-12 lg:mb-16">
          <SectionTitle title="Projects" backtitle="My Work" />
        </div>

        <div className="relative"> 
          {projectsData.map((project, index) => {
            const isReversed = index % 2 !== 0;

            return (
              <div 
                key={index} 
                className="project-card sticky top-[100px] w-full mb-12 lg:mb-20 will-change-transform"
              >
                <div className={`w-full lg:min-h-[450px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[1.5rem] lg:rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-stretch relative`}>
                  <div className="w-full lg:w-1/2 p-8 md:p-10 lg:p-12 flex flex-col justify-center relative z-10">
                    <span className="text-brand-primary font-mono font-bold tracking-wider mb-2 text-xs lg:text-base">
                      {project.category}
                    </span>
                    
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-900 dark:text-white mb-4 transition-colors duration-300">
                      {project.title}
                    </h3>
                    
                    <p className="text-sm md:text-base lg:text-lg text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed line-clamp-4 lg:line-clamp-none">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tech.map(tech => (
                        <span key={tech} className="px-3 py-1 lg:px-4 lg:py-1.5 text-[10px] lg:text-xs font-mono font-bold text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-full transition-all duration-300 hover:border-brand-primary/50">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-6 mt-auto">
                      <a href={project.liveLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-zinc-900 dark:text-white font-bold hover:text-brand-primary transition-colors text-base lg:text-lg group">
                        View Project 
                        <ExternalLink size={20} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300" />
                      </a>
                      {project.githubLink && (
                        <a href={project.githubLink} target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-all duration-300 hover:scale-110">
                          <GitBranch size={24} />
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="w-full lg:w-1/2 h-72 md:h-96 lg:h-auto relative overflow-hidden bg-zinc-200 dark:bg-zinc-950">
                    <div className={`absolute inset-0 bg-gradient-to-${isReversed ? 'l' : 'r'} from-white via-transparent to-transparent dark:from-zinc-900 z-10 hidden lg:block pointer-events-none opacity-40`}></div>

                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="project-image absolute inset-0 w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-1000 ease-out will-change-transform"
                    />
                    
                    <div className="absolute inset-0 bg-brand-primary/0 group-hover:bg-brand-primary/5 transition-colors duration-500 z-20 mix-blend-overlay pointer-events-none"></div>
                  </div>
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