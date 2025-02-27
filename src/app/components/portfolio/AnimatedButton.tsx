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
    return (
        <motion.div
            className={cn(`relative w-40 h-12 overflow-hidden flex items-center`, className)}
            initial={{ width: "auto" }}
            whileHover={{ width: 160 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onClick={() => {
                const element = document.getElementById(anchor);
                element?.scrollIntoView({ behavior: "smooth" });
            }
            }
        >
            <motion.div
                className="flex items-center justify-between bg-black dark:bg-yellow text-white rounded-full px-5 py-2 w-full h-full"
                layout
            >
                <motion.span
                    className="font-bold text-base"
                    layout
                >
                    {title}
                </motion.span>

                <motion.div
                    className="bg-black dark:bg-white rounded-full p-1.5 flex items-center justify-center"
                    layout
                >
                    {icon}
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default AnimatedButton;