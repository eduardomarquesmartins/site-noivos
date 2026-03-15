"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Heart, MapPin, Feather, Check, Clock, X, Gift, Copy, Music, Info, Scissors, Hotel, Star, Lock } from "lucide-react";
import { useState } from "react";
import { Timeline } from "@/components/Timeline";
import { Accordion } from "@/components/Accordion";

export default function BohoTemplate() {
    const [showModal, setShowModal] = useState<"rsvp" | "gifts" | null>(null);
    const [rsvpStatus, setRsvpStatus] = useState<"idle" | "done">("idle");
    const [gifts, setGifts] = useState([
        { id: 1, name: "Jogo de Jantar Porto Brasil", price: "450,00", image: "https://images.unsplash.com/photo-1544967079-2242d20882cb?auto=format&fit=crop&q=80&w=400", reserved: false },
        { id: 2, name: "Smart TV 4K 55'", price: "2.800,00", image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=400", reserved: true },
        { id: 3, name: "Cota de Lua de Mel (Peru)", price: "1.200,00", image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=400", reserved: false },
    ]);
    const [selectedGift, setSelectedGift] = useState<number | null>(null);
    const [copied, setCopied] = useState(false);

    const data = {
        couple: "Camila & Renato",
        date: "15 de Novembro de 2026",
        location: "Fazenda Ypê, SP",
        story: "Nossas almas livres se encontraram em um entardecer à beira-mar. Desde então, fogueiras, violões e risadas intermináveis têm sido nossa trilha sonora. Decidimos celebrar esse amor sob o céu aberto, cercados pelas pessoas que fazem nossa vida ter sentido.",
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
    };

    const confirmPayment = () => {
        if (selectedGift) {
            setGifts(gifts.map(g => g.id === selectedGift ? { ...g, reserved: true } : g));
            setCopied(false);
            setSelectedGift(null);
        }
    };

    return (
        <div className="min-h-screen bg-[#FDF9F3] text-[#5C4D42] font-serif overflow-x-hidden selection:bg-[#A68F7B] selection:text-white">

            {/* Navbar Transparente (Boho) */}
            <nav className="absolute top-0 w-full p-8 flex justify-between items-center z-10 font-sans tracking-widest text-xs uppercase font-bold text-[#A68F7B]">
                <span>C & R</span>
                <span className="opacity-50">15.11.2026</span>
                <span>Save the Date</span>
            </nav>

            {/* Hero Section: Organic Split */}
            <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2 relative overflow-hidden">
                <div className="absolute inset-0 z-0 select-none pointer-events-none">
                    <img src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=1920" className="w-full h-full object-cover blur-3xl opacity-20 scale-125 saturate-50" alt="Ambience" />
                </div>
                <div className="flex flex-col justify-center px-10 pt-32 lg:p-24 space-y-10 z-10">
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5 }} className="w-16 h-16 rounded-full border-2 border-[#A68F7B]/30 flex items-center justify-center">
                        <Feather size={24} className="text-[#A68F7B]" strokeWidth={1} />
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}
                        className="text-6xl md:text-8xl font-normal italic leading-none tracking-tight text-[#4A3B30]"
                    >
                        Amor <br /> Livre & <br /> Selvagem.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                        className="text-xl md:text-2xl font-light text-[#A68F7B] max-w-sm"
                    >
                        {data.couple} <br /> {data.date}
                    </motion.p>
                </div>

                <div className="relative h-[60vh] lg:h-full p-6 lg:p-12 pl-0">
                    {/* Imagem Premium Boho */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5, delay: 0.3 }}
                        className="w-full h-full bg-[#EADDD0] rounded-[40px] md:rounded-l-[120px] md:rounded-br-[120px] md:rounded-tr-[40px] overflow-hidden relative shadow-[0_20px_60px_rgba(92,77,66,0.15)] border-[12px] border-white/60 group"
                    >
                        <img src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover opacity-90 transition-transform duration-[3s] group-hover:scale-105" alt="Boho Couple" />
                        <div className="absolute inset-0 bg-[#A68F7B]/10 mix-blend-multiply" />
                    </motion.div>
                </div>
            </section>

            {/* The Story - Curved Banner */}
            <section className="bg-[#5C4D42] text-[#FDF9F3] py-40 px-8 relative overflow-hidden text-center">
                <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-[#4A3B30] blur-[80px]" />
                <div className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full bg-[#A68F7B]/20 blur-[80px]" />

                <div className="max-w-3xl mx-auto relative z-10 space-y-12 shrink-0">
                    <Heart className="mx-auto text-[#A68F7B]" size={40} strokeWidth={1} />
                    <h2 className="text-4xl md:text-5xl italic font-light">Sob as Estrelas</h2>
                    <p className="text-xl leading-relaxed font-light opacity-90">
                        "{data.story}"
                    </p>
                </div>
            </section>

            {/* Organic Gallery Premium */}
            <section className="py-40 px-8 max-w-[1400px] mx-auto">
                <div className="text-center mb-24 space-y-4">
                    <span className="font-sans text-[10px] uppercase font-bold tracking-[0.4em] text-[#A68F7B]">Nossos Momentos</span>
                    <h2 className="text-5xl italic text-[#4A3B30]">Diário de Bordo</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                    <div className="md:col-span-4 aspect-[4/5] rounded-[40px] md:rounded-tl-[100px] md:rounded-br-[100px] overflow-hidden shadow-2xl border-[8px] border-white/80 group">
                        <img src="https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-105" alt="Moments" />
                    </div>
                    <div className="md:col-span-5 aspect-[3/4] rounded-[60px] overflow-hidden shadow-[0_30px_60px_rgba(92,77,66,0.1)] z-10 md:-mt-24 md:-mb-24 scale-105 border-[12px] border-white group">
                        <img src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-105" alt="Moments" />
                    </div>
                    <div className="md:col-span-3 aspect-[4/5] rounded-[30px] overflow-hidden shadow-xl md:mt-12 border-[8px] border-white/80 group">
                        <img src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-105" alt="Moments" />
                    </div>
                </div>
            </section>

            {/* Seções complementares removidas (Timeline, Concierge, Padrinhos, FAQ) */}

            {/* Event Info */}
            <section className="py-32 px-8 bg-[#EADDD0]/20 border-t border-[#A68F7B]/10">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white p-12 md:p-20 rounded-[60px] md:rounded-[100px] border border-[#A68F7B]/10 shadow-2xl text-center space-y-16">
                        <div>
                            <MapPin className="mx-auto text-[#A68F7B] mb-6" size={32} strokeWidth={1} />
                            <h3 className="text-3xl italic mb-4 text-[#4A3B30]">Celebração & Festa</h3>
                            <p className="text-[#A68F7B] font-light text-lg">
                                Fazenda do Ypê, às 15:30h. <br />
                                Com os pés na grama.
                            </p>
                        </div>

                        <div className="h-px bg-[#A68F7B]/20 w-32 mx-auto" />

                        <h2 className="text-4xl text-[#4A3B30] italic">Vamos celebrar?</h2>
                        <p className="text-[#A68F7B] max-w-md mx-auto font-light">Nossa fogueira não está completa sem você. Confirme sua presença e acesse nossa lista.</p>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center pt-4">
                            <button
                                onClick={() => setShowModal("rsvp")}
                                className="px-12 py-5 bg-[#5C4D42] text-[#FDF9F3] font-sans font-bold text-xs uppercase tracking-[0.2em] rounded-full hover:bg-[#4A3B30] transition-colors shadow-xl shadow-[#5C4D42]/20"
                            >
                                Sim, eu vou!
                            </button>
                            <button
                                onClick={() => setShowModal("gifts")}
                                className="px-12 py-5 border-2 border-[#5C4D42] text-[#5C4D42] font-sans font-bold text-xs uppercase tracking-[0.2em] rounded-full hover:bg-[#5C4D42]/5 transition-colors"
                            >
                                Lista de Presentes
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Boho Modals */}
            <AnimatePresence>
                {showModal === "rsvp" && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-[#FDF9F3]/90 backdrop-blur-md flex items-center justify-center p-6"
                    >
                        <div className="bg-white max-w-md w-full p-10 rounded-[40px] shadow-2xl border border-[#A68F7B]/20 relative text-center">
                            <button onClick={() => setShowModal(null)} className="absolute top-6 right-6 text-[#A68F7B] hover:text-[#4A3B30]">
                                <X size={24} />
                            </button>

                            {rsvpStatus === "idle" ? (
                                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="space-y-8 mt-4">
                                    <Feather className="mx-auto text-[#A68F7B]" size={32} strokeWidth={1} />
                                    <div>
                                        <h3 className="text-3xl italic text-[#4A3B30] mb-2">Presença</h3>
                                        <p className="text-[#A68F7B] text-sm">Por favor, confirme até 01/10/2026</p>
                                    </div>
                                    <form onSubmit={submitRsvp} className="space-y-4">
                                        <input type="text" placeholder="Seu Nome Completo" className="w-full bg-[#FDF9F3] text-[#5C4D42] border border-[#EADDD0] p-5 rounded-3xl font-sans focus:outline-none focus:border-[#A68F7B] transition-colors" required />
                                        <div className="grid grid-cols-2 gap-4">
                                            <input type="number" placeholder="Qtde" className="w-full bg-[#FDF9F3] text-[#5C4D42] border border-[#EADDD0] p-5 rounded-3xl font-sans focus:outline-none focus:border-[#A68F7B] transition-colors" required min="1" />
                                            <select className="w-full bg-[#FDF9F3] text-[#5C4D42] border border-[#EADDD0] p-5 rounded-3xl font-sans focus:outline-none focus:border-[#A68F7B] transition-colors appearance-none">
                                                <option>Irei com alegria</option>
                                                <option>Desta vez, não</option>
                                            </select>
                                        </div>
                                        <button className="w-full py-5 bg-[#5C4D42] text-[#FDF9F3] font-sans font-bold uppercase tracking-[0.2em] text-xs rounded-[30px] hover:bg-[#4A3B30] shadow-lg shadow-[#5C4D42]/20 mt-4 transition-all">
                                            Enviar
                                        </button>
                                    </form>
                                </motion.div>
                            ) : (
                                <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="space-y-6 py-10">
                                    <div className="w-20 h-20 bg-emerald-500/10 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20">
                                        <Check size={40} strokeWidth={2} />
                                    </div>
                                    <h3 className="text-3xl italic text-[#4A3B30]">Que Alegria!</h3>
                                    <p className="text-[#A68F7B]">Sua resposta voou até nós. Mal podemos esperar por esse dia.</p>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                )}

                {showModal === "gifts" && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-[#FDF9F3]/90 backdrop-blur-md flex items-center justify-center p-6"
                    >
                        <div className="bg-white max-w-2xl w-full p-8 md:p-12 rounded-[50px] shadow-2xl border border-[#A68F7B]/20 relative text-center max-h-[90vh] overflow-y-auto">
                            <button onClick={() => setShowModal(null)} className="absolute top-6 right-6 text-[#A68F7B] hover:text-[#4A3B30] transition-colors">
                                <X size={24} />
                            </button>

                            <div className="space-y-10 mt-6 mt-4">
                                <div className="space-y-4">
                                    <h3 className="text-4xl italic text-[#4A3B30]">Ninhos & Sonhos</h3>
                                    <p className="text-[#A68F7B] text-sm max-w-sm mx-auto italic">Se deseja nos presentear, escolha um item de nossa lista curada com muito carinho.</p>
                                </div>

                                <div className="grid grid-cols-1 gap-4">
                                    {gifts.map((gift) => (
                                        <div key={gift.id} className={`p-6 bg-[#FDF9F3] border border-[#EADDD0] rounded-[32px] flex items-center gap-6 text-left relative overflow-hidden ${gift.reserved ? 'opacity-60 grayscale' : ''}`}>
                                            <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0">
                                                <img src={gift.image} className="w-full h-full object-cover" alt={gift.name} />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-bold text-[#5C4D42]">{gift.name}</h4>
                                                <div className="text-[#4A3B30] font-light">R$ {gift.price}</div>
                                                {gift.reserved && (
                                                    <div className="mt-1 flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-black text-[#A68F7B]">
                                                        <Lock size={10} /> Já Presenteado
                                                    </div>
                                                )}
                                            </div>
                                            {!gift.reserved && (
                                                <button 
                                                    onClick={() => handlePresent(gift.id)}
                                                    className="px-6 py-3 bg-[#5C4D42] text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#4A3B30] transition-colors"
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
                                        className="p-8 bg-[#5C4D42]/5 border border-[#5C4D42]/20 rounded-[30px] space-y-6"
                                    >
                                        <div className="space-y-1">
                                            <div className="flex items-center justify-center gap-2 text-[#5C4D42]">
                                                <Check size={18} />
                                                <span className="font-bold uppercase tracking-widest text-[10px]">Chave Pix Copiada</span>
                                            </div>
                                            <p className="text-[#A68F7B] italic text-sm">casalmaria@pix.com</p>
                                        </div>

                                        <button 
                                            onClick={confirmPayment}
                                            className="w-full py-4 bg-[#5C4D42] text-white rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-[#4A3B30] transition-all shadow-lg shadow-[#5C4D42]/20"
                                        >
                                            Já fiz o Pix! Confirmar Reserva
                                        </button>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>


            <footer className="py-12 text-center bg-[#5C4D42] text-[#A68F7B]">
                <div className="font-sans text-[10px] tracking-[0.4em] uppercase">Lumina Boho Collection • Feito com Alma</div>
            </footer>
        </div>
    );
}
