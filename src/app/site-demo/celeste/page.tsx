"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Cloud, MapPin, Check, Sun, X, Gift, Copy, Clock, Heart, Music, Star, Hotel, Scissors, Feather, Info } from "lucide-react";
import { useState } from "react";
import { Timeline } from "@/components/Timeline";
import { Accordion } from "@/components/Accordion";

export default function CelesteTemplate() {
    const [showModal, setShowModal] = useState<"rsvp" | "gifts" | null>(null);
    const [rsvpStatus, setRsvpStatus] = useState<"idle" | "done">("idle");
    const [copied, setCopied] = useState(false);

    const data = {
        couple: "Clara & Lucas",
        date: "04 de Abril de 2026",
        location: "Jardim Botânico, SP",
        story: "Nos encontramos como raios de sol em uma manhã de primavera. Nosso amor sempre foi transparente, iluminado e pacífico. Queremos celebrar essa união em um jardim de cristal, com luz natural e as pessoas mais importantes das nossas vidas em volta da mesma mesa.",
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
        <div className="min-h-screen bg-[#F0F5F2] text-[#2C4A3B] font-serif overflow-x-hidden selection:bg-[#7FB296] selection:text-white">
            <nav className="absolute top-0 w-full p-8 flex justify-between items-center z-10 font-sans tracking-widest text-xs uppercase font-medium text-[#7FB296]">
                <span>C + L</span>
                <span className="opacity-80">04.04.26</span>
                <span>The Glass Garden</span>
            </nav>

            <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2 relative">
                <div className="flex flex-col justify-center px-10 pt-32 lg:p-24 space-y-10 z-10">
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5 }} className="w-16 h-16 rounded-full bg-white/50 backdrop-blur-md shadow-lg border border-white flex items-center justify-center">
                        <Sun size={24} className="text-[#8FB399]" strokeWidth={1.5} />
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}
                        className="text-6xl md:text-8xl font-normal tracking-tight text-[#1A2E24]"
                    >
                        Jardim <br /> Etereo & <br /> Transparente.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                        className="text-xl md:text-2xl font-light text-[#577B68] max-w-sm"
                    >
                        {data.couple} <br /> {data.date}
                    </motion.p>
                </div>

                <div className="relative h-[60vh] lg:h-full p-6 lg:p-12 pl-0 flex items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5, delay: 0.3 }}
                        className="w-full h-[80%] bg-white/30 backdrop-blur-xl rounded-[60px] overflow-hidden relative shadow-2xl shadow-[#7FB296]/20 border border-white/50"
                    >
                        <img src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover opacity-90 transition-transform duration-[2s] hover:scale-105" alt="Celeste Couple" />
                        <div className="absolute inset-0 bg-[#E8F0EA] mix-blend-color opacity-30" />
                    </motion.div>
                </div>
            </section>

            <section className="bg-white text-[#1A2E24] py-40 px-8 relative overflow-hidden text-center rounded-[80px] mt-10 shadow-sm border border-[#E8ECE9]">
                <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-[#E0F0E5] blur-[80px]" />
                <div className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full bg-[#EBF5EF] blur-[80px]" />

                <div className="max-w-3xl mx-auto relative z-10 space-y-12 shrink-0">
                    <Cloud className="mx-auto text-[#7FB296]" size={40} strokeWidth={1} />
                    <h2 className="text-4xl md:text-5xl font-light">Sereno e Claro</h2>
                    <p className="text-xl leading-relaxed font-light opacity-90 text-[#426151]">
                        "{data.story}"
                    </p>
                </div>
            </section>

            <section className="py-40 px-8 max-w-7xl mx-auto">
                <div className="text-center mb-20 space-y-4">
                    <span className="font-sans text-[10px] uppercase font-bold tracking-[0.4em] text-[#7FB296]">Memórias Botânicas</span>
                    <h2 className="text-4xl text-[#1A2E24]">Luz & Sombra</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                    <div className="aspect-[3/4] rounded-t-full rounded-b-[40px] overflow-hidden shadow-lg mt-12 md:mt-24 border-4 border-white">
                        <img src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" alt="Moments" />
                    </div>
                    <div className="aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl z-10 md:-mt-12 scale-105 border-[10px] border-white/50 backdrop-blur-md">
                        <img src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover" alt="Moments" />
                    </div>
                    <div className="aspect-[3/2] rounded-[60px] overflow-hidden shadow-lg mt-12 border-4 border-white">
                        <img src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover" alt="Moments" />
                    </div>
                </div>
            </section>

            {/* Seções complementares removidas (Timeline, Concierge, Padrinhos, FAQ) */}

            <section className="py-32 px-8 bg-transparent">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white/80 backdrop-blur-2xl p-12 md:p-20 rounded-[40px] border border-white shadow-xl text-center space-y-16">
                        <div>
                            <MapPin className="mx-auto text-[#7FB296] mb-6" size={32} strokeWidth={1} />
                            <h3 className="text-3xl font-light mb-4 text-[#1A2E24]">Sob a Estufa</h3>
                            <p className="text-[#577B68] font-light text-lg">
                                Estufa de Vidro - Jardim Botânico, às 10:00h. <br />
                                Brunch a seguir.
                            </p>
                        </div>

                        <div className="h-px bg-gradient-to-r from-transparent via-[#7FB296] to-transparent w-full opacity-20" />

                        <div className="flex flex-col sm:flex-row gap-6 justify-center pt-4">
                            <button
                                onClick={() => setShowModal("rsvp")}
                                className="px-12 py-5 bg-[#1A2E24] text-white font-sans font-medium text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-[#2C4A3B] transition-colors shadow-xl shadow-[#1A2E24]/10"
                            >
                                Confirmar Alegria
                            </button>
                            <button
                                onClick={() => setShowModal("gifts")}
                                className="px-12 py-5 bg-white border border-[#7FB296]/30 text-[#1A2E24] font-sans font-medium text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-[#F0F5F2] transition-colors shadow-sm"
                            >
                                Lista de Sonhos
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <AnimatePresence>
                {showModal === "rsvp" && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-[#F0F5F2]/80 backdrop-blur-xl flex items-center justify-center p-6"
                    >
                        <div className="bg-white max-w-md w-full p-10 rounded-[30px] shadow-2xl border border-white relative text-center">
                            <button onClick={() => setShowModal(null)} className="absolute top-6 right-6 text-[#7FB296] hover:text-[#1A2E24]">
                                <X size={24} />
                            </button>

                            {rsvpStatus === "idle" ? (
                                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="space-y-8 mt-4">
                                    <Sun className="mx-auto text-[#7FB296]" size={32} strokeWidth={1.5} />
                                    <div>
                                        <h3 className="text-3xl font-light text-[#1A2E24] mb-2">Presença</h3>
                                        <p className="text-[#577B68] text-sm">Responda com o coração até 01/03/2026</p>
                                    </div>
                                    <form onSubmit={submitRsvp} className="space-y-4">
                                        <input type="text" placeholder="Nome Completo" className="w-full bg-[#F5F8F6] text-[#1A2E24] border-transparent p-5 rounded-2xl font-sans focus:outline-none focus:ring-2 focus:ring-[#7FB296]/50 transition-colors" required />
                                        <div className="grid grid-cols-2 gap-4">
                                            <input type="number" placeholder="Pessoas" className="w-full bg-[#F5F8F6] text-[#1A2E24] border-transparent p-5 rounded-2xl font-sans focus:outline-none focus:ring-2 focus:ring-[#7FB296]/50 transition-colors" required min="1" />
                                            <select className="w-full bg-[#F5F8F6] text-[#1A2E24] border-transparent p-5 rounded-2xl font-sans focus:outline-none focus:ring-2 focus:ring-[#7FB296]/50 transition-colors appearance-none">
                                                <option>Estarei Lá</option>
                                                <option>Lembrarei de Longe</option>
                                            </select>
                                        </div>
                                        <button className="w-full py-5 bg-[#7FB296] text-white font-sans font-medium uppercase tracking-[0.2em] text-xs rounded-2xl hover:bg-[#689A7E] shadow-lg shadow-[#7FB296]/20 mt-4 transition-all">
                                            Confirmar
                                        </button>
                                    </form>
                                </motion.div>
                            ) : (
                                <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="space-y-6 py-10">
                                    <div className="w-20 h-20 bg-[#E0F0E5] text-[#426151] rounded-full flex items-center justify-center mx-auto">
                                        <Check size={40} strokeWidth={2} />
                                    </div>
                                    <h3 className="text-3xl font-light text-[#1A2E24]">Lindo!</h3>
                                    <p className="text-[#577B68]">Sua presença nos traz ainda mais luz.</p>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                )}

                {showModal === "gifts" && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-[#F0F5F2]/80 backdrop-blur-xl flex items-center justify-center p-6"
                    >
                        <div className="bg-white max-w-xl w-full p-10 rounded-[30px] shadow-2xl border border-white relative text-center max-h-[90vh] overflow-y-auto">
                            <button onClick={() => setShowModal(null)} className="absolute top-6 right-6 text-[#7FB296] hover:text-[#1A2E24]">
                                <X size={24} />
                            </button>

                            <div className="space-y-10 mt-6">
                                <div className="space-y-4">
                                    <h3 className="text-4xl font-light text-[#1A2E24]">Ninhos e Folhas</h3>
                                    <p className="text-[#577B68] text-sm max-w-sm mx-auto">Ajude-nos a mobiliar nossa casa verde. Recebemos carinho instantâneo através do Pix.</p>
                                </div>

                                <div className="p-8 bg-[#F5F8F6] border border-[#E8ECE9] rounded-[24px] space-y-6">
                                    <Gift className="mx-auto text-[#7FB296]" size={32} strokeWidth={1.5} />
                                    <div>
                                        <div className="font-bold font-sans text-sm text-[#7FB296] uppercase tracking-widest mb-1">Móveis de Sacada</div>
                                        <div className="text-3xl text-[#1A2E24] font-light">R$ 1.500,00</div>
                                    </div>
                                    <button
                                        onClick={copyPix}
                                        className={`w-full py-5 rounded-2xl transition-all font-sans font-medium uppercase tracking-widest text-xs flex items-center justify-center gap-2 ${copied ? 'bg-[#7FB296] text-white shadow-lg shadow-[#7FB296]/30' : 'bg-white border border-[#E8ECE9] text-[#2C4A3B] hover:shadow-md'
                                            }`}
                                    >
                                        {copied ? <><Check size={16} /> Copiado com Luz</> : <><Copy size={16} /> Copiar Chave Pix</>}
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

