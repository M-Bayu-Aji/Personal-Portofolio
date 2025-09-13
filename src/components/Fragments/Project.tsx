import { useState, useRef, useContext } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { SectionRefsContext } from "../Layouts/LandingPageLayouts";
import TextSpan from "../SubAtomic/TeksSpan";

// Define types for project data
interface Technology {
  name: string;
  icon: React.ReactNode;
  color: string;
}

interface ProjectItem {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: Technology[];
  liveUrl?: string;
  sourceUrl?: string;
  category: string;
}

// Enhanced Technology SVG icons with colors
const TechIcons = {
  HTML: {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 384 512"
        className="w-4 h-4"
      >
        <path
          fill="currentColor"
          d="M0 32l34.9 395.8L191.5 480l157.6-52.2L384 32H0zm308.2 127.9H124.4l4.1 49.4h175.6l-13.6 148.4-97.9 27v.3h-1.1l-98.7-27.3-6-75.8h47.7L138 320l53.5 14.5 53.7-14.5 6-62.2H84.3L71.5 112.2h241.1l-4.4 47.7z"
        />
      </svg>
    ),
    color: "text-orange-600",
  },
  CSS: {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 384 512"
        className="w-4 h-4"
      >
        <path
          fill="currentColor"
          d="M0 32l34.9 395.8L192 480l157.1-52.2L384 32H0zm313.1 80l-4.8 47.3L193 208.6l-.3.1h111.5l-12.8 146.6-98.2 28.7-98.8-29.2-6.4-73.9h48.9l3.2 38.3 52.6 13.3 54.7-15.4 3.7-61.6-166.3-.5v-.1l-.2.1-3.6-46.3L193.1 162l6.5-2.7H76.7L70.9 112h242.2z"
        />
      </svg>
    ),
    color: "text-blue-600",
  },
  Bootstrap: {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 576 512"
        className="w-4 h-4"
      >
        <path
          fill="currentColor"
          d="M333.5,201.4c0-22.1-15.6-34.3-43-34.3h-50.4v71.2h42.5C315.4,238.2,333.5,225,333.5,201.4z M517,188.6 c-9.5-30.9-10.9-68.8-9.8-98.1c1.1-30.5-22.7-58.5-54.7-58.5H123.7c-32.1,0-55.8,28.1-54.7,58.5c1,29.3-0.3,67.2-9.8,98.1 c-9.6,31-25.7,50.6-52.2,53.1v28.5c26.4,2.5,42.6,22.1,52.2,53.1c9.5,30.9,10.9,68.8,9.8,98.1c-1.1,30.5,22.7,58.5,54.7,58.5h328.7 c32.1,0,55.8-28.1,54.7-58.5c-1-29.3,0.3-67.2,9.8-98.1c9.6-31,25.7-50.6,52.1-53.1v-28.5C542.7,239.2,526.5,219.6,517,188.6z M300.2,375.1h-97.9V136.8h97.4c43.3,0,71.7,23.4,71.7,59.4c0,25.3-19.1,47.9-43.5,51.8v1.3c33.2,3.6,55.5,26.6,55.5,58.3 C383.4,349.7,352.1,375.1,300.2,375.1z M290.2,266.2h-50.1v78.6h52.3c34.2,0,52.3-13.7,52.3-39.5 C344.7,279.6,326.1,266.2,290.2,266.2z"
        />
      </svg>
    ),
    color: "text-purple-600",
  },
  JS: {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg" className="w-4 h-4"
        viewBox="0 0 256 256"
      >
        <path fill="#F7DF1E" d="M0 0h256v256H0V0Z" />
        <path d="m67.312 213.932l19.59-11.856c3.78 6.701 7.218 12.371 15.465 12.371c7.905 0 12.89-3.092 12.89-15.12v-81.798h24.057v82.138c0 24.917-14.606 36.259-35.916 36.259c-19.245 0-30.416-9.967-36.087-21.996m85.07-2.576l19.588-11.341c5.157 8.421 11.859 14.607 23.715 14.607c9.969 0 16.325-4.984 16.325-11.858c0-8.248-6.53-11.17-17.528-15.98l-6.013-2.58c-17.357-7.387-28.87-16.667-28.87-36.257c0-18.044 13.747-31.792 35.228-31.792c15.294 0 26.292 5.328 34.196 19.247l-18.732 12.03c-4.125-7.389-8.591-10.31-15.465-10.31c-7.046 0-11.514 4.468-11.514 10.31c0 7.217 4.468 10.14 14.778 14.608l6.014 2.577c20.45 8.765 31.963 17.7 31.963 37.804c0 21.654-17.012 33.51-39.867 33.51c-22.339 0-36.774-10.654-43.819-24.574" />
      </svg>
    ),
    color: "text-yellow-600",
  },
  PHP: {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 640 512"
        className="w-4 h-4"
      >
        <path
          fill="currentColor"
          d="M320 104.5c171.4 0 303.2 72.2 303.2 151.5S491.3 407.5 320 407.5c-171.4 0-303.2-72.2-303.2-151.5S148.7 104.5 320 104.5m0-16.8C143.3 87.7 0 163 0 256s143.3 168.3 320 168.3S640 349 640 256 496.7 87.7 320 87.7zM218.2 242.5c-7.9 40.5-35.8 36.3-70.1 36.3l13.7-70.6c38 0 63.8-4.1 56.4 34.3zM97.4 350.3h36.7l8.7-44.8c41.1 0 66.6 3 90.2-19.1 26.1-24 32.9-66.7 14.3-88.1-9.7-11.2-25.3-16.7-46.5-16.7h-70.7L97.4 350.3zm185.7-213.6h36.5l-8.7 44.8c31.5 0 60.7-2.3 74.8 10.7 14.8 13.6 7.7 31-8.3 113.1h-37c15.4-79.4 18.3-86 12.7-92-5.4-5.8-17.7-4.6-47.4-4.6l-18.8 96.6h-36.5l32.7-168.6zM505 242.5c-8 41.1-36.7 36.3-70.1 36.3l13.7-70.6c38.2 0 63.8-4.1 56.4 34.3zM384.2 350.3H421l8.7-44.8c43.2 0 67.1 2.5 90.2-19.1 26.1-24 32.9-66.7 14.3-88.1-9.7-11.2-25.3-16.7-46.5-16.7H417l-32.8 168.7z"
        />
      </svg>
    ),
    color: "text-indigo-600",
  },
  React: {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        className="w-4 h-4"
      >
        <path
          fill="currentColor"
          d="M418.2 177.2c-5.4-1.8-10.8-3.5-16.2-5.1.9-3.7 1.7-7.4 2.5-11.1 12.3-59.6 4.2-107.5-23.1-123.3-26.3-15.1-69.2.6-112.6 38.4-4.3 3.7-8.5 7.6-12.5 11.5-2.7-2.6-5.5-5.2-8.3-7.7-45.5-40.4-91.1-57.4-118.4-41.5-26.2 15.2-34 60.3-23 116.7 1.1 5.6 2.3 11.1 3.7 16.7-6.4 1.8-12.7 3.8-18.6 5.9C38.3 196.2 0 225.4 0 255.6c0 31.2 40.8 62.5 96.3 81.5 4.5 1.5 9 3 13.6 4.3-1.5 6-2.8 11.9-4 18-10.5 55.5-2.3 99.5 23.9 114.6 27 15.6 72.4-.4 116.6-39.1 3.5-3.1 7-6.3 10.5-9.7 4.4 4.3 9 8.4 13.6 12.4 42.8 36.8 85.1 51.7 111.2 36.6 27-15.6 35.8-62.9 24.4-120.5-.9-4.4-1.9-8.9-3-13.5 3.2-.9 6.3-1.9 9.4-2.9 57.7-19.1 99.5-50 99.5-81.7 0-30.3-39.4-59.7-93.8-78.4zM282.9 92.3c37.2-32.4 71.9-45.1 87.7-36 16.9 9.7 23.4 48.9 12.8 100.4-.7 3.4-1.4 6.7-2.3 10-22.2-5-44.7-8.6-67.3-10.6-13-18.6-27.2-36.4-42.6-53.1 3.9-3.7 7.7-7.2 11.7-10.7zM167.2 307.5c5.1 8.7 10.3 17.4 15.8 25.9-15.6-1.7-31.1-4.2-46.4-7.5 4.4-14.4 9.9-29.3 16.3-44.5 4.6 8.8 9.3 17.5 14.3 26.1zm-30.3-120.3c14.4-3.2 29.7-5.8 45.6-7.8-5.3 8.3-10.5 16.8-15.4 25.4-4.9 8.5-9.7 17.2-14.2 26-6.3-14.9-11.6-29.5-16-43.6zm27.4 68.9c6.6-13.8 13.8-27.3 21.4-40.6s15.8-26.2 24.4-38.9c15-1.1 30.3-1.7 45.9-1.7s31 .6 45.9 1.7c8.5 12.6 16.6 25.5 24.3 38.7s14.9 26.7 21.7 40.4c-6.7 13.8-13.9 27.4-21.6 40.8-7.6 13.3-15.7 26.2-24.2 39-14.9 1.1-30.4 1.6-46.1 1.6s-30.9-.5-45.6-1.4c-8.7-12.7-16.9-25.7-24.6-39s-14.8-26.8-21.5-40.6zm180.6 51.2c5.1-8.8 9.9-17.7 14.6-26.7 6.4 14.5 12 29.2 16.9 44.3-15.5 3.5-31.2 6.2-47 8 5.4-8.4 10.5-17 15.5-25.6zm14.4-76.5c-4.7-8.8-9.5-17.6-14.5-26.2-4.9-8.5-10-16.9-15.3-25.2 16.1 2 31.5 4.7 45.9 8-4.6 14.8-10 29.2-16.1 43.4zM256.2 118.3c10.5 11.4 20.4 23.4 29.6 35.8-19.8-.9-39.7-.9-59.5 0 9.8-12.9 19.9-24.9 29.9-35.8zM140.2 57c16.8-9.8 54.1 4.2 93.4 39 2.5 2.2 5 4.6 7.6 7-15.5 16.7-29.8 34.5-42.9 53.1-22.6 2-45 5.5-67.2 10.4-1.3-5.1-2.4-10.3-3.5-15.5-9.4-48.4-3.2-84.9 12.6-94zm-24.5 263.6c-4.2-1.2-8.3-2.5-12.4-3.9-21.3-6.7-45.5-17.3-63-31.2-10.1-7-16.9-17.8-18.8-29.9 0-18.3 31.6-41.7 77.2-57.6 5.7-2 11.5-3.8 17.3-5.5 6.8 21.7 15 43 24.5 63.6-9.6 20.9-17.9 42.5-24.8 64.5zm116.6 98c-16.5 15.1-35.6 27.1-56.4 35.3-11.1 5.3-23.9 5.8-35.3 1.3-15.9-9.2-22.5-44.5-13.5-92 1.1-5.6 2.3-11.2 3.7-16.7 22.4 4.8 45 8.1 67.9 9.8 13.2 18.7 27.7 36.6 43.2 53.4-3.2 3.1-6.4 6.1-9.6 8.9zm24.5-24.3c-10.2-11-20.4-23.2-30.3-36.3 9.6.4 19.5.6 29.5.6 10.3 0 20.4-.2 30.4-.7-9.2 12.7-19.1 24.8-29.6 36.4zm130.7 30c-.9 12.2-6.9 23.6-16.5 31.3-15.9 9.2-49.8-2.8-86.4-34.2-4.2-3.6-8.4-7.5-12.7-11.5 15.3-16.9 29.4-34.8 42.2-53.6 22.9-1.9 45.7-5.4 68.2-10.5 1 4.1 1.9 8.2 2.7 12.2 4.9 21.6 5.7 44.1 2.5 66.3zm18.2-107.5c-2.8.9-5.6 1.8-8.5 2.6-7-21.8-15.6-43.1-25.5-63.8 9.6-20.4 17.7-41.4 24.5-62.9 5.2 1.5 10.2 3.1 15 4.7 46.6 16 79.3 39.8 79.3 58 0 19.6-34.9 44.9-84.8 61.4zm-149.7-15c25.3 0 45.8-20.5 45.8-45.8s-20.5-45.8-45.8-45.8c-25.3 0-45.8 20.5-45.8 45.8s20.5 45.8 45.8 45.8z"
        />
      </svg>
    ),
    color: "text-cyan-500",
  },
};

export default function Project() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(
    null
  );
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [showAll, setShowAll] = useState(false);
  const [visibleProjectCount, setVisibleProjectCount] = useState(3);
  const [fadingOut, setFadingOut] = useState(false);

  // Refs for scroll animations
  const projectSectionRef = useRef<HTMLElement | null>(null);
  const projectHeaderRef = useRef<HTMLDivElement>(null);
  const projectGridRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Section refs from layout (used to scroll to contact)
  const sectionRefs = useContext<any>(SectionRefsContext);
  const contactRef = sectionRefs?.contactRef as
    | React.RefObject<HTMLElement>
    | undefined;

  // scroll helper that accounts for navbar height
  const scrollToContact = () => {
    const target = contactRef?.current;
    if (!target) return;
    const navHeight =
      document.getElementById("navbar")?.getBoundingClientRect().height || 0;
    const top =
      target.getBoundingClientRect().top + window.pageYOffset - navHeight - 8;
    window.scrollTo({ top, behavior: "smooth" });
  };

  // Check if sections are in view
  const isProjectInView = useInView(projectSectionRef, {
    once: true,
    amount: 0.1,
  });
  const isHeaderInView = useInView(projectHeaderRef, {
    once: true,
    amount: 0.3,
  });
  const isGridInView = useInView(projectGridRef, { once: true, amount: 0.1 });
  const isCtaInView = useInView(ctaRef, { once: true, amount: 0.5 });

  // Enhanced project data
  const projects: ProjectItem[] = [
    {
      id: 1,
      title: "IMT Calculator",
      description:
        "Aplikasi modern untuk menghitung Indeks Massa Tubuh dengan rekomendasi kesehatan personal dan visualisasi data yang interaktif.",
      image:
        "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      technologies: [
        {
          name: "HTML",
          icon: TechIcons.HTML.icon,
          color: TechIcons.HTML.color,
        },
        { name: "CSS", icon: TechIcons.CSS.icon, color: TechIcons.CSS.color },
        { name: "JS", icon: TechIcons.JS.icon, color: TechIcons.JS.color },
      ],
      liveUrl: "https://kalkulator-imt-puce.vercel.app/",
      sourceUrl: "https://github.com/M-Bayu-Aji/kalkulator-imt",
      category: "Web App",
    },
    {
      id: 2,
      title: "Shell Fuel Management",
      description:
        "Sistem manajemen bahan bakar terintegrasi dengan dashboard analytics real-time dan pelaporan otomatis untuk optimasi operasional.",
      image:
        "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      technologies: [
        {
          name: "HTML",
          icon: TechIcons.HTML.icon,
          color: TechIcons.HTML.color,
        },
        {
          name: "Bootstrap",
          icon: TechIcons.Bootstrap.icon,
          color: TechIcons.Bootstrap.color,
        },
        { name: "PHP", icon: TechIcons.PHP.icon, color: TechIcons.PHP.color },
      ],
      liveUrl: "http://www.bayuajiys.byethost32.com/Bahan_Bakar/",
      category: "Management System",
    },
    {
      id: 3,
      title: "Smart Rental Motor",
      description:
        "Platform rental motor dengan sistem booking intelligent, manajemen fleet otomatis, dan integrasi payment gateway untuk pengalaman seamless.",
      image:
        "https://images.unsplash.com/photo-1558981285-6f0c94958bb6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      technologies: [
        {
          name: "HTML",
          icon: TechIcons.HTML.icon,
          color: TechIcons.HTML.color,
        },
        {
          name: "Bootstrap",
          icon: TechIcons.Bootstrap.icon,
          color: TechIcons.Bootstrap.color,
        },
        { name: "PHP", icon: TechIcons.PHP.icon, color: TechIcons.PHP.color },
      ],
      liveUrl: "http://www.bayuajiys.byethost32.com/Rental_Motor/",
      category: "Business Platform",
    },
    {
      id: 4,
      title: "Student Data Hub",
      description:
        "Sistem manajemen data siswa dengan AI-powered analytics, tracking akademik real-time, dan dashboard interaktif untuk pendidik modern.",
      image:
        "https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      technologies: [
        {
          name: "HTML",
          icon: TechIcons.HTML.icon,
          color: TechIcons.HTML.color,
        },
        {
          name: "Bootstrap",
          icon: TechIcons.Bootstrap.icon,
          color: TechIcons.Bootstrap.color,
        },
        { name: "PHP", icon: TechIcons.PHP.icon, color: TechIcons.PHP.color },
      ],
      liveUrl: "http://www.bayuajiys.byethost32.com/Data_Siswa/",
      category: "Management System",
    },
    {
      id: 5,
      title: "Advanced POS System",
      description:
        "Sistem point of sale modern dengan inventory management, sales analytics, dan multi-payment integration untuk bisnis retail masa depan.",
      image:
        "https://images.unsplash.com/photo-1556742393-d75f468bfcb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      technologies: [
        {
          name: "HTML",
          icon: TechIcons.HTML.icon,
          color: TechIcons.HTML.color,
        },
        {
          name: "Bootstrap",
          icon: TechIcons.Bootstrap.icon,
          color: TechIcons.Bootstrap.color,
        },
        { name: "PHP", icon: TechIcons.PHP.icon, color: TechIcons.PHP.color },
      ],
      liveUrl: "http://www.bayuajiys.byethost32.com/Kasir/",
      category: "Business Platform",
    },
    {
      id: 6,
      title: "Modern E-Commerce",
      description:
        "E-commerce platform dengan React architecture, responsive design, dan UX yang dioptimalkan untuk konversi tinggi dan engagement maksimal.",
      image:
        "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      technologies: [
        {
          name: "HTML",
          icon: TechIcons.HTML.icon,
          color: TechIcons.HTML.color,
        },
        { name: "CSS", icon: TechIcons.CSS.icon, color: TechIcons.CSS.color },
        {
          name: "React",
          icon: TechIcons.React.icon,
          color: TechIcons.React.color,
        },
      ],
      liveUrl: "https://m-bayu-aji.github.io/WebShop/",
      sourceUrl: "https://github.com/m-bayu-aji/WebShop",
      category: "Web App",
    },
  ];

  const categories = [
    "All",
    "Web App",
    "Management System",
    "Business Platform",
  ];

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  // Function to handle show more/less toggle
  const handleToggle = () => {
    if (showAll) {
      setFadingOut(true);
      // Scroll to the projects section
      setTimeout(() => {
        projectSectionRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);

      // After scroll and animation completes, reduce the visible cards
      setTimeout(() => {
        setVisibleProjectCount(3);
        setFadingOut(false);
        setShowAll(false);
      }, 500);
    } else {
      setVisibleProjectCount(filteredProjects.length);
      setShowAll(true);
    }
  };

  return (
    <section
      className="relative min-h-screen py-20 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900"
      id="project"
      ref={projectSectionRef}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={
            isProjectInView
              ? { opacity: 0.2, scale: 1 }
              : { opacity: 0, scale: 0.8 }
          }
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          className="absolute bg-blue-400 rounded-full top-10 left-10 w-72 h-72 mix-blend-multiply filter blur-3xl"
        ></motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={
            isProjectInView
              ? { opacity: 0.2, scale: 1 }
              : { opacity: 0, scale: 0.8 }
          }
          transition={{
            duration: 2.5,
            delay: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute bg-purple-400 rounded-full top-40 right-10 w-96 h-96 mix-blend-multiply filter blur-3xl"
        ></motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={
            isProjectInView
              ? { opacity: 0.2, scale: 1 }
              : { opacity: 0, scale: 0.8 }
          }
          transition={{
            duration: 3,
            delay: 1,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute bg-pink-400 rounded-full -bottom-32 left-1/2 w-80 h-80 mix-blend-multiply filter blur-3xl"
        ></motion.div>
      </div>

      <div className="container relative px-4 mx-auto max-w-7xl">
        {/* Enhanced Section Header */}
        <motion.div
          ref={projectHeaderRef}
          initial={{ opacity: 0, y: 30 }}
          animate={
            isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
          }
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-16 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={
              isHeaderInView
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.8 }
            }
            transition={{ duration: 0.5, delay: 0.3 }}
            className="inline-flex items-center px-4 py-2 mb-6 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full dark:bg-blue-900/30 dark:text-blue-400"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              ></path>
            </svg>
            Portfolio Projects
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={
              isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-6 text-5xl font-bold text-transparent font-bricolage bg-clip-text bg-gradient-to-r from-gray-900 to-gray-900 dark:from-white dark:via-blue-400 dark:to-white font-inter sm:text-6xl"
          >
            Karya Terbaik <TextSpan children="& Inovasi" />
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={
              isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.5, delay: 0.5 }}
            className="max-w-3xl mx-auto text-xl leading-relaxed text-gray-600 dark:text-gray-300"
          >
            Koleksi project yang menggabungkan teknologi modern dengan solusi
            bisnis nyata. Setiap project dirancang dengan perhatian detail untuk
            memberikan pengalaman pengguna yang luar biasa.
          </motion.p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={
            isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
          }
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={
                isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter(category)}
              className={`px-6 py-3 font-medium rounded-full transition-all duration-300 ${
                activeFilter === category
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white/80 text-gray-700 hover:bg-blue-50 hover:text-blue-600 dark:bg-gray-800/50 dark:text-gray-300 dark:hover:bg-gray-700"
              } backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Enhanced Projects Grid */}
        <div
          ref={projectGridRef}
          className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3"
        >
          {filteredProjects
            .slice(0, visibleProjectCount)
            .map((project, index) => {
              const isFading = fadingOut && index >= 3;
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={
                    isGridInView
                      ? { opacity: isFading ? 0 : 1, y: isFading ? 20 : 0 }
                      : { opacity: 0, y: 40 }
                  }
                  transition={{
                    duration: 0.6,
                    delay: index * 0.15,
                    type: "spring",
                    stiffness: 70,
                  }}
                  className="relative overflow-hidden transition-all duration-500 transform border shadow-lg group bg-white/80 backdrop-blur-sm border-gray-200/50 rounded-2xl dark:bg-gray-800/80 dark:border-gray-700/50 hover:shadow-2xl dark:hover:shadow-2xl dark:shadow-gray-900/50 hover:-translate-y-2"
                >
                  {/* Category Badge */}
                  <div className="absolute z-20 top-4 left-4">
                    <span className="px-3 py-1 text-xs font-semibold text-white rounded-full bg-gradient-to-r from-blue-600 to-purple-600 backdrop-blur-sm">
                      {project.category}
                    </span>
                  </div>

                  {/* Project Image with Overlay */}
                  <div className="relative h-64 overflow-hidden">
                    <div className="absolute inset-0 z-10 flex items-center justify-center transition-all duration-500 opacity-0 bg-gradient-to-br from-blue-900/90 via-purple-900/90 to-pink-900/90 group-hover:opacity-100">
                      <div className="flex space-x-4 transition-transform duration-500 transform translate-y-4 group-hover:translate-y-0">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white transition-all border rounded-lg bg-white/20 backdrop-blur-sm hover:bg-white/30 border-white/30"
                          >
                            <svg
                              className="w-4 h-4 mr-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              ></path>
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              ></path>
                            </svg>
                            Live Demo
                          </a>
                        )}
                        <button
                          onClick={() => setSelectedProject(project)}
                          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white transition-all border rounded-lg bg-white/20 backdrop-blur-sm hover:bg-white/30 border-white/30"
                        >
                          <svg
                            className="w-4 h-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                          </svg>
                          Details
                        </button>
                      </div>
                    </div>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="object-cover w-full h-full transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/20 to-transparent group-hover:opacity-100"></div>
                  </div>

                  {/* Enhanced Project Info */}
                  <div className="p-6">
                    <h3 className="mb-3 text-xl font-bold text-gray-900 transition-colors duration-300 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      {project.title}
                    </h3>
                    <p className="mb-5 leading-relaxed text-gray-600 dark:text-gray-300">
                      {project.description}
                    </p>

                    {/* Enhanced Technology Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <div
                          key={index}
                          className={`flex items-center px-3 py-1.5 text-xs font-medium bg-gray-50 rounded-lg border transition-all duration-300 hover:scale-105 hover:shadow-md dark:bg-gray-700/50 dark:border-gray-600 ${tech.color}`}
                          title={tech.name}
                        >
                          <span className="mr-1.5">{tech.icon}</span>
                          {tech.name}
                        </div>
                      ))}
                    </div>

                    {/* Project Stats */}
                    <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-100 dark:border-gray-700">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          ></path>
                        </svg>
                        2024
                      </div>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          ></path>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          ></path>
                        </svg>
                        Live
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
        </div>

        {/* Show More/Less Button */}
        {filteredProjects.length > 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={
              isGridInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex justify-center mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleToggle}
              className="inline-flex items-center px-6 py-3 font-medium text-white transition-all duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {showAll ? (
                <>
                  Tampilkan Lebih Sedikit{" "}
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 15l7-7 7 7"
                    ></path>
                  </svg>
                </>
              ) : (
                <>
                  Lihat Semua Project{" "}
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </>
              )}
            </motion.button>
          </motion.div>
        )}

        {/* Call to Action */}
        <motion.div
          ref={ctaRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isCtaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-20 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={
              isCtaInView
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.9 }
            }
            transition={{
              type: "spring",
              stiffness: 100,
              delay: 0.3,
            }}
            className="inline-block p-8 shadow-2xl bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl"
          >
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={
                isCtaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
              }
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-4 text-2xl font-bold text-white"
            >
              Tertarik Berkolaborasi?
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={
                isCtaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
              }
              transition={{ duration: 0.5, delay: 0.5 }}
              className="max-w-md mx-auto mb-6 text-blue-100"
            >
              Mari diskusikan project impian Anda dan wujudkan bersama-sama
            </motion.p>
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={
                isCtaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
              }
              transition={{ duration: 0.5, delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToContact}
              type="button"
              className="px-8 py-3 font-semibold text-blue-600 transition-all duration-300 bg-white rounded-lg shadow-lg hover:bg-gray-50"
            >
              Hubungi Saya
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            // close when clicking on backdrop
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              // prevent backdrop clicks from closing when clicking inside modal
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="relative w-full max-w-5xl mx-auto overflow-hidden bg-white shadow-2xl rounded-2xl dark:bg-gray-800"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute z-10 flex items-center justify-center w-10 h-10 text-gray-400 transition-all rounded-full top-4 right-4 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>

              {/* Modal Content */}
              <div className="grid gap-0 lg:grid-cols-2">
                {/* Project Image */}
                <div className="relative h-64 overflow-hidden lg:h-full bg-gradient-to-br from-blue-600 to-purple-600">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="object-cover w-full h-full mix-blend-overlay"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

                  {/* Floating Category */}
                  <div className="absolute top-6 left-6">
                    <span className="px-3 py-1 text-sm font-semibold text-white border rounded-full bg-white/20 backdrop-blur-sm border-white/30">
                      {selectedProject.category}
                    </span>
                  </div>
                </div>

                {/* Project Details */}
                <div className="p-8 lg:p-10">
                  <h3 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
                    {selectedProject.title}
                  </h3>
                  <p className="mb-8 text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                    {selectedProject.description}
                  </p>

                  {/* Technology Stack */}
                  <div className="mb-8">
                    <h4 className="flex items-center mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                      <svg
                        className="w-5 h-5 mr-2 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-4.702.163L5.889 15a2 2 0 00-1.799.781l-.73 1.46a2 2 0 00.225 2.508l1.663 1.663a2 2 0 002.508.225l1.46-.73a2 2 0 00.781-1.799l-.24-1.249a6 6 0 01.163-4.702l.158-.318a6 6 0 01.517-3.86l-.477-2.387a2 2 0 00-.547-1.022L8.428 4.572"
                        ></path>
                      </svg>
                      Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {selectedProject.technologies.map((tech, index) => (
                        <div
                          key={index}
                          className={`flex items-center px-4 py-2 font-medium bg-gray-50 rounded-xl border transition-all duration-300 hover:scale-105 hover:shadow-lg dark:bg-gray-700/50 dark:border-gray-600 ${tech.color}`}
                        >
                          <span className="mr-2">{tech.icon}</span>
                          {tech.name}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Enhanced Action Buttons */}
                  <div className="flex flex-col gap-4 sm:flex-row">
                    {selectedProject.liveUrl && (
                      <a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-6 py-3 font-semibold text-white transition-all transform shadow-lg bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl hover:from-blue-700 hover:to-blue-800 hover:scale-105 hover:shadow-xl"
                      >
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          ></path>
                        </svg>
                        View Live Demo
                      </a>
                    )}
                    {selectedProject.sourceUrl && (
                      <a
                        href={selectedProject.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-6 py-3 font-semibold text-gray-700 transition-all transform bg-gray-100 shadow-lg rounded-xl hover:bg-gray-200 dark:text-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 hover:scale-105 hover:shadow-xl"
                      >
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                          ></path>
                        </svg>
                        Source Code
                      </a>
                    )}
                  </div>

                  {/* Project Features */}
                  <div className="pt-6 mt-8 border-t border-gray-200 dark:border-gray-700">
                    <h5 className="mb-3 font-semibold text-gray-900 dark:text-white">
                      Key Features:
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.id === 1 && (
                        <>
                          <span className="px-2 py-1 text-xs text-green-800 bg-green-100 rounded-md dark:bg-green-900/30 dark:text-green-400">
                            Health Analytics
                          </span>
                          <span className="px-2 py-1 text-xs text-blue-800 bg-blue-100 rounded-md dark:bg-blue-900/30 dark:text-blue-400">
                            BMI Calculator
                          </span>
                          <span className="px-2 py-1 text-xs text-purple-800 bg-purple-100 rounded-md dark:bg-purple-900/30 dark:text-purple-400">
                            Recommendations
                          </span>
                        </>
                      )}
                      {selectedProject.id === 2 && (
                        <>
                          <span className="px-2 py-1 text-xs text-yellow-800 bg-yellow-100 rounded-md dark:bg-yellow-900/30 dark:text-yellow-400">
                            Real-time Tracking
                          </span>
                          <span className="px-2 py-1 text-xs text-red-800 bg-red-100 rounded-md dark:bg-red-900/30 dark:text-red-400">
                            Analytics Dashboard
                          </span>
                          <span className="px-2 py-1 text-xs text-indigo-800 bg-indigo-100 rounded-md dark:bg-indigo-900/30 dark:text-indigo-400">
                            Reporting
                          </span>
                        </>
                      )}
                      {selectedProject.id === 3 && (
                        <>
                          <span className="px-2 py-1 text-xs rounded-md bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
                            Smart Booking
                          </span>
                          <span className="px-2 py-1 text-xs text-orange-800 bg-orange-100 rounded-md dark:bg-orange-900/30 dark:text-orange-400">
                            Fleet Management
                          </span>
                          <span className="px-2 py-1 text-xs text-pink-800 bg-pink-100 rounded-md dark:bg-pink-900/30 dark:text-pink-400">
                            Payment Gateway
                          </span>
                        </>
                      )}
                      {selectedProject.id === 4 && (
                        <>
                          <span className="px-2 py-1 text-xs rounded-md bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400">
                            Student Analytics
                          </span>
                          <span className="px-2 py-1 text-xs rounded-md bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-400">
                            Academic Tracking
                          </span>
                          <span className="px-2 py-1 text-xs rounded-md bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400">
                            Interactive Dashboard
                          </span>
                        </>
                      )}
                      {selectedProject.id === 5 && (
                        <>
                          <span className="px-2 py-1 text-xs text-teal-800 bg-teal-100 rounded-md dark:bg-teal-900/30 dark:text-teal-400">
                            POS System
                          </span>
                          <span className="px-2 py-1 text-xs rounded-md bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                            Inventory Control
                          </span>
                          <span className="px-2 py-1 text-xs rounded-md bg-lime-100 text-lime-800 dark:bg-lime-900/30 dark:text-lime-400">
                            Sales Analytics
                          </span>
                        </>
                      )}
                      {selectedProject.id === 6 && (
                        <>
                          <span className="px-2 py-1 text-xs rounded-md bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-400">
                            React Architecture
                          </span>
                          <span className="px-2 py-1 text-xs text-indigo-800 bg-indigo-100 rounded-md dark:bg-indigo-900/30 dark:text-indigo-400">
                            Responsive Design
                          </span>
                          <span className="px-2 py-1 text-xs text-purple-800 bg-purple-100 rounded-md dark:bg-purple-900/30 dark:text-purple-400">
                            Modern UX
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
