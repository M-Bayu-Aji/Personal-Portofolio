import About from "../Fragments/About";
import Contact from "../Fragments/Contact";
import Header from "../Fragments/Header";
import Navbar from "../Fragments/Navbar";
import Project from "../Fragments/Project";
import Skill from "../Fragments/Skill";
import '../../App.css';
import Footer from "../Fragments/Footer";
import { createContext, useRef } from "react";
import type { RefObject } from "react";

// Define type for our section refs
type SectionRefs = {
  homeRef: RefObject<HTMLDivElement>;
  aboutRef: RefObject<HTMLDivElement>;
  skillsRef: RefObject<HTMLDivElement>;
  projectsRef: RefObject<HTMLDivElement>;
  contactRef: RefObject<HTMLDivElement>;
};

// Create a context to share refs with Navbar
export const SectionRefsContext = createContext<SectionRefs | null>(null);

export default function LandingPageLayout() {
  // Create refs for each section
  const homeRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  
  // Create refs context value
  const refsContextValue = {
    homeRef,
    aboutRef,
    skillsRef,
    projectsRef,
    contactRef
  } as SectionRefs;

  return (
    <SectionRefsContext.Provider value={refsContextValue}>
      <Navbar />
      <div ref={homeRef}>
        <Header />
      </div>
      <div ref={aboutRef}>
        <About />
      </div>
      <div ref={skillsRef}>
        <Skill />
      </div>
      <div ref={projectsRef}>
        <Project />
      </div>
      <div ref={contactRef}>
        <Contact />
      </div>
      <Footer />
    </SectionRefsContext.Provider>
  );
}
