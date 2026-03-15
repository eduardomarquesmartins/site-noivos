"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Link, Check, Square, Diamond, Terminal, Shield, MoveRight, Clock, Star, MapPin, Building, Info, User, X } from "lucide-react";
import { useState } from "react";
import { Timeline } from "@/components/Timeline";
import { Accordion } from "@/components/Accordion";

export default function VanguardaTemplate() {
    const [showModal, setShowModal] = useState<"rsvp" | "gifts" | null>(null);
    const [rsvpStatus, setRsvpStatus] = useState<"idle" | "done">("idle");
    const [copied, setCopied] = useState(false);

    const data = {
        couple: "Sofia & Marcos",
        date: "22  10  2026",
        location: "Galeria de Arte, SP",
        story: "Nossa história não é um romance clássico, é um manifesto. Encontramos um no outro o mesmo olhar subversivo e o desejo de construir algo novo. Vamos celebrar o amor de forma crua, brutal, mas infinitamente bela.",
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
        <div className="min-h-screen bg-[#050505] text-white font-sans overflow-x-hidden selection:bg-white selection:text-black">
            <nav className="absolute top-0 w-full p-8 flex justify-between items-center z-10 font-mono tracking-widest text-xs uppercase font-bold text-zinc-500">
                <span>[ S / M ]</span>
                <span className="opacity-50">#22.10.26</span>
                <span>INITSEQ</span>
            </nav>

            <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2 relative overflow-hidden">
                <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 whitespace-nowrap opacity-5 pointer-events-none select-none z-0 overflow-hidden flex">
                    <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} className="text-[20rem] font-black uppercase tracking-tighter">
                        FUTURO NOIR FUTURO NOIR FUTURO NOIR
                    </motion.div>
                </div>
                <div className="flex flex-col justify-center px-10 pt-32 lg:p-24 space-y-10 z-10 relative">
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5 }} className="w-16 h-16 border border-white/30 flex items-center justify-center bg-transparent backdrop-blur-md">
                        <Square size={20} className="text-white" strokeWidth={1} />
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.2 }}
                        className="text-7xl md:text-9xl font-black uppercase tracking-tighter text-white leading-[0.85]"
                    >
                        Futuro <br /> Noir.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                        className="text-xl md:text-2xl font-mono text-zinc-500 max-w-sm uppercase tracking-widest"
                    >
                        {data.couple} <br /> <span className="text-white mt-2 block">{data.date}</span>
                    </motion.p>
                </div>

                <div className="relative h-[60vh] lg:h-full p-6 lg:p-12 pl-0">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5, delay: 0.3 }}
                        className="w-full h-full bg-[#111111] overflow-hidden relative shadow-2xl border-l-4 border-b-4 border-zinc-800"
                    >
                        <img src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover opacity-60 mix-blend-luminosity transition-transform duration-[2s] hover:scale-110" alt="Vanguarda Couple" />
                        <div className="absolute inset-0 bg-black/40 mix-blend-overlay" />
                    </motion.div>
                </div>
            </section>

            <section className="bg-white text-black py-40 px-8 relative overflow-hidden text-center mix-blend-difference">
                <div className="max-w-3xl mx-auto relative z-10 space-y-12 shrink-0">
                    <Square className="mx-auto text-black" size={40} strokeWidth={2} />
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">O MANIFESTO</h2>
                    <p className="text-xl leading-relaxed font-mono opacity-80 uppercase">
                        {data.story}
                    </p>
                </div>
            </section>

            <section className="py-40 px-8 max-w-[1400px] mx-auto relative mt-20">
                <div className="absolute top-0 right-0 w-px h-[200px] bg-gradient-to-b from-white to-transparent opacity-30" />
                <div className="text-left mb-20 space-y-4 max-w-2xl">
                    <span className="font-mono text-[10px] uppercase font-bold tracking-[0.4em] text-zinc-500 bg-zinc-900 px-4 py-2">EXPOSIÇÃO /// 01</span>
                    <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white mt-6">REPERTÓRIO VISUAL</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                    <div className="md:col-span-5 aspect-[3/4] overflow-hidden shadow-xl md:mt-12 border-4 border-zinc-900 group">
                        <img src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover grayscale opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-[3s]" alt="Casal Noir 1" />
                    </div>
                    <div className="md:col-span-4 aspect-[4/5] overflow-hidden shadow-2xl z-10 md:-mt-32 border-8 border-white group">
                        <img src="https://images.unsplash.com/photo-1532413992378-f169ac26fff0?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover grayscale group-hover:scale-105 transition-all duration-[3s]" alt="Casal Noir 2" />
                    </div>
                    <div className="md:col-span-3 aspect-square overflow-hidden shadow-xl md:mt-40 border-l border-b border-zinc-800 p-2 group bg-zinc-950">
                        <img src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover grayscale opacity-60 group-hover:scale-105 group-hover:opacity-100 transition-all duration-[3s]" alt="Casal Noir 3" />
                    </div>
                </div>
            </section>

            {/* Seções complementares removidas (Timeline, Concierge, Padrinhos, FAQ) */}

            <section className="py-32 px-8 bg-zinc-950 border-t border-zinc-900">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-[#0A0A0A] p-12 md:p-20 border border-zinc-800 shadow-2xl text-center space-y-16">
                        <div>
                            <Diamond className="mx-auto text-white mb-6" size={32} strokeWidth={1} />
                            <h3 className="text-3xl font-black uppercase tracking-tighter mb-4 text-white">PROTOCOLO DE ACESSO</h3>
                            <p className="text-zinc-500 font-mono text-sm uppercase">
                                INIT: Galeria de Arte, 19:00H. <br />
                                DRESS CODE: STRICTLY BLACK.
                            </p>
                        </div>

                        <div className="h-px bg-zinc-800 w-32 mx-auto" />

                        <h2 className="text-4xl text-white font-black uppercase tracking-tighter">CONFIRMAÇÃO NECESSÁRIA</h2>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center pt-4">
                            <button
                                onClick={() => setShowModal("rsvp")}
                                className="px-12 py-5 bg-white text-black font-sans font-black text-xs uppercase tracking-[0.2em] hover:bg-zinc-200 transition-colors shadow-xl"
                            >
                                AUTENTICAR PRESENÇA
                            </button>
                            <button
                                onClick={() => setShowModal("gifts")}
                                className="px-12 py-5 border-2 border-zinc-600 text-zinc-300 font-sans font-bold text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-colors"
                            >
                                TRANSMITIR COTA
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <AnimatePresence>
                {showModal === "rsvp" && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-6"
                    >
                        <div className="bg-[#050505] max-w-md w-full p-10 shadow-2xl border border-zinc-800 relative text-center">
                            <button onClick={() => setShowModal(null)} className="absolute top-6 right-6 text-zinc-500 hover:text-white">
                                <X size={24} />
                            </button>

                            {rsvpStatus === "idle" ? (
                                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="space-y-8 mt-4">
                                    <Terminal className="mx-auto text-white" size={32} strokeWidth={1} />
                                    <div>
                                        <h3 className="text-3xl font-black uppercase text-white mb-2 tracking-tighter">RSVP</h3>
                                        <p className="text-zinc-500 font-mono text-xs">DEADLINE: 01.10.2026</p>
                                    </div>
                                    <form onSubmit={submitRsvp} className="space-y-4">
                                        <input type="text" placeholder="IDENTITY (NOME)" className="w-full bg-transparent text-white border border-zinc-700 p-5 font-mono text-sm focus:outline-none focus:border-white transition-colors uppercase" required />
                                        <div className="grid grid-cols-2 gap-4">
                                            <input type="number" placeholder="QTDE" className="w-full bg-transparent text-white border border-zinc-700 p-5 font-mono text-sm focus:outline-none focus:border-white transition-colors" required min="1" />
                                            <select className="w-full bg-transparent text-white border border-zinc-700 p-5 font-mono text-sm focus:outline-none focus:border-white transition-colors appearance-none uppercase">
                                                <option className="bg-black text-white">CONFIRMADO</option>
                                                <option className="bg-black text-white">NEGADO</option>
                                            </select>
                                        </div>
                                        <button className="w-full py-5 bg-white text-black font-black uppercase tracking-[0.2em] text-xs hover:bg-zinc-200 mt-4 transition-all">
                                            EXECUTE
                                        </button>
                                    </form>
                                </motion.div>
                            ) : (
                                <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="space-y-6 py-10">
                                    <div className="w-20 h-20 bg-white text-black flex items-center justify-center mx-auto">
                                        <Shield size={40} strokeWidth={2} />
                                    </div>
                                    <h3 className="text-3xl font-black uppercase tracking-tighter text-white">AUTORIZADO</h3>
                                    <p className="text-zinc-500 font-mono">Status validado no sistema central.</p>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                )}

                {showModal === "gifts" && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-6"
                    >
                        <div className="bg-[#050505] max-w-xl w-full p-10 shadow-2xl border border-zinc-800 relative text-center max-h-[90vh] overflow-y-auto">
                            <button onClick={() => setShowModal(null)} className="absolute top-6 right-6 text-zinc-500 hover:text-white">
                                <X size={24} />
                            </button>

                            <div className="space-y-10 mt-6">
                                <div className="space-y-4">
                                    <h3 className="text-4xl font-black tracking-tighter uppercase text-white">TRANSFERÊNCIA</h3>
                                    <p className="text-zinc-400 font-mono text-xs max-w-sm mx-auto">SISTEMA PIX ATIVADO. TRANSMITA SUA COTA DE PRESENTE DIRETAMENTE PARA O REPOSITÓRIO DO CASAL.</p>
                                </div>

                                <div className="p-8 bg-zinc-900 border border-zinc-700 space-y-6">
                                    <div>
                                        <div className="font-bold font-mono text-sm text-zinc-500 uppercase tracking-widest mb-1">UPGRADE RESIDENCIAL</div>
                                        <div className="text-3xl font-black text-white font-mono">R$ 1.200,00</div>
                                    </div>
                                    <button
                                        onClick={copyPix}
                                        className={`w-full py-5 border transition-all font-sans font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 ${copied ? 'bg-white border-white text-black shadow-lg shadow-white/20' : 'border-zinc-500 text-zinc-300 hover:bg-white hover:text-black hover:border-white'
                                            }`}
                                    >
                                        {copied ? <><Check size={16} /> CLIPBOARD_OK</> : <><Square size={16} /> COPIAR_CHAVE</>}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
