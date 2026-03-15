"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Heart, Calendar, MapPin, Gift, Check, Clock, X, Copy, Music, Info, Scissors, Hotel, Star, Lock } from "lucide-react";
import { useState } from "react";
import { Timeline, Accordion } from "@/components";

export default function MinimalistTemplate() {
    const [showRsvp, setShowRsvp] = useState(false);
    const [showGifts, setShowGifts] = useState(false);
    const [rsvpDone, setRsvpDone] = useState(false);
    const [copied, setCopied] = useState(false);
    const [gifts, setGifts] = useState([
        { id: 1, name: "Jogo de Jantar Porto Brasil", price: "450,00", image: "https://images.unsplash.com/photo-1544967079-2242d20882cb?auto=format&fit=crop&q=80&w=400", reserved: false },
        { id: 2, name: "Smart TV 4K 55'", price: "2.800,00", image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=400", reserved: true },
        { id: 3, name: "Cota de Lua de Mel", price: "1.500,00", image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=400", reserved: false },
    ]);
    const [selectedGift, setSelectedGift] = useState<number | null>(null);

    const data = {
        couple: "Maria & João",
        date: "12.10.2026",
        location: "São Paulo, SP",
        story: "Nossa história começou em um café chuvoso em 2018. Desde aquele dia, sabíamos que cada gota de chuva era um prenúncio de algo grandioso. Sete anos depois, convidamos você para celebrar o início do nosso 'para sempre'.",
    };

    const handleRsvp = (e: React.FormEvent) => {
        e.preventDefault();
        setRsvpDone(true);
        setTimeout(() => {
            setShowRsvp(false);
            setRsvpDone(false);
        }, 3000);
    };

    const handlePresent = (id: number) => {
        setSelectedGift(id);
        setCopied(true);
    };

    const confirmPayment = () => {
        if (selectedGift) {
            setGifts(gifts.map(g => g.id === selectedGift ? { ...g, reserved: true } : g));
            setCopied(false);
            setSelectedGift(null);
        }
    };

    return (
        <div className="min-h-screen bg-[#FAF9F6] text-[#1A1A1A] font-sans selection:bg-[#1A1A1A] selection:text-white overflow-x-hidden">
            {/* Hero */}
            <section className="h-screen flex flex-col items-center justify-center relative px-6 text-center overflow-hidden">
                <div className="absolute inset-0">
                    <img src="https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&q=80&w=1920" className="w-full h-full object-cover scale-105 animate-[pulse_10s_infinite_alternate] grayscale opacity-40" alt="Minimal Background" />
                    <div className="absolute inset-0 bg-[#FAF9F6]/80 backdrop-blur-md" />
                </div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 40 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    className="relative z-10 space-y-12"
                >
                    <span className="uppercase tracking-[0.6em] text-[10px] font-bold text-[#1A1A1A] bg-white/50 px-6 py-2 rounded-full border border-black/5">Save the Date</span>
                    <h1 className="text-6xl md:text-[10rem] font-light tracking-tighter leading-[0.85] text-[#1A1A1A] pr-4">
                        Maria <span className="italic block font-serif mt-2">& João</span>
                    </h1>
                    <div className="h-px w-24 bg-[#1A1A1A] mx-auto opacity-20" />
                    <p className="text-xl md:text-2xl tracking-[0.4em] font-light text-zinc-500">
                        {data.date}
                    </p>
                </motion.div>

                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce opacity-30 z-10 mt-12">
                    <div className="w-px h-16 bg-[#1A1A1A]" />
                </div>
            </section>

            {/* Story */}
            <section className="py-32 px-6 max-w-3xl mx-auto text-center space-y-12">
                <Heart className="mx-auto text-zinc-300" size={32} strokeWidth={1} />
                <h2 className="text-3xl font-light tracking-tight">Nossa História</h2>
                <p className="text-lg text-zinc-500 leading-relaxed font-light italic">
                    "{data.story}"
                </p>
            </section>

            {/* Gallery Section */}
            <section className="pb-32 px-6 pt-20">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                    <div className="md:col-span-5 aspect-[4/5] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 shadow-2xl">
                        <img src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-1000" alt="Casamento" />
                    </div>
                    <div className="md:col-span-4 aspect-square overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 md:mt-40 shadow-xl">
                        <img src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-1000" alt="Casamento" />
                    </div>
                    <div className="md:col-span-3 aspect-[3/4] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 md:-mt-32 shadow-lg">
                        <img src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-1000" alt="Casamento" />
                    </div>
                </div>
            </section>

            {/* Details */}
            <section className="bg-[#FAF9F6] py-32 px-6 border-y border-zinc-100">
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">
                    <div className="space-y-6">
                        <Calendar className="text-zinc-900" size={24} strokeWidth={1} />
                        <h3 className="text-2xl font-light">Cerimônia</h3>
                        <p className="text-zinc-500 font-light leading-relaxed">
                            Catedral da Sé, às 17:00h. <br />
                            Traje: Passeio Completo.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <MapPin className="text-zinc-900" size={24} strokeWidth={1} />
                        <h3 className="text-2xl font-light">Recepção</h3>
                        <p className="text-zinc-500 font-light leading-relaxed">
                            Casa de Festas Lumina. <br />
                            Jantar e comemoração após a cerimônia.
                        </p>
                    </div>
                </div>
            </section>

            {/* Seções complementares removidas (Timeline, Concierge, Padrinhos, FAQ) */}

            {/* RSVP & Gift CTA */}
            <section className="py-40 px-6 text-center space-y-12">
                <h2 className="text-4xl font-light tracking-tight italic">Contamos com você.</h2>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <button
                        onClick={() => setShowRsvp(true)}
                        className="px-10 py-4 bg-[#1A1A1A] text-white font-bold text-xs uppercase tracking-widest hover:bg-[#333] transition-all"
                    >
                        Confirmar Presença
                    </button>
                    <button
                        onClick={() => setShowGifts(true)}
                        className="px-10 py-4 border border-[#1A1A1A] text-[#1A1A1A] font-bold text-xs uppercase tracking-widest hover:bg-[#1A1A1A] hover:text-white transition-all"
                    >
                        Lista de Presentes
                    </button>
                </div>
            </section>

            <AnimatePresence>
                {/* RSVP Modal */}
                {showRsvp && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-[#FAF9F6]/95 backdrop-blur-sm flex items-center justify-center p-6"
                    >
                        <div className="max-w-md w-full space-y-8 text-center relative">
                            <button onClick={() => setShowRsvp(false)} className="absolute -top-12 right-0 p-2 hover:bg-zinc-100 rounded-full">
                                <X size={24} />
                            </button>

                            {!rsvpDone ? (
                                <>
                                    <div className="space-y-2">
                                        <h3 className="text-4xl font-light italic">Confirmação de Presença</h3>
                                        <p className="text-zinc-400 text-sm">Por favor, confirme até 12.09.2026</p>
                                    </div>
                                    <form onSubmit={handleRsvp} className="space-y-4">
                                        <input type="text" placeholder="Nome Completo" className="w-full bg-white border border-zinc-100 p-4 rounded-xl focus:outline-none" required />
                                        <div className="grid grid-cols-2 gap-4">
                                            <input type="number" placeholder="Qtde Pessoas" className="w-full bg-white border border-zinc-100 p-4 rounded-xl focus:outline-none" required />
                                            <select className="w-full bg-white border border-zinc-100 p-4 rounded-xl focus:outline-none appearance-none">
                                                <option>Vou comparecer</option>
                                                <option>Não poderei ir</option>
                                            </select>
                                        </div>
                                        <button className="w-full py-4 bg-[#1A1A1A] text-white font-bold uppercase tracking-widest text-xs">Confirmar</button>
                                    </form>
                                </>
                            ) : (
                                <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="space-y-6">
                                    <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-xl shadow-emerald-100">
                                        <Check size={32} strokeWidth={3} />
                                    </div>
                                    <h3 className="text-3xl font-light italic">Confirmado com sucesso!</h3>
                                    <p className="text-zinc-500 leading-relaxed">Sua presença foi enviada aos noivos. Nos vemos em breve!</p>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                )}

                {/* Gift List Modal */}
                {showGifts && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-[#FAF9F6]/95 backdrop-blur-sm flex items-center justify-center p-6"
                    >
                        <div className="max-w-xl w-full space-y-10 relative overflow-y-auto max-h-[90vh] py-10 px-4">
                            <button onClick={() => setShowGifts(false)} className="absolute top-4 right-4 p-2 hover:bg-zinc-100 rounded-full transition-colors">
                                <X size={24} />
                            </button>

                            <div className="text-center space-y-4">
                                <h3 className="text-4xl font-light italic">Lista de Presentes</h3>
                                <p className="text-zinc-400 text-sm">Escolha uma das sugestões abaixo para nos presentear.</p>
                            </div>

                            <div className="space-y-4">
                                {gifts.map((gift) => (
                                    <div key={gift.id} className={`p-6 bg-white border border-zinc-100 rounded-[32px] flex items-center gap-6 shadow-sm transition-all ${gift.reserved ? 'opacity-50 grayscale' : 'hover:border-zinc-300'}`}>
                                        <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0">
                                            <img src={gift.image} className="w-full h-full object-cover" alt={gift.name} />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-zinc-800">{gift.name}</h4>
                                            <div className="text-zinc-500 font-light">R$ {gift.price}</div>
                                            {gift.reserved && (
                                                <div className="mt-1 flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-black text-amber-600">
                                                    <Lock size={10} /> Já Presenteado
                                                </div>
                                            )}
                                        </div>
                                        {!gift.reserved && (
                                            <button 
                                                onClick={() => handlePresent(gift.id)}
                                                className="px-6 py-3 border border-[#1A1A1A] text-[#1A1A1A] font-bold text-[10px] uppercase tracking-widest hover:bg-[#1A1A1A] hover:text-white transition-all rounded-full"
                                            >
                                                Presentear
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {copied && (
                                <motion.div 
                                    initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                                    className="p-8 bg-[#1A1A1A] text-white rounded-[32px] space-y-6 text-center"
                                >
                                    <div className="space-y-1">
                                        <div className="flex items-center justify-center gap-2 text-emerald-400">
                                            <Check size={18} />
                                            <span className="font-bold uppercase tracking-widest text-[10px]">Chave Pix Copiada</span>
                                        </div>
                                        <p className="text-zinc-400 italic text-sm">casalmaria@pix.com</p>
                                    </div>

                                    <button 
                                        onClick={confirmPayment}
                                        className="w-full py-4 bg-white text-[#1A1A1A] rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-zinc-200 transition-all"
                                    >
                                        Já fiz o Pix! Confirmar Reserva
                                    </button>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <footer className="py-20 text-center border-t border-zinc-100">
                <div className="opacity-30 font-light text-[10px] tracking-[0.5em] uppercase">M & J • Lumina Collection</div>
            </footer>
        </div>
    );
}
