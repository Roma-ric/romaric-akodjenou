'use client'

export interface SkillProps{
    name: string;
    logo: React.ReactNode
}

const SkillCard: React.FC<SkillProps> = ({ name, logo }) => {
    return (
        <div className="bg-black dark:bg-white dark:border-white/[0.2] dark:bg-opacity-10 border border-transparent z-30 rounded-2xl flex flex-col items-center justify-center p-4 text-center transform transition-transform duration-300 hover:-translate-y-2">
            <div className="rounded-xl w-20 z-40 h-20 flex items-center justify-center mb-4 text-yellow-400">
                {logo}
            </div>
            <h3 className="text-lg font-medium text-white">{name}</h3>
        </div>
    )
}

export default SkillCard;