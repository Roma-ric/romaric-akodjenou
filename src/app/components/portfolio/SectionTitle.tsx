import AdaptiveText, { AdaptiveTextProps } from "./AdaptativeText";

const SectionTitle: React.FC<AdaptiveTextProps & { backgroundText: string }> = ({ text, percentage, backgroundText }) => {
    return (
        <h1 className="text-center text-5xl flex justify-center items-center font-bold mb-4">
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
            <span className="absolute text-9xl scr_2_0:text-[4.75rem] scr_4:text-[4rem] z-40 -mt-1.5 tracking-[0.1rem] pointer-events-none uppercase text-black dark:text-white text-opacity-[0.015] dark:text-opacity-[0.1]">{backgroundText}</span>
        </h1>
    )
}

export default SectionTitle;