import AdaptiveText, { AdaptiveTextProps } from "./AdaptativeText";

const SectionTitle: React.FC<AdaptiveTextProps> = ({ text, percentage }) => {
    return (
        <h1 className="text-center text-5xl flex justify-center items-center font-bold mb-4">
            <span className="mr-4 -mt-1.5 text-yellow-500">—</span>
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
            <span className="ml-4 -mt-1.5 text-yellow-500">—</span>
        </h1>
    )
}

export default SectionTitle;