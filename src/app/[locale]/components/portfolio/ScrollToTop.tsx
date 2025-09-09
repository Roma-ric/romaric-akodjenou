"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > window.innerHeight) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <button
            onClick={() => scrollToTop()}
            className={`fixed ${isVisible ? 'block' : 'hidden'} right-0 bottom-0 p-2 bg-black dark:bg-white rounded-full focus:outline-none focus:ring-0 z-50 m-5`}>
            <ArrowUp className="w-5 h-5 text-white dark:text-black" />
        </button>
    );
};

export default ScrollToTop;
