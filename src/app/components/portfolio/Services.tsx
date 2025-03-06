'use client'

import React from 'react';
import SectionTitle from './SectionTitle';
import { Globe, Server, GitBranch, LayoutTemplate, FileText, Computer, PenTool } from 'lucide-react';

const Services = () => {

    const services = [
        {
            label: 'Web Application Development',
            icon: <Globe className='w-8 h-8' />,
            description: 'Development of responsive and interactive websites using both frontend and backend JavaScript technologies.'
        },
        {
            label: 'Creation and Use of REST APIs',
            icon: <Server className='w-8 h-8' />,
            description: 'Design and implementation of robust API interfaces to enable efficient communication between different systems.'
        },
        {
            label: 'Template Integration and Usage',
            icon: <LayoutTemplate className='w-8 h-8' />,
            description: 'Use and customization of templates to speed up development and maintain visual consistency.'
        },
        {
            label: 'Technical Documentation Writing',
            icon: <FileText className='w-8 h-8' />,
            description: 'Creation of clear and comprehensive documentation to facilitate understanding and maintenance of applications.'
        },
        {
            label: 'Advertising Poster Design',
            icon: <PenTool className='w-8 h-8' />,
            description: 'Creation of attractive visual materials, including posters, business cards, flyers, and logos.'
        },
        {
            label: 'IT Maintenance',
            icon: (
                <svg className='w-8 h-8' data-slot="icon" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path clipRule="evenodd" fillRule="evenodd" d="M12 6.75a5.25 5.25 0 0 1 6.775-5.025.75.75 0 0 1 .313 1.248l-3.32 3.319c.063.475.276.934.641 1.299.365.365.824.578 1.3.64l3.318-3.319a.75.75 0 0 1 1.248.313 5.25 5.25 0 0 1-5.472 6.756c-1.018-.086-1.87.1-2.309.634L7.344 21.3A3.298 3.298 0 1 1 2.7 16.657l8.684-7.151c.533-.44.72-1.291.634-2.309A5.342 5.342 0 0 1 12 6.75ZM4.117 19.125a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Z" />
                    <path d="m10.076 8.64-2.201-2.2V4.874a.75.75 0 0 0-.364-.643l-3.75-2.25a.75.75 0 0 0-.916.113l-.75.75a.75.75 0 0 0-.113.916l2.25 3.75a.75.75 0 0 0 .643.364h1.564l2.062 2.062 1.575-1.297Z" />
                    <path clipRule="evenodd" fillRule="evenodd" d="m12.556 17.329 4.183 4.182a3.375 3.375 0 0 0 4.773-4.773l-3.306-3.305a6.803 6.803 0 0 1-1.53.043c-.394-.034-.682-.006-.867.042a.589.589 0 0 0-.167.063l-3.086 3.748Zm3.414-1.36a.75.75 0 0 1 1.06 0l1.875 1.876a.75.75 0 1 1-1.06 1.06L15.97 17.03a.75.75 0 0 1 0-1.06Z" />
                </svg>
            ),
            description: 'Technical support and maintenance of software to ensure continuous performance and reliability.'
        }
    ];

    return (
        <div className=" min-h-screen  py-16 bg-transparent flex flex-col overflow-hidden" id='services'>

            <SectionTitle
                text={"SERVICES"}
                percentage={50}
                backgroundText='OFFERINGS'
            />

            <div className='w-[70%] scr_2_2:w-[88%] scr_4:w-[95%] px-3 grid grid-cols-3 scr_2:grid-cols-2 scr_3_0:grid-cols-1 gap-5 mx-auto mt-20'>
                {
                    services?.map((item, index) => (
                        <div key={index} className="rounded-lg h-full w-full p-4 overflow-hidden bg-black/[0.8] dark:bg-white dark:bg-opacity-10 border border-transparent dark:border-white/[0.2] group relative z-20">
                            <div className="relative z-50">
                                <div className="p-4">
                                    <div className='relative w-max'>
                                        <div className='bg-yellow-500/[0.4] z-30 text-yellow-500 p-2.5 w-max rounded-md'>
                                            {item?.icon}
                                        </div>
                                        <div className='absolute top-0 bg-white/[0.1] group-hover:skew-x-0  transform transition-transform duration-300 scale-105 group-hover:scale-100 group-hover:skew-y-0 -skew-x-12 group-hover:mx-0 group-hover:mt-0 mx-1 -mt-2 skew-y-12 z-20 p-2.5 w-max rounded-md'>
                                            <div className='opacity-0'>
                                                {item?.icon}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='mt-3'>
                                        <h2 className="text-xl font-bold text-white dark:text-white/[0.8] mb-2"> {item?.label}  </h2>
                                        <p className='text-white'>
                                            {item?.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>

        </div>
    );
};

export default Services;