import React from 'react';
import { motion } from 'framer-motion';
import './GooeyNav.css';

const GooeyNav = ({
  items = [],
  activeIndex,
  onChange,
  className = ""
}) => {
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
                      background: 'rgba(255, 255, 255, 0.15)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
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
