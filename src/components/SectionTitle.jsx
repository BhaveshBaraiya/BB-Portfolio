import { useRef } from "react";
import PropTypes from "prop-types";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

function SectionTitle({ title, backtitle }) {
  const containerRef = useRef(null);
  const lineRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(lineRef.current,
      { width: "80px" },
      {
        width: "100%",
        ease: "none", 
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 50%", 
          end: "top 15%",
          scrub: 1.5, 
        }
      }
    );
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="relative flex justify-center text-center mb-4 headline-block md:overflow-hidden"
    >
      {title && (
        <h1 className="text-2xl text-gray-500 opacity-40 uppercase font-semibold w-full mb-0 transition-colors duration-500">
          {title}
        </h1>
      )}

      {backtitle && (
        <p className="absolute w-full self-center mb-0 text-lg font-semibold text-zinc-900 dark:text-white transition-colors duration-300">
          {backtitle}
          
          <span 
            ref={lineRef}
            className="block mx-auto w-[80px] border-b-4 border-brand-primary heading-separator-line will-change-transform"
          ></span>
        </p>
      )}
    </div>
  );
}

SectionTitle.propTypes = {
  title: PropTypes.string.isRequired,
  backtitle: PropTypes.string.isRequired,
};

export default SectionTitle;