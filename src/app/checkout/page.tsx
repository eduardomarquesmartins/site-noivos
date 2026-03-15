"use client";

import { motion } from "framer-motion";
import { Check, ArrowLeft, ShieldCheck, Zap, ArrowRight, Clock, Star, Users, Gift, Lock } from "lucide-react";
import Link from "next/link";
import { useState, Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";

function CheckoutContent() {
    const searchParams = useSearchParams();
    const template = searchParams.get("template") || "Lumina Essential";
    const initialPrice = template.includes("Luxury") ? "597,00" : "297,00";
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [timeLeft, setTimeLeft] = useState(15 * 60);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const handlePayment = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setStep(2);
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-[#FAFAFA] text-zinc-900 font-sans p-6 md:p-12">
            <div className="max-w-4xl mx-auto">
                <Link href="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 transition-all mb-12 text-sm font-medium">
                    <ArrowLeft size={16} /> Voltar para templates
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Form Side */}
                    <div className="space-y-8">
                        {step === 1 ? (
                            <>
                                <div className="bg-red-50 text-red-600 p-4 md:p-5 rounded-2xl border border-red-100 flex items-center justify-between mb-4 shadow-sm shadow-red-100/50">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-red-100 p-2 rounded-full">
                                            <Clock className="animate-pulse" size={20} />
                                        </div>
                                        <div>
                                            <div className="font-bold text-sm md:text-base">Vagas Limitadas Neste Mês!</div>
                                            <div className="text-[11px] md:text-xs opacity-80 uppercase tracking-widest font-semibold">Finalize agora para garantir 0% de taxa no PIX.</div>
                                        </div>
                                    </div>
                                    <div className="text-xl md:text-2xl font-black font-mono tracking-tighter bg-red-600 text-white px-3 py-1.5 rounded-xl shadow-inner">
                                        {formatTime(timeLeft)}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <h1 className="text-4xl font-black tracking-tight">Finalize seu pedido</h1>
                                    <p className="text-zinc-500 font-medium pb-2">Você está a 1 minuto de ter o site de casamento mais elegante possível.</p>
                                </div>

                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Primeiro Nome</label>
                                            <input type="text" placeholder="Eduardo" className="w-full bg-white border border-zinc-200 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#D4A373]/20 focus:border-[#D4A373] transition-all" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">E-mail</label>
                                            <input type="email" placeholder="eduardo@exemplo.com" className="w-full bg-white border border-zinc-200 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#D4A373]/20 focus:border-[#D4A373] transition-all" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Data do Casamento</label>
                                        <input type="date" className="w-full bg-white border border-zinc-200 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#D4A373]/20 focus:border-[#D4A373] transition-all" />
                                    </div>
                                </div>

                                <div className="space-y-4 pt-4">
                                    <h3 className="font-bold text-lg">Método de Pagamento</h3>
                                    <div className="p-6 border-2 border-[#D4A373] bg-[#D4A373]/5 rounded-[32px] flex items-center justify-between group cursor-pointer">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                                                <Zap className="text-[#D4A373]" size={24} />
                                            </div>
                                            <div>
                                                <div className="font-bold">Pix Instantâneo</div>
                                                <div className="text-xs text-zinc-500">Liberação imediata do painel</div>
                                            </div>
                                        </div>
                                        <div className="w-6 h-6 rounded-full border-2 border-[#D4A373] flex items-center justify-center">
                                            <div className="w-3 h-3 rounded-full bg-[#D4A373]" />
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={handlePayment}
                                    disabled={loading}
                                    className="w-full relative group overflow-hidden bg-gradient-to-r from-[#D4AF37] via-[#C5A028] to-[#926614] text-white py-6 rounded-3xl font-black text-lg hover:scale-[1.02] transition-all shadow-2xl shadow-[#D4AF37]/30 flex items-center justify-center gap-3 border border-[#F3E5AB]/30 mt-4"
                                >
                                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                    <span className="relative z-10 flex items-center gap-3 text-white">
                                        {loading ? "Processando Pagamento..." : "Garantir 0% de Taxas Agora"} <Zap size={22} className={loading ? "animate-pulse" : ""} fill="currentColor" />
                                    </span>
                                </button>
                                <div className="flex items-center justify-center gap-2 mt-4 pb-2 text-xs text-zinc-400 font-bold uppercase tracking-widest">
                                    <Lock size={14} /> Pagamento 100% Seguro & Criptografado
                                </div>
                            </>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-white p-12 rounded-[40px] border border-zinc-100 text-center space-y-8 shadow-2xl"
                            >
                                <div className="w-20 h-20 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-xl shadow-emerald-200">
                                    <Check size={40} strokeWidth={3} />
                                </div>
                                <div className="space-y-3">
                                    <h2 className="text-3xl font-bold">Pagamento Confirmado!</h2>
                                    <p className="text-zinc-500 leading-relaxed">Parabéns! Sua jornada Lumina começou. O seu painel de gerenciamento já está liberado para você criar sua história.</p>
                                </div>
                                <Link href="/dashboard" className="block w-full bg-zinc-900 text-white py-6 rounded-3xl font-bold text-lg hover:bg-zinc-800 transition-all shadow-xl text-center">
                                    Entrar no meu Painel
                                </Link>
                            </motion.div>
                        )}
                    </div>

                    {/* Review Side */}
                    <div className="lg:pl-12">
                        <div className="bg-white p-10 rounded-[40px] border border-zinc-100 shadow-xl space-y-8 sticky top-12">
                            <h3 className="font-bold text-xl tracking-tight">Resumo do Pedido</h3>

                            <div className="flex gap-4 items-center">
                                <div className="w-24 h-24 bg-zinc-100 rounded-3xl overflow-hidden shrink-0">
                                    <img
                                        src={
                                            template === "Boho Chic"
                                                ? "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=300"
                                                : template === "Clássico Royalty"
                                                    ? "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=300"
                                                    : "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=300"
                                        }
                                        className="w-full h-full object-cover"
                                        alt="Template"
                                    />
                                </div>
                                <div>
                                    <div className="font-bold text-lg">{template}</div>
                                    <div className="text-zinc-500 text-sm">Template Premium + Dashboard</div>
                                </div>
                            </div>

                            <div className="space-y-4 pt-4 text-sm">
                                <div className="flex justify-between items-center">
                                    <span className="text-zinc-500">Ativação Única</span>
                                    <span className="font-bold">R$ {initialPrice}</span>
                                </div>
                                <div className="flex justify-between items-center text-emerald-600 font-bold">
                                    <span>Taxas sob Presentes</span>
                                    <span>0% (GRÁTIS)</span>
                                </div>
                            </div>

                            <div className="h-px bg-zinc-100" />

                            <div className="flex justify-between items-center text-xl font-black">
                                <span>Total</span>
                                <span>R$ {initialPrice}</span>
                            </div>

                            <div className="space-y-4 pt-6">
                                <div className="flex items-center gap-3 text-xs text-zinc-400 font-medium">
                                    <ShieldCheck size={16} className="text-zinc-300" /> Pagamento 100% seguro e criptografado
                                </div>
                                <div className="flex items-center gap-3 text-xs text-zinc-400 font-medium">
                                    <Zap size={16} className="text-zinc-300" /> Acesso de 1 ano (365 dias)
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function CheckoutPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
                <div className="animate-pulse text-zinc-400 font-medium uppercase tracking-[0.2em]">Carregando Checkout...</div>
            </div>
        }>
            <CheckoutContent />
        </Suspense>
    );
}

