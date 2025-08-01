import { useEffect, useRef, useState } from "react";
import "../../index.css";
import TextSpan from "../SubAtomic/TeksSpan";

export default function Navbar() {
  const listNav = [
    { label: "Home", href: "/home", icon: "fa-solid fa-house" },
    { label: "About", href: "/about", icon: "fa-solid fa-user" },
    { label: "Skills", href: "/skills", icon: "fa-solid fa-gear" },
    { label: "Projects", href: "/projects", icon: "fa-solid fa-folder-open" },
    { label: "Contact", href: "/contact", icon: "fa-solid fa-envelope" },
  ];

  const [isMobile, setIsMobile] = useState<boolean>(
    typeof window !== "undefined" ? window.innerWidth <= 1000 : true
  );
  

  const hamburger = useRef<HTMLAnchorElement>(null);
  const navbarNav = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1000);
    window.addEventListener("resize", handleResize);
    handleResize();``
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleHamburgerClick = (e: MouseEvent) => {
      e.preventDefault();
      navbarNav.current?.classList.toggle("active");
    };

    const handleDocumentClick = (e: MouseEvent) => {
      if (
        hamburger.current &&
        navbarNav.current &&
        !hamburger.current.contains(e.target as Node) &&
        !navbarNav.current.contains(e.target as Node)
      ) {
        navbarNav.current.classList.remove("active");
      }
    };

    const hamb = hamburger.current;
    const nav = navbarNav.current;

    if (hamb && nav) {
      hamb.addEventListener("click", handleHamburgerClick);
      document.addEventListener("click", handleDocumentClick);
    }

    return () => {
      hamb?.removeEventListener("click", handleHamburgerClick);
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  useEffect(() => {
    (window as any).feather?.replace?.();
  }, []);

  return (
    <nav
      className="navbar flex justify-between items-center px-[1.4rem] py-[1.4rem] mx-auto max-w-[1300px] bg-white sticky top-0 z-[999] shadow-[1px_1px_10px_#aaa] rounded-[5px]"
      id="home"
    >
      <a href="#" className="text-2xl font-bold font-bricolage navbar-logo">
        Muhammad<TextSpan>BayuAji</TextSpan>
      </a>

      <div className="navbar-nav" ref={navbarNav}>
        {isMobile && (
          <div className="logo-mobile">
            <a
              href="#"
              className="text-2xl font-bold underline underline-offset-[5px] decoration-skip-ink-none"
            >
              Muhammad<TextSpan>BayuAji</TextSpan>
            </a>
          </div>
        )}
        {listNav.map((item, index) => (
          <a
            href={item.href}
            key={index}
            className="text-[rgb(106,106,106)] inline-block text-base p-2.5 mx-2 font-bold transition-all duration-300 ease-in-out hover:text-[#333] hover:bg-[#eee] hover:p-[10px] hover:rounded-md"
          >
            <i className={`${item.icon} text-lg`}></i> {item.label}
          </a>
        ))}
      </div>

      <div className="navbar-extra">
        <a className="mx-2 h hover:text-[#b6895b] duration-300 ease-in-out" href="#" id="hamburger" ref={hamburger}>
          <i data-feather="menu"></i>
        </a>
      </div>
    </nav>
  );
}
