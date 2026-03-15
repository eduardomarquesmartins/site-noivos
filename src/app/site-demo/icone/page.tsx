"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Coffee, MapPin, Feather, Check, Clock, X, Gift, Copy, Building, Heart, Music, Star, Hotel, Scissors, Info, Wine } from "lucide-react";
import { useState } from "react";
import { Timeline } from "@/components/Timeline";
import { Accordion } from "@/components/Accordion";

export default function IconeTemplate() {
    const [showModal, setShowModal] = useState<"rsvp" | "gifts" | null>(null);
    const [rsvpStatus, setRsvpStatus] = useState<"idle" | "done">("idle");
    const [copied, setCopied] = useState(false);

    const data = {
        couple: "Antonella & Matteo",
        date: "10 de Maio de 2026",
        location: "Villa Toscana, Itália",
        story: "Entre vinhos e vielas antigas, nossos caminhos se cruzaram sob o sol da Toscana. Nosso casamento é uma homenagem à arte romana, aos sabores da Itália e à eternidade do nosso compromisso.",
    };

    const submitRsvp = (e: React.FormEvent) => {
        e.preventDefault();
        setRsvpStatus("done");
        setTimeout(() => {
            setShowModal(null);
            setRsvpStatus("idle");
        }, 3000);
    };

    const copyPix = () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-[#FFFDF9] text-[#4A2C21] font-serif overflow-x-hidden selection:bg-[#CF7854] selection:text-white border-8 border-[#F3E6D5]">

            <nav className="absolute top-0 w-full p-8 flex justify-between items-center z-10 font-sans tracking-widest text-[10px] uppercase font-bold text-[#8B5640]">
                <span>A & M</span>
                <span className="opacity-70 border-b border-[#8B5640]/30 pb-1">Maggio 2026</span>
                <span>L'Eternità</span>
            </nav>

            <section className="min-h-screen flex flex-col items-center justify-center relative pt-20">
                <div className="absolute inset-0 z-0 flex justify-center opacity-[0.03] pointer-events-none">
                    <img src="https://images.unsplash.com/photo-1549488344-c1fb848bd013?auto=format&fit=crop&q=80" className="w-full h-full object-cover" alt="Texture" />
                </div>

                <div className="text-center z-10 space-y-8 mt-10">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="mx-auto w-12 h-12 flex items-center justify-center border border-[#CF7854] rounded-sm rotate-45 mb-6">
                        <Building size={20} className="text-[#CF7854] -rotate-45" strokeWidth={1} />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5, delay: 0.2 }}
                        className="text-7xl md:text-9xl font-normal leading-none tracking-tight text-[#3A2219]"
                    >
                        Palazzo <br /> Italiano.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                        className="text-sm md:text-base font-sans tracking-[0.3em] uppercase text-[#8B5640] max-w-sm mx-auto pt-6"
                    >
                        {data.couple} <br /> {data.date}
                    </motion.p>
                </div>

                <div className="w-full max-w-5xl mx-auto h-[50vh] mt-16 px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5, delay: 0.3 }}
                        className="w-full h-full bg-[#EADDD0] overflow-hidden relative shadow-2xl rounded-t-[200px]"
                    >
                        <img src="https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover opacity-90 transition-transform duration-[3s] hover:scale-105 saturate-50 sepia-[.2]" alt="Palazzo Couple" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#3A2219]/60 to-transparent" />
                    </motion.div>
                </div>
            </section>

            <section className="bg-[#3A2219] text-[#F3E6D5] py-40 px-8 relative overflow-hidden text-center mt-32">
                <div className="max-w-3xl mx-auto relative z-10 space-y-12 shrink-0">
                    <Coffee className="mx-auto text-[#CF7854]" size={40} strokeWidth={1} />
                    <h2 className="text-4xl md:text-5xl font-normal uppercase tracking-widest text-[#CF7854]">La Nostra Storia</h2>
                    <p className="text-xl leading-relaxed font-light opacity-90 max-w-2xl mx-auto">
                        "{data.story}"
                    </p>
                </div>
            </section>

            <section className="py-40 px-8 max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div>
                        <img src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=800" className="w-full rounded-t-full shadow-2xl saturate-50 sepia-[.1]" alt="Tuscany" />
                    </div>
                    <div className="space-y-10 order-first md:order-last text-center md:text-left">
                        <span className="font-sans text-xs uppercase font-bold tracking-[0.4em] text-[#CF7854]">O Cenário</span>
                        <h2 className="text-5xl text-[#3A2219] leading-tight">Arquitetura de <br /> uma Vida Inteira.</h2>
                        <p className="text-[#8B5640] max-w-md mx-auto md:mx-0 font-light text-lg">
                            Cercados por muralhas seculares e jardins renascentistas, celebramos o amor clássico em sua forma mais pura.
                        </p>
                        <div className="w-24 border-b border-[#CF7854] mx-auto md:mx-0" />
                    </div>
                </div>
            </section>
            
            {/* Seções complementares removidas (Timeline, Concierge, Padrinhos, FAQ) */}

            <section className="py-32 px-8 bg-[#F3E6D5] mt-16">
                <div className="max-w-3xl mx-auto rounded-[80px] border border-[#CF7854]/30 bg-[#FFFDF9] shadow-2xl">
                    <div className="p-16 md:p-24 text-center space-y-12">
                        <div>
                            <MapPin className="mx-auto text-[#CF7854] mb-6" size={32} strokeWidth={1} />
                            <h3 className="text-3xl uppercase tracking-widest mb-4 text-[#3A2219]">Cerimônia</h3>
                            <p className="text-[#8B5640] font-light text-xl">
                                Villa Toscana <br />
                                16:00 PM
                            </p>
                        </div>

                        <div className="h-px bg-[#CF7854]/20 w-32 mx-auto" />

                        <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
                            <button
                                onClick={() => setShowModal("rsvp")}
                                className="px-12 py-5 bg-[#CF7854] text-white font-sans font-bold text-xs uppercase tracking-[0.2em] hover:bg-[#A65B3D] transition-colors shadow-lg shadow-[#CF7854]/30 rounded-none border border-[#CF7854]"
                            >
                                Presenza (RSVP)
                            </button>
                            <button
                                onClick={() => setShowModal("gifts")}
                                className="px-12 py-5 border border-[#3A2219] text-[#3A2219] font-sans font-bold text-xs uppercase tracking-[0.2em] hover:bg-[#3A2219] hover:text-[#FFFDF9] transition-colors rounded-none"
                            >
                                Regali (Lista)
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <AnimatePresence>
                {showModal === "rsvp" && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-[#3A2219]/90 backdrop-blur-md flex items-center justify-center p-6"
                    >
                        <div className="bg-[#FFFDF9] max-w-md w-full p-10 shadow-2xl border border-[#CF7854]/20 relative text-center">
                            <button onClick={() => setShowModal(null)} className="absolute top-6 right-6 text-[#CF7854] hover:text-[#3A2219]">
                                <X size={24} />
                            </button>

                            {rsvpStatus === "idle" ? (
                                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="space-y-8 mt-4">
                                    <h3 className="text-3xl uppercase tracking-widest text-[#3A2219] mb-2">Conferma</h3>
                                    <form onSubmit={submitRsvp} className="space-y-4">
                                        <input type="text" placeholder="Nome ed Cognome" className="w-full bg-[#F3E6D5] text-[#3A2219] border border-transparent p-5 font-sans focus:outline-none focus:border-[#CF7854] transition-colors uppercase text-sm" required />
                                        <div className="grid grid-cols-2 gap-4">
                                            <input type="number" placeholder="Totale" className="w-full bg-[#F3E6D5] text-[#3A2219] border border-transparent p-5 font-sans focus:outline-none focus:border-[#CF7854] transition-colors" required min="1" />
                                            <select className="w-full bg-[#F3E6D5] text-[#3A2219] border border-transparent p-5 font-sans focus:outline-none focus:border-[#CF7854] transition-colors appearance-none uppercase text-sm">
                                                <option>Accetto</option>
                                                <option>Declino</option>
                                            </select>
                                        </div>
                                        <button className="w-full py-5 bg-[#3A2219] text-[#F3E6D5] font-sans font-bold uppercase tracking-[0.2em] text-xs hover:bg-[#CF7854] shadow-lg mt-4 transition-all">
                                            Inviare
                                        </button>
                                    </form>
                                </motion.div>
                            ) : (
                                <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="space-y-6 py-10">
                                    <div className="w-20 h-20 bg-[#CF7854]/10 text-[#CF7854] rounded-full flex items-center justify-center mx-auto border border-[#CF7854]">
                                        <Check size={40} strokeWidth={2} />
                                    </div>
                                    <h3 className="text-3xl tracking-widest uppercase text-[#3A2219]">Magnifico!</h3>
                                    <p className="text-[#8B5640]">Ci vediamo in Italia.</p>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                )}

                {showModal === "gifts" && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-[#3A2219]/90 backdrop-blur-md flex items-center justify-center p-6"
                    >
                        <div className="bg-[#FFFDF9] max-w-xl w-full p-10 shadow-2xl border border-[#CF7854]/20 relative text-center max-h-[90vh] overflow-y-auto">
                            <button onClick={() => setShowModal(null)} className="absolute top-6 right-6 text-[#CF7854] hover:text-[#3A2219]">
                                <X size={24} />
                            </button>

                            <div className="space-y-10 mt-6">
                                <div className="space-y-4">
                                    <h3 className="text-4xl uppercase tracking-widest text-[#3A2219]">La Dolce Vita</h3>
                                    <p className="text-[#8B5640] text-sm max-w-sm mx-auto">La tua presenza è il più bel regalo. Ma se lo desideri, puoi contribuire al nostro nido d'amore via Pix.</p>
                                </div>

                                <div className="p-8 bg-[#F3E6D5] border border-[#CF7854]/20 space-y-6">
                                    <Gift className="mx-auto text-[#CF7854]" size={32} strokeWidth={1} />
                                    <div>
                                        <div className="font-bold font-sans text-sm text-[#8B5640] uppercase tracking-widest mb-1">Cota Mobiliario</div>
                                        <div className="text-3xl text-[#3A2219] font-light">R$ 1.200,00</div>
                                    </div>
                                    <button
                                        onClick={copyPix}
                                        className={`w-full py-5 border transition-all font-sans font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 ${copied ? 'bg-[#CF7854] border-[#CF7854] text-white shadow-lg' : 'border-[#3A2219] text-[#3A2219] hover:bg-[#3A2219] hover:text-[#F3E6D5]'
                                            }`}
                                    >
                                        {copied ? <><Check size={16} /> Copiato con amore</> : <><Copy size={16} /> Pix Copia e Incolla</>}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div >
    );
}

