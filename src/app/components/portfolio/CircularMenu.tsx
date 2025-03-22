"use client"

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { X, Menu } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import Link from 'next/link';
import { portfolio_menu } from './Menu';
import { useActiveSection } from '../../hooks/useActiveSection';
import { navigateToSection } from '../../../lib/utils';

export interface CircularMenuItem {
  icon: React.ReactNode;
  tooltip: string;
  endpoint: string;
  color?: string;
}

interface CircularMenuProps {
  position?: 'left' | 'right' | 'top' | 'bottom';
  area?: 90 | 180 | 270 | 360;
  side?: 'start' | 'end' | 'center';
  radius?: number;
  opened?: boolean;
}

const CircularMenu = ({
  position = 'right',
  area = 180,
  // side = 'end',
  radius = 120,
  opened = false,
}: CircularMenuProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(opened);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activePath, setActivePath] = useState<string>("");
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const menuId = useRef(`menu-${Math.random().toString(36).substr(2, 9)}`);

  const pathSpring = useSpring(0, { stiffness: 100, damping: 30 });

  useEffect(() => {
    pathSpring.set(isOpen ? 1 : 0);

    if (!document.getElementById('glow-filter')) {
      const svgNS = "http://www.w3.org/2000/svg";
      const filter = document.createElementNS(svgNS, "filter");
      filter.setAttribute("id", "glow-filter");

      const feGaussianBlur = document.createElementNS(svgNS, "feGaussianBlur");
      feGaussianBlur.setAttribute("stdDeviation", "3");
      feGaussianBlur.setAttribute("result", "blur");

      const feColorMatrix = document.createElementNS(svgNS, "feColorMatrix");
      feColorMatrix.setAttribute("in", "blur");
      feColorMatrix.setAttribute("mode", "matrix");
      feColorMatrix.setAttribute("values", "0.92 0 0 0 0  0 0.7 0 0 0  0 0 0.03 0 0  0 0 0 18 -7");
      feColorMatrix.setAttribute("result", "glow");

      const feMerge = document.createElementNS(svgNS, "feMerge");

      const feMergeNode1 = document.createElementNS(svgNS, "feMergeNode");
      feMergeNode1.setAttribute("in", "glow");

      const feMergeNode2 = document.createElementNS(svgNS, "feMergeNode");
      feMergeNode2.setAttribute("in", "SourceGraphic");

      feMerge.appendChild(feMergeNode1);
      feMerge.appendChild(feMergeNode2);

      filter.appendChild(feGaussianBlur);
      filter.appendChild(feColorMatrix);
      filter.appendChild(feMerge);

      const svg = document.createElementNS(svgNS, "svg");
      svg.setAttribute("width", "0");
      svg.setAttribute("height", "0");
      svg.setAttribute("style", "position: absolute");
      svg.appendChild(filter);

      document.body.appendChild(svg);
    }

    if (isOpen && containerRef.current && !document.getElementById(menuId.current)) {
      const particleContainer = document.createElement('div');
      particleContainer.id = menuId.current;
      particleContainer.style.position = 'absolute';
      particleContainer.style.top = '0';
      particleContainer.style.left = '0';
      particleContainer.style.width = '100%';
      particleContainer.style.height = '100%';
      particleContainer.style.pointerEvents = 'none';
      particleContainer.style.zIndex = '-1';

      containerRef.current.appendChild(particleContainer);

      const style = document.createElement('style');
      style.textContent = `
        @keyframes float-${menuId.current} {
          0% { transform: translate(0, 0); opacity: 1; }
          100% { transform: translate(var(--x), var(--y)); opacity: 0; }
        }
        
        .particle-${menuId.current} {
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          pointer-events: none;
          animation: float-${menuId.current} var(--duration) ease-out forwards;
        }
      `;

      document.head.appendChild(style);

      const emitParticle = () => {
        if (!containerRef.current || !document.getElementById(menuId.current)) return;

        const particle = document.createElement('div');
        particle.className = `particle-${menuId.current}`;

        const size = Math.random() * 4 + 2;
        const duration = Math.random() * 1 + 1;
        const x = (Math.random() - 0.5) * 100;
        const y = (Math.random() - 0.5) * 100;

        particle.style.backgroundColor = `rgba(234, 179, 8, 0.8)`; // Couleur principale dorée avec opacité

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.setProperty('--duration', `${duration}s`);
        particle.style.setProperty('--x', `${x}px`);
        particle.style.setProperty('--y', `${y}px`);

        particle.style.top = '6px';
        particle.style.left = '6px';

        document.getElementById(menuId.current)?.appendChild(particle);
        setTimeout(() => {
          particle.remove();
        }, duration * 1000);
      };

      const particleInterval = setInterval(emitParticle, 100);

      return () => {
        clearInterval(particleInterval);
        if (document.getElementById(menuId.current)) {
          document.getElementById(menuId.current)?.remove();
        }
      };
    }
  }, [isOpen, pathSpring]);


  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  useEffect(() => {
    if (portfolio_menu.length <= 1) return;

    const pathData = [];
    const adjustedRadius = radius;

    switch (position) {
      case 'right':
        pathData.push(`M 0 0`);
        for (let i = 0; i <= area; i += 5) {
          const angle = i * (Math.PI / 180);
          const x = -Math.sin(angle) * adjustedRadius;
          const y = Math.cos(angle) * adjustedRadius;
          pathData.push(`L ${x} ${y}`);
        }
        break;
      default:
        pathData.push(`M 0 0`);
        for (let i = 0; i <= area; i += 5) {
          const angle = i * (Math.PI / 180);
          const x = Math.cos(angle) * adjustedRadius;
          const y = Math.sin(angle) * adjustedRadius;
          pathData.push(`L ${x} ${y}`);
        }
    }

    setActivePath(pathData.join(' '));
  }, [portfolio_menu.length, area, position, radius]);

  const getCircularMenuItemPosition = (index: number) => {
    const angle = (area / (portfolio_menu.length - 1 || 1)) * index;
    const adjustedAngle = angle * (Math.PI / 180);
    const baseX = Math.cos(adjustedAngle) * radius;
    const baseY = Math.sin(adjustedAngle) * radius;

    switch (position) {
      case 'left': return { x: baseY, y: baseX };
      case 'top': return { x: baseX, y: baseY };
      case 'right': return { x: -baseY, y: baseX };
      case 'bottom': return { x: baseX, y: -baseY };
      default: return { x: baseX, y: baseY };
    }
  };

  const menuVariants = {
    open: (i: number) => ({
      x: getCircularMenuItemPosition(i).x,
      y: getCircularMenuItemPosition(i).y,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: i * 0.05
      }
    }),
    closed: {
      x: 0,
      y: 0,
      opacity: 0,
      scale: 0.5,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  const pathVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0
    },
    visible: {
      pathLength: 1,
      opacity: 0.5,
      transition: {
        pathLength: { type: "spring", duration: 1.5, bounce: 0 },
        opacity: { duration: 0.2 }
      }
    }
  };

  const current_anchor = useActiveSection(portfolio_menu);

  return (
    <div className="fixed z-50 bottom-7 left-1/2 scr_3:block hidden -translate-x-1/2" ref={containerRef} onMouseMove={handleMouseMove}>
      <AnimatePresence>
        {isOpen && (
          <motion.svg
            className="absolute top-0 left-0 z-10 w-full h-full pointer-events-none"
            initial="hidden"
            animate="visible"
            exit="hidden"
            style={{
              filter: "url(#glow-filter)",
              width: radius * 2 + 50,
              height: radius * 2 + 50,
              top: -radius,
              left: -radius
            }}
          >
            <motion.path
              d={activePath}
              variants={pathVariants}
              stroke="rgba(234, 179, 8, 0.6)"
              strokeWidth="2"
              fill="none"
              strokeDasharray="4,4"
              style={{
                transformOrigin: "center",
                transform: "translate(50%, 50%)"
              }}
            />
          </motion.svg>
        )}
      </AnimatePresence>

      <motion.button
        className="relative flex h-12 w-12 bg-gradient-to-br from-[#18181B] to-[#27272A] items-center justify-center rounded-full text-white shadow-lg overflow-hidden z-50"
        onClick={() => setIsOpen(!isOpen)}
        animate={{
          rotate: isOpen ? 180 : 0,
          scale: isOpen ? 1.05 : 1
        }}
        whileHover={{
          scale: 1.1,
        }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 0.2, 0.7]
          }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 3,
            ease: "easeInOut"
          }}
          style={{
            display: isOpen ? "block" : "none"
          }}
        />

        {isOpen ? <X /> : <Menu />}
      </motion.button>

      <AnimatePresence>
        {portfolio_menu.map((item, i) => (
          <Link key={i} href={item?.endpoint} onClick={() => navigateToSection(item?.endpoint)}>
            <div key={i} className="absolute left-0 top-0 z-40">
              <Popover>
                <PopoverTrigger asChild>
                  <motion.div
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-white shadow-lg overflow-hidden ${current_anchor === item?.endpoint ? 'bg-yellow-500 hover:bg-yellow-500' : 'bg-black dark:bg-zinc-700'}`}
                    custom={i}
                    variants={menuVariants}
                    initial="closed"
                    animate={isOpen ? "open" : "closed"}
                    exit="closed"
                    style={{
                      boxShadow: hoveredIndex === i
                        ? `0 0 15px #eab308`
                        : "0 4px 6px rgba(0, 0, 0, 0.1)"
                    }}
                    whileHover={{
                      scale: 1.15,
                      boxShadow: `0 0 20px #eab308, 0 8px 16px rgba(0, 0, 0, 0.2)`
                    }}
                    whileTap={{ scale: 0.9 }}
                    onHoverStart={() => setHoveredIndex(i)}
                    onHoverEnd={() => setHoveredIndex(null)}
                    onClick={() => {
                      if (containerRef.current) {
                        const ripple = document.createElement('div');
                        ripple.style.position = 'absolute';
                        ripple.style.borderRadius = '50%';
                        ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
                        ripple.style.width = '5px';
                        ripple.style.height = '5px';
                        ripple.style.transform = 'scale(0)';
                        ripple.style.animation = 'ripple-effect 0.6s linear';
                        ripple.style.left = `${getCircularMenuItemPosition(i).x + 6}px`;
                        ripple.style.top = `${getCircularMenuItemPosition(i).y + 6}px`;

                        containerRef.current.appendChild(ripple);

                        setTimeout(() => {
                          ripple.remove();
                        }, 600);
                      }
                      // setIsOpen(false);
                    }}
                  >
                    <motion.div
                      className="absolute inset-0 rounded-full z-0"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 0.3, 0.7]
                      }}
                      transition={{
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 4,
                        ease: "easeInOut",
                        delay: i * 0.2
                      }}
                      style={{
                        opacity: hoveredIndex === i ? 0.7 : 0.3
                      }}
                    />

                    {/* Icon */}
                    <div className="relative z-10">
                      {item.icon}
                    </div>
                  </motion.div>
                </PopoverTrigger>
                <PopoverContent sideOffset={5} side='top' className={`w-max hidden py-1.5 -mr-2 -mt-5 bg-black text-white dark:bg-white dark:text-black`}>
                  <p>{item.tooltip}</p>
                </PopoverContent>
              </Popover>
            </div>
          </Link>
        ))}
      </AnimatePresence>

      <style jsx global>{`
        @keyframes ripple-effect {
          to {
            transform: scale(20);
            opacity: 0;
          }
        }
        
        .tooltip-content {
          backdrop-filter: blur(8px);
          background-color: rgba(15, 23, 42, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </div>
  );
};

export default CircularMenu;