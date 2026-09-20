'use client'

export interface SkillProps{
    name: string;
    logo: React.ReactNode
}

const SkillCard: React.FC<SkillProps> = ({ name, logo }) => {
    return (
        <div className="brutal-card brutal-interactive z-30 rounded-none flex flex-col items-center justify-center p-4 text-center">
            <div className="rounded-none w-20 z-40 h-20 flex items-center justify-center mb-4 text-accent">
                {logo}
            </div>
            <h3 className="text-lg font-display font-medium text-card-foreground">{name}</h3>
        </div>
    )
}

export default SkillCard;