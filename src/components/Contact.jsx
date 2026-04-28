import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SectionTitle from './SectionTitle';
import { Mail, Send } from 'lucide-react'; 

gsap.registerPlugin(ScrollTrigger);

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

const Instagram = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const contactInfo = [
  {
    icon: <Mail className="w-6 h-6" strokeWidth={1.5} />,
    title: "Email",
    value: "@BhaveshBaraiya",
    link: "mailto:bhavesh.baraiya.codes@gmail.com",
    brandColors: {
      cardHover: "hover:border-red-500/30",
      orb: "bg-red-500/20",
      iconBg: "group-hover:bg-red-500",
      iconText: "group-hover:text-white",
      textHover: "group-hover:text-red-500"
    }
  },
  {
    icon: <Instagram className="w-6 h-6" />,
    title: "Instagram",
    value: "@BhaveshBaraiya",
    link: "https://www.instagram.com/__bhavesh_baraiya_77/",
    brandColors: {
      cardHover: "hover:border-pink-500/30",
      orb: "bg-gradient-to-tr from-yellow-500/20 via-pink-500/20 to-purple-500/20",
      iconBg: "group-hover:bg-gradient-to-tr group-hover:from-yellow-500 group-hover:via-pink-500 group-hover:to-purple-500",
      iconText: "group-hover:text-white",
      textHover: "group-hover:text-pink-500"
    }
  },
  {
    icon: <GithubIcon />,
    title: "GitHub",
    value: "@BhaveshBaraiya",
    link: "https://github.com/BhaveshBaraiya/",
    brandColors: {
      cardHover: "hover:border-zinc-900/30 dark:hover:border-white/30",
      orb: "bg-zinc-900/20 dark:bg-white/20",
      iconBg: "group-hover:bg-zinc-900 dark:group-hover:bg-white",
      iconText: "group-hover:text-white dark:group-hover:text-zinc-900",
      textHover: "group-hover:text-zinc-900 dark:group-hover:text-white"
    }
  },
  {
    icon: <LinkedinIcon />,
    title: "LinkedIn",
    value: "Let's Connect",
    link: "https://www.linkedin.com/in/bhavesh-baraiya/",
    brandColors: {
      cardHover: "hover:border-blue-600/30",
      orb: "bg-blue-600/20",
      iconBg: "group-hover:bg-blue-600",
      iconText: "group-hover:text-white",
      textHover: "group-hover:text-blue-600"
    }
  }
];

const Contact = () => {
  const sectionRef = useRef(null);
  const formRef = useRef(null);

  useGSAP(() => {        
    gsap.fromTo('.contact-header-anim',
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { 
          trigger: sectionRef.current, 
          start: "top 75%", 
          toggleActions: "play none none reverse" 
        }
      }
    );
    
    const infoCards = gsap.utils.toArray('.contact-info-card');
    gsap.fromTo(infoCards,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0,
        duration: 0.8, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { 
          trigger: '.contact-content-wrapper', 
          start: "top 75%", 
          toggleActions: "play none none reverse" 
        }
      }
    );
    
    gsap.fromTo(formRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0, 
        duration: 1, 
        ease: "power3.out",
        scrollTrigger: { 
          trigger: formRef.current, 
          start: "top 80%",        
          toggleActions: "play none none reverse" 
        }
      }
    );
    
    ScrollTrigger.refresh();
  }, { scope: sectionRef });

  useEffect(() => {
    const magneticItems = document.querySelectorAll('.magnetic-wrap');
    
    const handleMouseMove = (e) => {
      const item = e.currentTarget;
      const rect = item.getBoundingClientRect();
      requestAnimationFrame(() => {
        item.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
        item.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
      });
    };

    magneticItems.forEach((item) => {
      item.addEventListener("mousemove", handleMouseMove);
    });

    return () => {
      magneticItems.forEach((item) => {
        item.removeEventListener("mousemove", handleMouseMove);
      });
    };
  }, []);

  return (
    <section 
      id="contact" 
      ref={sectionRef} 
      className="py-32 px-6 relative bg-zinc-50 dark:bg-zinc-950 transition-colors duration-500 overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-[1px] bg-zinc-200 dark:bg-zinc-800"></div>
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-zinc-200 dark:bg-zinc-800"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-brand-primary/5 dark:bg-brand-primary/10 rounded-full blur-[150px] pointer-events-none mix-blend-overlay translate-x-1/3 -translate-y-1/2"></div>
      
      <div className="container mx-auto relative z-10 max-w-7xl">
        
        <div className="text-center mb-24 pt-5 border-b border-zinc-200 dark:border-zinc-800 pb-12">
          <div className="contact-header-anim w-full flex flex-col items-center">
            <SectionTitle title="Contact" backtitle="Let's Build Together" />
            <p className="mt-6 text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto text-lg font-serif italic leading-relaxed">
              "Have a project in mind or want to discuss technical architectures? Drop a message and let's engineer something great."
            </p>
          </div>
        </div>

        <div className="contact-content-wrapper grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
            {contactInfo.map((info, index) => (
              <a 
                key={index}
                href={info.link}
                target={info.link.startsWith('http') ? "_blank" : "_self"}
                rel="noreferrer"                
                className={`contact-info-card magnetic-wrap relative group p-6 md:p-8 rounded-3xl bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 transition-colors transition-shadow duration-300 overflow-hidden flex items-center gap-6 ${info.brandColors.cardHover}`}
              >
                <div className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div                    
                    className={`absolute w-[300px] h-[300px] rounded-full blur-[50px] -translate-x-1/2 -translate-y-1/2 ${info.brandColors.orb}`}
                    style={{ left: "var(--mouse-x, 50%)", top: "var(--mouse-y, 50%)" }}
                  ></div>
                </div>
                
                <div className={`relative z-10 flex-shrink-0 w-14 h-14 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400 transition-colors duration-500 border border-transparent ${info.brandColors.iconBg} ${info.brandColors.iconText}`}>
                  {info.icon}
                </div>

                <div className="relative z-10 w-[1px] h-10 bg-zinc-200 dark:bg-zinc-800 hidden sm:block"></div>

                <div className="relative z-10">
                  <p className="text-xs font-mono text-zinc-500 dark:text-zinc-500 uppercase tracking-[0.15em] mb-1">
                    {info.title}
                  </p>                  
                  <h4 className={`text-lg font-bold text-zinc-900 dark:text-white transition-colors duration-300 ${info.brandColors.textHover}`}>
                    {info.value}
                  </h4>
                </div>
              </a>
            ))}
          </div>

          <div className="lg:col-span-7 relative">
            <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-black dark:border-zinc-700 pointer-events-none"></div>
            <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-black dark:border-zinc-700 pointer-events-none"></div>
            <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-black dark:border-zinc-700 pointer-events-none"></div>
            <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-black dark:border-zinc-700 pointer-events-none"></div>

            <div 
              ref={formRef}
              className="magnetic-wrap relative p-8 md:p-12 rounded-[40px] bg-white/50 dark:bg-zinc-900/30 backdrop-blur-xl border border-white/50 dark:border-zinc-800/50 shadow-2xl overflow-hidden will-change-transform"
            >
              <div className="absolute inset-0 z-0 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-500">
                <div
                  className="absolute w-[600px] h-[600px] bg-brand-primary/5 dark:bg-brand-primary/10 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2"
                  style={{ left: "var(--mouse-x, 50%)", top: "var(--mouse-y, 50%)" }}
                ></div>
              </div>

             <form 
                action={import.meta.env.VITE_FORMSPREE_URL}
                method="POST"
                className="relative z-10 flex flex-col gap-6"
                >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono text-zinc-500 uppercase ml-2 tracking-[0.2em]">Name</label>
                    <input 
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        required
                        className="w-full bg-zinc-100/50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl px-6 py-4 text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all duration-300"
                    />
                    </div>

                    <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono text-zinc-500 uppercase ml-2 tracking-[0.2em]">Email</label>
                    <input 
                        type="email"
                        name="email"
                        placeholder="hello@example.com"
                        required
                        className="w-full bg-zinc-100/50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl px-6 py-4 text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all duration-300"
                    />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono text-zinc-500 uppercase ml-2 tracking-[0.2em]">Subject</label>
                    <input 
                    type="text"
                    name="subject"
                    placeholder="Project Inquiry"
                    className="w-full bg-zinc-100/50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl px-6 py-4 text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all duration-300"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono text-zinc-500 uppercase ml-2 tracking-[0.2em]">Message</label>
                    <textarea 
                    name="message"
                    rows="5"
                    placeholder="Tell me about your project..."
                    required
                    className="w-full bg-zinc-100/50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl px-6 py-4 text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all duration-300 resize-none"
                    ></textarea>
                </div>

                <button 
                    type="submit"
                    className="group relative inline-flex items-center justify-center gap-3 bg-brand-primary text-white px-8 py-5 rounded-2xl font-bold text-lg overflow-hidden transition-transform hover:scale-[1.02] active:scale-[0.98] mt-2 shadow-[0_0_20px_rgba(var(--color-brand-primary),0.3)] w-full md:w-auto md:self-start"
                >
                    <span className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
                    <span className="relative z-10">Send Message</span>
                    <Send size={18} className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </button>
                </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;