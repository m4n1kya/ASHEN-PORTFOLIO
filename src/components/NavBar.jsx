import { useState, useEffect } from "react";

import { navLinks } from "../constants";
import Magnet from "./reactbits/Magnet";
import ShinyText from "./reactbits/ShinyText";

const NavBar = () => {
  // track if the user has scrolled down the page
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? "scrolled" : "not-scrolled"}`}>
      <div className="inner">
        <a href="#hero" className="logo flex items-center">
          <ShinyText
            text="ASHEN"
            className="font-bold tracking-widest text-lg"
            speed={3}
          />
        </a>

        <nav className="desktop">
          <ul className="flex items-center space-x-6">
            {navLinks.map(({ link, name }) => (
              <li key={name} className="group">
                <Magnet padding={15} magnetStrength={3}>
                  <a href={link} className="relative py-1">
                    <span className="text-white-50 group-hover:text-white transition-colors duration-300">
                      {name}
                    </span>
                    <span className="underline" />
                  </a>
                </Magnet>
              </li>
            ))}
          </ul>
        </nav>

        <Magnet padding={20} magnetStrength={3}>
          <a href="#contact" className="contact-btn group">
            <div className="inner">
              <span>Contact me</span>
            </div>
          </a>
        </Magnet>
      </div>
    </header>
  );
};

export default NavBar;
