import About from "../Fragments/About";
import Contact from "../Fragments/Contact";
import Header from "../Fragments/Header";
import Navbar from "../Fragments/Navbar";
import Project from "../Fragments/Project";
import Skill from "../Fragments/Skill";
import '../../App.css';
import Footer from "../Fragments/Footer";

export default function LandingPageLayout() {
  return (
    <>
      <Navbar />
      <Header />
      <About />
      <Skill />
      <Project />
      <Contact />
      <Footer />
    </>
  );
}
