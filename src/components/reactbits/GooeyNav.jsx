import { useRef, useEffect, useState } from 'react';
import './GooeyNav.css';

const GooeyNav = ({
  items,
  animationTime = 600,
  particleCount = 15,
  particleDistances = [90, 10],
  particleR = 100,
  timeVariance = 300,
  colors = [1, 2, 3, 1, 2, 3, 1, 4],
  activeIndex,
  onChange,
  className = ""
}) => {
  const containerRef = useRef(null);
  const navRef = useRef(null);
  const filterRef = useRef(null);
  const textRef = useRef(null);
  const [internalIndex, setInternalIndex] = useState(activeIndex || 0);

  const currentIndex = activeIndex !== undefined ? activeIndex : internalIndex;

  const noise = (n = 1) => n / 2 - Math.random() * n;

  const getXY = (distance, pointIndex, totalPoints) => {
    const angle = ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180);
    return [distance * Math.cos(angle), distance * Math.sin(angle)];
  };

  const createParticle = (i, t, d, r) => {
    let rotate = noise(r / 10);
    return {
      start: getXY(d[0], particleCount - i, particleCount),
      end: getXY(d[1] + noise(7), particleCount - i, particleCount),
      time: t,
      scale: 1 + noise(0.2),
      color: colors[Math.floor(Math.random() * colors.length)],
      rotate: rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10
    };
  };

  const makeParticles = element => {
    // Particles and gooey filters cause catastrophic WebKit composite bugs over WebGL canvases.
    // Removed to ensure 100% flawless, glitch-free sliding pill navigation.
  };

  const updateEffectPosition = element => {
    requestAnimationFrame(() => {
      if (!navRef.current || !filterRef.current || !textRef.current) return;
      
      const width = element.offsetWidth;
      const height = element.offsetHeight;
      const left = element.offsetLeft;
      const top = element.offsetTop;

      const styles = {
        left: `${left}px`,
        top: `${top}px`,
        width: `${width}px`,
        height: `${height}px`
      };
      
      Object.assign(filterRef.current.style, styles);
      Object.assign(textRef.current.style, styles);
      textRef.current.innerText = element.innerText;
    });
  };

  const handleClick = (e, index) => {
    if (e) e.preventDefault();
    const liEl = e ? (e.currentTarget.tagName === 'LI' ? e.currentTarget : e.currentTarget.parentElement) : navRef.current.querySelectorAll('li:not(.effect)')[index];
    if (currentIndex === index) return;

    if (onChange) {
      onChange(index);
    } else {
      setInternalIndex(index);
    }
    
    if (liEl) {
      updateEffectPosition(liEl);
    }

    if (textRef.current) {
      textRef.current.classList.remove('active');
      void textRef.current.offsetWidth;
      textRef.current.classList.add('active');
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const liEl = e.currentTarget.parentElement;
      if (liEl) {
        handleClick(null, index);
      }
    }
  };

  useEffect(() => {
    const listItems = navRef.current.querySelectorAll('li:not(.effect)');
    if (listItems.length > 0 && listItems[currentIndex]) {
      updateEffectPosition(listItems[currentIndex]);
    }
    
    const handleResize = () => {
      const activeItem = navRef.current.querySelectorAll('li:not(.effect)')[currentIndex];
      if (activeItem) updateEffectPosition(activeItem);
    };
    
    window.addEventListener("resize", handleResize);
    requestAnimationFrame(handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [currentIndex]);

  return (
    <div className={`gooey-nav-container ${className}`} ref={containerRef}>
      <nav>
        <ul ref={navRef}>
          {items.map((item, index) => (
            <li
              key={item.id || index}
              className={index === currentIndex ? 'active' : ''}
              onClick={e => handleClick(e, index)}
            >
              <a
                href={`#${item.id || item.name}`}
                onClick={e => e.preventDefault()}
                onKeyDown={e => handleKeyDown(e, index)}
              >
                {item.name}
              </a>
            </li>
          ))}
          <li className="effect filter" ref={filterRef} style={{ listStyle: 'none' }}></li>
          <li className={`effect text ${activeIndex !== -1 ? 'active' : ''}`} ref={textRef} style={{ listStyle: 'none' }}>
            {activeIndex !== -1 ? items[activeIndex]?.name : ''}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default GooeyNav;
