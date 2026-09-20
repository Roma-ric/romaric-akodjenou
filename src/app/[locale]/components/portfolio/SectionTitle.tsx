import AdaptiveText, { AdaptiveTextProps } from "./AdaptativeText";

const SectionTitle: React.FC<AdaptiveTextProps & { backgroundText: string; number: string }> = ({ text, percentage, backgroundText, number }) => {
    return (
        <div className="text-center relative flex flex-col justify-center items-center mb-4">
            <div className="brutal-kicker mb-6">
                <span>N°{number}</span>
                <span aria-hidden="true">—</span>
                <span>{backgroundText}</span>
            </div>
            <h1 className="relative text-5xl flex flex-col justify-center items-center font-bold">
                <div className='hidden dark:flex font-bold max-w-[15rem] justify-center mx-1'>
                    <AdaptiveText
                        text={text}
                        percentage={percentage}
                    />
                </div> {''}
                <div className='flex dark:hidden font-bold max-w-[15rem] justify-center mx-1'>
                    <AdaptiveText
                        text={text}
                        percentage={percentage}
                    />
                </div> {''}
                <span className="absolute text-9xl scr_2_0:text-[4.75rem] scr_4:text-[4rem] z-40 -mt-[0.5rem] tracking-[0.1rem] pointer-events-none uppercase text-black dark:text-white text-opacity-[0.035] dark:text-opacity-[0.1]">{backgroundText}</span>
            </h1>
        </div>
    )
}

export default SectionTitle;