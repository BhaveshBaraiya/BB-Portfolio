import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Services from './components/Services';
import Projects from './components/Projects';
import Stats from './components/Stats';
import MarqueeStrip from './components/MarqueeStrip';
import Expertise from './components/Expertise';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="font-sans bg-white dark:bg-zinc-950 transition-colors duration-500 min-h-screen">
      
      <Header />
      <Hero />
      <About />
      <Skills />
      <MarqueeStrip text="React • Node.js • Express • MongoDB • Python • Typo3 • AI" speed={15} />
      <Services />
      <Projects />
      <Stats />
      <MarqueeStrip reverse={true} />
      <Expertise/>
      <FAQ/>
      <Contact/>
      <Footer/>
    </div>
  );
}

export default App;