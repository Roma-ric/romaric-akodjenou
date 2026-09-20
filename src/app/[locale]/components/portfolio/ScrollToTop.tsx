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
            className={`fixed ${isVisible ? 'block' : 'hidden'} right-0 bottom-0 p-2 bg-foreground text-background brutal-border brutal-shadow-sm brutal-interactive rounded-none focus:outline-none focus-visible:ring-2 focus-visible:ring-accent z-50 m-5`}>
            <ArrowUp className="w-5 h-5" />
        </button>
    );
};

export default ScrollToTop;
