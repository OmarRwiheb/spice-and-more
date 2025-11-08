import { NavItems } from "../data/Nav";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import MobMenue from './MobMenue';

const Header = () => {
  const container = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRef = useRef(null);

  const tl = useRef();

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  }

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  }

  const handleLinkClick = () => {
    setActiveDropdown(null);
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useGSAP(() => {
    gsap.set(".menu-link-item-holder", { y: 75 });

    tl.current = gsap
      .timeline({ paused: true })
      .to(".menu-overlay", { duration: 1, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", ease: "power4.inOut" })
      .to(".menu-link-item-holder", { y: 0, duration: 1, stagger: 0.1, ease: "power4.inOut", delay: -0.75 })
  }, { scope: container });

  useEffect(() => {
    if (isMenuOpen) {
      tl.current.play();
    } else {
      tl.current.reverse();
    }
  }, [isMenuOpen]);

  return (
    <header className='relative flex justify-center'>
      <nav className='flex justify-center' ref={container}>
        <div className="menu-bar fixed z-40 justify-between items-center text-white w-[90%] lg:w-3/4 m-auto hidden lg:flex">
          <div className="menu-logo">
            <Link to='/'>
              <img
                src="logo.webp"
                alt=""
                className='w-[100px]'
              />
            </Link>
          </div>
          <ul className='space-x-4 gap-9 text-xl hidden lg:flex'>
            {NavItems.map((item, index) => (
              <li key={item.title} className="uppercase font-light relative group">
                {item.submenu ? (
                  <div ref={dropdownRef}>
                    <button
                      onClick={() => toggleDropdown(index)}
                      className="flex items-center gap-2 hover:text-[#ffb400] transition-colors"
                    >
                      {item.title}
                      <svg
                        className={`w-4 h-4 transition-transform ${activeDropdown === index ? 'rotate-180' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div className={`absolute left-0 mt-2 w-48 bg-[#1c1a19] rounded-lg shadow-lg py-2 transition-all duration-300 ${activeDropdown === index ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.title}
                          to={subItem.url}
                          onClick={handleLinkClick}
                          className="block px-4 py-2 text-sm hover:bg-[#ffb400] hover:text-black transition-colors"
                        >
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link to={item.url} className="hover:text-[#ffb400] transition-colors">
                    {item.title}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
        <MobMenue toggleMenu={toggleMenu} />
      </nav>
    </header>
  )
}

export default Header
