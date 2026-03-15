"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, Gift, Check, ShieldCheck, Crown, X, Copy, Clock, Heart, Music, Star, Hotel, Scissors, Info, Lock } from "lucide-react";
import { useState } from "react";
import { Timeline } from "@/components/Timeline";
import { Accordion } from "@/components/Accordion";

export default function ClassicTemplate() {
    const [showModal, setShowModal] = useState<"rsvp" | "gifts" | null>(null);
    const [rsvpStatus, setRsvpStatus] = useState<"idle" | "done">("idle");
    const [gifts, setGifts] = useState([
        { id: 1, name: "Jogo de Jantar Porto Brasil", price: "450,00", image: "https://images.unsplash.com/photo-1544967079-2242d20882cb?auto=format&fit=crop&q=80&w=400", reserved: false },
        { id: 2, name: "Smart TV 4K 55'", price: "2.800,00", image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=400", reserved: true },
        { id: 3, name: "Viagem Maldivas (Cota)", price: "1.500,00", image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=400", reserved: false },
        { id: 4, name: "Máquina de Café Espresso", price: "1.200,00", image: "https://images.unsplash.com/photo-1512568400610-62da28bc8a13?auto=format&fit=crop&q=80&w=400", reserved: false }
    ]);
    const [selectedGift, setSelectedGift] = useState<number | null>(null);
    const [copied, setCopied] = useState(false);

    const data = {
        couple: "Maria & João",
        date: "Sábado, 12 de Outubro de 2026",
        location: "Catedral Metropolitana & Palace Hotel",
        story: "Nossa história é um clássico. De amigos de infância a parceiros de vida, cada capítulo foi escrito com respeito, admiração e um amor que cresce a cada dia. Convidamos você para ser testemunha do nosso capítulo mais importante.",
    };

    const submitRsvp = (e: React.FormEvent) => {
        e.preventDefault();
        setRsvpStatus("done");
        setTimeout(() => {
            setShowModal(null);
            setRsvpStatus("idle");
        }, 3000);
    };

    const handlePresent = (id: number) => {
        setSelectedGift(id);
        setCopied(true);
        // Não reserva ainda, apenas mostra o Pix
    };

    const confirmPayment = () => {
        if (selectedGift) {
            setGifts(gifts.map(g => g.id === selectedGift ? { ...g, reserved: true } : g));
            setCopied(false);
            setSelectedGift(null);
        }
    };

    return (
        <div className="min-h-screen bg-[#0A0A0A] text-[#E0E0E0] font-serif overflow-hidden selection:bg-[#D4AF37] selection:text-black">

            {/* Ornate Border Global */}
            <div className="fixed inset-4 md:inset-8 border border-[#D4AF37]/30 pointer-events-none z-40 hidden md:block">
                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#D4AF37]" />
                <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#D4AF37]" />
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#D4AF37]" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#D4AF37]" />
            </div>

            {/* Navbar Clássica */}
            <nav className="absolute top-0 w-full p-12 flex justify-center items-center z-10 font-sans tracking-[0.3em] text-[10px] uppercase font-bold text-[#D4AF37] opacity-80">
                Convite Formal
            </nav>

            {/* Hero */}
            <section className="h-screen flex flex-col items-center justify-center relative px-6 text-center border-b border-[#D4AF37]/20 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/70 to-[#0A0A0A]/40 z-10" />
                    <img src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1920" className="w-full h-full object-cover scale-105 animate-[pulse_20s_infinite_alternate]" alt="Background Hero" />
                </div>
                <div className="z-10 space-y-12 mt-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.5 }}
                        className="w-24 h-24 flex items-center justify-center mx-auto relative"
                    >
                        <Crown className="text-[#D4AF37]" size={48} strokeWidth={1} />
                        <div className="absolute top-0 left-0 w-24 h-24 border border-[#D4AF37]/50 rounded-full animate-spin-slow" style={{ animationDuration: '20s' }} />
                        <div className="absolute top-0 left-0 w-24 h-24 border border-[#D4AF37]/20 rounded-full animate-[spin_30s_linear_reverse]" />
                    </motion.div>

                    <div className="space-y-6">
                        <motion.span
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            className="uppercase tracking-[0.6em] text-[11px] font-sans text-[#D4AF37]/80 block"
                        >
                            Comemoração de Núpcias
                        </motion.span>
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            className="text-6xl md:text-9xl font-normal leading-tight text-white drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                        >
                            {data.couple}
                        </motion.h1>
                    </div>

                    <motion.div
                        initial={{ width: 0 }} animate={{ width: 200 }}
                        className="h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto opacity-70"
                    />

                    <motion.p
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                        className="text-xl tracking-[0.3em] text-[#D4AF37] font-light italic"
                    >
                        {data.date}
                    </motion.p>
                </div>
            </section>

            {/* Invitation Text */}
            <section className="py-40 px-6 max-w-4xl mx-auto text-center space-y-20 relative">
                <ShieldCheck size={120} strokeWidth={0.5} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#D4AF37]/5 z-0" />

                <div className="space-y-8 relative z-10">
                    <h2 className="text-xs uppercase tracking-[0.5em] text-[#D4AF37] font-sans font-bold">A Presença das Famílias</h2>
                    <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-24 text-zinc-300 font-light italic text-xl">
                        <div>Família Oliveira</div>
                        <div>Família Santos</div>
                    </div>
                </div>

                <p className="text-3xl leading-relaxed font-light text-white relative z-10 max-w-2xl mx-auto">
                    "{data.story}"
                </p>
            </section>

            {/* Classical Imagery */}
            <section className="max-w-[1400px] mx-auto px-6 pb-40 pt-20 relative">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                    <div className="md:col-span-7 h-[800px] border-[12px] border-[#0A0A0A] shadow-[0_0_40px_rgba(212,175,55,0.05)] relative z-10 overflow-hidden group">
                        <div className="absolute inset-0 border border-[#D4AF37]/30 z-20 m-4 pointer-events-none" />
                        <img src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[3s]" alt="Classic Wedding" />
                    </div>
                    <div className="md:col-span-5 h-[600px] border-[12px] border-[#0A0A0A] shadow-[0_0_40px_rgba(212,175,55,0.05)] relative z-20 md:-ml-24 overflow-hidden group">
                        <div className="absolute inset-0 border border-[#D4AF37]/30 z-20 m-4 pointer-events-none" />
                        <img src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[3s]" alt="Ceremony Detail" />
                    </div>
                </div>
            </section>

            {/* Event Details Cards */}
            <section className="bg-[#111] py-40 px-6 border-y border-[#D4AF37]/20 relative">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div className="border border-[#D4AF37]/50 p-2 border-double bg-[#0A0A0A]">
                        <div className="border border-[#D4AF37]/20 p-16 text-center space-y-8">
                            <Calendar className="text-[#D4AF37] mx-auto" size={40} strokeWidth={1} />
                            <h3 className="text-4xl text-white font-normal">Cerimônia Religiosa</h3>
                            <div className="h-px w-20 bg-[#D4AF37]/50 mx-auto" />
                            <p className="text-zinc-400 font-light leading-relaxed text-lg italic">
                                Catedral Metropolitana de São Paulo <br />
                                Praça da Sé, 1 • às 17h00 <br />
                                <span className="font-sans text-[10px] uppercase font-bold tracking-widest text-[#D4AF37] not-italic mt-4 block">Pontualidade Britânica</span>
                            </p>
                        </div>
                    </div>

                    <div className="border border-[#D4AF37]/50 p-2 border-double bg-[#0A0A0A]">
                        <div className="border border-[#D4AF37]/20 p-16 text-center space-y-8">
                            <MapPin className="text-[#D4AF37] mx-auto" size={40} strokeWidth={1} />
                            <h3 className="text-4xl text-white font-normal">Recepção de Gala</h3>
                            <div className="h-px w-20 bg-[#D4AF37]/50 mx-auto" />
                            <p className="text-zinc-400 font-light leading-relaxed text-lg italic">
                                Grand Ballroom, Palace Hotel <br />
                                Av. Europa, 1500 • Jantar às 20h00 <br />
                                <span className="font-sans text-[10px] uppercase font-bold tracking-widest text-[#D4AF37] not-italic mt-4 block">Traje: Rigor (Black Tie)</span>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Seções complementares removidas (Timeline, Concierge, Padrinhos, FAQ) */}

            {/* RSVP & Gift CTA */}
            <section className="py-40 px-6 text-center space-y-16">
                <div>
                    <h2 className="text-5xl font-normal text-white drop-shadow-[0_0_10px_rgba(212,175,55,0.2)]">RSVP & Presentes</h2>
                    <p className="text-[#D4AF37] font-sans text-[10px] uppercase tracking-[0.4em] mt-6 font-bold">Solicitamos a fineza de sua resposta</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-8 justify-center max-w-2xl mx-auto">
                    <button
                        onClick={() => setShowModal("rsvp")}
                        className="flex-1 py-6 bg-gradient-to-r from-[#D4AF37] to-[#B8962B] text-black font-sans uppercase tracking-[0.3em] text-[10px] font-bold hover:brightness-110 transition-all shadow-[0_0_30px_rgba(212,175,55,0.2)]"
                    >
                        Confirmar Presença
                    </button>
                    <button
                        onClick={() => setShowModal("gifts")}
                        className="flex-1 py-6 border border-[#D4AF37] text-[#D4AF37] font-sans uppercase tracking-[0.3em] text-[10px] font-bold hover:bg-[#D4AF37]/10 transition-all"
                    >
                        Lista de Presentes
                    </button>
                </div>
            </section>

            {/* Classical Modals */}
            <AnimatePresence>
                {showModal === "rsvp" && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-6"
                    >
                        <div className="bg-[#0A0A0A] max-w-lg w-full p-2 border-double border-[3px] border-[#D4AF37]/50 relative text-center shadow-[0_0_50px_rgba(212,175,55,0.1)]">
                            <div className="border border-[#D4AF37]/20 p-12">
                                <button onClick={() => setShowModal(null)} className="absolute top-8 right-8 text-[#D4AF37] hover:text-white transition-colors">
                                    <X size={24} strokeWidth={1.5} />
                                </button>

                                {rsvpStatus === "idle" ? (
                                    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="space-y-10 mt-6">
                                        <Crown className="mx-auto text-[#D4AF37]" size={40} strokeWidth={1} />
                                        <div>
                                            <h3 className="text-4xl text-white mb-3">Répondez s'il vous plaît</h3>
                                            <p className="text-[#D4AF37]/70 font-sans text-[10px] uppercase tracking-widest font-bold">Até o dia 12 de Setembro, 2026</p>
                                        </div>
                                        <form onSubmit={submitRsvp} className="space-y-6 text-left">
                                            <div>
                                                <label className="text-[#D4AF37] font-sans text-[10px] uppercase tracking-widest font-bold mb-2 block">Nome(s) do(s) Convidado(s)</label>
                                                <input type="text" className="w-full bg-transparent text-white border-b border-[#D4AF37]/30 pb-3 font-serif italic text-lg focus:outline-none focus:border-[#D4AF37] transition-colors placeholder:text-zinc-700" placeholder="Ex: Sr. Renato e Sra. Silva" required />
                                            </div>
                                            <div className="grid grid-cols-2 gap-8 pt-4">
                                                <div>
                                                    <label className="text-[#D4AF37] font-sans text-[10px] uppercase tracking-widest font-bold mb-2 block">Convites Dúplices</label>
                                                    <input type="number" className="w-full bg-transparent text-white border-b border-[#D4AF37]/30 pb-3 font-serif italic text-lg focus:outline-none focus:border-[#D4AF37] transition-colors" placeholder="Total" required min="1" />
                                                </div>
                                                <div>
                                                    <label className="text-[#D4AF37] font-sans text-[10px] uppercase tracking-widest font-bold mb-2 block">Resposta</label>
                                                    <select className="w-full bg-[#0A0A0A] text-white border-b border-[#D4AF37]/30 pb-3 font-serif italic text-lg focus:outline-none focus:border-[#D4AF37] transition-colors appearance-none">
                                                        <option>Aceitamos com honra</option>
                                                        <option>Lamentamos a ausência</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <button className="w-full py-5 bg-[#D4AF37] text-black font-sans font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-white hover:text-black mt-10 transition-colors shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                                                Submeter Confirmação
                                            </button>
                                        </form>
                                    </motion.div>
                                ) : (
                                    <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="space-y-8 py-16">
                                        <div className="w-24 h-24 bg-gradient-to-tr from-[#D4AF37] to-[#B8962B] text-black rounded-full flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(212,175,55,0.4)]">
                                            <Check size={48} strokeWidth={1.5} />
                                        </div>
                                        <h3 className="text-4xl text-white">Confirmação Registrada</h3>
                                        <p className="text-[#D4AF37] font-light italic text-lg">Agradecemos profundamente a gentileza de seu retorno. Sua resposta foi registrada no cerimonial.</p>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}

                {showModal === "gifts" && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-6"
                    >
                        <div className="bg-[#0A0A0A] max-w-4xl w-full p-2 border-double border-[3px] border-[#D4AF37]/50 relative text-center">
                            <div className="border border-[#D4AF37]/20 p-8 md:p-12 overflow-y-auto max-h-[85vh]">
                                <button onClick={() => setShowModal(null)} className="absolute top-8 right-8 text-[#D4AF37] hover:text-white transition-colors z-10">
                                    <X size={24} strokeWidth={1.5} />
                                </button>

                                <div className="space-y-12 mt-6 relative z-0">
                                    <div className="space-y-6">
                                        <Gift className="mx-auto text-[#D4AF37]" size={40} strokeWidth={1} />
                                        <h3 className="text-4xl text-white">Lista de Casamento</h3>
                                        <p className="text-[#D4AF37]/80 italic text-lg font-light max-w-md mx-auto">Sua presença é nosso maior presente, mas se desejar nos presentear, aqui estão algumas sugestões.</p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                                        {gifts.map((gift) => (
                                            <div key={gift.id} className={`p-6 border border-[#D4AF37]/20 bg-[#111] flex gap-6 items-center group relative overflow-hidden ${gift.reserved ? 'opacity-50 grayscale' : ''}`}>
                                                <div className="w-24 h-24 border border-[#D4AF37]/20 overflow-hidden shrink-0">
                                                    <img src={gift.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={gift.name} />
                                                </div>
                                                <div className="flex-1 space-y-2">
                                                    <h4 className="text-white font-normal text-lg leading-tight">{gift.name}</h4>
                                                    <div className="text-[#D4AF37] font-bold">R$ {gift.price}</div>
                                                    {gift.reserved ? (
                                                        <div className="text-[10px] uppercase tracking-widest font-bold text-zinc-500 flex items-center gap-1.5">
                                                            <Lock size={10} /> Já Presenteado
                                                        </div>
                                                    ) : (
                                                        <button 
                                                            onClick={() => handlePresent(gift.id)}
                                                            className="text-[10px] uppercase tracking-widest font-bold text-white bg-[#D4AF37]/20 hover:bg-[#D4AF37] hover:text-black px-3 py-1.5 border border-[#D4AF37]/50 transition-all"
                                                        >
                                                            Presentear via Pix
                                                        </button>
                                                    )}
                                                </div>
                                                {gift.reserved && (
                                                    <div className="absolute top-2 right-2 rotate-12 border-2 border-rose-500/50 text-rose-500/70 px-2 py-0.5 text-[8px] font-black uppercase tracking-tighter">
                                                        Reservado
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    {copied && (
                                        <motion.div 
                                            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                                            className="p-8 border border-[#D4AF37] bg-[#D4AF37]/5 text-black space-y-6"
                                        >
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-center gap-3 text-[#D4AF37]">
                                                    <Check size={20} />
                                                    <span className="font-bold uppercase tracking-widest text-xs">Chave Pix Copiada</span>
                                                </div>
                                                <p className="text-white italic text-sm">casalmaria@pix.com</p>
                                            </div>

                                            <button 
                                                onClick={confirmPayment}
                                                className="w-full py-4 bg-[#D4AF37] text-black font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-white transition-all shadow-xl shadow-[#D4AF37]/20"
                                            >
                                                Já fiz o Pix! Confirmar Reserva
                                            </button>
                                        </motion.div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>


            <footer className="py-16 text-center border-t border-[#D4AF37]/20 bg-[#0A0A0A]">
                <div className="font-sans text-[9px] tracking-[0.6em] uppercase text-[#D4AF37]/50 font-bold">
                    Lumina Royalty Collection • The Masterpiece
                </div>
            </footer>
        </div>
    );
}
