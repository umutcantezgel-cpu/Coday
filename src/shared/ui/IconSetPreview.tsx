import React from 'react';
import { cn } from '@/shared/lib/utils';
import { motion } from 'motion/react';

interface IconSetPreviewProps {
    title: string;
    description: string;
    icons: { name: string; icon: React.ElementType }[];
    className?: string;
}

export const IconSetPreview: React.FC<IconSetPreviewProps> = ({
    title,
    description,
    icons,
    className
}) => {
    return (
        <div className={cn("p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/50 backdrop-blur-sm", className)}>
            <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                <p className="text-zinc-400 text-sm">{description}</p>
            </div>

            <div className="grid grid-cols-4 gap-4">
                {icons.map(({ name, icon: Icon }) => (
                    <motion.div
                        key={name}
                        whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.05)' }}
                        className="flex flex-col items-center justify-center p-4 rounded-xl border border-zinc-800/50 bg-zinc-950/30 transition-colors"
                    >
                        <Icon className="w-8 h-8 text-primary mb-3" />
                        <span className="text-xs text-zinc-500 font-medium text-center break-all">
                            {name}
                        </span>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
