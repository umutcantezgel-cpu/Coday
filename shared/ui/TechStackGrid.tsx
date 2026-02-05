import React from 'react';
import { motion } from 'motion/react';

interface TechItem {
    name: string;
    icon: string; // URL or emoji
    description: string;
    color?: string;
}

interface TechStackGridProps {
    items: TechItem[];
    className?: string;
}

const TechStackGrid: React.FC<TechStackGridProps> = ({ items, className = '' }) => {
    return (
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 ${className}`}>
            {items.map((item, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="group relative bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all cursor-pointer overflow-hidden"
                >
                    {/* Background glow */}
                    <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity"
                        style={{ backgroundColor: item.color || '#1A9A9A' }}
                    />

                    {/* Icon */}
                    <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                        {item.icon.startsWith('http') ? (
                            <img src={item.icon} alt={item.name} className="w-10 h-10 object-contain" />
                        ) : (
                            <span>{item.icon}</span>
                        )}
                    </div>

                    {/* Name */}
                    <h4 className="font-bold text-secondary text-sm mb-1 group-hover:text-primary transition-colors">
                        {item.name}
                    </h4>

                    {/* Description (tooltip on hover) */}
                    <p className="text-xs text-slate-500 line-clamp-2">
                        {item.description}
                    </p>
                </motion.div>
            ))}
        </div>
    );
};

export default TechStackGrid;
