"use client";

import { useState } from "react";
import { Gift, Plus, CreditCard, Check, Zap, Trash2, X, Image as ImageIcon, Upload, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function GiftsPage() {
    const [pixKey, setPixKey] = useState("exemplo@pix.com");
    const [loading, setLoading] = useState(false);
    const [saved, setSaved] = useState(false);
    const [showModal, setShowModal] = useState(false);
    
    const [gifts, setGifts] = useState([
        { id: 1, name: "Jogo de Jantar Porto Brasil", price: "450,00", image: "https://images.unsplash.com/photo-1544967079-2242d20882cb?auto=format&fit=crop&q=80&w=400", reserved: true },
        { id: 2, name: "Smart TV 4K 55'", price: "2.800,00", image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=400", reserved: false },
        { id: 3, name: "Viagem Maldivas (Cota)", price: "1.500,00", image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=400", reserved: false }
    ]);

    const [newGift, setNewGift] = useState({
        name: "",
        price: "",
        image: ""
    });

    const savePix = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSaved(true);
            setTimeout(() => setSaved(false), 2500);
        }, 1000);
    };

    const removeGift = (id: number) => {
        setGifts(gifts.filter(g => g.id !== id));
    };

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewGift(prev => ({ ...prev, image: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmitGift = (e: React.FormEvent) => {
        e.preventDefault();
        const giftToAdd = {
            id: Date.now(),
            name: newGift.name,
            price: newGift.price,
            image: newGift.image || "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=400",
            reserved: false
        };
        setGifts([giftToAdd, ...gifts]);
        setShowModal(false);
        setNewGift({ name: "", price: "", image: "" });
    };

    const toggleReserve = (id: number) => {
        setGifts(gifts.map(g => g.id === id ? { ...g, reserved: !g.reserved } : g));
    };

    return (
        <div className="space-y-12">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Lista de Presentes</h1>
                    <p className="text-zinc-500">Gerencie seus presentes e sua chave Pix para recebimento direto.</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-zinc-900 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-zinc-800 transition-all shadow-xl shadow-zinc-100"
                >
                    <Plus size={18} /> Adicionar Presente
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Pix Config */}
                <div className="lg:col-span-1">
                    <form onSubmit={savePix} className="bg-zinc-900 text-white p-8 rounded-[40px] space-y-6 shadow-2xl">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center">
                                <Zap size={20} className="text-white" />
                            </div>
                            <h3 className="font-bold text-xl">Configurações de Pix</h3>
                        </div>
                        <p className="text-zinc-400 text-sm leading-relaxed">Insira sua chave Pix para que seus convidados façam o pagamento direto para sua conta.</p>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">Chave Pix</label>
                            <input
                                value={pixKey}
                                onChange={(e) => setPixKey(e.target.value)}
                                className="w-full bg-zinc-800 border border-zinc-700 p-4 rounded-2xl focus:outline-none focus:border-emerald-500 transition-all"
                                placeholder="E-mail ou CPF"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 ${saved ? 'bg-emerald-500' : 'bg-white text-zinc-900 hover:bg-zinc-100'
                                }`}
                        >
                            {loading ? "Processando..." : saved ? <><Check size={18} /> Chave Salva</> : "Salvar Chave Pix"}
                        </button>
                    </form>
                </div>

                {/* Gifts Grid */}
                <div className="lg:col-span-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {gifts.map((gift) => (
                            <div key={gift.id} className="bg-white p-4 rounded-[32px] border border-zinc-100 shadow-sm flex items-center gap-4 group relative overflow-hidden">
                                <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0">
                                    <img src={gift.image} className="w-full h-full object-cover" alt={gift.name} />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-zinc-800">{gift.name}</h4>
                                    <div className="text-emerald-600 font-bold text-sm tracking-tight">R$ {gift.price}</div>
                                    {gift.reserved && (
                                        <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-600 text-[10px] font-black uppercase tracking-widest">
                                            <Lock size={10} /> Reservado
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <button
                                        onClick={() => toggleReserve(gift.id)}
                                        title={gift.reserved ? "Marcar como disponível" : "Marcar como reservado"}
                                        className={`p-2 rounded-xl transition-all ${gift.reserved ? 'bg-amber-100 text-amber-600' : 'bg-zinc-50 text-zinc-400 hover:bg-zinc-100'}`}
                                    >
                                        <Lock size={16} />
                                    </button>
                                    <button
                                        onClick={() => removeGift(gift.id)}
                                        className="p-2 bg-rose-50 text-rose-300 hover:text-rose-500 transition-colors rounded-xl"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Modal de Adicionar Presente */}
            <AnimatePresence>
                {showModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setShowModal(false)}
                            className="absolute inset-0 bg-zinc-900/60 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative bg-white rounded-[2.5rem] w-full max-w-xl overflow-hidden shadow-2xl border border-zinc-100"
                        >
                            <div className="p-8 md:p-12 space-y-8">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-2xl font-bold text-zinc-900">Novo Presente</h3>
                                    <button onClick={() => setShowModal(false)} className="text-zinc-400 hover:text-zinc-900">
                                        <X size={24} />
                                    </button>
                                </div>

                                <form onSubmit={handleSubmitGift} className="space-y-6">
                                    {/* Link de Upload de Foto */}
                                    <div 
                                        onClick={() => document.getElementById('gift-photo')?.click()}
                                        className="w-full aspect-video bg-zinc-50 border-2 border-dashed border-zinc-200 rounded-[2rem] flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-emerald-500 hover:bg-white transition-all overflow-hidden"
                                    >
                                        {newGift.image ? (
                                            <img src={newGift.image} className="w-full h-full object-cover" alt="Preview" />
                                        ) : (
                                            <>
                                                <ImageIcon size={32} className="text-zinc-300" />
                                                <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-zinc-400">
                                                    <Upload size={14} /> Upload de Foto
                                                </div>
                                            </>
                                        )}
                                        <input 
                                            id="gift-photo"
                                            type="file" 
                                            accept="image/*" 
                                            className="hidden" 
                                            onChange={handlePhotoUpload}
                                        />
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex flex-col gap-2">
                                            <label className="text-[10px] uppercase font-bold text-zinc-400 tracking-widest pl-4">Nome do Presente</label>
                                            <input
                                                type="text"
                                                required
                                                placeholder="Ex: Jogo de Panelas Le Creuset"
                                                value={newGift.name}
                                                onChange={(e) => setNewGift(prev => ({ ...prev, name: e.target.value }))}
                                                className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                                            />
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <label className="text-[10px] uppercase font-bold text-zinc-400 tracking-widest pl-4">Valor Estimado (R$)</label>
                                            <input
                                                type="text"
                                                required
                                                placeholder="Ex: 850,00"
                                                value={newGift.price}
                                                onChange={(e) => setNewGift(prev => ({ ...prev, price: e.target.value }))}
                                                className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 font-bold"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full py-5 bg-zinc-900 text-white rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-zinc-800 transition-all shadow-xl shadow-zinc-100"
                                    >
                                        Adicionar à Lista
                                    </button>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

