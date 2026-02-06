import React, { useRef, useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface MenuItemData {
    link: string;
    text: string;
    image: string;
}

interface FlowingMenuProps {
    items?: MenuItemData[];
    speed?: number; // Duration of one loop
    textColor?: string;
    bgColor?: string;
    marqueeBgColor?: string;
    marqueeTextColor?: string;
    borderColor?: string;
}

interface MenuItemProps extends MenuItemData {
    speed: number;
    textColor: string;
    marqueeBgColor: string;
    marqueeTextColor: string;
    borderColor: string;
    isFirst: boolean;
}

const FlowingMenu: React.FC<FlowingMenuProps> = ({
    items = [],
    speed = 15,
    textColor = '#2D3748',
    bgColor = '#fff',
    marqueeBgColor = '#1A9A9A',
    marqueeTextColor = '#fff',
    borderColor = '#e5e7eb'
}) => {
    return (
        <div className="w-full h-full overflow-hidden" style={{ backgroundColor: bgColor }}>
            <nav className="flex flex-col h-full m-0 p-0">
                {items.map((item, idx) => (
                    <MenuItem
                        key={idx}
                        {...item}
                        speed={speed}
                        textColor={textColor}
                        marqueeBgColor={marqueeBgColor}
                        marqueeTextColor={marqueeTextColor}
                        borderColor={borderColor}
                        isFirst={idx === 0}
                    />
                ))}
            </nav>
        </div>
    );
};

const MenuItem: React.FC<MenuItemProps> = ({
    link,
    text,
    image,
    speed,
    textColor,
    marqueeBgColor,
    marqueeTextColor,
    borderColor,
    isFirst
}) => {
    const itemRef = useRef<HTMLDivElement>(null);
    const marqueeControls = useAnimation();
    const marqueeInnerControls = useAnimation();
    const [repetitions, setRepetitions] = useState(4);

    const findClosestEdge = (mouseX: number, mouseY: number, width: number, height: number): 'top' | 'bottom' => {
        const topEdgeDist = Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY, 2);
        const bottomEdgeDist = Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY - height, 2);
        return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom';
    };

    useEffect(() => {
        const calculateRepetitions = () => {
            const viewportWidth = window.innerWidth;
            // Estimate content width or just default to enough repeats
            const contentWidth = 500; // rough estimate
            const needed = Math.ceil(viewportWidth / contentWidth) + 2;
            setRepetitions(Math.max(4, needed));
        };
        calculateRepetitions();
    }, []);

    const handleMouseEnter = (ev: React.MouseEvent<HTMLAnchorElement>) => {
        if (!itemRef.current) return;
        const rect = itemRef.current.getBoundingClientRect();
        const edge = findClosestEdge(ev.clientX - rect.left, ev.clientY - rect.top, rect.width, rect.height);

        const initialY = edge === 'top' ? '-101%' : '101%';
        const insideInitialY = edge === 'top' ? '101%' : '-101%';

        marqueeControls.set({ y: initialY });
        marqueeInnerControls.set({ y: insideInitialY });

        marqueeControls.start({ y: '0%', transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } });
        marqueeInnerControls.start({ y: '0%', transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } });
    };

    const handleMouseLeave = (ev: React.MouseEvent<HTMLAnchorElement>) => {
        if (!itemRef.current) return;
        const rect = itemRef.current.getBoundingClientRect();
        const edge = findClosestEdge(ev.clientX - rect.left, ev.clientY - rect.top, rect.width, rect.height);

        const targetY = edge === 'top' ? '-101%' : '101%';
        const insideTargetY = edge === 'top' ? '101%' : '-101%';

        marqueeControls.start({ y: targetY, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } });
        marqueeInnerControls.start({ y: insideTargetY, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } });
    };

    return (
        <div
            className="flex-1 relative overflow-hidden text-center group"
            ref={itemRef}
            style={{ borderTop: isFirst ? 'none' : `1px solid ${borderColor}` }}
        >
            <a
                className="flex items-center justify-center h-full relative cursor-pointer uppercase no-underline font-semibold text-[4vh]"
                href={link}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{ color: textColor }}
            >
                {text}
            </a>
            <motion.div
                className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none"
                animate={marqueeControls}
                initial={{ y: '101%' }} // Start hidden
                style={{ backgroundColor: marqueeBgColor }}
            >
                <motion.div
                    className="h-full w-fit flex"
                    animate={marqueeInnerControls}
                >
                    <motion.div
                        className="flex items-center h-full"
                        animate={{ x: "-50%" }}
                        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
                    >
                        {[...Array(repetitions * 2)].map((_, idx) => (
                            <div className="marquee-part flex items-center flex-shrink-0" key={idx} style={{ color: marqueeTextColor }}>
                                <span className="whitespace-nowrap uppercase font-normal text-[4vh] leading-[1] px-[1vw]">{text}</span>
                                <div
                                    className="w-[200px] h-[7vh] my-[2em] mx-[2vw] py-[1em] rounded-[50px] bg-cover bg-center"
                                    style={{ backgroundImage: `url(${image})` }}
                                />
                            </div>
                        ))}
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default FlowingMenu;
