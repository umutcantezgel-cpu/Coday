import React from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';

interface TimelineItem {
    week: string;
    title: string;
    description: string;
    completed?: boolean;
}

interface TimelineProps {
    items: TimelineItem[];
    className?: string;
}

const Timeline: React.FC<TimelineProps> = ({ items, className = '' }) => {
    return (
        <div className={`relative py-8 ${className}`}>
            {/* Horizontal line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary/20 via-primary to-primary/20 transform -translate-y-1/2 rounded-full" />

            <div className="flex justify-between items-start relative">
                {items.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.15 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center text-center group cursor-pointer"
                        style={{ width: `${100 / items.length}%` }}
                    >
                        {/* Node */}
                        <div className={`
              relative z-10 w-12 h-12 rounded-full flex items-center justify-center
              transition-all duration-300 group-hover:scale-110
              ${item.completed
                                ? 'bg-primary text-white shadow-lg shadow-primary/30'
                                : 'bg-white border-2 border-primary/30 text-primary group-hover:border-primary'
                            }
            `}>
                            {item.completed ? (
                                <Check size={20} />
                            ) : (
                                <span className="text-sm font-bold">{item.week}</span>
                            )}
                        </div>

                        {/* Content */}
                        <div className="mt-4 px-2">
                            <h4 className="font-bold text-secondary text-sm mb-1 group-hover:text-primary transition-colors">
                                {item.title}
                            </h4>
                            <p className="text-xs text-slate-500 leading-relaxed hidden md:block">
                                {item.description}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Timeline;
