'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../../src/lib/utils';

interface AnimatedButtonProps {
    title: string;
    icon: React.ReactNode;
    anchor: string;
    className?: string;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
    title,
    icon,
    anchor,
    className = ""
}) => {
    const [isHovered, setIsHovered] = React.useState(false);

    const handleHoverStart = () => setIsHovered(true);
    const handleHoverEnd = () => setIsHovered(false);

    return (
        <motion.button
            className={cn(
                "flex items-center justify-center rounded-full transition-colors", 
                isHovered ? "bg-yellow-500" : "bg-black",
                className
            )}
            onClick={() => {
                const element = document.getElementById(anchor);
                element?.scrollIntoView({ behavior: "smooth" });
            }}
            onHoverStart={handleHoverStart}
            onHoverEnd={handleHoverEnd}
            initial={false}
            animate={{
                width: isHovered ? "auto" : "48px",
                height: "48px",
                paddingLeft: isHovered ? "12px" : "0px",
                paddingRight: isHovered ? "12px" : "0px",
            }}
            transition={{
                duration: 0.2,
                ease: "easeInOut"
            }}
        >
            <motion.span
                className="font-bold text-sm whitespace-nowrap overflow-hidden uppercase text-white"
                initial={false}
                animate={{
                    opacity: isHovered ? 1 : 0,
                    width: isHovered ? "auto" : 0,
                    marginLeft: isHovered ? "8px" : 0,
                }}
                transition={{
                    duration: 0.2,
                    ease: "easeInOut"
                }}
            >
                {title}
            </motion.span>
            <div className="flex items-center justify-center w-6 h-6 flex-shrink-0">
                {icon}
            </div>
        </motion.button>
    );
};

export default AnimatedButton;