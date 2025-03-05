'use client'

import React from 'react';
import SectionTitle from './SectionTitle';
import { Globe, Server, GitBranch, LayoutTemplate, FileText, Computer, PenTool } from 'lucide-react';

const Services = () => {

    const services = [
        {
            label: 'Création d\'applications web',
            icon: <Globe className='w-8 h-8' />,
            description: 'Développement de sites web responsives et interactives utilisant les technologies frontend et backend JavaScript.'
        },
        {
            label: 'Création et utilisation d\'API REST',
            icon: <Server className='w-8 h-8' />,
            description: 'Conception et implémentation d\'interfaces API robustes pour permettre une communication efficace entre différents systèmes.'
        },
        // {
        //     label: 'Maîtrise des outils de versioning Git et GitHub',
        //     icon: <GitBranch className='w-8 h-8' />,
        //     description: 'Gestion de versions de code, collaboration et suivi des modifications avec des pratiques de développement modernes.'
        // },
        {
            label: 'Intégration et utilisation de templates',
            icon: <LayoutTemplate className='w-8 h-8' />,
            description: 'Utilisation et personnalisation de templates pour accélérer le développement et maintenir une cohérence visuelle.'
        },
        {
            label: 'Rédaction de documentation technique',
            icon: <FileText className='w-8 h-8' />,
            description: 'Création de documentation claire et comprehensive pour faciliter la compréhension et la maintenance des applications.'
        },
        // {
        //     label: 'Maîtrise des outils informatiques',
        //     icon: <Computer className='w-8 h-8' />,
        //     description: 'Expertise dans l\'utilisation d\'outils logiciels professionnels comme Microsoft Office et autres applications de productivité.'
        // },
        {
            label: 'Conception d\'affiches publicitaires',
            icon: <PenTool className='w-8 h-8' />,
            description: 'Création de supports visuels attrayants, incluant affiches, cartes de visite, flyers et logos.'
        },
        {
            label: 'Maintenance informatique',
            icon: (
                <svg className='w-8 h-8' data-slot="icon" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path clipRule="evenodd" fillRule="evenodd" d="M12 6.75a5.25 5.25 0 0 1 6.775-5.025.75.75 0 0 1 .313 1.248l-3.32 3.319c.063.475.276.934.641 1.299.365.365.824.578 1.3.64l3.318-3.319a.75.75 0 0 1 1.248.313 5.25 5.25 0 0 1-5.472 6.756c-1.018-.086-1.87.1-2.309.634L7.344 21.3A3.298 3.298 0 1 1 2.7 16.657l8.684-7.151c.533-.44.72-1.291.634-2.309A5.342 5.342 0 0 1 12 6.75ZM4.117 19.125a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Z" />
                    <path d="m10.076 8.64-2.201-2.2V4.874a.75.75 0 0 0-.364-.643l-3.75-2.25a.75.75 0 0 0-.916.113l-.75.75a.75.75 0 0 0-.113.916l2.25 3.75a.75.75 0 0 0 .643.364h1.564l2.062 2.062 1.575-1.297Z" />
                    <path clipRule="evenodd" fillRule="evenodd" d="m12.556 17.329 4.183 4.182a3.375 3.375 0 0 0 4.773-4.773l-3.306-3.305a6.803 6.803 0 0 1-1.53.043c-.394-.034-.682-.006-.867.042a.589.589 0 0 0-.167.063l-3.086 3.748Zm3.414-1.36a.75.75 0 0 1 1.06 0l1.875 1.876a.75.75 0 1 1-1.06 1.06L15.97 17.03a.75.75 0 0 1 0-1.06Z" />
                </svg>
            ),
            description: 'Support technique et maintenance de logiciels pour assurer leur performance et leur fiabilité continues.'
        }
    ];

    return (
        <div className="min-w-[20rem] min-h-screen border-b dark:border-b-stone-800 py-16 bg-transparent flex flex-col overflow-hidden" id='services'>

            <SectionTitle
                text={"SERVICES"}
                percentage={50}
                backgroundText='OFFERINGS'
            />

            <div className='w-[70%] lg-max:w-[80%] grid grid-cols-3 gap-5 mx-auto mt-20'>
                {
                    services?.map((item, index) => (
                        <div key={index} className="rounded-lg h-full w-full p-4 overflow-hidden bg-black dark:bg-white dark:bg-opacity-10 border border-transparent dark:border-white/[0.2] group relative z-20">
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