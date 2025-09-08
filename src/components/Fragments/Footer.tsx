import TextSpan from "../SubAtomic/TeksSpan";
import { motion, useInView } from "framer-motion";
import { useState, useRef, useContext } from "react";
import { SectionRefsContext } from "../Layouts/LandingPageLayouts";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribeStatus, setSubscribeStatus] = useState<null | 'success' | 'error'>(null);
  
  // Refs for scroll animations
  const footerRef = useRef(null);
  const topSectionRef = useRef(null);
  const bottomSectionRef = useRef(null);
  
  // Check if sections are in view with once:true to ensure animations only happen once
  const isFooterInView = useInView(footerRef, { once: true, amount: 0.1 });
  const isTopSectionInView = useInView(topSectionRef, { once: true, amount: 0.2 });
  const isBottomSectionInView = useInView(bottomSectionRef, { once: true, amount: 0.2 });
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribing(true);
    
    // Simulate API call
    setTimeout(() => {
      setSubscribeStatus('success');
      setEmail("");
      setIsSubscribing(false);
      
      // Clear status after 5 seconds
      setTimeout(() => setSubscribeStatus(null), 5000);
    }, 1500);
  };
  
  const socialLinks = [
    {
      href: "https://www.linkedin.com/in/baayuaaji/",
      icon: "ri-linkedin-fill",
      label: "LinkedIn",
      color: "bg-white dark:bg-gray-800",
      textColor: "text-[#0077B5] dark:text-[#0A66C2]",
      hoverColor: "hover:bg-[#0077B5] hover:text-white dark:hover:bg-[#0A66C2]"
    },
    {
      href: "https://github.com/M-Bayu-Aji",
      icon: "ri-github-fill",
      label: "Github",
      color: "bg-white dark:bg-gray-800",
      textColor: "text-[#333] dark:text-white",
      hoverColor: "hover:bg-[#333] hover:text-white dark:hover:bg-[#222]"
    },
    {
      href: "https://instagram.com/baayuaajii",
      icon: "ri-instagram-line",
      label: "Instagram",
      color: "bg-white dark:bg-gray-800",
      textColor: "text-[#E1306C] dark:text-[#E1306C]",
      hoverColor: "hover:bg-gradient-to-r hover:from-[#833AB4] hover:via-[#FD1D1D] hover:to-[#F77737] hover:text-white"
    },
  ];

  const footerSections = {
    pages: [
  { name: "Home", href: "#header" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#project" },
  { name: "Contact", href: "#contact" }
    ],
    services: [
      { name: "Web Development", href: "#" },
      { name: "UI/UX Design", href: "#" },
      { name: "Database Design", href: "#" },
      { name: "Responsive Design", href: "#" }
    ],
    technologies: [
      { name: "HTML/CSS", href: "#" },
      { name: "JavaScript", href: "#" },
      { name: "React.js", href: "#" },
      { name: "Tailwind CSS", href: "#" },
      { name: "PHP", href: "#" }
    ]
  };

  return (
    <motion.footer 
      ref={footerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-900/10 dark:via-indigo-900/0 dark:to-purple-900/10">
      {/* Decorative top wave */}
      <div className="absolute top-0 left-0 w-full">
      <svg className="w-full h-12 text-white dark:text-gray-900" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path 
        d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
        opacity=".25" 
        fill="currentColor"
        ></path>
        <path 
        d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
        opacity=".5" 
        fill="currentColor"
        ></path>
        <path 
        d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" 
        fill="currentColor"
        ></path>
      </svg>
      </div>

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03] pointer-events-none">
      <svg className="absolute w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        <defs>
        <pattern id="footer-grid" width="8" height="8" patternUnits="userSpaceOnUse">
          <path d="M 8 0 L 0 0 0 8" fill="none" stroke="currentColor" strokeWidth="0.5" />
        </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#footer-grid)" />
      </svg>
      </div>
      
      <div className="container relative z-10 px-6 mx-auto max-w-7xl">
      {/* Main footer content */}
      <div className="pt-24 pb-12">
        <div className="grid gap-y-10 gap-x-8 md:grid-cols-2 lg:grid-cols-12">
        {/* Brand column */}
        <div className="lg:col-span-5 md:col-span-1 font-bricolage">
          <a href="#" className="inline-block mb-6 text-3xl font-bold text-gray-800 dark:text-gray-200">
          Muhammad<TextSpan>BayuAji</TextSpan>
          </a>
          <p className="mb-8 text-gray-600 dark:text-gray-400">
          Membangun pengalaman digital yang memukau dengan solusi web modern dan inovatif yang mengedepankan performa dan estetika.
          </p>
          
          {/* Social links */}
          <div className="flex flex-wrap gap-3">
          {socialLinks.map(link => (
            <motion.a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center w-12 h-12 border border-gray-200 rounded-xl shadow-sm transition-all duration-300 ${link.color} ${link.textColor} ${link.hoverColor} dark:border-gray-700`}
            aria-label={link.label}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            >
            <i className={`text-xl ${link.icon}`}></i>
            </motion.a>
          ))}
          </div>
        </div>

        {/* Links columns */}
        <div className="grid grid-cols-2 gap-8 lg:col-span-3 md:col-span-1 sm:grid-cols-3">
          {/* Navigation links */}
          <div>
          <h3 className="mb-6 text-sm font-bold tracking-wider text-gray-800 uppercase dark:text-gray-200 font-bricolage">
            Halaman
          </h3>
          <ul className="space-y-3">
            {footerSections.pages.map(link => {
              // map page name to ref from context
              const sectionRefs = useContext(SectionRefsContext);
              let targetRef = undefined as any;
              if (sectionRefs) {
              switch (link.name.toLowerCase()) {
                case 'home':
                targetRef = sectionRefs.homeRef;
                break;
                case 'about':
                targetRef = sectionRefs.aboutRef;
                break;
                case 'skills':
                targetRef = sectionRefs.skillsRef;
                break;
                case 'projects':
                targetRef = sectionRefs.projectsRef;
                break;
                case 'contact':
                targetRef = sectionRefs.contactRef;
                break;
                default:
                targetRef = undefined;
              }
              }

              const scrollToSection = (ref: React.RefObject<HTMLDivElement> | undefined) => {
              if (!ref || !ref.current) return;
              // attempt to get navbar height for offset
              const navbarEl = document.querySelector('.navbar');
              const navbarHeight = navbarEl ? (navbarEl as HTMLElement).offsetHeight : 0;
              const offsetTop = ref.current.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
              window.scrollTo({ top: offsetTop, behavior: 'smooth' });
              };

              return (
              <li key={link.name}>
                <motion.button
                onClick={() => scrollToSection(targetRef)}
                className="inline-flex items-center text-gray-600 transition-colors dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                whileHover={{ x: 5 }}
                >
                <svg className="w-3 h-3 mr-2 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
                {link.name}
                </motion.button>
              </li>
              );
            })}
          </ul>
          </div>
        </div>
        <div className="lg:col-span-4 md:col-span-2">
          <h3 className="mb-6 text-sm font-bold tracking-wider text-gray-800 uppercase dark:text-gray-200 font-bricolage">
          Kontak
          </h3>
          <ul className="space-y-5">
          <li>
            <div className="flex items-start">
            <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 mt-1 bg-blue-100 rounded-full dark:bg-blue-900/30">
              <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </div>
            <div className="ml-4">
              <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">Lokasi</h4>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Bogor, Indonesia</p>
            </div>
            </div>
          </li>
          <li>
            <div className="flex items-start">
            <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 mt-1 bg-blue-100 rounded-full dark:bg-blue-900/30">
              <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </div>
            <div className="ml-4">
              <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">Email</h4>
              <a href="mailto:muhammadbayuajisutisnapurta@gmail.com" className="mt-1 text-sm text-blue-600 dark:text-blue-400 hover:underline">
              muhammadbayuajisutisnapurta@gmail.com
              </a>
            </div>
            </div>
          </li>
          <li>
            <div className="flex items-start">
            <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 mt-1 bg-blue-100 rounded-full dark:bg-blue-900/30">
              <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
              </svg>
            </div>
            <div className="ml-4">
              <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">Telepon</h4>
              <a href="tel:+6281234567890" className="mt-1 text-sm text-blue-600 dark:text-blue-400 hover:underline">
              +62 812-3456-7890
              </a>
            </div>
            </div>
          </li>
          </ul>

          {/* Availability badge */}
          <div className="flex items-center p-4 mt-8 rounded-lg bg-green-50 dark:bg-green-900/20">
          <span className="relative flex w-3 h-3 mr-3">
            <span className="absolute inline-flex w-full h-full bg-green-500 rounded-full opacity-75 animate-ping"></span>
            <span className="relative inline-flex w-3 h-3 bg-green-500 rounded-full"></span>
          </span>
          <p className="text-sm text-green-800 dark:text-green-300">
            Tersedia untuk proyek freelance
          </p>
          </div>
        </div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:via-gray-700"></div>

      {/* Bottom section */}
      <div className="flex flex-col items-center justify-between py-8 md:flex-row">
        <div className="flex items-center mb-4 space-x-1 md:mb-0">
        <p className="text-sm font-bold text-gray-600 font-bricolage dark:text-gray-400">
          © {currentYear} Muhammad<TextSpan>BayuAji</TextSpan>.
        </p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
        {/* <a href="#" className="text-sm text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
          Privacy Policy
        </a>
        <span className="text-gray-300 dark:text-gray-700">•</span>
        <a href="#" className="text-sm text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
          Terms of Service
        </a> */}
        {/* Access context outside of the onClick handler */}
        {(() => {
          // Get refs from context
          const sectionRefs = useContext(SectionRefsContext);
          
          // Define scroll function
          const scrollToSection = (ref: React.RefObject<HTMLElement> | undefined) => {
            if (!ref || !ref.current) return;
            const navbarEl = document.querySelector('.navbar');
            const navbarHeight = navbarEl ? (navbarEl as HTMLElement).offsetHeight : 0;
            const offsetTop = ref.current.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
          };
          
          return (
            <motion.button 
              onClick={() => scrollToSection(sectionRefs?.homeRef)}
              className="flex items-center justify-center w-10 h-10 ml-2 text-white transition-all duration-300 bg-blue-600 rounded-full shadow-md cursor-pointer hover:bg-blue-700 hover:shadow-lg dark:bg-blue-700 dark:hover:bg-blue-600"
              whileHover={{ y: -4 }}
              whileTap={{ y: 0 }}
              aria-label="Back to top"
            >
              <i className="text-lg ri-arrow-up-line"></i>
            </motion.button>
          );
        })()}
        </div>
      </div>
      </div>
    </motion.footer>
  );
}
