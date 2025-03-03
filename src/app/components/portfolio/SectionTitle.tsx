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
            <span className="absolute text-9xl ml-4 z-40 -mt-1.5 tracking-[0.3rem] pointer-events-none uppercase text-white text-opacity-[0.085]">{backgroundText}</span>
        </h1>
    )
}

export default SectionTitle;