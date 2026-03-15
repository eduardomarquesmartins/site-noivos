import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export interface AccordionItem {
    id: string;
    title: string;
    content: string;
}

interface AccordionProps {
    items: AccordionItem[];
    containerClass?: string;
    itemClass?: string;
    titleClass?: string;
    contentClass?: string;
    iconClass?: string;
}

export function Accordion({
    items,
    containerClass = "space-y-4",
    itemClass = "border-b border-white/10",
    titleClass = "py-4 text-lg font-medium",
    contentClass = "pb-4 text-zinc-400 font-light",
    iconClass = "text-white"
}: AccordionProps) {
    const [openId, setOpenId] = useState<string | null>(null);

    const toggle = (id: string) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <div className={containerClass}>
            {items.map((item) => {
                const isOpen = openId === item.id;
                return (
                    <div key={item.id} className={itemClass}>
                        <button
                            onClick={() => toggle(item.id)}
                            className={`w-full flex justify-between items-center text-left ${titleClass}`}
                        >
                            <span>{item.title}</span>
                            <motion.div
                                animate={{ rotate: isOpen ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <ChevronDown className={iconClass} size={20} />
                            </motion.div>
                        </button>
                        <AnimatePresence>
                            {isOpen && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden"
                                >
                                    <div className={contentClass}>{item.content}</div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                );
            })}
        </div>
    );
}
