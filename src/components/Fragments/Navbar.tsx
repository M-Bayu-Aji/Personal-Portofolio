import { useEffect, useRef, useState, useContext } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import TextSpan from "../SubAtomic/TeksSpan";
import { SectionRefsContext } from "../Layouts/LandingPageLayouts";

export default function Navbar() {
  // Get section refs from context
  const sectionRefs = useContext(SectionRefsContext);

  const listNav = [
    { label: "Home", ref: sectionRefs?.homeRef, icon: "🏠" },
    { label: "About", ref: sectionRefs?.aboutRef, icon: "👤" },
    { label: "Skills", ref: sectionRefs?.skillsRef, icon: "⚙️" },
    { label: "Projects", ref: sectionRefs?.projectsRef, icon: "📁" },
    { label: "Contact", ref: sectionRefs?.contactRef, icon: "✉️" },
  ];

  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 1024 : true
  );

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Dark mode state: initialize from localStorage or system preference
  const [isDark, setIsDark] = useState(() => {
    try {
      if (typeof window === "undefined") return false;
      const stored = localStorage.getItem("theme");
      if (stored) return stored === "dark";
      return (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      );
    } catch (e) {
      return false;
    }
  });

  const navbarRef = useRef<HTMLDivElement | null>(null);
  const [iconAnimating, setIconAnimating] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("Home");

  useEffect(() => {
    const handleResize = () => {
      const newIsMobile = window.innerWidth <= 1024;
      setIsMobile(newIsMobile);
      if (!newIsMobile) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(e.target as Node) &&
        isMenuOpen
      ) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      // Remove this line to allow scrolling
      // document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  // Apply/remove dark class on document root and persist preference
  useEffect(() => {
    try {
      const root = document.documentElement;
      if (isDark) {
        root.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        root.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
    } catch (e) {
      // ignore (e.g., during SSR)
    }
  }, [isDark]);

  // Animation trigger for theme change
  useEffect(() => {
    setIconAnimating(true);
    const t = setTimeout(() => setIconAnimating(false), 300);
    return () => clearTimeout(t);
  }, [isDark]);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (
    ref: React.RefObject<HTMLDivElement> | undefined
  ) => {
    if (ref?.current) {
      // Get navbar height to offset scroll position
      const navbarHeight = navbarRef.current?.offsetHeight || 0;

      // Calculate position to scroll to (element position - navbar height)
      const offsetTop =
        ref.current.getBoundingClientRect().top +
        window.pageYOffset -
        navbarHeight;

      // Smooth scroll
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });

      // Close mobile menu if open
      setIsMenuOpen(false);
    }
  };

  const handleDarkModeToggle = (e: ReactMouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsDark((v) => !v);
  };

  // Update active nav item based on scroll position (nearest section to navbar)
  useEffect(() => {
    let ticking = false;

    const updateActive = () => {
      const navHeight = navbarRef.current?.offsetHeight || 0;
      const sections: { label: string; ref: React.RefObject<HTMLElement> | undefined }[] = [
        { label: "Home", ref: sectionRefs?.homeRef },
        { label: "About", ref: sectionRefs?.aboutRef },
        { label: "Skills", ref: sectionRefs?.skillsRef },
        { label: "Projects", ref: sectionRefs?.projectsRef },
        { label: "Contact", ref: sectionRefs?.contactRef },
      ];

      const viewportTop = window.pageYOffset + navHeight + 8; // slight offset

      let closest = { label: activeSection, distance: Infinity };

      sections.forEach((s) => {
        const el = s.ref?.current;
        if (!el) return;
        const elTop = el.getBoundingClientRect().top + window.pageYOffset;
        const distance = Math.abs(elTop - viewportTop);
        if (distance < closest.distance) {
          closest = { label: s.label, distance };
        }
      });

      if (closest.label && closest.label !== activeSection) {
        setActiveSection(closest.label);
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateActive);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    // initial compute
    updateActive();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sectionRefs, activeSection]);

  return (
    <>
      <nav
        ref={navbarRef}
        className="sticky top-0 z-[10] mx-auto navbar-container max-w-7xl"
      >
        {/* Main Navbar */}
        <div className="flex items-center justify-between px-4 py-4 transition-all duration-300 bg-white rounded shadow-lg navbar dark:bg-gray-900 dark:shadow-gray-800/50 lg:px-6">
          {/* Logo and Brand */}
          <div className="flex items-center gap-3">
            <img
              src={
                isDark
                  ? "/images/logo_breadcrumbs_darkmode-removebg-preview.png"
                  : "/images/logo_breadcrumbs.png"
              }
              alt={isDark ? "logo (dark)" : "logo (light)"}
              className="w-10 h-10 rounded"
            />
            <button
              onClick={() => scrollToSection(sectionRefs?.homeRef)}
              className="relative z-10 font-sans text-xl font-bold text-left text-gray-900 select-none navbar-logo dark:text-white lg:text-2xl"
            >
              Muhammad<TextSpan>BayuAji</TextSpan>
            </button>
          </div>

          {/* Desktop Navigation */}
          {!isMobile && (
            <div className="items-center hidden space-x-1 desktop-nav lg:flex">
              {listNav.map((item, index) => (
                <button
                  key={index}
                  onClick={() => scrollToSection(item.ref)}
                  className={`inline-flex items-center px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg nav-item dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 ${
                    activeSection === item.label ? "text-gray-900 dark:text-gray-300 bg-gray-200 dark:bg-gray-800 shadow-sm" : "text-gray-600"
                  }`}
                >
                  <span className="mr-2 text-base nav-icon">{item.icon}</span>
                  <span className="nav-text">{item.label}</span>
                </button>
              ))}
            </div>
          )}

          {/* Right side controls */}
          <div className="relative z-10 flex items-center space-x-2 navbar-controls">
            {/* Dark Mode Toggle */}
            <button
              type="button"
              onClick={handleDarkModeToggle}
              aria-pressed={isDark}
              aria-label={
                isDark ? "Switch to light mode" : "Switch to dark mode"
              }
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
              className={`dark-mode-btn flex items-center justify-center w-10 h-10 text-gray-600 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 ${
                iconAnimating ? "animate-pulse" : ""
              }`}
            >
              <span className="text-lg transition-transform duration-200">
                {isDark ? "☀️" : "🌙"}
              </span>
            </button>

            {/* Mobile Menu Button */}
            {isMobile && (
              <button
                onClick={handleMenuToggle}
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
                className={`hamburger-btn flex flex-col justify-center items-center w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 ${
                  isMenuOpen ? "hamburger-active" : ""
                }`}
              >
                <span
                  className={`hamburger-line block w-5 h-0.5 bg-gray-600 dark:bg-gray-300 transition-all duration-300 ${
                    isMenuOpen ? "rotate-45 translate-y-1.5" : ""
                  }`}
                ></span>
                <span
                  className={`hamburger-line block w-5 h-0.5 bg-gray-600 dark:bg-gray-300 transition-all duration-300 my-1 ${
                    isMenuOpen ? "opacity-0" : ""
                  }`}
                ></span>
                <span
                  className={`hamburger-line block w-5 h-0.5 bg-gray-600 dark:bg-gray-300 transition-all duration-300 ${
                    isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
                  }`}
                ></span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobile && (
          <div
            className={`mobile-dropdown absolute w-full top-full pt-4 bg-white/95 dark:bg-gray-900/95 rounded-xl shadow-2xl dark:shadow-gray-800/50 border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-lg ${
              isMenuOpen
                ? "opacity-100 visible overflow-auto max-h-[70vh]"
                : "opacity-0 invisible overflow-hidden max-h-0"
            }`}
          >
            {/* Mobile Header */}
            <div className="sticky top-0 px-6 py-4 border-b mobile-header bg-gradient-to-r from-blue-50/80 to-indigo-50/80 dark:from-gray-800/80 dark:to-gray-700/80 border-gray-200/50 dark:border-gray-600/50 backdrop-blur-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium tracking-wide text-gray-600 dark:text-gray-300">
                  Navigation Menu
                </span>
                <button
                  onClick={handleMenuToggle}
                  className="flex items-center justify-center text-gray-400 transition-all duration-300 ease-out transform rounded-lg close-btn w-7 h-7 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-white/60 dark:hover:bg-gray-600/60 hover:scale-110 hover:rotate-90"
                  aria-label="Close menu"
                >
                  <span className="text-lg font-light leading-none">×</span>
                </button>
              </div>
            </div>

            {/* Mobile Navigation Links - Make this section scrollable */}
            <div className="py-4 mobile-nav-links overflow-y-auto max-h-[calc(70vh-9rem)]">
              {listNav.map((item, index) => (
                <button
                  key={index}
                  onClick={() => scrollToSection(item.ref)}
                  className={`mobile-nav-link w-full group flex items-center px-6 py-4 my-2 rounded-xl transition-all duration-400 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] transform hover:scale-[1.03] hover:-translate-y-1 mobile-nav-item-${index} ${
                    activeSection === item.label ? "bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800" : "text-gray-700 dark:text-gray-300"
                  }`}
                  style={{
                    animationDelay: `${index * 80 + 100}ms`,
                    transitionDelay: isMenuOpen ? `${index * 50}ms` : "0ms",
                  }}
                >
                  <div className="flex items-center flex-1">
                    <span className="flex items-center justify-center w-12 h-12 mr-4 text-xl transition-all ease-out transform shadow-sm nav-icon bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-xl group-hover:from-blue-100 group-hover:to-indigo-100 dark:group-hover:from-blue-900/40 dark:group-hover:to-indigo-900/40 duration-400 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-lg">
                      {item.icon}
                    </span>
                    <div className="">
                      <span className="block text-base font-semibold tracking-wide nav-text">
                        {item.label}
                      </span>
                      <span className="nav-subtext block text-xs text-gray-500 dark:text-gray-400 mt-0.5 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-300">
                        Go to {item.label.toLowerCase()}
                      </span>
                    </div>
                  </div>
                  <span className="text-lg text-gray-400 transition-all ease-out transform nav-arrow group-hover:text-blue-500 dark:group-hover:text-blue-400 duration-400 group-hover:translate-x-2 group-hover:scale-125">
                    →
                  </span>
                </button>
              ))}
            </div>

            {/* Mobile Menu Footer */}
            <div className="px-6 py-4 border-t mobile-footer bg-gradient-to-r from-gray-50/80 to-gray-100/80 dark:from-gray-800/80 dark:to-gray-700/80 border-gray-200/50 dark:border-gray-600/50 backdrop-blur-sm">
              <div className="text-xs font-medium tracking-wider text-center text-gray-500 dark:text-gray-400">
                © 2025 Muhammad Bayu Aji
              </div>
            </div>
          </div>
        )}
      </nav>

      <style>{`
        /* === NAVBAR CONTAINER === */
        .navbar-container {
          position: sticky;
          top: 0;
          z-index: 20;
        }
        
        .navbar {
          backdrop-filter: blur(10px);
          position: relative;
          z-index: 20;
        }
        
        /* Logo styles */
        .navbar img {
          object-fit: contain;
          transition: transform 0.3s ease;
        }
        
        .navbar img:hover {
          transform: scale(1.05);
        }
        
        @media (max-width: 640px) {
          .navbar img {
            width: 2rem;
            height: 2rem;
          }
        }
        
        /* === HAMBURGER ANIMATION === */
        .hamburger-line {
          transform-origin: center;
        }
        
        .hamburger-btn:hover .hamburger-line {
          background-color: #4f46e5;
        }
        
        .hamburger-btn:active {
          transform: scale(0.95);
        }
        
        /* === MOBILE DROPDOWN === */
        .mobile-dropdown {
          z-index: 20;
          transform-origin: top center;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
          pointer-events: none;
          position: absolute;
          top: 100%;
          display: flex;
          flex-direction: column;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .mobile-dropdown[class*="visible"] {
          pointer-events: auto;
        }
        
        .mobile-dropdown::-webkit-scrollbar {
          width: 4px;
        }
        
        .mobile-dropdown::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .mobile-dropdown::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 2px;
        }
        
        .mobile-dropdown::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
        
        /* === ANIMATIONS === */
        @keyframes slideInFromTop {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes dropReveal {
          from {
            clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
            transform: translateY(-20px);
          }
          to {
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
            transform: translateY(0);
          }
        }
        
        .mobile-dropdown {
          animation: none;
        }
        
        .mobile-dropdown[class*="visible"] {
          animation: dropReveal 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        
        /* === MOBILE NAV LINKS === */
        .mobile-nav-link {
          position: relative;
          opacity: 0;
          transform: translateY(-20px);
          animation: none;
        }
        
        .mobile-dropdown[class*="visible"] .mobile-nav-link {
          animation: slideInFromTop 0.5s ease-out forwards;
        }
        
        /* === STAGGERED ANIMATIONS === */
        .mobile-dropdown[class*="visible"] .mobile-nav-item-0 { animation-delay: 0.15s; }
        .mobile-dropdown[class*="visible"] .mobile-nav-item-1 { animation-delay: 0.2s; }
        .mobile-dropdown[class*="visible"] .mobile-nav-item-2 { animation-delay: 0.25s; }
        .mobile-dropdown[class*="visible"] .mobile-nav-item-3 { animation-delay: 0.3s; }
        .mobile-dropdown[class*="visible"] .mobile-nav-item-4 { animation-delay: 0.35s; }
        
        /* === MOBILE MENU IMPROVEMENTS === */
        .mobile-header {
          position: sticky;
          top: 0;
          left: 0;
          right: 0;
          z-index: 30;
          backdrop-filter: blur(15px);
          animation: fadeIn 0.3s ease-out forwards;
          flex-shrink: 0;
        }
        
        /* Fix for mobile dropdown scrolling */
        .mobile-dropdown[class*="visible"] {
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        /* Ensure "Navigation Menu" text is visible */
        .mobile-header span {
          display: block;
          opacity: 1;
          visibility: visible;
        }
        
        /* === RESPONSIVE DESIGN === */
        @media (max-width: 1024px) {
          .mobile-dropdown {
            top: 4rem; /* Match navbar height */
          }
        }
        
        
          
          .mobile-nav-links {
            max-height: calc(70vh - 9rem);
          }
        }
        
        @media (max-width: 640px) {
          .mobile-dropdown {
            max-height: calc(80vh - 4.5rem);
          }
          
          .mobile-nav-links {
            max-height: calc(80vh - 9rem);
          }
          
          .navbar-logo {
            font-size: 1.125rem;
          }
          
          .mobile-nav-link {
            padding: 0.75rem 1rem;
            margin: 0.25rem 0.5rem;
          }
          
          .nav-icon {
            width: 2rem;
            height: 2rem;
            margin-right: 0.75rem;
          }
        }
        
        /* Ensure the dropdown is always scrollable when open */
        .mobile-dropdown[class*="visible"] {
          overflow-y: auto;
        }
        
        /* === ACCESSIBILITY === */
        @media (prefers-reduced-motion: reduce) {
          .mobile-nav-link,
          .mobile-dropdown,
          .hamburger-line,
          .nav-icon,
          .nav-arrow {
            animation: none !important;
            transition-duration: 0.01ms !important;
          }
        }
        
        .mobile-nav-link:focus,
        .hamburger-btn:focus,
        .dark-mode-btn:focus,
        .close-btn:focus {
          outline: 1px solid #3b82f6;
          outline-offset: 1px;
          border-radius: 0.3rem;
        }
        
        /* === SMOOTH INTERACTIONS === */
        html {
          scroll-behavior: smooth;
        }
        
        .dark-mode-btn:hover {
          transform: scale(1.05);
        }
        
        .dark-mode-btn:active {
          transform: scale(0.95);
        }
        
        /* === HOVER EFFECTS === */
        .nav-item {
          position: relative;
          overflow: hidden;
        }
        
        .nav-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.1), transparent);
          transition: left 0.5s ease;
        }
        
        .nav-item:hover::before {
          left: 100%;
        }
        
        /* === MOBILE MENU IMPROVEMENTS === */
        .mobile-header {
          position: sticky;
          top: 0;
          z-index: 10;
          backdrop-filter: blur(15px);
        }
        
        .mobile-nav-links {
          max-height: none;
          overflow-y: auto;
          padding-bottom: 1rem;
        }
        
        .mobile-footer {
          position: sticky;
          bottom: 0;
          z-index: 10;
          backdrop-filter: blur(15px);
        }
        
        /* === ENHANCED MICRO-INTERACTIONS === */
        .navbar-logo:active {
          transform: scale(0.98);
        }
        
        .close-btn:hover {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
        }
        
        .close-btn:active {
          transform: scale(0.9) rotate(180deg);
        }
        
        /* === SMOOTH CURVES === */
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        /* === PERFORMANCE OPTIMIZATIONS === */
        .mobile-nav-link,
        .nav-item,
        .dark-mode-btn,
        .hamburger-btn {
          will-change: transform, opacity;
        }
        
        .mobile-dropdown {
          will-change: transform, opacity, max-height;
        }

        /* Fix for mobile dropdown scrolling */
        body.overflow-hidden {
          -webkit-overflow-scrolling: touch;
        }
        
        .mobile-dropdown {
          -webkit-overflow-scrolling: touch;
        }
      `}</style>
    </>
  );
}
