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
  const handleClick = (e, index) => {
    e.preventDefault();
    if (onChange && index !== activeIndex) {
      onChange(index);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick(e, index);
    }
  };

  return (
    <div className={`gooey-nav-container ${className}`}>
      <nav>
        <ul>
          {items.map((item, index) => {
            const isActive = index === activeIndex;
            return (
              <li
                key={item.id || index}
                className={isActive ? 'active' : ''}
                onClick={e => handleClick(e, index)}
                style={{ position: 'relative', cursor: 'pointer', zIndex: isActive ? 20 : 10 }}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      backdropFilter: 'blur(10px)',
                      zIndex: -1
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                      mass: 0.8
                    }}
                  />
                )}
                <a
                  href={`#${item.id || item.name}`}
                  onClick={e => e.preventDefault()}
                  onKeyDown={e => handleKeyDown(e, index)}
                  style={{
                    color: isActive ? 'white' : 'rgba(255,255,255,0.4)',
                    transition: 'color 0.3s ease'
                  }}
                >
                  {item.name}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default GooeyNav;
