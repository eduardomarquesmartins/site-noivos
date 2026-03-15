import { motion } from "framer-motion";

export interface TimelineEvent {
    time: string;
    title: string;
    description: string;
    icon?: React.ReactNode;
}

interface TimelineProps {
    events: TimelineEvent[];
    containerClass?: string;
    eventContainerClass?: string;
    dotClass?: string;
    lineClass?: string;
    timeClass?: string;
    titleClass?: string;
    descriptionClass?: string;
}

export function Timeline({
    events,
    containerClass = "relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/20 before:to-transparent",
    eventContainerClass = "relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active",
    dotClass = "w-10 h-10 rounded-full border-4 border-black bg-white shadow flex items-center justify-center text-black shrink-0 relative md:mx-auto",
    lineClass = "hidden", // Se não quiser linha animada extra
    timeClass = "font-bold text-sm text-zinc-400 capitalize",
    titleClass = "font-bold text-lg text-white",
    descriptionClass = "text-zinc-500"
}: TimelineProps) {
    return (
        <div className={containerClass}>
            {events.map((event, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className={eventContainerClass}
                >
                    {/* Icon/Dot */}
                    <div className={`flex items-center justify-center ${dotClass}`}>
                        {event.icon}
                    </div>

                    {/* Content Card */}
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] pb-4">
                        <div className={`flex flex-col ${index % 2 === 0 ? "md:items-end justify-end md:text-right" : "md:items-start justify-start md:text-left"} space-y-2`}>
                            <div className={timeClass}>{event.time}</div>
                            <h4 className={titleClass}>{event.title}</h4>
                            <p className={descriptionClass}>{event.description}</p>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
