'use client'

import Link from "next/link";
import { useActiveSection } from "../../hooks/useActiveSection";
import { navigateToSection } from "../../../lib/utils";

export const portfolio_menu = [
    {
        id: 1,
        tooltip: 'HOME',
        endpoint: '#home',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
        )
    },
    {
        id: 2,
        tooltip: 'ABOUT',
        endpoint: '#about',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
        )
    },
    {
        id: 3,
        tooltip: 'SERVICES',
        endpoint: '#services',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} >
                <rect width={7} height={9} x={3} y={3} rx={0} />
                <rect width={7} height={5} x={14} y={3} rx={0} />
                <rect width={7} height={9} x={14} y={12} rx={0} />
                <rect width={7} height={5} x={3} y={16} rx={0} />
            </svg>
        )
    },
    {
        id: 4,
        tooltip: 'PROJECTS',
        endpoint: '#projects',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        )
    },
    {
        id: 5,
        tooltip: 'CONTACT',
        endpoint: '#contact',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        )
    },
    {
        id: 6,
        tooltip: 'BLOG',
        endpoint: '#blog',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
        )
    }
];

const Menu = () => {

    let current_anchor = useActiveSection(portfolio_menu);

    return (
        <div className="fixed scr_3:hidden right-4 top-1/2 -translate-y-1/2 flex flex-col items-end gap-4 z-50">
            {portfolio_menu.sort((a, b) => a.id - b.id).map((item, index) => (
                <Link key={index} href={item?.endpoint} onClick={() => navigateToSection(item?.endpoint)}>
                    <div className={`group w-max transform transition-transform duration-300 hover:-translate-y-1 ${current_anchor === item?.endpoint ? 'bg-yellow-500 hover:bg-yellow-500' : 'bg-black dark:bg-zinc-700'} flex justify-end items-center hover:bg-yellow-500 dark:hover:bg-yellow-500 p-3.5 rounded-full cursor-pointer`}>
                        <span className="hidden group-hover:inline-block mr-4 text-white"> {item?.tooltip} </span>
                        {item?.icon}
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default Menu;
