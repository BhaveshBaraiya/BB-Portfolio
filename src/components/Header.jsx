import { useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Menu, X, Moon, Sun } from 'lucide-react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [active, setActive] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true);

  const navItems = ['HOME','ABOUT', 'SKILLS', 'SERVICES', 'PROJECTS','STATS','EXPERTISE','FAQS', 'CONTACT'];

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'light') {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const newTheme = !prev;
      if (newTheme) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      return newTheme;
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = navItems.map(item => document.getElementById(item.toLowerCase()));
      sections.forEach((sec, index) => {
        if (sec) {
          const top = sec.offsetTop - 120;
          const bottom = top + sec.offsetHeight;
          if (window.scrollY >= top && window.scrollY < bottom) {
            setActive(navItems[index]);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ✅ GSAP mobile menu animation (Kept this because it only affects opacity, no layout shifting)
  useGSAP(() => {
    if (isMobileMenuOpen) {
      gsap.fromTo('.mobile-menu', 
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out", display: "flex" }
      );
    } else {
      gsap.to('.mobile-menu', {
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
        display: "none"
      });
    }
  }, { dependencies: [isMobileMenuOpen] });

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

  return (
    <header 
      /* ✅ Perfectly static positioning. No GSAP refs, no height changes. */
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b py-4 ${
        isScrolled 
          ? 'bg-white/85 dark:bg-zinc-950/85 backdrop-blur-xl border-zinc-200 dark:border-white/5 shadow-sm' 
          : 'bg-transparent border-transparent'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="cursor-pointer relative z-50 hover:scale-105 transition-transform">
          <a href="#">
          <img 
            src="/images/logo.png"
            alt="Bhavesh Baraiya Logo"
            className="h-12 md:h-16 w-auto object-contain dark:brightness-0 dark:invert transition-all duration-300"
          />
          </a>
        </div>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex gap-8 items-center font-mono text-sm">
            {navItems.map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setActive(item)}
                className="relative group py-1 text-lg"
              >
                <span className={`transition-all duration-300 ${
                  active === item
                    ? 'text-cyan-600 dark:text-cyan-400'
                    : 'text-zinc-600 hover:text-cyan-600 dark:text-gray-300 dark:hover:text-cyan-400'
                }`}>
                  {item}
                </span>

                <span className={`absolute left-0 bottom-0 h-[2px] bg-cyan-500 transition-all duration-300 ${
                  active === item ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4 pl-4 border-l border-zinc-300 dark:border-zinc-700">
            <button onClick={toggleTheme} className="p-2 rounded-full text-zinc-600 hover:text-cyan-600 hover:bg-zinc-100 dark:text-gray-300 dark:hover:text-cyan-400 dark:hover:bg-zinc-800 transition-colors">
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <a 
              href="#contact"
              className="px-6 py-2.5 border border-cyan-600 text-cyan-600 hover:bg-cyan-600 hover:text-white dark:border-cyan-500/50 dark:text-cyan-400 dark:hover:bg-cyan-400 dark:hover:text-black font-semibold rounded-lg transition-all duration-300"
            >
              Connect
            </a>
          </div>
        </div>

        {/* MOBILE CONTROLS */}
        <div className="md:hidden flex items-center gap-4 relative z-50">
          <button onClick={toggleTheme}>
            {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>

          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <nav className="mobile-menu hidden fixed inset-0 h-screen w-full bg-white dark:bg-zinc-950 flex-col justify-center items-center gap-8 text-center z-40">

        <div className="max-h-[60vh] overflow-y-auto w-full flex flex-col items-center gap-6 px-6">
          {navItems.map((item) => (
            <a 
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => {
                setActive(item);
                setIsMobileMenuOpen(false);
              }}
              className={`text-2xl font-mono transition-all duration-300 ${
                active === item
                  ? 'text-cyan-500 scale-110'
                  : 'text-zinc-600 dark:text-gray-300 hover:text-cyan-500'
              }`}
            >
              {item}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a 
          href="#contact"
          onClick={() => setIsMobileMenuOpen(false)}
          className="mt-6 px-8 py-3 bg-cyan-500 text-white font-bold rounded-lg"
        >
          Connect
        </a>

      </nav>
    </header>
  );
};

export default Header;