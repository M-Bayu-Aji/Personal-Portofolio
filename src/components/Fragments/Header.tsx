import { useState, useEffect, useRef, useContext } from "react";
import headerImage from "../../assets/images/header.png";
import Button from "../Elements/atoms/Button";
import TextSpan from "../SubAtomic/TeksSpan";
import { motion, useInView } from "framer-motion";
import { SectionRefsContext } from "../Layouts/LandingPageLayouts";

export default function Header({ id = "header" }: { id?: string }) {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  
  // Get section refs from context
  const sectionRefs = useContext(SectionRefsContext);
  
  const roles = ["Web Developer", "Front End Developer", "Basic Back End Developer"];
  const currentRole = useRef("");
  
  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % roles.length;
      const fullText = roles[i];
      
      currentRole.current = fullText;
      
      setDisplayText(
        isDeleting 
          ? fullText.substring(0, displayText.length - 1)
          : fullText.substring(0, displayText.length + 1)
      );
      
      setTypingSpeed(isDeleting ? 80 : 150);
      
      if (!isDeleting && displayText === fullText) {
        // Pause at complete word
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        // Small pause before typing next word
        setTypingSpeed(500);
      }
    };
    
    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, loopNum, typingSpeed, roles]);
  
  // Ref for header animation
  const headerRef = useRef(null);
  
  // Check if header is in view with once:true to ensure animation only happens once
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.3 });
  
  // Function to scroll to contact section
  const scrollToContact = () => {
    if (sectionRefs?.contactRef?.current) {
      // Get any fixed navbar height to offset scroll position
      const navbarHeight = document.querySelector('nav')?.offsetHeight || 0;
      
      // Calculate position to scroll to (element position - navbar height)
      const offsetTop =
        sectionRefs.contactRef.current.getBoundingClientRect().top +
        window.pageYOffset -
        navbarHeight;
      
      // Smooth scroll
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };
  
  return (
    <motion.header
      ref={headerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative px-6 py-16 mx-auto my-5 overflow-hidden bg-white shadow-sm dark:bg-gray-900 sm:py-24 sm:px-10 rounded-xl dark:shadow-gray-800/10 max-w-7xl"
      id={id}
    >
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, x: 100 }}
          animate={isHeaderInView ? { opacity: 0.2, x: 0 } : { opacity: 0, x: 100 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute top-0 right-0 -translate-y-1/2 bg-blue-100 rounded-full w-96 h-96 dark:bg-blue-900/20 filter blur-3xl opacity-20 translate-x-1/3"
        ></motion.div>
        <motion.div 
          initial={{ opacity: 0, x: -100 }}
          animate={isHeaderInView ? { opacity: 0.2, x: 0 } : { opacity: 0, x: -100 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="absolute bottom-0 left-0 w-64 h-64 translate-y-1/2 bg-purple-100 rounded-full dark:bg-purple-900/20 filter blur-3xl opacity-20 -translate-x-1/4"
        ></motion.div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 grid items-center grid-cols-1 gap-8 md:grid-cols-2 md:gap-16">
        {/* Image Container - Moved up in the markup for mobile first approach */}
        <motion.div 
          className="relative flex items-center justify-center md:order-last image-container"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isHeaderInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Decorative elements */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isHeaderInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="absolute w-64 h-64 rounded-full bg-blue-50 dark:bg-blue-900/20 filter blur-md -z-10"
          ></motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isHeaderInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="absolute w-32 h-32 rounded-full bg-purple-50 dark:bg-purple-900/20 filter blur-md -z-10 -bottom-10 -right-10"
          ></motion.div>
          
          {/* Image with animation */}
          <motion.div 
            className="relative z-10 w-full max-w-md mx-auto transition-all duration-700 transform hover:-translate-y-2"
            whileHover={{ y: -10 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-purple-500/10 rounded-3xl filter blur-xl opacity-70 animate-pulse"></div>
            <img
              className="relative z-10 object-contain w-full h-auto rounded-xl"
              src={headerImage}
              alt="Muhammad Bayu Aji - Web Developer"
            />
          </motion.div>
        </motion.div>
        
        {/* Text Content - Will display below image on mobile */}
        <motion.div 
          className="flex flex-col max-w-2xl content md:order-first"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="mb-6">
            <span className="inline-block px-4 py-2 mb-4 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full dark:bg-blue-900/30 dark:text-blue-400">
              👋
Perkenalkan, saya adalah
            </span>
            <div>
              <h1 className="text-4xl font-bold leading-tight text-gray-900 dark:text-white font-bricolage sm:text-5xl lg:text-6xl">
                Muhammad<TextSpan>BayuAji</TextSpan>
              </h1>
              <div className="h-8 my-5">
                <span className="inline-block text-3xl text-blue-600 dark:text-blue-400">
                  {displayText}
                  <span className="inline-block w-1 h-8 ml-1 bg-blue-600 dark:bg-blue-400 animate-pulse"></span>
                </span>
              </div>
            </div>
            <p className="max-w-xl mb-8 text-sm font-thin leading-relaxed text-gray-600 sm:text-lg dark:text-gray-300">
              Saya seorang Pengembang Web dengan fokus pada pengalaman pengguna yang menarik. Saya dapat menyediakan kode yang bersih dan membuat situs web lebih
              interaktif dengan animasi web.
            </p>
          </div>
          
          <div className="flex items-center gap-6">
            <Button href="/CV_Muhammad_Bayu_Aji.pdf" download="CV_Muhammad_Bayu_Aji.pdf" className="px-8 py-3 text-base font-medium transition-all duration-300 shadow-lg rounded-xl shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-1">
              <i className="mr-2 ri-download-2-line"></i> Download CV
            </Button>
            <button 
              onClick={scrollToContact}
              className="flex items-center px-5 py-3 font-medium transition-all duration-300 bg-gray-200 border-2 border-gray-300 shadow-lg dark:border-gray-700 rounded-xl shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-1 hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 group"
            >
              <i className="mr-2 ri-phone-line"></i>
              <span className="mr-2">Hubungi Saya</span>
              <i className="transition-transform duration-300 ri-arrow-right-line group-hover:translate-x-1"></i>
            </button>
          </div>
          
          {/* <div className="flex items-center gap-6 pt-8 mt-10 border-t border-gray-200 dark:border-gray-800">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-2xl text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              <i className="ri-github-fill"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-2xl text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              <i className="ri-linkedin-fill"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-2xl text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              <i className="ri-twitter-fill"></i>
            </a>
          </div> */}
        </motion.div>
      </div>
    </motion.header>
  );
}
